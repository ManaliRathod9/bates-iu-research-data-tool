import React, { useState, useMemo, useEffect } from "react";
import { structure } from "./config/structure";

// Mapping of Tasks to their respective variable prefixes/keywords
const taskToVarMap = {
  "Bird Alligator": "ba_",
  "Grass Snow": "gs_",
  "Mother Executive Function Tests": "mef_",
  "Adult Temperament Questionnaire": "atq",
  "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)":
    "brief",
  "Changes + Adjustments Questionnaire": "chg",
  "Child Behavior Checklist": "cbcl",
  "Child Behavior Questionnaire": "cbq",
  "Child-Rearing Practices Report": "crpr",
  "Children’s Sleep Habits Questionnaire": "cshq",
  "CHAOS Scale (Confusion, Hubbub, and Order Scale)": "chaos",
  "Depression Scale": "dep",
  "DIFFER Cognitive Ability": "diff",
  "Eyberg Child Behavior Inventory": "eyb",
  "Physical Health Status Inventory": "phsi",
  "Shipley Parent Cognition": "ship",
  "Teacher Questionnaires": "teach",
  "Temperament Questionnaires": "temp",
  Compliments: "comp",
  "Main Sleep Variables": "sleep",
  "Home Scale Items": "home",
  "Observer Ratings": "obs",
  "Parent Positive Affect": "ppa",
  "Sleep Diary – Child": "sdc",
  "Gift Delay": "gift",
  "Stop-Go": "stop",
  "Toy Frustration": "toy",
  "Child Behavior FP": "cbfp",
};

// CSV cell escaping
function csvCell(value) {
  // convert NA/null/undefined -> empty cell
  if (value === "NA" || value === null || value === undefined) return "";

  const str = String(value);

  // If contains special chars, wrap in quotes + escape quotes
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

const Dashboard = ({ data = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // tcid required by default
  const [selectedVariables, setSelectedVariables] = useState(["tcid"]);

  const [checkedVariables, setCheckedVariables] = useState([]);
  const [checkedSelected, setCheckedSelected] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Extract variables from data headers
  const rawVariables = useMemo(() => {
    if (data && data.length > 0) return Object.keys(data[0]);
    return [];
  }, [data]);

  // Ensure tcid always present
  useEffect(() => {
    setSelectedVariables((prev) => {
      if (prev.includes("tcid")) return prev;
      return ["tcid", ...prev];
    });
  }, [data]);

  // Build tasks based on selected category
  const tasks = useMemo(() => {
    if (selectedCategory) {
      return structure.tasksByCategory[selectedCategory] || [];
    }
    // show all tasks if no category selected
    const allTasks = Object.values(structure.tasksByCategory).flat();
    return [...new Set(allTasks)].sort();
  }, [selectedCategory]);

  // Filter variables based on selected task and search text
  const filteredVariables = useMemo(() => {
    let vars = rawVariables;

    if (selectedTask) {
      const keyword =
        taskToVarMap[selectedTask] || selectedTask.toLowerCase().split(" ")[0];
      vars = vars.filter((v) =>
        v.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (filterText) {
      vars = vars.filter((v) =>
        v.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    return vars;
  }, [rawVariables, selectedTask, filterText]);

  const toggleRowSelection = (v, setList) => {
    setList((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const handleAddVariable = (variable) => {
    setSelectedVariables((prev) => {
      if (prev.includes(variable)) return prev;
      return [...prev, variable];
    });
  };

  const handleRemoveVariable = (variable) => {
    if (variable === "tcid") return;
    setSelectedVariables((prev) => prev.filter((v) => v !== variable));
  };

  const handleAddSelected = () => {
    setSelectedVariables((prev) => {
      const toAdd = checkedVariables.filter((v) => !prev.includes(v));
      return [...prev, ...toAdd];
    });
    setCheckedVariables([]);
  };

  const handleAddAll = () => {
    setSelectedVariables((prev) => {
      const toAdd = filteredVariables.filter((v) => !prev.includes(v));
      return [...prev, ...toAdd];
    });
  };

  const handleRemoveSelected = () => {
    setSelectedVariables((prev) =>
      prev.filter((v) => v === "tcid" || !checkedSelected.includes(v))
    );
    setCheckedSelected([]);
  };

  const handleRemoveAll = () => {
    setSelectedVariables(["tcid"]);
    setCheckedSelected([]);
  };

  const handleSelectAllFiltered = () => {
    if (filteredVariables.length === 0) return;
    if (checkedVariables.length === filteredVariables.length) {
      setCheckedVariables([]);
    } else {
      setCheckedVariables([...filteredVariables]);
    }
  };

  const handleSaveCSV = () => {
    if (!data || data.length === 0) {
      alert("No data available. Please upload a CSV file first.");
      return;
    }

    if (selectedVariables.length === 0) {
      alert("No variables selected. Please add variables to export.");
      return;
    }

    try {
      // Header row
      const headerRow = selectedVariables.join(",");

      // Data rows
      const bodyRows = data
        .map((row) =>
          selectedVariables.map((col) => csvCell(row[col])).join(",")
        )
        .join("\r\n");

      const csvContent = `${headerRow}\r\n${bodyRows}`;

      const bom = "\ufeff";
      const finalCsv = bom + csvContent;

      const blob = new Blob([finalCsv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      a.style.display = "none";

      document.body.appendChild(a);

      console.log("Downloading CSV:", a.download);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);
    } catch (error) {
      console.error("CSV export failed:", error);
      alert("Failed to export CSV. Please try again.");
    }
  };

  // UI Styles
  const panelHeaderStyle = {
    marginTop: 0,
    marginBottom: "1rem",
    borderBottom: "1px solid var(--glass-border)",
    paddingBottom: "0.5rem",
    fontSize: "1.2rem",
  };

  const listStyle = { listStyle: "none", padding: 0, margin: 0 };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        gap: "1.5rem",
        minHeight: 0,
      }}
    >
      {/* Top Section: 4 Panels Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(200px, 1fr) minmax(200px, 1.4fr) minmax(200px, 1.4fr) minmax(200px, 1fr)",
          gap: "1.5rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Panel 1: Categories */}
        <div className="glass-panel panel">
          <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
            <h3 style={panelHeaderStyle}>Categories</h3>
          </div>

          <div
            className="panelList"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <ul style={listStyle}>
              {structure.categories.map((cat, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedCategory((prev) => (prev === cat ? null : cat));
                    setSelectedTask(null);
                    setCheckedVariables([]);
                  }}
                  style={{
                    padding: "0.75rem 0.5rem",
                    borderBottom: "1px solid var(--glass-border)",
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === cat
                        ? "var(--glass-highlight)"
                        : "transparent",
                    color:
                      selectedCategory === cat
                        ? "var(--accent-color)"
                        : "inherit",
                    fontWeight: selectedCategory === cat ? "600" : "normal",
                    transition: "all 0.2s",
                    borderRadius: "4px",
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panel 2: Tasks */}
        <div className="glass-panel panel">
          <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
            <h3 style={panelHeaderStyle}>Tasks ({tasks.length})</h3>
          </div>

          <div
            className="panelList"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <ul style={listStyle}>
              {tasks.map((task, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedTask((prev) => (prev === task ? null : task));
                    setCheckedVariables([]);
                  }}
                  style={{
                    padding: "0.75rem 0.5rem",
                    borderBottom: "1px solid var(--glass-border)",
                    cursor: "pointer",
                    backgroundColor:
                      selectedTask === task
                        ? "var(--glass-highlight)"
                        : "transparent",
                    color:
                      selectedTask === task ? "var(--accent-color)" : "inherit",
                    fontWeight: selectedTask === task ? "600" : "normal",
                    transition: "all 0.2s",
                    borderRadius: "4px",
                  }}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panel 3: Variables */}
        <div className="glass-panel panel">
          <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
            <h3 style={panelHeaderStyle}>
              Variables ({filteredVariables.length})
            </h3>
          </div>

          <div
            className="panelList"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <ul style={listStyle}>
              {filteredVariables.length === 0 ? (
                <p
                  style={{
                    color: "var(--text-secondary)",
                    padding: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  {selectedTask
                    ? "No variables found for this task."
                    : "Select a task to view variables."}
                </p>
              ) : (
                filteredVariables.map((v, i) => {
                  const isAdded = selectedVariables.includes(v);
                  const isChecked = checkedVariables.includes(v);

                  return (
                    <li
                      key={i}
                      onClick={() =>
                        !isAdded && toggleRowSelection(v, setCheckedVariables)
                      }
                      style={{
                        padding: "0.75rem 0.5rem",
                        borderBottom: "1px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                        cursor: isAdded ? "default" : "pointer",
                        backgroundColor: isChecked
                          ? "rgba(59, 130, 246, 0.1)"
                          : "transparent",
                        opacity: isAdded ? 0.5 : 1,
                      }}
                    >
                      <span
                        style={{ fontSize: "0.9rem", wordBreak: "break-all" }}
                      >
                        {v}
                      </span>

                      <button
                        className={isAdded ? "btn-disabled" : "btn-small"}
                        disabled={isAdded}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddVariable(v);
                        }}
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.7rem",
                          flexShrink: 0,
                        }}
                      >
                        {isAdded ? "Added" : "Add"}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>

        {/* Panel 4: Selected Variables */}
        <div className="glass-panel panel">
          <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
            <h3 style={panelHeaderStyle}>
              Selected ({selectedVariables.length})
            </h3>
          </div>

          <div
            className="panelList"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <ul style={listStyle}>
              {selectedVariables.map((v, i) => {
                const isChecked = checkedSelected.includes(v);

                return (
                  <li
                    key={i}
                    onClick={() =>
                      v !== "tcid" && toggleRowSelection(v, setCheckedSelected)
                    }
                    style={{
                      padding: "0.75rem 0.5rem",
                      borderBottom: "1px solid var(--glass-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      cursor: v === "tcid" ? "default" : "pointer",
                      backgroundColor: isChecked
                        ? "rgba(59, 130, 246, 0.1)"
                        : "transparent",
                    }}
                  >
                    <span
                      style={{ fontSize: "0.9rem", wordBreak: "break-all" }}
                    >
                      {v}{" "}
                      {v === "tcid" && (
                        <span
                          style={{
                            fontSize: "0.6rem",
                            color: "var(--accent-color)",
                            marginLeft: "0.3rem",
                            border: "1px solid var(--accent-color)",
                            padding: "1px 3px",
                            borderRadius: "3px",
                          }}
                        >
                          REQ
                        </span>
                      )}
                    </span>

                    {v !== "tcid" && (
                      <button
                        className="btn-outline-small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveVariable(v);
                        }}
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.7rem",
                          flexShrink: 0,
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div
        className="glass-panel"
        style={{
          padding: "1rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Filter variables..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid var(--glass-border)",
              borderRadius: "4px",
              color: "white",
              padding: "0.4rem 0.8rem",
              fontSize: "0.9rem",
              outline: "none",
              width: "180px",
            }}
          />

          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--glass-border)",
              margin: "0 0.5rem",
            }}
          />

          <button
            className="btn-outline-small"
            style={{ border: "1px solid var(--glass-border)" }}
            onClick={handleSelectAllFiltered}
          >
            Select All
          </button>

          <button className="btn-small" onClick={handleAddSelected}>
            Add Selected
          </button>
          <button className="btn-small" onClick={handleAddAll}>
            Add All
          </button>

          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--glass-border)",
              margin: "0 0.5rem",
            }}
          />

          <button
            className="btn-outline-small"
            style={{ border: "1px solid var(--glass-border)" }}
            onClick={handleRemoveSelected}
          >
            Remove Selected
          </button>

          <button
            className="btn-outline-small"
            style={{ border: "1px solid var(--glass-border)" }}
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
        </div>

        <button
          className="btn"
          style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
          onClick={handleSaveCSV}
        >
          Save as CSV
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
