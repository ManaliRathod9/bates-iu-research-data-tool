import React, { useState, useMemo, useEffect } from "react";
import { structure } from "./config/structure";
import { variableDescriptions } from "./config/variableDescriptions";
import VariableDescription, {
  shouldShowVariableInTask,
  getFinalVariables,
  groupVariablesBySubcategory,
  countDisplayedVariables,
} from "./VariableList";

// Mapping of Tasks to their respective variable prefixes/keywords
const taskToVarMap = {
  "Bird Alligator": "birdalligator",
  "Grass Snow": "grasssnow",
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
  "Door Opening": "door",
  "Fruit Stroop": "fruit",
  "Parental Control": "control",
  "Snack Delay": "snack",
  "Sustained Attention": "sustain",
  "Token Sort": "token",
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

// Task descriptions — add entries here as needed
const taskDescriptions = {
  // ── Child Tasks ───────────────────────────────────────────────────────────

  "Bird Alligator": `Bird-alligator is an inhibitory control measure in which children are asked to follow the directions delivered by a bird puppet (go trials) and not follow the directions delivered by an alligator puppet (no-go trials). For the youngest children, there are twelve test trials. Older children have the same initial twelve test trials followed by another twelve trials with a rule switch (do what the alligator says). All children are given enough practice go and no-go trials to correctly respond to each type of command multiple times, indicating they understand the rules.\n\nCoded behaviors for each trial (go and no-go) are as follows:\n\n• No movement: child does not move in response to puppet's command.\n• Wrong movement: child performs a movement that was not commanded by the puppet.\n• Partial movement: child starts to perform the commanded movement and then stops and does not finish the movement.\n• Full movement: child fully performs the commanded movement.\n\nEach trial is also coded based on whether the child's response was delayed by at least two seconds.\n\nTrials are not codeable if the child is not actively playing, if the experimenter shows the child how to do an action and the child repeats it (imitation), or if the child is physically restrained from performing actions or is physically helped to perform the action.`,

  "Broken Toy": `Broken toy is an emotion regulation measure in which the child is given a toy that the experimenter explains is her favorite. When the experimenter gives the child the toy, the toy falls apart and the experimenter says several verbal cues in succession: "Uh oh!" "What happened?" and "That was my favorite toy…" all while feigning "sad" affect. The task ends when the experimenter suggests how to fix the toy and offers help to the child. The task is coded for three constructs on scales from 1 to 5.\n\nThe three constructs are as follows:\n\n1. Child's distress: the level of distress exhibited by the child immediately following the toy breaking.\n2. Comprehension of another's distress: the level of distress exhibited by the child after the experimenter says "uh oh!" and "What happened?"\n\nScale for constructs 1 & 2:\n• 1 – No distress, or shows positive affect\n• 2 – Slight attention or slight concern (e.g. brow furrowing)\n• 3 – Strong facial concern (e.g. frowning, surprised/shocked face)\n• 4 – Distressed vocalization (e.g. "Oh no! I broke it!")\n• 5 – High distress (e.g. crying)\n\n3. Prosocial behavior: the most prosocial solution offered by the child to fix the broken toy, whenever it occurs.\n\nScale for construct 3:\n• 1 – No solution offered\n• 2 – "You can fix it" (someone other than the child, like the experimenter)\n• 3 – The child attempts to fix the toy\n• 4 – "We can fix it" (verbal solution including child and experimenter)\n• 5 – "I can fix it" (verbal solution including the child)`,

  "Child Compliance": `Child compliance is a measure coded during the parent-child interaction task of Toy Cleanup. Once the parent signals to the child that it is time to clean up the toys, the task runs for five minutes or until the child finishes cleaning and the parent signals that the task is complete. This measure is coded for the child's level of compliance to the cleanup task.\n\nIn each 15-second interval, the most noncompliant behavior occurring during the interval is coded:\n\n• Defiance: overt rejection of parental agenda. Resists with defiance, anger, temper tantrums, or whining.\n• Refusal/Negotiation: overt resistance to parental agenda. Overtly refuses to clean and/or negotiates with the parent in ways that are not aversive.\n• Passive Noncompliance: reluctance to accept the parental agenda. Ignores parental directives, refuses to comply, or appears to be stalling. Shows no overt resistance to parental control.\n• Situational Compliance: acceptance of the parental agenda. Willing to comply, but needs prompting. Child often stops cleanup in absence of reminders. Child responds good-naturedly and with minimal reluctance to reminders.\n• Committed Compliance: full endorsement of the parental agenda. Child stays on task without reminders, has embraced the task wholeheartedly, may spontaneously repeat the rule or show commitment to the task.\n• Other/Uncodeable: parent and child take a mutually agreed-upon break from the task (playing, reading a story, chatting, etc.)`,

  "Child Negative Affect": `Child negative affect is coded for all parent-child interaction tasks: Free Play, Phone Call, Toy Cleanup, and Toy Prohibition (when the child is left alone). Each task lasts a maximum of five minutes and is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• No negative affect: there is no sign of verbal or physical distress present in the child.\n• Negative affect: child shows some signs of irritation, boredom, or apprehension (e.g. whining).\n• High negative affect: child shows clear signs of distress. The child is extremely uncomfortable (e.g. crying, screaming).\n• Uncodeable: the child's face or expression is not visible for at least half the interval, or the child's emotional state cannot be heard (e.g. crying).`,

  "Child Positive Affect": `Child positive affect is coded for all parent-child interaction tasks: Free Play, Phone Call, Toy Cleanup, and Toy Prohibition (when the child is left alone). Each task lasts a maximum of five minutes and is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• No positive: there are no clear signs of positive affect, though mood may be pleasant. Child is generally neutral in facial expression.\n• Low positive: small smiles, light laughter — an obvious increase from the neutral baseline, but no clear "full blown joy" is present.\n• High positive: smiling broadly with cheeks raised high, eyes are crinkled, hearty laughter, or otherwise extreme positivity or excitement.\n• Uncodeable: the child's face or expression is not visible for at least half the interval, or the child's emotional state cannot be heard (e.g. laughter).`,

  Compliments: `This emotion regulation measure occurs when the experimenter sits, with the child standing, in front of a mirror. The experimenter looks at the child in the mirror, points at them, and gives the child various compliments for one minute. The experimenter smiles and speaks in a warm tone while giving the compliments.\n\nThis task is coded for three separate constructs: Embarrassment, Shame, and Pride.\n\nEmbarrassment (all 3 of the following behaviors must be present):\n• Smiling facial expression\n• Gaze aversion\n• Nervous touching of the hands to the body or face, nervous wriggling of the whole body, or general fidgeting.\n\nShame (3 of 5 behaviors must be present):\n• Body collapsed: child is hunched with their shoulders towards the front of their body, or their back/spine is curved or arched forward.\n• Corners of mouth turned downward/lower lip tucked between teeth\n• Eyes lowered with gaze downward or to side\n• Negative vocal self-evaluation\n• Withdrawal from task situation: the child is turned 90 degrees or more from the mirror or completely walks away from the task.\n\nPride (3 of 5 behaviors must be present):\n• Erect posture\n• Smiling\n• Direct eye contact with experimenter\n• Pointing at what was complimented/applauding, may try to expatiate on what was complimented\n• Positive vocal self-evaluation`,

  "Door Opening": `Door opening is a regulation to reward measure in which a toy square and triangle are used to give candy (reward) or take away candy (punishment) each time they "visit" after knocking on a small door. First, a research assistant models how to play the game, and wins some candy. After each door knock, the child is asked if they "want to keep playing or stop playing." The trials proceed with 4 consecutive rewards, 1 punishment, 3 consecutive rewards, 2 consecutive punishments, etc., so that if the child plays all trials they are only left with one piece of candy before the experimenter ends the game.\n\nEach trial is only coded if the child chooses to play.\n\nAn "intentional delay" is coded if the child intentionally pauses for at least 2 seconds before deciding to open the door. If the child is attending to something else or talking to the experimenter, this does not count.\n\nA "forced trial" is coded if the experimenter opens the door against the child's decision to not open it, or the child's silence or lack of response. If the child chooses to stop playing within the first 3 trials, the experimenter will force them to play. Starting with the 4th trial, the experimenter will stop playing if the child says they want to stop.\n\nRecorded values: total number of forced trials, total number of doors opened (not forced trials), total number of delays after a reward, and total number of delays after a punishment.`,

  "Follow the Path": `Follow the path is a motor inhibition measure in which the child is shown a curvy, 5-ft. path and told to move a toy to a house at the end of the path ("take the [toy] home") while staying on the path the whole time. The child does two consecutive trials with each of 3 toys: a boy or girl, a dog, and a turtle, for a total of 6 codeable trials. The child is instructed to "take the dog home really fast" and "take the turtle home really slow." First, the experimenter demonstrates the task to the child while explaining the rules. The experimenter repeats the rules before each trial, and says "Ready? Go."\n\nThere are two coding components to this task: the time it takes for each toy to reach the end of the path, and motor control — how well the child follows the path outline. The trial begins when the child first begins to move the figure and ends when the figure reaches the end of the path. Motor control is coded for each of the path's 7 curves using the following point system per curve:\n\n• 2 points: the child keeps the majority of the figurine on the black path, within the borders, during the entire curve.\n• 1 point: the figurine follows the general curve, but goes outside the border at any time or makes the figurine jump along the path.\n• 0 points: the child completely ignores this particular curve.`,

  "Fruit Stroop": `Fruit stroop is an inhibitory control measure in which the experimenter shows the child both small and large cartoon pictures of three fruits. The child is then asked to identify pictures of the small fruits within pictures of the larger ones. Then the child is asked to identify pictures of the large fruits (while ignoring the small fruits inside of them) for a total of 6 codeable trials.\n\nThe potential behavioral codes for each trial are as follows:\n\n• 2: child points to the correct picture.\n• 1: child points to the wrong picture but then correctly changes response during the same turn.\n• 0: child points to the wrong picture with no self-correction.\n• Uncodeable: the trial wasn't presented, or the child doesn't participate; talking to the experimenter or attending to other things.`,

  "Gift Delay": `Gift delay is a regulation to reward measure in which the experimenter presents a gift bag to the child, but then leaves the room to look for a bow for the gift, asking the child to wait to open the gift until she returns: no touching, and no peeking. The gift bag is placed on the table in front of the child. The task starts when the door closes as the experimenter leaves the room, and continues for 3 minutes or until the child pulls the gift out of the bag. Coding for this task was completed using the video annotation program ELAN.\n\nGift delay is coded along tiers which are not mutually exclusive — any amount of behaviors can be coded simultaneously, with the exception of "no view." Coded behaviors are as follows:\n\n• On seat: the child is considered "on seat" as long as any part of their body is touching their chair (but not if they are solely touching the chair by playing with their name tag on the back of their chair).\n• Eyes on: the child is looking at the gift (or at the tissue paper that they have pulled out of the bag and are handling).\n• Touching: any part of the child's body is intentionally in contact with the bag.\n• Opening bag/peeking in: the child is gazing into the interior of the bag or pulling the bag open with the intention of seeing the gift.\n• Putting hand in the bag: the child puts their hand(s) in the bag or touches/handles the tissue paper inside of the bag, but not the gift.\n• Pulling gift from bag: coded when the gift is made visible to the coder as a result of the child's actions.\n• No view: coded when the child is not visible to the coder. No other behaviors can be coded while "no view" is being coded.`,

  "Grass Snow": `Grass/snow is an inhibitory control measure. A game mat is placed in front of the child: it has a green square in one corner, a white square in the other corner, and mittens in the center, meant for the child to place their hands in between trials. After asking the child what colors grass and snow are, the experimenter instructs the child to point to the green square after she says "snow," and point to the white square after she says "grass." After the child successfully completes one practice trial for each condition, the experimenter delivers 14 codeable trials.\n\nEach trial is coded for correctness, based on the child's response:\n\n• 1: correct response.\n• 0: incorrect response.\n\nThe trial is uncodeable if the coder cannot see the child and/or the mat, or if the child isn't participating in the game.`,

  "Parental Control": `Parental Control is a parent-child interaction measure that examines the nature of the parent's interaction with the child throughout the parent-interaction tasks of Free play, Phone call, and Toy cleanup, as well as the degree to which the parent tries to direct or control the child's behavior, and teach or restrict child behaviors.\n\nThe presence of parent behaviors are coded in 15-second intervals. "No involvement," "Visual contact," and "Uncodeable" are mutually exclusive and cannot be coded with any other behavior in one interval. "Social exchange," "Guidance/Gentle control," and "Power assertion/Negative control" are not mutually exclusive. Physical behaviors are subcategories of those three, indicating the overarching behavior is present along with physical interaction.\n\nCoded behaviors are as follows:\n\n• No involvement: the parent does not make any attempt to interact with the toddler.\n• Visual contact only: the parent only looks at the toddler and does not attempt to interact with the toddler.\n• Social exchange: the parent initiates or participates in conversation with the toddler, plays with the toys, or communicates through facial expressions. The parent does not attempt to control or direct the toddler's behavior.\n• (Physical) Social exchange: offering comfort, affection, or reassurance (e.g. wiping away tears, stroking hair, hugging, holding, etc.)\n• Guidance/Gentle control: the parent attempts to control the child's behavior without asserting their power. This includes suggestions, distractions, reasoning, polite requests, positive comments, direct commands, or prohibitions.\n• (Physical) Guidance/Gentle control: guiding the child's body or hands away from a potentially dangerous situation, or helping the child physically manipulate a toy. Also includes caregiving behaviors (e.g. wiping the child's face, nose).\n• Power assertion/Negative control: the parent attempts to control the child by asserting their power, or using threats, negative comments, or direct commands and prohibitions. The parent's tone may differ from their baseline speech: louder volume, annoyance, frustration, anger, or a clearly prohibitory or warning tone.\n• (Physical) Power assertion/Negative control: physically asserting power over the child by using their body to block the child from moving freely or accessing a prohibited limit, picking the child up and moving them, or any harsh physical interventions.\n• Uncodeable: the parent is out of view for more than 10 seconds (2/3) of the interval.`,

  "Parent Sensitivity / Intrusiveness": `The Parental Sensitivity and Intrusiveness codes are each based on general coder observations of the parent-child interaction tasks: Free play, Phone call, and Toy Cleanup.\n\n━━━ PARENTAL SENSITIVITY SCALE ━━━\n\n"The Parental Sensitivity scale focuses on how the parent observes and responds to the child's cues (gestures, expressions, and signals) during times of distress as well as non-distress. The defining characteristic of sensitivity is that it is child-centered. Sensitive parenting involves 'tuning in' to the child and manifesting awareness of child's needs, moods, interests, and capabilities."\n\n• Very Low Sensitivity: interactions are characteristically adult-centered and/or the parent is unavailable and non-responsive to the child's signals, moods, interests and needs.\n• Low Sensitivity: there is little evidence of parental sensitivity. Most of the interaction is adult-centered and/or the parent is mostly not contingently responsive.\n• Moderately Low Sensitivity: parent displays infrequent and/or weak indicators of sensitivity. While the parent is sometimes sensitive, the balance is in the direction of insensitivity.\n• Moderate Sensitivity: the frequency and quality of the parent's sensitivity and insensitivity are about equal. It is this inconsistency which prevents the parent from receiving a higher rating.\n• Moderately High Sensitivity: parent displays more sensitivity than not. The parent demonstrates sensitivity in many interactions, but may show some insensitivity.\n• High Sensitivity: parental behavior is characterized by sensitivity but the parent may show minimal insensitivity by hesitating to respond to distress, "missing" a signal from the child or missing an opportunity to praise the child.\n• Very High Sensitivity: parent is very sensitive and responsive throughout the interaction. Insensitivity is never striking. Interactions are child-centered. Parent praises the child.\n\n━━━ PARENTAL INTRUSIVENESS SCALE ━━━\n\n"The Parental Intrusiveness scale reflects the degree to which the parent controls the child rather than recognizing and respecting the validity of the child's perspective. Intrusive interactions are clearly adult-centered rather than child-centered. Extreme intrusiveness can be seen as over-control to the point where the child's autonomy is at stake. When unsure whether a behavior is intrusive or not, evaluate from the perspective of the child. It should be noted, however, that a parent may be judged as intrusive even if the child does not engage in defensive behavior (e.g., the child is passively resigned to the intrusions of the parent)."\n\n• Very Low Intrusiveness: no signs of intrusive behavior are observed. Child does not respond defensively in any way to parental behavior.\n• Low Intrusiveness: parent displays almost no signs of intrusive behavior. Only a few instances are observed, but they are brief and do not unreasonably shift the child's perspective.\n• Moderately Low Intrusiveness: parent displays minimal intrusiveness. Parent may initiate some interactions with child or offer suggestions which are not welcome, or may continue an activity after child responds defensively without escalating.\n• Moderate Intrusiveness: intrusiveness is somewhat characteristic of the interaction. Parent may intrude abruptly on the child a few times or show mild intrusiveness at several points in the interaction.\n• Moderately High Intrusiveness: parent is more intrusive than not. Intrusiveness occurs regularly throughout the interaction and the child has little opportunity to do anything on his/her own.\n• High Intrusiveness: parental intrusiveness is pervasive to the point that it characterizes the style of the parental interaction. Parent strongly denies the child an opportunity to do things on his/her own. Mostly, this parent practices an intrusive style.\n• Very High Intrusiveness: parental style is so intrusive that it is worrisome. Parent is very intrusive, physical and/or forceful in controlling the child. Most of the session is marked by the parent completely controlling the interaction and allowing the child almost no self-direction.`,

  "Snack Delay": `Snack delay is a regulation to reward measure in which the child is asked to wait to eat a piece of candy until the experimenter rings a bell, which is demonstrated by the experimenter. The child is told to keep their hands on a mat while waiting. There are four trials of 10s, 20s, 30s, and 15s wait times, in that order. The experimenter lifts the bell half-way through each trial, and rings the bell at the end of each trial.\n\nThere are two parts per trial:\n• Part 1 – time from start of trial until experimenter lifts the bell.\n• Part 2 – time from experimenter lifting the bell until experimenter rings the bell.\n\nThe child's behaviors are coded during each of the two parts of each trial. Coded behaviors include: child eats snack, child touches snack, child touches cup and/or bell, child waits until bell is lifted, child waits until bell is rung, and child keeps hands on mat. The child receives bonus points if they kept their hands on the mat throughout entire parts of trials or entire trials.`,

  "Stop-Go": `Stop-Go is a motor inhibition measure in which two carpet squares are placed on the ground. The child is instructed to start on one carpet square and start walking to the other carpet square when the experimenter says "Go," stop moving when the experimenter says "Stop," and continue moving to the other square when the experimenter says "Go" again. There are three trials.\n\nPossible codes are as follows:\n\n• Correct Stop: child immediately stops in response to the "stop" command without starting to walk again before the second "go" command.\n• Run-through: child ignores the "stop" command and continues moving to the second carpet square.\n• Slow-down: child slows down, but does not stop, in response to the "stop" command.\n• Delay: time lapse of greater than 1 second between the "stop" command and the child physically stopping before the second carpet square.\n• Anticipation: child slows or hesitates before the "stop" command.\n• False Stop: child stops before the "stop" command has been given.\n• False Start: child starts moving after the "stop" command but before the second "go" command has been given.\n• Uncodeable: experimenter interrupts the trial or gives repeated commands or instructions, or the child's behavior is not captured on the video.`,

  "Sustained Attention": `Sustained attention is an attentional control measure that lasts for 5 minutes during a free play task, starting after the child is told to play with the toys. The child enters the room to a table full of toys. The child is instructed to stay at the table and play with the toys in front of them while the experimenter works on something in the same room. The experimenter reads through some papers on the couch in front of the child while ignoring the child completely. Coding for this task was completed using the video annotation program ELAN. All behaviors were only coded if they occurred for at least 0.5 seconds.\n\nSustained attention is coded along tiers which are not mutually exclusive, with the exception of "no view." Coded behaviors are as follows (defined by Ruff & Capozzoli, 1995):\n\n• Eyes on (casual attention): the child is looking at the toys, but not fully engaging with them. Breaks in "eyes on" must be at least 0.5 seconds to be coded.\n• Settled attention: a pause in the child's casual attention to look at and physically manipulate a particular toy or set of toys within a singular play episode. "Settled" is when the child is both looking at and touching the same toy, or bringing new toys into the same play episode.\n• Focused attention: concentrated attention that involves "an intent facial expression, minimal extraneous bodily activity, a posture that encloses the object of interest and brings it closer to eyes, and either no talking or soft talking (relevant to the toys the child is playing with)." Attention is directed more or less exclusively to one target or task.\n• No view: accounts for portions of the video during which the child may be doing a codeable behavior but we cannot tell because of the camera angle.`,

  "Token Sort": `Token sort is an attentional control measure in which the experimenter instructs the child to sort tokens of three different colors, by color, into their respective bins. This task examines the child's sorting behaviors and lasts for 3 minutes, starting when the experimenter shuts the door, leaving the room. Coding for this task was completed using the video annotation program ELAN.\n\nCoded behaviors are as follows:\n\nBaseline state — the arousal state of the child 1 minute before the task begins:\n• Drowsy\n• Alert/calm\n• Alert/active: running around the experiment room, talking excitedly/shouting, and getting up from the chair and moving around.\n• Fussy\n• Crying\n\nLatency to first sort: the amount of time, in seconds, from the beginning of the task to the first sorting instance.\n\nAmount of time child sorts tokens: the sum total of time the child sorts throughout the entire task.\n\nNumber of instances child sorts tokens: how many times the child sorts tokens (they may sort for a while, start playing with the tokens, and then start sorting again).\n\nLatency until first non-sorting "play": the amount of time, in seconds, from the beginning of the task to the first instance when the child stops sorting.\n\nDuration of first sorting interval: the amount of time, in seconds, from the first instance of sorting to the first instance when the child stops sorting.\n\nLatency to first quit: the amount of time, in seconds, from the first instance of sorting to the first instance of non-sorting. This category includes a glance away from the tokens or a break in attention.\n\nInterest level — each ten-second interval is coded for the highest level of interest expressed by the child on a scale of 0–3:\n• 3: The child is sorting and showing a strong interest in sorting. Indicators include methodical/deliberate movements, facial fixation, following the tokens into the bins, marked facial interest, or self-talk.\n• 2: The child is sorting, but showing a lower level of interest in the task. This is the default level for sorting.\n• 1: All task-related activity that is not considered sorting. The child could be touching, intently looking at, or playing with the tokens or bins in a task-related manner.\n• 0: The child has no interest in the task — sitting at the table, staring blankly, walking around, or playing with the tokens in a non-task-related manner.\n• Uncodeable: the coder cannot see the child for more than 6 seconds of the interval.\n\nNumber of Tokens Sorted: two columns are dedicated to tokens sorted in each interval — one for the total tokens sorted per interval, and one for how many of those were sorted correctly. These are also totaled for the duration of the task.`,

  "Toy Frustration": `Toy Frustration is an emotion regulation measure in which the child is taught how to open a lock with a key, then allowed to pick out a toy they want to take home with them. The toy is put into a clear box and locked. The child is given a ring of keys and instructed to try to get their toy out of the box while the experimenter leaves the room to get the next game ready. None of the keys given to the child will open the box.\n\nThis task is four minutes long and starts when the experimenter closes the door, leaving the room. The task is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• Child engagement: whether or not the child is physically engaged with the box at any point during an interval.\n• Seeks parent or experimenter: whether or not the child searches for or calls out to their parent or the experimenter during an interval.\n• Child frustration — during an interval, the most extreme of the following four behaviors shown by the child is coded:\n  – Concentration: child displays no behaviors indicating frustration with the task; calmly attempts to open the box without intensity.\n  – Mild frustration: child displays initial stages of frustration/sadness by whining, grunting, whimpering, crossing their arms, etc. Any hint of distress is coded as mild frustration.\n  – Overt frustration: child displays behaviors indicating obvious and intense frustration, such as yelling, throwing a tantrum, crying, shaking the box, throwing the box, banging the box, stomping their feet, clenching their fists, etc.\n  – None: any instance that does not fit the above three categories, like playing with the keys, looking around, trying to open the door, lying on the couch, etc.\n  – Uncodeable: if the child cannot be seen for the majority of a 15-second interval.`,

  "Walk a Line": `Walk a line is a motor inhibition measure in which the child walks the length of a carpeted path after the experimenter gives a "Ready? Go," command. There are three trials, which are each timed from the child's first step after the "go" command until the child steps on the ending carpet square. The first trial is a baseline trial, and the child is instructed to walk slowly in the following two trials. The experimenter shows the child how to walk on the path before the task begins, and gives the child repeated instructions to keep their feet on the path before each trial.`,

  Whisper: `Whisper is a motor inhibition measure in which the child is shown 12 images of cartoon characters and asked to whisper their name. If they don't know the name of the character, they are instructed to whisper, "I don't know" instead. The child is asked to whisper prior to the task to make sure they understand the rules and is given a rule reminder half-way through the task.\n\nCoded behaviors are as follows:\n\n• 3: the child whispers\n• 2: the child doesn't speak or respond\n• 1: the child speaks in a normal voice/volume\n• 0: the child shouts or responds loudly/aggressively`,

  // ── Mother Tasks ──────────────────────────────────────────────────────────

  "Mother Executive Function Tests": `Mothers completed three standard executive function tasks on a computer: Tower of Hanoi (Davis & Klebe, 2001), Wisconsin Card Sort (Heaton & PAR Staff, 2003), and Stroop Color-Word (Stroop, 1935). The mothers additionally completed a backward digit span task while face to face with a research assistant who recorded their responses on a score sheet.\n\nTower of Hanoi involved using a mouse to move three disks of different sizes to a target peg, keeping the original order and following two rules: only one disk could be moved each turn, and larger disks could not be placed on smaller disks. Time to completion was used as the score for the task.\n\nFor the Wisconsin Card Sort task, mothers were presented with computer images of four stimulus cards with different colors, quantities, and shapes and were asked to match a stack of cards according to a matching rule (i.e., either by color, quantity or shape). The matching rule changed without warning, and the participant had to infer the new rule based on feedback from the computer.\n\nFor the Stroop task, mothers selected a keyboard key representing various colors. The task involved four blocks of 20 trials each: (1) select color key corresponding to the name of the color written in black ink; (2) select color key corresponding to the ink color of the matching color word (congruent condition); (3) select color key corresponding to ink color of a nonmatching color word (incongruent condition); and (4) select color key based on the ink color of a matching or nonmatching color word (mixed condition).\n\nFor backward digit span, an experimenter directly faced the participant and read a random sequence of single-digit numbers (0–9) at a rate of one digit per second, and the participant attempted to reproduce the sequence in reverse. Each participant was given two chances to correctly reproduce the sequence in reverse, and the task ended when the participant got two consecutive sequences wrong.`,

  // ── Questionnaires ────────────────────────────────────────────────────────

  "Parent Positive Affect": `Parent positive affect is coded for all parent-child interaction tasks: Free Play, Phone Call, and Toy Cleanup. Each task lasts a maximum of five minutes and is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• No positive: there are no clear signs of positive affect, though mood may be pleasant. Parent is generally neutral in facial expression.\n• Low positive: small smiles, light laughter — an obvious increase from the neutral baseline, but no clear "full blown joy" is present.\n• High positive: smiling broadly with cheeks raised high, eyes are crinkled, hearty laughter, or otherwise extreme positivity or excitement.\n• Uncodeable: the parent's face or expression is not visible for at least half the interval, or the parent's emotional state cannot be heard (e.g. laughter).`,
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
  const [expandedCategories, setExpandedCategories] = useState({});

  const [selectedVariables, setSelectedVariables] = useState(["tcid"]);

  const [checkedVariables, setCheckedVariables] = useState([]);
  const [checkedSelected, setCheckedSelected] = useState([]);
  const [filterText, setFilterText] = useState("");

  const [taskInfoModal, setTaskInfoModal] = useState(null);

  const [varInfoModal, setVarInfoModal] = useState(null);

  const [expandedVarL1, setExpandedVarL1] = useState({});
  const [expandedVarL2, setExpandedVarL2] = useState({});

  const toggleVarL1 = (key) => {
    setExpandedVarL1((prev) => ({ ...prev, [key]: prev[key] === false ? true : false }));
  };

  const toggleVarL2 = (key) => {
    setExpandedVarL2((prev) => ({ ...prev, [key]: prev[key] === false ? true : false }));
  };

  const rawVariables = useMemo(() => {
    if (data && data.length > 0) return Object.keys(data[0]);
    return [];
  }, [data]);

  useEffect(() => {
    setSelectedVariables((prev) => {
      if (prev.includes("tcid")) return prev;
      return ["tcid", ...prev];
    });
  }, [data]);

  const tasks = useMemo(() => {
    if (selectedCategory) {
      return structure.tasksByCategory[selectedCategory] || [];
    }
    const allTasks = Object.values(structure.tasksByCategory).flat();
    return [...new Set(allTasks)].sort();
  }, [selectedCategory]);

  const toggleExpanded = (name) => {
    setExpandedCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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

  const finalVars = useMemo(() => {
    return getFinalVariables(filteredVariables, selectedCategory, selectedTask);
  }, [filteredVariables, selectedCategory, selectedTask]);

  const groupedVars = useMemo(() => {
    return groupVariablesBySubcategory(finalVars, selectedCategory, selectedTask);
  }, [finalVars, selectedCategory, selectedTask]);

  const displayedVariableCount = useMemo(() => {
    if (!selectedTask) return rawVariables.length;
    return countDisplayedVariables(groupedVars);
  }, [groupedVars, selectedTask, rawVariables.length]);

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
      const toAdd = finalVars.filter((v) => !prev.includes(v));
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
    if (finalVars.length === 0) return;
    if (checkedVariables.length === finalVars.length) {
      setCheckedVariables([]);
    } else {
      setCheckedVariables([...finalVars]);
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
      const headerRow = selectedVariables.join(",");

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
        <div className="glass-panel panel">
          <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
            <h3 style={panelHeaderStyle}>Categories ({structure.categories.filter(cat=>cat.children && cat.children.length>0).length})</h3>
          </div>

          <div
            className="panelList"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <ul style={listStyle}>
              {structure.categories.map((cat, idx) => {
                const hasChildren = cat.children && cat.children.length > 0;
                const isExpanded = !!expandedCategories[cat.name];
                const isLeaf = !hasChildren;
                const isSelectedLeaf = selectedCategory === cat.name;

                return (
                  <React.Fragment key={idx}>
                    <li
                      onClick={() => {
                        if (hasChildren) {
                          toggleExpanded(cat.name);
                        } else {
                          setSelectedCategory((prev) =>
                            prev === cat.name ? null : cat.name
                          );
                          setSelectedTask(null);
                          setCheckedVariables([]);
                        }
                      }}
                      style={{
                        padding: "0.75rem 0.5rem",
                        borderBottom: "1px solid var(--glass-border)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        backgroundColor:
                          isLeaf && isSelectedLeaf
                            ? "var(--glass-highlight)"
                            : "transparent",
                        color:
                          isLeaf && isSelectedLeaf
                            ? "var(--accent-color)"
                            : "inherit",
                        fontWeight: hasChildren
                          ? "600"
                          : isSelectedLeaf
                          ? "600"
                          : "normal",
                        transition: "all 0.2s",
                        borderRadius: "4px",
                      }}
                    >
                      {hasChildren && (
                        <span
                          style={{
                            fontSize: "0.65rem",
                            opacity: 0.6,
                            transition: "transform 0.2s",
                            display: "inline-block",
                            transform: isExpanded
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                            flexShrink: 0,
                          }}
                        >
                          ▶
                        </span>
                      )}
                      {cat.name}
                    </li>

                    {hasChildren &&
                      isExpanded &&
                      cat.children.map((child, cIdx) => {
                        const isSelectedChild = selectedCategory === child;
                        return (
                          <li
                            key={`${idx}-${cIdx}`}
                            onClick={() => {
                              setSelectedCategory((prev) =>
                                prev === child ? null : child
                              );
                              setSelectedTask(null);
                              setCheckedVariables([]);
                            }}
                            style={{
                              padding: "0.6rem 0.5rem 0.6rem 1.75rem",
                              borderBottom: "1px solid var(--glass-border)",
                              cursor: "pointer",
                              backgroundColor: isSelectedChild
                                ? "var(--glass-highlight)"
                                : "transparent",
                              color: isSelectedChild
                                ? "var(--accent-color)"
                                : "var(--text-secondary, rgba(255,255,255,0.6))",
                              fontWeight: isSelectedChild ? "600" : "normal",
                              fontSize: "0.9rem",
                              transition: "all 0.2s",
                              borderRadius: "4px",
                            }}
                          >
                            {child}
                          </li>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>

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
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskInfoModal(task);
                    }}
                    title="Task info"
                    style={{
                      flexShrink: 0,
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.65rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                      padding: 0,
                      transition:
                        "background 0.2s, border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.2)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.7)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.35)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    ?
                  </button>
                  <span style={{ flex: 1 }}>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-panel panel">
          <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
            <h3 style={panelHeaderStyle}>
              Variables ({selectedTask ? displayedVariableCount : rawVariables.length})
            </h3>
          </div>

          <div
            className="panelList"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <ul style={listStyle}>
              <VariableDescription
                rawVariables={rawVariables}
                finalVars={finalVars}
                groupedVars={groupedVars}
                selectedCategory={selectedCategory}
                selectedTask={selectedTask}
                selectedVariables={selectedVariables}
                checkedVariables={checkedVariables}
                setCheckedVariables={setCheckedVariables}
                handleAddVariable={handleAddVariable}
                setVarInfoModal={setVarInfoModal}
                expandedVarL1={expandedVarL1}
                expandedVarL2={expandedVarL2}
                toggleVarL1={toggleVarL1}
                toggleVarL2={toggleVarL2}
                toggleRowSelection={toggleRowSelection}
              />
            </ul>
          </div>
        </div>

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
      {taskInfoModal && (
        <div
          onClick={() => setTaskInfoModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(18,18,30,0.92)",
              border: "1px solid var(--glass-border)",
              borderRadius: "12px",
              backdropFilter: "blur(20px)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--glass-border)",
                flexShrink: 0,
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                {taskInfoModal}
              </h3>
              <button
                onClick={() => setTaskInfoModal(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                }
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "1.5rem",
                overflowY: "auto",
                lineHeight: "1.7",
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "pre-line",
              }}
            >
              {taskDescriptions[taskInfoModal] || "Description not added yet."}
            </div>
          </div>
        </div>
      )}

      {varInfoModal && (
        <div
          onClick={() => setVarInfoModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(18,18,30,0.92)",
              border: "1px solid var(--glass-border)",
              borderRadius: "12px",
              backdropFilter: "blur(20px)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--glass-border)",
                flexShrink: 0,
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", wordBreak: "break-all" }}>
                {varInfoModal}
              </h3>
              <button
                onClick={() => setVarInfoModal(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                }
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "1.5rem",
                overflowY: "auto",
                lineHeight: "1.7",
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "pre-line",
              }}
            >
              {variableDescriptions[varInfoModal] || "Description not added yet."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
