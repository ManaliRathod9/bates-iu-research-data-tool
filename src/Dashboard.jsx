import { getVariableLabel } from "./variableLabels";
import React, { useState, useMemo, useEffect } from "react";
import { structure } from "./config/structure";
import { variableDescriptions, variableComputations, variableCodings } from "./config/variableDescriptions";
import { motherExecutiveFunctionVariables } from "./config/motherExecutiveFunction";
import VariableDescription, {
  getFinalVariables,
  groupVariablesBySubcategory,
  countDisplayedVariables,
} from "./VariableList";

const taskToVarMap = {
  "Bird Alligator": "birdalligator",
  "Grass Snow": "grasssnow",
  "Mother Executive Function Tests": "mef_",
  "Adult Temperament Questionnaire": "atq",
  "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)":
    "brief",
  "Changes + Adjustments Questionnaire": "caqsum",
  "Parenting Events": "parentingevents",
  "Parenting Scale": "parentingscale",
  "Social Competence Scale": "socialcompetencemean",
  "Child Behavior Checklist": "cbcl",
  "Child Behavior Questionnaire": "cbq",
  "Child Misbehavior": "childmisbehavior",
  "Concerns & Constraints": "concernsconstraints",
  "Daily Schedule": "dsched",
  "Follow the Path": "followthepath",
  "Less Is More": "lessismore",
  "Hollingshead Socioeconomic Status": "hollingshead",
  "Reilly Role Overload Scale": "reillyrole",
  "Response to Misbehavior": "responsetomisbehavior",
  "Social Support - PANSE": "socialsupport",
  "Child-Rearing Practices Report": "crpr",
  "Children's Sleep Habits Questionnaire": "cshq",
  "CHAOS Scale (Confusion, Hubbub, and Order Scale)": "chaos",
  "Depression Scale": "dep",
  "CES-D": "cesd",
  "Differential Ability Scale (DAS)": "das",
  "Woodcock-Johnson (WJ)": "wj",
  "Eyberg Child Behavior Inventory": "ecbi",
  "Purdue Home Stimulation Inventory": "phsi",
  "Shipley Parent Cognition": "shipley",
  "Social Support Related": "socialsupport",
  "Teacher Demographics": "teacherdemographics",
  "Class Teacher Sensitivity": "classteachersensitivity",
  "Teacher Checklist": "teacherchecklist",
  "Mock Report Card": "mockreportcard",
  "Student Teacher Relationship Scale": "cbs",
  "Infant Characteristics Questionnaire (ICQ)": "icq",
  "Caregiver-Teacher Report Form (TRF)": "trf",
  Compliments: "comp",
  "Door Opening": "door",
  "Fruit Stroop": "fruit",
  "Parental Control": "control",
  "Snack Delay": "snack",
  "Sustained Attention": "sustain",
  "Token Sort": "token",
  Child: "sleep",
  Parent: "sleep",
  Summary: "sleep",
  "Home Scale Items": "home",
  "Sleep Observation Counts": "numobs",
  "Observer Impressions - Regular ratings": "observerimpression",
  "Post Observation Questionnaire - Child composites": "postobservation",
  "Post Observation Questionnaire - Parent composites": "postobservation",
  "Post Observation Rating Scale - Emotionality composites": "postobservationratingscale",
  "Post Observation Rating Scale - Regulation composite": "postobservationratingscale",
  "Bates Lab Home Checklist": "blh",
  "Parent Positive Affect": "parentpositive",
  "Sleep Diary – Child": "sdc",
  "Gift Delay": "gift",
  "Stop-Go": "stop",
  "Toy Frustration": "toyfrustration",
  "Child Behavior FP": "childbehaviorfreeplay",
  "Child Positive Affect": "childpositivetoy",
  "Child Negative Affect": "childnegativetoy",
  "Broken Toy Related": "brokentoy",
  "Child Compliance / Toy Clean Up": "childcompliancetoycleanup",
  "Toy Prohibition": "childbehaviortoyprohibition",
  "Child Demand / Toy Prohibition": "childdemandtoyprohibition",
  "BehaviorPhoneCallPlays": "toy",
  "EEG Bird Alligator": "birdalligator",
  "Oddball Related": "oddball",
  "Fish Sharks Related": "fishsharks",
  "Child Behavior Phone Call": "childbehaviorphonecall",
};

const whisperMasterVariables = ["30", "36", "42", "54"].flatMap((age) => [
  `whisperGameChildPres${age}`,
  `whisperGameParentPres${age}`,
  `whisperGame_WinniePooh${age}`,
  `whisperGame_MickeyMouse${age}`,
  `whisperGame_Ernie${age}`,
  `whisperGame_BigBird${age}`,
  `whisperGame_Piglet${age}`,
  `whisperGame_CookieMonster${age}`,
  `whisperGame_Eeyore${age}`,
  `whisperGame_Bert${age}`,
  `whisperGame_Tigger${age}`,
  `whisperGame_Barney${age}`,
  `whisperGame_Elmo${age}`,
  `whisperGame_MinnieMouse${age}`,
  `whisperGameTotal${age}`,
  `whisperGameAvg${age}`,
]);

const taskDescriptions = {
  "Bird Alligator": `Bird-alligator is an inhibitory control measure in which children are asked to follow the directions delivered by a bird puppet (go trials) and not follow the directions delivered by an alligator puppet (no-go trials). For the youngest children, there are twelve test trials. Older children have the same initial twelve test trials followed by another twelve trials with a rule switch (do what the alligator says). All children are given enough practice go and no-go trials to correctly respond to each type of command multiple times, indicating they understand the rules.\n\nCoded behaviors for each trial (go and no-go) are as follows:\n\n• No movement: child does not move in response to puppet's command.\n• Wrong movement: child performs a movement that was not commanded by the puppet.\n• Partial movement: child starts to perform the commanded movement and then stops and does not finish the movement.\n• Full movement: child fully performs the commanded movement.\n\nEach trial is also coded based on whether the child's response was delayed by at least two seconds.\n\nTrials are not codeable if the child is not actively playing, if the experimenter shows the child how to do an action and the child repeats it (imitation), or if the child is physically restrained from performing actions or is physically helped to perform the action.`,

  "Broken Toy Related": `Broken toy is an emotion regulation measure in which the child is given a toy that the experimenter explains is her favorite. When the experimenter gives the child the toy, the toy falls apart and the experimenter says several verbal cues in succession: "Uh oh!" "What happened?" and "That was my favorite toy…" all while feigning "sad" affect. The task ends when the experimenter suggests how to fix the toy and offers help to the child. The task is coded for three constructs on scales from 1 to 5.\n\nThe three constructs are as follows:\n\n1. Child's distress: the level of distress exhibited by the child immediately following the toy breaking.\n2. Comprehension of another's distress: the level of distress exhibited by the child after the experimenter says "uh oh!" and "What happened?"\n\nScale for constructs 1 & 2:\n• 1 - No distress, or shows positive affect\n• 2 - Slight attention or slight concern (e.g. brow furrowing)\n• 3 - Strong facial concern (e.g. frowning, surprised/shocked face)\n• 4 - Distressed vocalization (e.g. "Oh no! I broke it!")\n• 5 - High distress (e.g. crying)\n\n3. Prosocial behavior: the most prosocial solution offered by the child to fix the broken toy, whenever it occurs.\n\nScale for construct 3:\n• 1 - No solution offered\n• 2 - "You can fix it" (someone other than the child, like the experimenter)\n• 3 - The child attempts to fix the toy\n• 4 - "We can fix it" (verbal solution including child and experimenter)\n• 5 - "I can fix it" (verbal solution including the child)`,

  "Child Compliance / Toy Clean Up": `Child compliance is a measure coded during the parent-child interaction task of Toy Cleanup. Once the parent signals to the child that it is time to clean up the toys, the task runs for five minutes or until the child finishes cleaning and the parent signals that the task is complete. This measure is coded for the child's level of compliance to the cleanup task.\n\nIn each 15-second interval, the most noncompliant behavior occurring during the interval is coded:\n\n• Defiance: overt rejection of parental agenda. Resists with defiance, anger, temper tantrums, or whining.\n• Refusal/Negotiation: overt resistance to parental agenda. Overtly refuses to clean and/or negotiates with the parent in ways that are not aversive.\n• Passive Noncompliance: reluctance to accept the parental agenda. Ignores parental directives, refuses to comply, or appears to be stalling. Shows no overt resistance to parental control.\n• Situational Compliance: acceptance of the parental agenda. Willing to comply, but needs prompting. Child often stops cleanup in absence of reminders. Child responds good-naturedly and with minimal reluctance to reminders.\n• Committed Compliance: full endorsement of the parental agenda. Child stays on task without reminders, has embraced the task wholeheartedly, may spontaneously repeat the rule or show commitment to the task.\n• Other/Uncodeable: parent and child take a mutually agreed-upon break from the task (playing, reading a story, chatting, etc.)`,

  "Child Negative Affect": `Child negative affect is coded for all parent-child interaction tasks: Free Play, Phone Call, Toy Cleanup, and Toy Prohibition (when the child is left alone). Each task lasts a maximum of five minutes and is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• No negative affect: there is no sign of verbal or physical distress present in the child.\n• Negative affect: child shows some signs of irritation, boredom, or apprehension (e.g. whining).\n• High negative affect: child shows clear signs of distress. The child is extremely uncomfortable (e.g. crying, screaming).\n• Uncodeable: the child's face or expression is not visible for at least half the interval, or the child's emotional state cannot be heard (e.g. crying).`,

  "Child Positive Affect": `Child positive affect is coded for all parent-child interaction tasks: Free Play, Phone Call, Toy Cleanup, and Toy Prohibition (when the child is left alone). Each task lasts a maximum of five minutes and is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• No positive: there are no clear signs of positive affect, though mood may be pleasant. Child is generally neutral in facial expression.\n• Low positive: small smiles, light laughter, an obvious increase from the neutral baseline, but no clear "full blown joy" is present.\n• High positive: smiling broadly with cheeks raised high, eyes are crinkled, hearty laughter, or otherwise extreme positivity or excitement.\n• Uncodeable: the child's face or expression is not visible for at least half the interval, or the child's emotional state cannot be heard (e.g. laughter).`,

  Compliments: `This emotion regulation measure occurs when the experimenter sits, with the child standing, in front of a mirror. The experimenter looks at the child in the mirror, points at them, and gives the child various compliments for one minute. The experimenter smiles and speaks in a warm tone while giving the compliments.\n\nThis task is coded for three separate constructs: Embarrassment, Shame, and Pride.\n\nEmbarrassment (all 3 of the following behaviors must be present):\n• Smiling facial expression\n• Gaze aversion\n• Nervous touching of the hands to the body or face, nervous wriggling of the whole body, or general fidgeting.\n\nShame (3 of 5 behaviors must be present):\n• Body collapsed: child is hunched with their shoulders towards the front of their body, or their back/spine is curved or arched forward.\n• Corners of mouth turned downward/lower lip tucked between teeth\n• Eyes lowered with gaze downward or to side\n• Negative vocal self-evaluation\n• Withdrawal from task situation: the child is turned 90 degrees or more from the mirror or completely walks away from the task.\n\nPride (3 of 5 behaviors must be present):\n• Erect posture\n• Smiling\n• Direct eye contact with experimenter\n• Pointing at what was complimented/applauding, may try to expatiate on what was complimented\n• Positive vocal self-evaluation`,

  "Door Opening": `Door opening is a regulation to reward measure in which a toy square and triangle are used to give candy (reward) or take away candy (punishment) each time they "visit" after knocking on a small door. First, a research assistant models how to play the game, and wins some candy. After each door knock, the child is asked if they "want to keep playing or stop playing." The trials proceed with 4 consecutive rewards, 1 punishment, 3 consecutive rewards, 2 consecutive punishments, etc., so that if the child plays all trials they are only left with one piece of candy before the experimenter ends the game.\n\nEach trial is only coded if the child chooses to play.\n\nAn "intentional delay" is coded if the child intentionally pauses for at least 2 seconds before deciding to open the door. If the child is attending to something else or talking to the experimenter, this does not count.\n\nA "forced trial" is coded if the experimenter opens the door against the child's decision to not open it, or the child's silence or lack of response. If the child chooses to stop playing within the first 3 trials, the experimenter will force them to play. Starting with the 4th trial, the experimenter will stop playing if the child says they want to stop.\n\nRecorded values: total number of forced trials, total number of doors opened (not forced trials), total number of delays after a reward, and total number of delays after a punishment.`,

  "Follow the Path": `Follow the path is a motor inhibition measure in which the child is shown a curvy, 5-ft. path and told to move a toy to a house at the end of the path ("take the [toy] home") while staying on the path the whole time. The child does two consecutive trials with each of 3 toys: a boy or girl, a dog, and a turtle, for a total of 6 codeable trials. The child is instructed to "take the dog home really fast" and "take the turtle home really slow." First, the experimenter demonstrates the task to the child while explaining the rules. The experimenter repeats the rules before each trial, and says "Ready? Go."\n\nThere are two coding components to this task: the time it takes for each toy to reach the end of the path, and motor control, how well the child follows the path outline. The trial begins when the child first begins to move the figure and ends when the figure reaches the end of the path. Motor control is coded for each of the path's 7 curves using the following point system per curve:\n\n• 2 points: the child keeps the majority of the figurine on the black path, within the borders, during the entire curve.\n• 1 point: the figurine follows the general curve, but goes outside the border at any time or makes the figurine jump along the path.\n• 0 points: the child completely ignores this particular curve.`,

  "Fruit Stroop": `Fruit stroop is an inhibitory control measure in which the experimenter shows the child both small and large cartoon pictures of three fruits. The child is then asked to identify pictures of the small fruits within pictures of the larger ones. Then the child is asked to identify pictures of the large fruits (while ignoring the small fruits inside of them) for a total of 6 codeable trials.\n\nThe potential behavioral codes for each trial are as follows:\n\n• 2: child points to the correct picture.\n• 1: child points to the wrong picture but then correctly changes response during the same turn.\n• 0: child points to the wrong picture with no self-correction.\n• Uncodeable: the trial wasn't presented, or the child doesn't participate; talking to the experimenter or attending to other things.`,

  "Gift Delay": `Gift delay is a regulation to reward measure in which the experimenter presents a gift bag to the child, but then leaves the room to look for a bow for the gift, asking the child to wait to open the gift until she returns: no touching, and no peeking. The gift bag is placed on the table in front of the child. The task starts when the door closes as the experimenter leaves the room, and continues for 3 minutes or until the child pulls the gift out of the bag. Coding for this task was completed using the video annotation program ELAN.\n\nGift delay is coded along tiers which are not mutually exclusive, any amount of behaviors can be coded simultaneously, with the exception of "no view." Coded behaviors are as follows:\n\n• On seat: the child is considered "on seat" as long as any part of their body is touching their chair (but not if they are solely touching the chair by playing with their name tag on the back of their chair).\n• Eyes on: the child is looking at the gift (or at the tissue paper that they have pulled out of the bag and are handling).\n• Touching: any part of the child's body is intentionally in contact with the bag.\n• Opening bag/peeking in: the child is gazing into the interior of the bag or pulling the bag open with the intention of seeing the gift.\n• Putting hand in the bag: the child puts their hand(s) in the bag or touches/handles the tissue paper inside of the bag, but not the gift.\n• Pulling gift from bag: coded when the gift is made visible to the coder as a result of the child's actions.\n• No view: coded when the child is not visible to the coder. No other behaviors can be coded while "no view" is being coded.`,

  "Grass Snow": `Grass/snow is an inhibitory control measure. A game mat is placed in front of the child: it has a green square in one corner, a white square in the other corner, and mittens in the center, meant for the child to place their hands in between trials. After asking the child what colors grass and snow are, the experimenter instructs the child to point to the green square after she says "snow," and point to the white square after she says "grass." After the child successfully completes one practice trial for each condition, the experimenter delivers 14 codeable trials.\n\nEach trial is coded for correctness, based on the child's response:\n\n• 1: correct response.\n• 0: incorrect response.\n\nThe trial is uncodeable if the coder cannot see the child and/or the mat, or if the child isn't participating in the game.`,

  "Parental Control": `Parental Control is a parent-child interaction measure that examines the nature of the parent's interaction with the child throughout the parent-interaction tasks of Free play, Phone call, and Toy cleanup, as well as the degree to which the parent tries to direct or control the child's behavior, and teach or restrict child behaviors.\n\nThe presence of parent behaviors are coded in 15-second intervals. "No involvement," "Visual contact," and "Uncodeable" are mutually exclusive and cannot be coded with any other behavior in one interval. "Social exchange," "Guidance/Gentle control," and "Power assertion/Negative control" are not mutually exclusive. Physical behaviors are subcategories of those three, indicating the overarching behavior is present along with physical interaction.\n\nCoded behaviors are as follows:\n\n• No involvement: the parent does not make any attempt to interact with the toddler.\n• Visual contact only: the parent only looks at the toddler and does not attempt to interact with the toddler.\n• Social exchange: the parent initiates or participates in conversation with the toddler, plays with the toys, or communicates through facial expressions. The parent does not attempt to control or direct the toddler's behavior.\n• (Physical) Social exchange: offering comfort, affection, or reassurance (e.g. wiping away tears, stroking hair, hugging, holding, etc.)\n• Guidance/Gentle control: the parent attempts to control the child's behavior without asserting their power. This includes suggestions, distractions, reasoning, polite requests, positive comments, direct commands, or prohibitions.\n• (Physical) Guidance/Gentle control: guiding the child's body or hands away from a potentially dangerous situation, or helping the child physically manipulate a toy. Also includes caregiving behaviors (e.g. wiping the child's face, nose).\n• Power assertion/Negative control: the parent attempts to control the child by asserting their power, or using threats, negative comments, or direct commands and prohibitions. The parent's tone may differ from their baseline speech: louder volume, annoyance, frustration, anger, or a clearly prohibitory or warning tone.\n• (Physical) Power assertion/Negative control: physically asserting power over the child by using their body to block the child from moving freely or accessing a prohibited limit, picking the child up and moving them, or any harsh physical interventions.\n• Uncodeable: the parent is out of view for more than 10 seconds (2/3) of the interval.`,

  "Parent Sensitivity / Intrusiveness": `The Parental Sensitivity and Intrusiveness codes are each based on general coder observations of the parent-child interaction tasks: Free play, Phone call, and Toy Cleanup.\n\n━━━ PARENTAL SENSITIVITY SCALE ━━━\n\n"The Parental Sensitivity scale focuses on how the parent observes and responds to the child's cues (gestures, expressions, and signals) during times of distress as well as non-distress. The defining characteristic of sensitivity is that it is child-centered. Sensitive parenting involves 'tuning in' to the child and manifesting awareness of child's needs, moods, interests, and capabilities."\n\n• Very Low Sensitivity: interactions are characteristically adult-centered and/or the parent is unavailable and non-responsive to the child's signals, moods, interests and needs.\n• Low Sensitivity: there is little evidence of parental sensitivity. Most of the interaction is adult-centered and/or the parent is mostly not contingently responsive.\n• Moderately Low Sensitivity: parent displays infrequent and/or weak indicators of sensitivity. While the parent is sometimes sensitive, the balance is in the direction of insensitivity.\n• Moderate Sensitivity: the frequency and quality of the parent's sensitivity and insensitivity are about equal. It is this inconsistency which prevents the parent from receiving a higher rating.\n• Moderately High Sensitivity: parent displays more sensitivity than not. The parent demonstrates sensitivity in many interactions, but may show some insensitivity.\n• High Sensitivity: parental behavior is characterized by sensitivity but the parent may show minimal insensitivity by hesitating to respond to distress, "missing" a signal from the child or missing an opportunity to praise the child.\n• Very High Sensitivity: parent is very sensitive and responsive throughout the interaction. Insensitivity is never striking. Interactions are child-centered. Parent praises the child.\n\n━━━ PARENTAL INTRUSIVENESS SCALE ━━━\n\n"The Parental Intrusiveness scale reflects the degree to which the parent controls the child rather than recognizing and respecting the validity of the child's perspective. Intrusive interactions are clearly adult-centered rather than child-centered. Extreme intrusiveness can be seen as over-control to the point where the child's autonomy is at stake. When unsure whether a behavior is intrusive or not, evaluate from the perspective of the child. It should be noted, however, that a parent may be judged as intrusive even if the child does not engage in defensive behavior (e.g., the child is passively resigned to the intrusions of the parent)."\n\n• Very Low Intrusiveness: no signs of intrusive behavior are observed. Child does not respond defensively in any way to parental behavior.\n• Low Intrusiveness: parent displays almost no signs of intrusive behavior. Only a few instances are observed, but they are brief and do not unreasonably shift the child's perspective.\n• Moderately Low Intrusiveness: parent displays minimal intrusiveness. Parent may initiate some interactions with child or offer suggestions which are not welcome, or may continue an activity after child responds defensively without escalating.\n• Moderate Intrusiveness: intrusiveness is somewhat characteristic of the interaction. Parent may intrude abruptly on the child a few times or show mild intrusiveness at several points in the interaction.\n• Moderately High Intrusiveness: parent is more intrusive than not. Intrusiveness occurs regularly throughout the interaction and the child has little opportunity to do anything on his/her own.\n• High Intrusiveness: parental intrusiveness is pervasive to the point that it characterizes the style of the parental interaction. Parent strongly denies the child an opportunity to do things on his/her own. Mostly, this parent practices an intrusive style.\n• Very High Intrusiveness: parental style is so intrusive that it is worrisome. Parent is very intrusive, physical and/or forceful in controlling the child. Most of the session is marked by the parent completely controlling the interaction and allowing the child almost no self-direction.`,

  "Snack Delay": `Snack delay is a regulation to reward measure in which the child is asked to wait to eat a piece of candy until the experimenter rings a bell, which is demonstrated by the experimenter. The child is told to keep their hands on a mat while waiting. There are four trials of 10s, 20s, 30s, and 15s wait times, in that order. The experimenter lifts the bell half-way through each trial, and rings the bell at the end of each trial.\n\nThere are two parts per trial:\n• Part 1 - time from start of trial until experimenter lifts the bell.\n• Part 2 - time from experimenter lifting the bell until experimenter rings the bell.\n\nThe child's behaviors are coded during each of the two parts of each trial. Coded behaviors include: child eats snack, child touches snack, child touches cup and/or bell, child waits until bell is lifted, child waits until bell is rung, and child keeps hands on mat. The child receives bonus points if they kept their hands on the mat throughout entire parts of trials or entire trials.`,

  "Stop-Go": `Stop-Go is a motor inhibition measure in which two carpet squares are placed on the ground. The child is instructed to start on one carpet square and start walking to the other carpet square when the experimenter says "Go," stop moving when the experimenter says "Stop," and continue moving to the other square when the experimenter says "Go" again. There are three trials.\n\nPossible codes are as follows:\n\n• Correct Stop: child immediately stops in response to the "stop" command without starting to walk again before the second "go" command.\n• Run-through: child ignores the "stop" command and continues moving to the second carpet square.\n• Slow-down: child slows down, but does not stop, in response to the "stop" command.\n• Delay: time lapse of greater than 1 second between the "stop" command and the child physically stopping before the second carpet square.\n• Anticipation: child slows or hesitates before the "stop" command.\n• False Stop: child stops before the "stop" command has been given.\n• False Start: child starts moving after the "stop" command but before the second "go" command has been given.\n• Uncodeable: experimenter interrupts the trial or gives repeated commands or instructions, or the child's behavior is not captured on the video.`,

  "Sustained Attention": `Sustained attention is an attentional control measure that lasts for 5 minutes during a free play task, starting after the child is told to play with the toys. The child enters the room to a table full of toys. The child is instructed to stay at the table and play with the toys in front of them while the experimenter works on something in the same room. The experimenter reads through some papers on the couch in front of the child while ignoring the child completely. Coding for this task was completed using the video annotation program ELAN. All behaviors were only coded if they occurred for at least 0.5 seconds.\n\nSustained attention is coded along tiers which are not mutually exclusive, with the exception of "no view." Coded behaviors are as follows (defined by Ruff & Capozzoli, 1995):\n\n• Eyes on (casual attention): the child is looking at the toys, but not fully engaging with them. Breaks in "eyes on" must be at least 0.5 seconds to be coded.\n• Settled attention: a pause in the child's casual attention to look at and physically manipulate a particular toy or set of toys within a singular play episode. "Settled" is when the child is both looking at and touching the same toy, or bringing new toys into the same play episode.\n• Focused attention: concentrated attention that involves "an intent facial expression, minimal extraneous bodily activity, a posture that encloses the object of interest and brings it closer to eyes, and either no talking or soft talking (relevant to the toys the child is playing with)." Attention is directed more or less exclusively to one target or task.\n• No view: accounts for portions of the video during which the child may be doing a codeable behavior but we cannot tell because of the camera angle.`,

  "Token Sort": `Token sort is an attentional control measure in which the experimenter instructs the child to sort tokens of three different colors, by color, into their respective bins. This task examines the child's sorting behaviors and lasts for 3 minutes, starting when the experimenter shuts the door, leaving the room. Coding for this task was completed using the video annotation program ELAN.\n\nCoded behaviors are as follows:\n\nBaseline state - the arousal state of the child 1 minute before the task begins:\n• Drowsy\n• Alert/calm\n• Alert/active: running around the experiment room, talking excitedly/shouting, and getting up from the chair and moving around.\n• Fussy\n• Crying\n\nLatency to first sort: the amount of time, in seconds, from the beginning of the task to the first sorting instance.\n\nAmount of time child sorts tokens: the sum total of time the child sorts throughout the entire task.\n\nNumber of instances child sorts tokens: how many times the child sorts tokens (they may sort for a while, start playing with the tokens, and then start sorting again).\n\nLatency until first non-sorting "play": the amount of time, in seconds, from the beginning of the task to the first instance when the child stops sorting.\n\nDuration of first sorting interval: the amount of time, in seconds, from the first instance of sorting to the first instance when the child stops sorting.\n\nLatency to first quit: the amount of time, in seconds, from the first instance of sorting to the first instance of non-sorting. This category includes a glance away from the tokens or a break in attention.\n\nInterest level - each ten-second interval is coded for the highest level of interest expressed by the child on a scale of 0-3:\n• 3: The child is sorting and showing a strong interest in sorting. Indicators include methodical/deliberate movements, facial fixation, following the tokens into the bins, marked facial interest, or self-talk.\n• 2: The child is sorting, but showing a lower level of interest in the task. This is the default level for sorting.\n• 1: All task-related activity that is not considered sorting. The child could be touching, intently looking at, or playing with the tokens or bins in a task-related manner.\n• 0: The child has no interest in the task, sitting at the table, staring blankly, walking around, or playing with the tokens in a non-task-related manner.\n• Uncodeable: the coder cannot see the child for more than 6 seconds of the interval.\n\nNumber of Tokens Sorted: two columns are dedicated to tokens sorted in each interval, one for the total tokens sorted per interval, and one for how many of those were sorted correctly. These are also totaled for the duration of the task.`,

  "Toy Frustration": `Toy Frustration is an emotion regulation measure in which the child is taught how to open a lock with a key, then allowed to pick out a toy they want to take home with them. The toy is put into a clear box and locked. The child is given a ring of keys and instructed to try to get their toy out of the box while the experimenter leaves the room to get the next game ready. None of the keys given to the child will open the box.\n\nThis task is four minutes long and starts when the experimenter closes the door, leaving the room. The task is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• Child engagement: whether or not the child is physically engaged with the box at any point during an interval.\n• Seeks parent or experimenter: whether or not the child searches for or calls out to their parent or the experimenter during an interval.\n• Child frustration - during an interval, the most extreme of the following four behaviors shown by the child is coded:\n  - Concentration: child displays no behaviors indicating frustration with the task; calmly attempts to open the box without intensity.\n  - Mild frustration: child displays initial stages of frustration/sadness by whining, grunting, whimpering, crossing their arms, etc. Any hint of distress is coded as mild frustration.\n  - Overt frustration: child displays behaviors indicating obvious and intense frustration, such as yelling, throwing a tantrum, crying, shaking the box, throwing the box, banging the box, stomping their feet, clenching their fists, etc.\n  - None: any instance that does not fit the above three categories, like playing with the keys, looking around, trying to open the door, lying on the couch, etc.\n  - Uncodeable: if the child cannot be seen for the majority of a 15-second interval.`,

  "Walk a Line": `Walk a line is a motor inhibition measure in which the child walks the length of a carpeted path after the experimenter gives a "Ready? Go," command. There are three trials, which are each timed from the child's first step after the "go" command until the child steps on the ending carpet square. The first trial is a baseline trial, and the child is instructed to walk slowly in the following two trials. The experimenter shows the child how to walk on the path before the task begins, and gives the child repeated instructions to keep their feet on the path before each trial.`,

  Whisper: `Whisper is a motor inhibition measure in which the child is shown 12 images of cartoon characters and asked to whisper their name. If they don't know the name of the character, they are instructed to whisper, "I don't know" instead. The child is asked to whisper prior to the task to make sure they understand the rules and is given a rule reminder half-way through the task.\n\nCoded behaviors are as follows:\n\n• 3: the child whispers\n• 2: the child doesn't speak or respond\n• 1: the child speaks in a normal voice/volume\n• 0: the child shouts or responds loudly/aggressively`,

  "Mother Executive Function Tests": `Mothers completed three standard executive function tasks on a computer: Tower of Hanoi (Davis & Klebe, 2001), Wisconsin Card Sort (Heaton & PAR Staff, 2003), and Stroop Color-Word (Stroop, 1935). The mothers additionally completed a backward digit span task while face to face with a research assistant who recorded their responses on a score sheet.\n\nTower of Hanoi involved using a mouse to move three disks of different sizes to a target peg, keeping the original order and following two rules: only one disk could be moved each turn, and larger disks could not be placed on smaller disks. Time to completion was used as the score for the task.\n\nFor the Wisconsin Card Sort task, mothers were presented with computer images of four stimulus cards with different colors, quantities, and shapes and were asked to match a stack of cards according to a matching rule (i.e., either by color, quantity or shape). The matching rule changed without warning, and the participant had to infer the new rule based on feedback from the computer.\n\nFor the Stroop task, mothers selected a keyboard key representing various colors. The task involved four blocks of 20 trials each: (1) select color key corresponding to the name of the color written in black ink; (2) select color key corresponding to the ink color of the matching color word (congruent condition); (3) select color key corresponding to ink color of a nonmatching color word (incongruent condition); and (4) select color key based on the ink color of a matching or nonmatching color word (mixed condition).\n\nFor backward digit span, an experimenter directly faced the participant and read a random sequence of single-digit numbers (0-9) at a rate of one digit per second, and the participant attempted to reproduce the sequence in reverse. Each participant was given two chances to correctly reproduce the sequence in reverse, and the task ended when the participant got two consecutive sequences wrong.`,

  "Parent Positive Affect": `Parent positive affect is coded for all parent-child interaction tasks: Free Play, Phone Call, and Toy Cleanup. Each task lasts a maximum of five minutes and is coded in 15-second intervals.\n\nCoded behaviors are as follows:\n\n• No positive: there are no clear signs of positive affect, though mood may be pleasant. Parent is generally neutral in facial expression.\n• Low positive: small smiles, light laughter, an obvious increase from the neutral baseline, but no clear "full blown joy" is present.\n• High positive: smiling broadly with cheeks raised high, eyes are crinkled, hearty laughter, or otherwise extreme positivity or excitement.\n• Uncodeable: the parent's face or expression is not visible for at least half the interval, or the parent's emotional state cannot be heard (e.g. laughter).`,
  "CES-D": `The Center for Epidemiologic Studies Depression Scale (CES-D) is a questionnaire designed to measure depressive symptoms in adults. It asks respondents about experiences such as sadness, difficulty sleeping, low energy, and other feelings associated with depression. The standard 20-item measure focuses on how frequently these experiences occurred during the previous week. Researchers use the responses to understand differences in emotional well-being and psychological distress among caregivers. In this study, the measure helps examine maternal depressive symptoms as part of the broader family and child development context. The CES-D is a screening and research measure, not a standalone clinical diagnosis.`,

  "Shipley Parent Cognition": `The Shipley Parent Cognition task assesses aspects of an adult caregiver's general cognitive functioning. The Shipley assessment traditionally includes vocabulary and abstract reasoning components that examine verbal knowledge and the ability to identify patterns. These tasks provide information about cognitive abilities that may be relevant to how adults understand and respond to information. Researchers can use parent cognition measures to examine relationships between caregiver characteristics and children's developmental environments. Performance may help contextualize other parenting and family measures included in the study. The exact scoring and interpretation should follow the version administered by the research team.`,

  "Social Support Related": `Social Support Related variables capture information about the interpersonal support available to caregivers and their experiences with other people. Social support may include emotional encouragement, practical assistance, advice, and companionship from family members, friends, or other individuals. These experiences can influence how caregivers respond to everyday responsibilities and stressful situations. Researchers examine social support to understand differences in caregiver well-being and family functioning. In this application, the task groups social-support-related information associated with the study's parent measures. The specific variables and their documented meanings should determine which dimensions of support are represented.`,

  "Child Demand / Toy Prohibition": `Child Demand / Toy Prohibition contains observations associated with situations where a child wants access to a toy or activity that is restricted. Such situations are relevant to understanding how young children respond to limits and delayed access to desired objects. Researchers may examine expressions of frustration, attempts to obtain the object, emotional reactions, and interactions with an adult. The task can help describe children's developing ability to regulate their behavior when their preferences conflict with external rules. Related observations may also provide information about adult guidance and limit-setting. The exact task sequence and coding definitions should be confirmed using the study protocol.`,

  "BehaviorPhoneCallPlays": `BehaviorPhoneCallPlays contains variables associated with the study's phone-call and play-related behavioral observations. A phone-call context may create a situation in which an adult's attention is divided between the child and another activity. Researchers can use this type of observation to study how children respond when adult attention changes. Relevant behaviors may include independent play, attempts to gain attention, emotional reactions, or continued engagement with toys. These observations can contribute to research on attention-seeking, behavioral regulation, and parent-child interaction. The exact meaning of this task name and its variables must be verified in the Bates Lab documentation.`,

  "Less Is More": `Less Is More is a child behavioral task associated with decision-making and inhibitory control. This type of task can examine how a child responds when an immediately attractive choice conflicts with a rule or desired outcome. Researchers use such activities to understand developing self-control and the ability to regulate impulsive responses. The resulting variables may describe participation, trial completion, response choices, or performance across the task. These measurements can provide information about executive-function development during early childhood. The study-specific instructions and scoring must be checked before making claims about what constitutes a correct response.`,

  "Toy Prohibition": `Toy Prohibition examines children's reactions when access to a desired toy is restricted by an adult. The situation provides an opportunity to observe behavior when a child encounters a rule or temporary limitation. Researchers may be interested in frustration, attempts to approach the toy, compliance with instructions, or the use of self-regulation strategies. These observations can help describe individual differences in emotional and behavioral control. When paired with other tasks, the results may contribute to understanding how children respond across different challenging situations. Exact observation procedures and variable definitions should follow the relevant study manual.`,

  "Child Behavior FP": `Child Behavior FP contains child-behavior variables collected during a study activity identified by the abbreviation FP. The task is intended to organize observations of the child's behavior within that specific assessment context. Depending on the documented variables, these observations may include participation, responses to instructions, interactions, or emotional and behavioral reactions. Researchers can use structured behavioral observations to study differences in children's responses to comparable situations. The task should be interpreted alongside other developmental and parent-child interaction measures in the dataset. The meaning of FP, the precise procedure, and the associated behavioral codes require confirmation from the study documentation.`,

  "Child Behavior Phone Call": `Child Behavior Phone Call contains observations of child behavior during a phone-call-related activity. This context can be useful for examining how children respond when a caregiver is engaged in a competing activity. Researchers may study attention-seeking behavior, emotional expression, independent activity, and responses to changes in caregiver availability. The observations may also provide information about how caregivers manage interactions during the phone call. These measures can contribute to research on parent-child relationships and developing behavioral regulation. The exact behavioral categories should be determined from the task manual and existing variable definitions.`,

  "Maternal Leave Taking": `Maternal Leave Taking examines child and caregiver behavior during a structured situation involving a mother's preparation to leave or temporary departure. The task can provide information about how children respond to changes in caregiver availability. Relevant observations may include the child's emotional response, interest in available activities, attempts to gain attention, and reactions to maternal behavior. Researchers can also examine how the mother communicates, prepares, or responds during the situation. These observations may contribute to understanding parent-child interaction and children's responses to brief separation-related situations. Interpretations must follow the recorded variables and the study's specific coding rules.`,

  "Adult Temperament Questionnaire": `The Adult Temperament Questionnaire (ATQ) measures individual differences in emotional reactivity and self-regulation among adults. The instrument includes broad dimensions such as negative affect, extraversion, effortful control, and orienting sensitivity. These dimensions describe tendencies involving emotional responses, attention, inhibition, sociability, and sensitivity to stimulation. Researchers use temperament questionnaires to understand relatively stable differences in how individuals experience and respond to everyday situations. Within family research, adult temperament may provide context for caregiver behavior and parent-child relationships. The version used and the respondent role must be confirmed from the study records.`,

  "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)": `The Behavior Rating Inventory of Executive Function - Adult Version (BRIEF-A) assesses executive functioning in everyday adult life. It focuses on abilities involved in planning, organizing, working memory, inhibition, emotional control, and monitoring behavior. Rather than measuring performance only through laboratory activities, the questionnaire captures reported difficulties or strengths in daily self-regulation. The measure can include self-report and informant-report information depending on the version administered. Researchers use the results to examine how executive functioning relates to daily responsibilities and behavior. In this study, the relevant adult executive-function scores should be interpreted using the documented respondent and scoring procedures.`,

  "Changes + Adjustments Questionnaire": `The Changes + Adjustments Questionnaire contains information about changes in the family or everyday circumstances and how caregivers respond to them. Such information can help researchers understand the context in which children are developing. Changes involving routines, responsibilities, relationships, or other life circumstances may affect family experiences. The questionnaire may provide information about both the occurrence of changes and the adjustments associated with them. Researchers can examine these measures alongside parenting, stress, and child development variables. The exact questionnaire content and reporting period should be verified using the study documentation.`,

  "Child Behavior Checklist": `The Child Behavior Checklist (CBCL) is a caregiver-report assessment of children's emotional and behavioral functioning. It asks caregivers to describe a range of behaviors that may occur in everyday life. The responses can provide information about emotional difficulties, attention-related concerns, aggressive behavior, and other behavioral patterns. Standard CBCL systems organize responses into empirically derived problem scales and broader behavioral domains. Researchers use these measures to examine individual differences in childhood adjustment and development. Interpretation should follow the age-appropriate CBCL version and scoring rules used in the study.`,

  "Child Behavior Questionnaire": `The Child Behavior Questionnaire collects caregiver reports about children's typical behavioral and emotional characteristics. It can provide information about how children respond to stimulation, experience emotions, regulate attention, and behave in everyday situations. Questionnaire-based measures help researchers understand behaviors that may not be fully observable during a single laboratory visit. Responses can be compared with other child temperament, parenting, and observational measures. These comparisons can help researchers explore relationships between children's behavioral tendencies and their developmental environments. The exact questionnaire version and dimensions should be verified before assigning specific scale interpretations.`,

  "Child Misbehavior": `The Child Misbehavior questionnaire collects caregiver reports of behaviors that they consider difficult, disruptive, or challenging. Such behaviors may involve problems with following instructions, managing frustration, or responding appropriately in everyday situations. The questionnaire provides a caregiver perspective on how frequently or noticeably these behaviors occur. Researchers may use the responses to examine differences in children's behavioral adjustment and family experiences. The results can be compared with observational tasks and other caregiver-report measures. Any composite score should be interpreted according to the documented item set and scoring procedures.`,

  "Child-Rearing Practices Report": `The Child-Rearing Practices Report examines caregivers' beliefs and practices related to raising children. It can describe parenting approaches involving warmth, nurturance, expectations, guidance, and responses to children's behavior. These reported practices help researchers understand differences in how caregivers approach everyday parenting situations. In this study, the available variables include measures related to nurturant child-rearing practices and parenting warmth. Researchers can examine these measures alongside child temperament, behavior, and family-environment information. Exact composite definitions must follow the study's documented item groupings.`,

  "Children's Sleep Habits Questionnaire": `The Children's Sleep Habits Questionnaire (CSHQ) is a caregiver-report measure used to examine children's sleep-related behaviors and possible sleep difficulties. It covers areas such as bedtime resistance, sleep onset, sleep duration, night waking, sleep anxiety, and daytime sleepiness. Caregivers report how frequently particular sleep-related behaviors occur. Researchers use the questionnaire to identify patterns in children's sleep routines and reported sleep problems. These reports can be compared with sleep diaries, actigraphy, and other developmental measures when available. The questionnaire is a screening instrument, and interpretation should use the version and scoring method administered in the study.`,

  "CHAOS Scale (Confusion, Hubbub, and Order Scale)": `The Confusion, Hubbub, and Order Scale (CHAOS) examines the level of organization and routine within a household. It focuses on experiences involving noise, interruptions, confusion, predictability, and the general structure of family life. Caregivers report how well different statements describe their home environment. Researchers use the resulting information to study differences in household organization and everyday family experiences. These patterns may be relevant when examining parenting behavior, caregiver stress, and child development. The exact interpretation of scores depends on the study's version and coding rules.`,

  "Concerns & Constraints": `Concerns & Constraints examines caregivers' concerns about child behavior and the circumstances that may affect their parenting responses. The questionnaire can provide information about how caregivers interpret challenging situations and consider possible responses. Existing study variables include proactive parenting, reactive parenting, and internal or external explanations for child behavior. Researchers use these measures to understand differences in parenting beliefs and approaches to everyday challenges. The information can be compared with parenting-practice measures and children's observed behavior. Scores should be interpreted using the specific scenarios and item definitions documented for this study.`,

  "Daily Schedule": `The Daily Schedule questionnaire collects information about a caregiver's regular activities, work responsibilities, and daily routines. It can include details such as time spent working outside the home, commuting, or managing childcare arrangements. The questionnaire may also capture experiences of time pressure during daily transitions. Researchers use this information to understand the practical demands and schedules that shape family life. These experiences may be relevant to caregiver stress, parenting routines, and opportunities for parent-child interaction. The exact questions and response categories should follow the study's recorded variables.`,

  "Depression Scale": `The Depression Scale contains caregiver-report measures of depressive symptoms or related emotional experiences. Such questionnaires help researchers examine feelings and behaviors associated with low mood and psychological distress. Responses can provide context for understanding differences in caregiver emotional well-being. Researchers may compare these measures with parenting behavior, family stress, and child development outcomes. The specific symptoms, response period, and scoring depend on the instrument used in the study. This task should not automatically be treated as identical to CES-D without confirming its source questionnaire.`,

  "Eyberg Child Behavior Inventory": `The Eyberg Child Behavior Inventory (ECBI) is a caregiver-report measure of disruptive and challenging behavior in children. It asks caregivers about the frequency of specific behaviors and whether those behaviors are considered problematic. The instrument provides separate information about behavioral intensity and caregiver-perceived problems. Researchers use these dimensions to understand both the occurrence of difficult behaviors and the concerns they create for families. The results can support research on behavioral adjustment, parenting, and family experiences. Interpretation should follow the inventory version and scoring instructions used by the study.`,

  "Hollingshead Socioeconomic Status": `Hollingshead Socioeconomic Status measures aspects of a family's socioeconomic position using caregiver education and occupation information. The measure is designed to provide a structured way of describing differences in social and occupational background. In the study's documented variables, education and occupation scores contribute to a family socioeconomic-status measure. Researchers use socioeconomic information to examine the social context associated with children's developmental experiences. These measures can help describe variation in family circumstances across study participants. The specific weighting and classification procedure must follow the project's documented Hollingshead scoring method.`,

  "Parenting Events": `Parenting Events examines everyday experiences and responsibilities that caregivers may find difficult or stressful. The questionnaire can capture how often parenting-related situations occur and how challenging they feel. Examples may include managing child behavior, responding to demands, and handling daily childcare responsibilities. Researchers use these measures to understand the frequency and perceived impact of everyday parenting hassles. The information can be compared with caregiver well-being, parenting practices, and children's behavioral outcomes. Specific frequency, intensity, and subscale scores should follow the study's documented item definitions.`,

  "Parenting Scale": `The Parenting Scale examines how caregivers typically respond to children's misbehavior and discipline-related situations. It includes dimensions such as laxness, overreactivity, and verbosity in parenting responses. Laxness reflects difficulty maintaining limits, while overreactivity involves emotionally intense discipline responses. Verbosity refers to lengthy verbal responses during discipline situations. Researchers use the measure to understand differences in parenting style and responses to challenging child behavior. Scores should follow the item groupings and reverse-coding rules documented for the study.`,

  "Reilly Role Overload Scale": `The Reilly Role Overload Scale examines how overwhelmed individuals feel by the number of responsibilities and demands placed on them. Role overload occurs when perceived obligations exceed the time, energy, or resources available to manage them. The questionnaire allows caregivers to report their experience of competing demands and responsibilities. Researchers use these responses to study stress associated with multiple everyday roles. In family research, perceived overload may be relevant to caregiver well-being and parenting experiences. The study's specific items and scoring rules should be used when interpreting the overall role-overload measure.`,

  "Response to Misbehavior": `Response to Misbehavior examines how caregivers report responding when children behave in challenging or undesirable ways. The questionnaire distinguishes between different approaches to discipline and behavioral management. Existing study variables include nonharsh discipline, nonharsh verbal discipline, harsh verbal discipline, and harsh physical discipline. Researchers use these measures to examine variation in caregiver responses to child misbehavior. The information can be compared with parenting beliefs, child behavior reports, and observational findings. Interpretation should follow the study's documented item definitions and composite calculations.`,

  "Social Competence Scale": `The Social Competence Scale examines behaviors and skills associated with positive social functioning. Social competence includes abilities such as interacting appropriately with others, cooperating, managing emotions, and participating in social situations. Ratings can provide information about how a child functions in everyday interpersonal settings. Researchers use these measures to understand differences in social development and adjustment. In this study, the available social-competence variables should be interpreted according to the documented respondent and item set. The measure can be compared with child behavior, temperament, and teacher-report information.`,

  "Social Support - PANSE": `The Positive and Negative Social Exchanges (PANSE) measure examines both supportive and difficult experiences in social relationships. Positive exchanges can include helpful information, practical assistance, emotional encouragement, and companionship. Negative exchanges can include unwanted advice, lack of assistance, insensitive behavior, or experiences of rejection. The questionnaire helps researchers understand that social relationships may provide benefits while also creating stress. These experiences can be examined in relation to caregiver emotional well-being and family functioning. The study's selected PANSE items and scoring procedures should determine which domains are represented in the application.`,

  "Caregiver-Teacher Report Form (TRF)": `The Caregiver-Teacher Report Form (TRF) contains ratings related to children's emotional and behavioral functioning. The Caregiver-Teacher Report Form is the preschool-age form of the Achenbach System of Empirically Based Assessment (ASEBA) designed for daycare providers and preschool teachers. It includes measures of problems such as anxious or depressed behavior, attention difficulties, aggression, and social withdrawal. Scores may also be organized into broader internalizing, externalizing, and overall problem domains. Researchers can use these ratings to examine behavioral functioning from a perspective outside the primary home environment. The exact respondent in this study and the scoring method used should be verified against the study records.`,

  "Teacher Demographics": `Teacher Demographics collects background information about educators who provide information about children participating in the study. The recorded information may include age, education, specialized training, professional experience, and time spent at the current school or center. It can also include classroom details such as the number of children and teachers present. Researchers use these details to understand the educational context in which teacher reports and classroom observations are collected. Background information can help describe differences in classroom environments and teacher experience. These variables should be treated as descriptive information rather than as a measure of teaching quality.`,

  "Class Teacher Sensitivity": `Class Teacher Sensitivity concerns the responsiveness and emotional support shown by a teacher during interactions with children. Teacher sensitivity generally involves noticing children's needs, responding appropriately, and supporting a positive classroom environment. Structured classroom observations can provide information about how teachers respond to children's emotions and behavior. Researchers study these interactions because the quality of classroom relationships may be associated with children's social and emotional development. The variable in this task may represent an observational rating rather than a questionnaire response. Its precise measure and category placement should be confirmed against the CLASS observation documentation.`,

  "Teacher Checklist": `Teacher Checklist contains teacher-rated information about children's behavior and social experiences in educational settings. In this study, the available measures include peer liking, reactive aggression, and proactive aggression. These ratings can help describe how a child interacts with classmates and responds during social situations. Reactive aggression generally relates to responses to perceived provocation, while proactive aggression concerns aggression used to achieve a goal. Researchers use teacher reports to complement information collected from caregivers and structured observations. The exact questionnaire items and composite scoring should follow the study's teacher-checklist documentation.`,

  "Mock Report Card": `Mock Report Card contains teacher ratings of children's academic and classroom-related functioning. The recorded areas may include reading, oral language, written language, mathematics, science, and social studies. The task also includes broader measures of academic performance, classroom work habits, and social skills. These ratings provide an educator's perspective on how a child performs and participates in a learning environment. Researchers can use the information to explore relationships between academic development, classroom behavior, and other child characteristics. Scores should be understood as teacher ratings rather than standardized academic test results unless documented otherwise.`,

  "Student Teacher Relationship Scale": `The Student Teacher Relationship Scale is generally used to examine how a teacher perceives their relationship with a particular child, using dimensions such as closeness, conflict, and dependency. The variables currently listed under this task do not represent those relationship dimensions. Instead, they are item-mean scores describing the child's behavior, including peer aggression, prosocial behavior with peers, asocial behavior, exclusion by peers, anxious or fearful behavior, and hyperactive or distractible behavior. Researchers study children's social behavior in educational settings because it may be associated with classroom adjustment and social development. These scores can be compared with caregiver reports and structured observations collected in the study. The variable prefix (cbs) and these six scale names appear to match the teacher-report Child Behavior Scale, so the research team should confirm the source instrument and whether this task label is correct.`,

  "Infant Characteristics Questionnaire (ICQ)": `The Infant Characteristics Questionnaire (ICQ) is a caregiver-report measure developed to study differences in infant temperament and perceived behavioral difficulty. It focuses on characteristics such as fussiness, emotional reactivity, adaptability, and how easily an infant can be soothed. Caregiver responses provide information about how the child typically behaves across everyday situations. Researchers use these ratings to study early temperament and differences in caregiver perceptions of infant behavior. The information can be compared with other developmental, behavioral, and family measures. The exact temperament dimensions and longitudinal scores should follow the study's age-specific ICQ version and scoring procedures.`,

  "Home Scale Items": `Home Scale Items contains observer-based information about the environment in which a child lives and develops. Home-environment measures commonly examine caregiver responsiveness, organization, opportunities for learning, and the availability of supportive experiences. Observers may record behaviors and environmental characteristics during a home visit. These observations provide information that complements caregiver questionnaires and laboratory tasks. Researchers use the measures to study relationships between family environments and children's developmental experiences. The exact items and dimensions must be interpreted according to the study's specific home-observation instrument.`,

  "Purdue Home Stimulation Inventory": `The Purdue Home Stimulation Inventory contains information describing the level and type of stimulation present in a child's home environment. In this study, the recorded variables describe features of the home such as average noise level during the visit, electronic screens in use, clutter, cleanliness, organization, the availability of a stimulus shelter, the overall feel of the home, and household size and crowdedness. A structured inventory can help researchers organize observations of these environmental characteristics. The information may be useful when studying variation in children's experiences outside the laboratory. Researchers can examine home-stimulation measures alongside caregiver reports, family characteristics, and child development outcomes. The exact content and scoring of this named inventory must be verified against the Bates Lab source documentation rather than assumed to match the HOME inventory.`,

  "Sleep Observation Counts": `Sleep Observation Counts contains variables describing the number of observations available for sleep-related measurements. These variables may distinguish different sleep periods, such as Up, Down, nap, and True Sleep periods. Some count variables also identify observations associated with short-time-in-bed or short-time-asleep conditions. Researchers use observation counts to understand how much recorded information contributed to a particular sleep measure. These counts can help evaluate data coverage and interpret sleep-related summaries across participants or study ages. Exact inclusion criteria and short-time thresholds should be determined from the actigraphy and sleep-processing documentation.`,

  "Observer Impressions - Regular ratings": `Observer Impressions - Regular ratings contains ratings recorded by trained observers during study visits or structured activities. These ratings can summarize features of the child's behavior, caregiver behavior, or the overall interaction context. Observer impressions provide a perspective that differs from caregiver self-report questionnaires. Researchers may use these measures to describe behavioral patterns that occur during the study session. Such information can complement more detailed behavioral codes and task-specific measurements. The exact meaning and scale of each rating should follow the project's observation manual.`,

  "Post Observation Questionnaire - Child composites": `Post Observation Questionnaire - Child composites contains summary measures derived from observations or questionnaire responses concerning the child's behavior after a study session. These composites are intended to organize multiple related observations into broader behavioral dimensions. They may help researchers examine patterns that are less apparent when individual items are considered separately. Observer-based summaries provide additional context for understanding children's behavior during structured activities. Researchers can compare these measures with laboratory tasks, caregiver reports, and other observational information. The specific dimensions and computations must follow the project's documented child-composite definitions.`,

  "Post Observation Questionnaire - Parent composites": `Post Observation Questionnaire - Parent composites contains summary measures related to caregiver behavior or parent-child interaction during the observation session. These variables organize information from related observational or questionnaire items. They can help describe broader patterns of caregiver responses and interaction behavior. Researchers use such measures to examine similarities and differences in parenting behavior across situations. The resulting information can be compared with caregiver self-reports and children's behavioral measures. Exact composite names, included items, and scoring methods must follow the study's parent-observation documentation.`,

  "Post Observation Rating Scale - Emotionality composites": `Post Observation Rating Scale - Emotionality composites contains summary measures related to emotional behavior recorded during study observations. Emotionality can involve the expression, intensity, and characteristics of emotional responses to different situations. These measures may help researchers understand differences in how children or caregivers express emotion during structured interactions. Composite scores organize related ratings into broader indicators for analysis. Researchers can examine these indicators alongside temperament, behavior, and emotional-regulation variables. The exact emotionality dimensions and their computation should follow the study's coding and scoring documentation.`,

  "Post Observation Rating Scale - Regulation composite": `Post Observation Rating Scale - Regulation composite contains a summary measure associated with behavioral or emotional regulation observed during the study session. Regulation generally refers to the ability to manage attention, emotional responses, and behavior in response to changing demands. Observational ratings may provide information about how effectively a child adjusts to challenging situations. Researchers use regulation measures to examine developmental differences in self-control and adaptive behavior. The composite can be considered alongside temperament questionnaires, caregiver reports, and other laboratory observations. Its exact meaning, included items, and scoring procedure must follow the research team's documented definition.`,

  "Bates Lab Home Checklist": `The Bates Lab Home Checklist contains structured observations of the child's home environment and the conditions present during a home visit. The available variables include measures related to household disorganization, unsafe conditions, outdoor environments, sleep-space characteristics, and household transitions. The checklist also includes observer ratings of the family's preparation and the level of confusion during the visit. Researchers use these observations to describe environmental features that may be relevant to family experiences and child development. The resulting measures provide contextual information that complements caregiver questionnaires and direct child observations. Each composite should be interpreted using its documented item definitions and scoring rules.`,
  "Differential Ability Scale (DAS)": `The Differential Ability Scales (DAS) is an individually administered assessment designed to examine children's cognitive abilities and developmental strengths. It evaluates different areas of thinking and learning, which may include verbal abilities, nonverbal reasoning, and spatial skills depending on the version and subtests administered. The assessment provides information about how children understand information, solve problems, and perform cognitive tasks. Researchers use these measures to explore individual differences in cognitive development and learning abilities. The results can be examined alongside behavioral observations, family characteristics, and other developmental assessments. The exact interpretation of scores should follow the DAS version and scoring procedures documented for this study.`,

  "Woodcock-Johnson (WJ)": `The Woodcock-Johnson (WJ) assessment is a standardized set of tests used to evaluate cognitive or academic abilities, depending on the version administered. In this study, the available variables include Letter-Word Identification and Applied Problems, which examine early reading and mathematical problem-solving skills. Letter-Word Identification measures the ability to recognize and read letters or words, while Applied Problems examines the ability to understand and solve mathematical questions. The recorded variables include the number of correct responses and age-equivalent scores associated with these assessments. Researchers use these measures to understand differences in children's developing academic skills and examine relationships with other developmental characteristics. Scores should be interpreted according to the version of the Woodcock-Johnson assessment administered during the study.`,

  "EEG Bird Alligator": `EEG Bird Alligator contains brain-activity measurements collected during the Bird Alligator task. The available EEG variables include N2 event-related potential amplitude measurements associated with Go and No-Go conditions. These measurements provide information about electrical brain responses during a task involving different types of behavioral responses. Researchers examine N2 responses because they may be relevant to cognitive-control processes, including response monitoring and inhibition. The task includes measurements such as Go and No-Go amplitudes, amplitude differences, and related summary and data-quality variables, while the N2 latency variables for this task are currently listed under Child Tasks > Bird Alligator. Interpretation of these EEG measurements should follow the project's electrode selection, preprocessing, and scoring documentation.`,

  "Oddball Related": `Oddball Related contains electroencephalography (EEG) measurements collected during oddball tasks that involve different types of stimuli. Oddball paradigms are commonly used to examine how the brain responds to frequent and less frequent or behaviorally important events. The study variables include P3a and P3b event-related potential measurements, such as amplitude, latency, and differences between stimulus conditions. P3a is commonly associated with attentional orienting, while P3b is often studied in relation to attention and stimulus evaluation. Additional variables include frequency-related brain activity, EEG data-quality measures, and trial-related performance information. Researchers use these measurements to examine differences in attention and cognitive processing, with exact interpretations depending on the study's EEG processing procedures.`,

  "Fish Sharks Related": `Fish Sharks Related contains EEG measurements associated with the study's Fish Sharks task. The available variables include N2 event-related potential amplitude and latency measurements for Go and No-Go conditions. These measurements can provide information about brain responses during situations that involve making a response or withholding one. The task also contains EEG activity measures and behavioral performance variables related to response accuracy and inhibition. Researchers may examine these variables to study developing cognitive control, attention, and response inhibition in children. Exact scoring, condition definitions, and EEG interpretations should follow the study's documented task and preprocessing procedures.`,

  "Child": `The Child Actigraphy task contains sleep and activity measurements recorded for children participating in the study. Actigraphy uses movement-based recordings to estimate periods of activity, rest, and sleep over time. The available variables include measures related to sleep duration, sleep efficiency, sleep timing, waking periods, and activity during different sleep-related intervals. Measurements may be organized by study age, recording period, and sleep-scoring algorithm, including Sadeh and ColeKripke. Researchers use these variables to study children's sleep patterns and differences in sleep behavior across developmental periods. Interpretation of individual measurements should follow the project's actigraphy scoring rules and the definitions documented for each variable.`,

  "Parent": `The Parent Actigraphy task contains sleep and activity measurements associated with caregivers participating in the study. Actigraphy records movement patterns that can be analyzed to estimate sleep and wake periods. The available variables include measurements related to sleep duration, timing, efficiency, activity, and waking after sleep onset. Data may be grouped by study age, recording period, and scoring algorithm, including Sadeh and ColeKripke. Researchers can examine these variables to understand caregiver sleep patterns and their relationships with family routines or other study measures. Exact interpretations should follow the documented processing procedures and definitions for each parent actigraphy variable.`,

  "Summary": `The Actigraphy Summary task contains summary sleep measures grouped under Summary Sleep Domains. Summary measures can help researchers examine broader patterns in sleep duration, timing, activity, and variability without focusing only on individual recording periods. Based on their names and existing descriptions, the current variables come from questionnaires and sleep diaries rather than actigraphy recordings, including Kosair Sleep Questionnaire composites, Pittsburgh Sleep Quality Index (PSQI) components, and child and parent sleep-diary averages, variability measures, and values recorded before the lab visit. These measures can be useful when comparing sleep-related characteristics across participants, developmental ages, or observation periods. Researchers should distinguish these questionnaire and diary-based summaries from the actigraphy-derived measures in the Child and Parent tasks when interpreting the results. The exact source variables, aggregation procedures, and placement of this task under Actigraphy should be confirmed using the study's processing documentation.`,

  "Sleep Diary – Child": `Sleep Diary - Child contains sleep-related measurements organized to describe children's sleeping and waking patterns. The available variables include measures of variability in sleep timing, duration, activity, and minutes classified as sleep across different observation periods. These measurements are organized into Up, Down, True Sleep, and Nap categories to distinguish different types of sleep-related intervals. The task includes groups associated with Week 1, Week 2, and combined recording periods using Sadeh and ColeKripke scoring. Researchers can use these measures to examine differences in children's sleep consistency and variability across developmental ages. Although the task is named Sleep Diary, the scoring-algorithm labels indicate that the exact relationship between diary records and actigraphy-derived measurements should be confirmed from the study documentation.`,


};

function csvCell(value) {
  if (value === "NA" || value === null || value === undefined) return "";

  const str = String(value);

  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}


const Dashboard = ({ data = null }) => {
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
    if (data && data.fields.length > 0) return data.fields;
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

    if (selectedTask === "Mother Executive Function Tests") {
      vars = vars.filter((v) => motherExecutiveFunctionVariables.has(v.trim()));
    } else if (selectedTask) {
      const keyword =
        taskToVarMap[selectedTask] || selectedTask.toLowerCase().split(" ")[0];
      vars = vars.filter((v) =>
        v.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (selectedTask === "Whisper") {
      const seen = new Set(vars);
      vars = [...vars];
      whisperMasterVariables.forEach((v) => {
        if (!seen.has(v)) {
          seen.add(v);
          vars.push(v);
        }
      });
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

  const handleSaveCSV = async () => {
    if (!data) {
      alert("No data available. Please upload a CSV file first.");
      return;
    }

    if (selectedVariables.length === 0) {
      alert("No variables selected. Please add variables to export.");
      return;
    }

    try {
      const rows = await data.loadRows();
      if (rows.length === 0) {
        alert("No data available. Please upload a CSV file first.");
        return;
      }

      const headerRow = selectedVariables.join(",");

      const fieldIndex = new Map(data.fields.map((f, i) => [f, i]));
      const colIndexes = selectedVariables.map((col) => fieldIndex.get(col));
      const bodyRows = rows
        .map((row) =>
          colIndexes.map((i) => csvCell(i === undefined ? undefined : row[i])).join(",")
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
        className="explorer-panels"
        style={{
          display: "grid",
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
              {selectedCategory === "Actigraphy" && (
                <li
                  style={{
                    padding: "0.75rem 0.5rem",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    cursor: "default",
                  }}
                >
                  Main Sleep Variables
                </li>
              )}
              {tasks.map((task, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedTask((prev) => (prev === task ? null : task));
                    setCheckedVariables([]);
                  }}
                  style={{
                    padding: "0.75rem 0.5rem",
                    ...(selectedCategory === "Actigraphy"
                      ? { paddingLeft: "1.75rem" }
                      : {}),
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
                    className="variable-row"
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
                      className="variable-row-label"
                      style={{ fontSize: "0.9rem", wordBreak: "normal", overflowWrap: "anywhere" }}
                    >
                      {getVariableLabel(v)}{" "}
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
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", minWidth: 0, overflowWrap: "anywhere" }}>
                {getVariableLabel(varInfoModal)}
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
              <strong>Description:</strong>{" "}
              {variableDescriptions[varInfoModal] || "Description not added yet."}
              {variableComputations[varInfoModal] ? (
                <>
                  {"\n\n"}
                  <strong>Computation:</strong> {variableComputations[varInfoModal]}
                </>
              ) : null}
              {variableCodings[varInfoModal] ? (
                <>
                  {"\n\n"}
                  <strong>Coding:</strong> {variableCodings[varInfoModal]}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
