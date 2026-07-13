import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Dashboard from "./Dashboard";
import { parseCSV } from "./utils/csvParser";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2
          style={{
            marginTop: 0,
            marginBottom: "0.5rem",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [updateTimestamp, setUpdateTimestamp] = useState("");
  const [view, setView] = useState("landing");
  const [csvData, setCsvData] = useState([]);
  const [pathCopied, setPathCopied] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [hoveredField, setHoveredField] = useState(null);
  const fileInputRef = useRef(null);

  const serverPath =
    "Lab > bateslab > Lab Member User Folders > Manali_R > Final_Code_File > bates-ui";

  const handleCopyServerPath = () => {
    navigator.clipboard.writeText(serverPath);
    setPathCopied(true);
    setTimeout(() => setPathCopied(false), 2000);
  };

  const handleCopyField = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      parseCSV(
        file,
        (data) => {
          setCsvData(data);
          setView("dashboard");
        },
        (error) => {
          console.error("CSV Parse Error:", error);
          alert("Failed to parse CSV file.");
        }
      );
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="appShell">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleFileUpload}
      />

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {view === "dashboard" ? (
          <h2
            style={{ margin: 0, fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => setView("landing")}
          >
            Bates Lab Data Explorer
          </h2>
        ) : (
          <div style={{ visibility: "hidden" }}>Spacer</div>
        )}

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="btn-outline"
            onClick={() => {
              setUpdateTimestamp(new Date().toLocaleString());
              setActiveModal("updates");
            }}
          >
            Updates
          </button>
          <button className="btn-outline" onClick={toggleTheme}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <main
        className="mainArea"
        style={{
          padding: "0 2rem 2rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {view === "landing" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "800",
                textAlign: "center",
                margin: 0,
                letterSpacing: "-0.02em",
                background:
                  "linear-gradient(to right, var(--text-primary), var(--text-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bates Lab Data Explorer
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                width: "100%",
              }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <h2 style={{ margin: 0 }}>Access Bates Lab Server</h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Connect to the lab server to access shared resources and
                  datasets.
                </p>
                <button
                  className="btn"
                  style={{ marginTop: "auto" }}
                  onClick={() => setActiveModal("server")}
                >
                  Mac & Windows Login Instructions
                </button>
                <button
                  className="btn"
                  onClick={() => setActiveModal("serverPath")}
                >
                  Server Path
                </button>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <h2 style={{ margin: 0 }}>Locate Your Data File</h2>
                <div
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    padding: "1rem",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  <code
                    style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}
                  >
                    TDS_wide.csv
                  </code>
                  <div
                    style={{
                      height: "1px",
                      background: "var(--glass-border)",
                      margin: "0.5rem 0",
                    }}
                  ></div>
                  <code
                    style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}
                  >
                    TDS_long.csv
                  </code>
                </div>
                <p
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  Ensure your files are named correctly.
                </p>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <h2 style={{ margin: 0 }}>Upload Your Data</h2>
                <div
                  style={{
                    border: "2px dashed var(--glass-border)",
                    borderRadius: "12px",
                    padding: "2rem",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent-color)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.borderColor = "var(--glass-border)")
                  }
                  onClick={triggerFileUpload}
                >
                  <span style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    📂
                  </span>
                  <span style={{ fontWeight: "500" }}>
                    Click to select or drag file
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      marginTop: "0.5rem",
                    }}
                  >
                    CSV files only
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard data={csvData} />
        )}
      </main>

      <Modal
        isOpen={activeModal === "updates"}
        onClose={() => setActiveModal(null)}
        title="Latest Updates"
      >
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginTop: 0,
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Last updated: {updateTimestamp}
        </p>
        <div style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          <p>
            <strong>v1.3.1</strong> - Fixed internal panel scrolling and
            dashboard height.
          </p>
          <p>
            <strong>v1.2.0</strong> - Added enhanced CSV parsing for SPSS
            compatibility.
          </p>
          <p>
            <strong>v1.1.0</strong> - Improved dark mode contrast and
            glassmorphism effects.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "server"}
        onClose={() => setActiveModal(null)}
        title="Server Login Instructions"
      >
        <div style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          <h3 style={{ color: "var(--text-primary)", marginTop: 0 }}>Mac OS</h3>
          <ol>
            <li>Finder &gt; Go &gt; Connect to Server (Cmd+K)</li>
            <li
              onMouseEnter={() => setHoveredField("mac")}
              onMouseLeave={() => setHoveredField(null)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>
                Enter: <code>smb://bl-psy-srv.ads.iu.edu</code>
              </span>
              <button
                className="btn"
                style={{
                  padding: "0.15rem 0.6rem",
                  fontSize: "0.75rem",
                  visibility:
                    hoveredField === "mac" || copiedField === "mac"
                      ? "visible"
                      : "hidden",
                }}
                onClick={() =>
                  handleCopyField("mac", "smb://bl-psy-srv.ads.iu.edu")
                }
              >
                {copiedField === "mac" ? "Copied" : "Copy"}
              </button>
            </li>
            <li>Enter your credentials when prompted.</li>
          </ol>

          <h3 style={{ color: "var(--text-primary)" }}>Windows</h3>
          <ol>
            <li>Open File Explorer.</li>
            <li>Right-click "This PC" &gt; Map network drive.</li>
            <li
              onMouseEnter={() => setHoveredField("windows")}
              onMouseLeave={() => setHoveredField(null)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>
                Folder: <code>\\bl-psy-srv.ads.iu.edu</code>
              </span>
              <button
                className="btn"
                style={{
                  padding: "0.15rem 0.6rem",
                  fontSize: "0.75rem",
                  visibility:
                    hoveredField === "windows" || copiedField === "windows"
                      ? "visible"
                      : "hidden",
                }}
                onClick={() =>
                  handleCopyField("windows", "\\\\bl-psy-srv.ads.iu.edu")
                }
              >
                {copiedField === "windows" ? "Copied" : "Copy"}
              </button>
            </li>
            <li>Check "Connect using different credentials" and Finish.</li>
          </ol>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "serverPath"}
        onClose={() => setActiveModal(null)}
        title="Server Path"
      >
        <div style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          <code style={{ display: "block" }}>{serverPath}</code>
          <button
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={handleCopyServerPath}
          >
            {pathCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
