/**
 * Level 39: Switch Statements
 * 
 * This file demonstrates switch statements in JavaScript.
 * All code here will run when the page loads.
 */

// ============================================
// BASIC SWITCH STATEMENT
// ============================================

console.log("--- Basic Switch Statement ---");

let day = "Tuesday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Tuesday":
    console.log("Second day");
    break;
  case "Wednesday":
    console.log("Middle of the week");
    break;
  case "Thursday":
    console.log("Almost Friday");
    break;
  case "Friday":
    console.log("Last work day");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}

// ============================================
// SWITCH WITH NUMBERS
// ============================================

console.log("\n--- Switch with Numbers ---");

let score = 85;
let grade;

switch (true) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 80:
    grade = "B";
    break;
  case score >= 70:
    grade = "C";
    break;
  case score >= 60:
    grade = "D";
    break;
  default:
    grade = "F";
}

console.log("Score:", score);
console.log("Grade:", grade);

// ============================================
// MULTIPLE CASES (FALL-THROUGH)
// ============================================

console.log("\n--- Multiple Cases (Fall-Through) ---");

let fruit = "apple";

switch (fruit) {
  case "apple":
  case "pear":
  case "orange":
    console.log("Common fruit");
    break;
  case "mango":
  case "pineapple":
    console.log("Tropical fruit");
    break;
  default:
    console.log("Unknown fruit");
}

// ============================================
// SWITCH WITH STRINGS
// ============================================

console.log("\n--- Switch with Strings ---");

let role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "editor":
    console.log("Can edit content");
    break;
  case "viewer":
    console.log("Read-only access");
    break;
  default:
    console.log("No access");
}

// ============================================
// SWITCH WITH DIFFERENT TYPES
// ============================================

console.log("\n--- Switch with Different Types ---");

let value = "5";

switch (value) {
  case 5:
    console.log("Number 5");
    break;
  case "5":
    console.log("String 5");
    break;
  default:
    console.log("Other");
}

// ============================================
// WITHOUT BREAK (FALL-THROUGH BEHAVIOR)
// ============================================

console.log("\n--- Without Break (Fall-Through) ---");

let number = 2;
let result = "";

switch (number) {
  case 1:
    result += "One ";
  case 2:
    result += "Two ";
  case 3:
    result += "Three ";
  default:
    result += "Default";
}

console.log("number =", number);
console.log("result =", result);

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the purpose of a switch statement?",
    options: [
      "To create loops",
      "To make decisions based on multiple conditions",
      "To store data",
      "To create functions"
    ],
    correct: 1,
    explanation:
      "Switch statements are used for multi-way branching based on a value."
  },
  {
    id: 2,
    question: "What keyword starts a switch statement?",
    options: ["case", "switch", "default", "break"],
    correct: 1,
    explanation:
      "The switch keyword starts a switch statement: switch(expression) { ... }"
  },
  {
    id: 3,
    question: "What does the break keyword do in a switch?",
    options: [
      "Starts a new case",
      "Exits the switch block",
      "Runs the default case",
      "Creates a loop"
    ],
    correct: 1,
    explanation:
      "break exits the switch block, preventing fall-through to the next case."
  },
  {
    id: 4,
    question: "When does the default case run?",
    options: ["When a case matches", "When no case matches", "Always", "Never"],
    correct: 1,
    explanation:
      "The default case runs when none of the case values match the expression."
  },
  {
    id: 5,
    question:
      'What is the result of: switch(5) { case 5: console.log("Five"); break; default: console.log("Other"); }',
    options: ["Five", "Other", "Error", "Undefined"],
    correct: 0,
    explanation:
      'The case 5 matches, so "Five" is logged and break exits the switch.'
  },
  {
    id: 6,
    question: "What happens if you omit break in a switch?",
    options: [
      "The switch ends",
      "It continues to the next case",
      "An error occurs",
      "Nothing happens"
    ],
    correct: 1,
    explanation: 'Without break, execution "falls through" to the next case.'
  },
  {
    id: 7,
    question:
      'What is the result of: let x = 2; switch(x) { case 1: console.log("One"); case 2: console.log("Two"); case 3: console.log("Three"); }',
    options: ["Two", "Two Three", "Two Three (with fall-through)", "Error"],
    correct: 2,
    explanation:
      "With no breaks, after matching case 2, it falls through to case 3 as well."
  },
  {
    id: 8,
    question: "What does the default case require?",
    options: [
      "A break statement",
      "A value to match",
      "Nothing - it's optional",
      "A return statement"
    ],
    correct: 2,
    explanation: "The default case is optional. It runs when no case matches."
  },
  {
    id: 9,
    question:
      'What is the result of: let fruit = "apple"; switch(fruit) { case "apple": case "orange": console.log("Fruit"); break; default: console.log("Other"); }',
    options: ["Fruit", "Other", "Error", "Undefined"],
    correct: 0,
    explanation:
      'Multiple cases can share the same code. "apple" matches and logs "Fruit".'
  },
  {
    id: 10,
    question: "What comparison does switch use?",
    options: [
      "Loose equality (==)",
      "Strict equality (===)",
      "Greater than (>)",
      "Less than (<)"
    ],
    correct: 1,
    explanation: "Switch uses strict equality (===) for case comparisons."
  },
  {
    id: 11,
    question:
      'What is the result of: switch(5) { case "5": console.log("String"); break; case 5: console.log("Number"); break; }',
    options: ["String", "Number", "Error", "Undefined"],
    correct: 1,
    explanation:
      'Switch uses strict equality. 5 (number) matches case 5, not "5" (string).'
  },
  {
    id: 12,
    question: "Which is better for checking many conditions?",
    options: [
      "if/else chain",
      "switch statement",
      "Both are equally good",
      "Neither"
    ],
    correct: 1,
    explanation:
      "Switch is often cleaner and more readable for many conditions on one value."
  },
  {
    id: 13,
    question:
      'What is the result of: let x = 1; switch(x) { case 1: console.log("One"); case 2: console.log("Two"); break; default: console.log("Default"); }',
    options: ["One", "One Two", "One Two Default", "Error"],
    correct: 1,
    explanation:
      'Case 1 matches and logs "One", then without break falls through to case 2 logging "Two", then break exits.'
  },
  {
    id: 14,
    question: "Can you use switch with different data types?",
    options: [
      "Yes, always",
      "No, never",
      "Yes, but careful with strict equality",
      "Only with numbers"
    ],
    correct: 2,
    explanation:
      "Yes, but remember switch uses strict equality (===), so types matter."
  },
  {
    id: 15,
    question:
      'What is the result of: let x = 10; switch(x) { default: console.log("Default"); case 5: console.log("Five"); case 10: console.log("Ten"); }',
    options: ["Default Five Ten", "Default", "Ten", "Error"],
    correct: 2,
    explanation:
      'Switch first finds the matching case (case 10) and starts execution there. Only "Ten" is logged.'
  }
];

let quizState = {
  questions: [],
  currentQuestion: 0,
  score: 0,
  answered: false,
  timeLeft: 120,
  timer: null
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createQuizModal() {
  if (document.getElementById("quizModal")) {
    return document.getElementById("quizModal");
  }

  const modalHTML = `
        <div id="quizOverlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(21, 21, 31, 0.92);
            backdrop-filter: blur(12px);
            z-index: 10000;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeInOverlay 0.3s ease;
        ">
            <div id="quizModal" style="
                background: var(--bg-panel, #1e1e2e);
                border: 1px solid var(--border, #34344f);
                border-radius: var(--radius-lg, 16px);
                max-width: 700px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 30px 80px rgba(0,0,0,0.6);
                animation: slideUpModal 0.3s ease;
                position: relative;
            ">
                <div style="
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-soft, #2a2a40);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: var(--bg-base-2, #1b1b29);
                    border-radius: var(--radius-lg, 16px) var(--radius-lg, 16px) 0 0;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.2rem;">📝</span>
                        <h2 style="
                            font-family: var(--font-mono, monospace);
                            font-size: 1.1rem;
                            font-weight: 600;
                            color: var(--text-primary, #e9e9f5);
                            margin: 0;
                        ">Level 39 Quiz</h2>
                    </div>
                    <button id="closeQuizBtn" style="
                        background: none;
                        border: none;
                        color: var(--text-muted, #6c6c8c);
                        font-size: 1.3rem;
                        cursor: pointer;
                        padding: 4px 8px;
                        border-radius: var(--radius-sm, 6px);
                        transition: all 0.15s ease;
                        line-height: 1;
                    ">✕</button>
                </div>

                <div id="quizContent" style="padding: 32px 24px 24px;">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 24px;
                        font-family: var(--font-mono, monospace);
                        font-size: 0.85rem;
                        color: var(--text-secondary, #a3a3c2);
                    ">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span>⏱️</span>
                            <span id="timerDisplay" style="
                                font-weight: 600;
                                color: var(--accent-js, #f0c674);
                                font-size: 1.1rem;
                            ">2:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span>📊</span>
                            <span id="progressDisplay">1 / 10</span>
                        </div>
                    </div>

                    <div style="
                        width: 100%;
                        height: 4px;
                        background: var(--bg-base-2, #1b1b29);
                        border-radius: 4px;
                        margin-bottom: 28px;
                        overflow: hidden;
                    ">
                        <div id="progressBar" style="
                            width: 10%;
                            height: 100%;
                            background: linear-gradient(90deg, var(--accent-js, #f0c674), var(--accent-php, #b58aef));
                            border-radius: 4px;
                            transition: width 0.4s ease;
                        "></div>
                    </div>

                    <div id="questionContainer">
                        <div style="
                            font-family: var(--font-mono, monospace);
                            font-size: 0.78rem;
                            color: var(--text-muted, #6c6c8c);
                            margin-bottom: 8px;
                            letter-spacing: 0.5px;
                        ">QUESTION <span id="questionNumber">1</span>/10</div>
                        <h3 id="questionText" style="
                            font-family: var(--font-sans, sans-serif);
                            font-size: 1.05rem;
                            font-weight: 500;
                            color: var(--text-primary, #e9e9f5);
                            margin: 0 0 20px 0;
                            line-height: 1.6;
                        ">Loading question...</h3>
                    </div>

                    <div id="optionsContainer" style="
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-bottom: 24px;
                    "></div>

                    <div id="explanationContainer" style="
                        display: none;
                        padding: 16px 20px;
                        background: var(--bg-panel-alt, #23233a);
                        border-left: 3px solid var(--accent-js, #f0c674);
                        border-radius: var(--radius-sm, 6px);
                        margin-bottom: 24px;
                        font-family: var(--font-sans, sans-serif);
                        font-size: 0.9rem;
                        color: var(--text-secondary, #a3a3c2);
                        line-height: 1.6;
                    ">
                        <div style="font-weight: 600; color: var(--accent-js, #f0c674); margin-bottom: 4px;">💡 Explanation</div>
                        <div id="explanationText"></div>
                    </div>

                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 12px;
                        flex-wrap: wrap;
                    ">
                        <button id="nextQuestionBtn" style="
                            background: var(--accent-sql, #8ec07c);
                            color: #0e1410;
                            border: none;
                            padding: 10px 28px;
                            border-radius: var(--radius-sm, 6px);
                            font-family: var(--font-mono, monospace);
                            font-size: 0.85rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.15s ease;
                            margin-left: auto;
                            opacity: 0.5;
                            pointer-events: none;
                        ">Next →</button>
                    </div>
                </div>

                <div id="quizResults" style="
                    display: none;
                    padding: 40px 32px 32px;
                    text-align: center;
                ">
                    <div style="font-size: 3rem; margin-bottom: 12px;" id="resultEmoji">🎉</div>
                    <h2 style="
                        font-family: var(--font-mono, monospace);
                        font-size: 1.3rem;
                        color: var(--text-primary, #e9e9f5);
                        margin: 0 0 8px 0;
                    " id="resultTitle">Quiz Complete!</h2>
                    <p style="
                        font-family: var(--font-sans, sans-serif);
                        font-size: 1rem;
                        color: var(--text-secondary, #a3a3c2);
                        margin: 0 0 20px 0;
                    " id="resultMessage">You scored 10/10!</p>
                    <div style="
                        display: flex;
                        gap: 16px;
                        justify-content: center;
                        flex-wrap: wrap;
                    ">
                        <button id="retryQuizBtn" style="
                            background: transparent;
                            color: var(--text-secondary, #a3a3c2);
                            border: 1px solid var(--border, #34344f);
                            padding: 10px 24px;
                            border-radius: var(--radius-sm, 6px);
                            font-family: var(--font-mono, monospace);
                            font-size: 0.85rem;
                            cursor: pointer;
                            transition: all 0.15s ease;
                        ">🔄 Retry</button>
                        <button id="closeResultsBtn" style="
                            background: var(--accent-sql, #8ec07c);
                            color: #0e1410;
                            border: none;
                            padding: 10px 28px;
                            border-radius: var(--radius-sm, 6px);
                            font-family: var(--font-mono, monospace);
                            font-size: 0.85rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.15s ease;
                        ">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);

  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUpModal {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulseTimer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        #quizModal::-webkit-scrollbar {
            width: 6px;
        }
        #quizModal::-webkit-scrollbar-track {
            background: var(--bg-base-2, #1b1b29);
            border-radius: 3px;
        }
        #quizModal::-webkit-scrollbar-thumb {
            background: var(--border, #34344f);
            border-radius: 3px;
        }
    `;
  document.head.appendChild(style);

  document.getElementById("closeQuizBtn").addEventListener("click", closeQuiz);
  document
    .getElementById("closeResultsBtn")
    .addEventListener("click", closeQuiz);
  document.getElementById("retryQuizBtn").addEventListener("click", retryQuiz);
  document
    .getElementById("nextQuestionBtn")
    .addEventListener("click", nextQuestion);

  document.getElementById("quizOverlay").addEventListener("click", function(e) {
    if (e.target === this) closeQuiz();
  });

  return document.getElementById("quizModal");
}

function startQuiz(event) {
  if (event) event.preventDefault();

  const progress = JSON.parse(localStorage.getItem("levelProgress")) || {};
  if (progress["level39"]) {
    alert("✅ You have already completed this level!");
    const nextBtn = document.getElementById("nextLevelBtn");
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.href = "level40.html";
    }
    return;
  }

  const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
  quizState = {
    questions: shuffledQuestions.slice(0, 10),
    currentQuestion: 0,
    score: 0,
    answered: false,
    timeLeft: 120,
    timer: null
  };

  const modal = createQuizModal();
  const overlay = document.getElementById("quizOverlay");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  const quizContent = document.getElementById("quizContent");
  const quizResults = document.getElementById("quizResults");
  quizContent.style.display = "block";
  quizResults.style.display = "none";
  document.getElementById("nextQuestionBtn").style.opacity = "0.5";
  document.getElementById("nextQuestionBtn").style.pointerEvents = "none";

  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const q = quizState.questions[quizState.currentQuestion];
  const total = quizState.questions.length;

  document.getElementById(
    "progressDisplay"
  ).textContent = `${quizState.currentQuestion + 1} / ${total}`;
  document.getElementById(
    "progressBar"
  ).style.width = `${(quizState.currentQuestion + 1) / total * 100}%`;
  document.getElementById("questionNumber").textContent =
    quizState.currentQuestion + 1;
  document.getElementById("questionText").textContent = q.question;

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.style.cssText = `
            padding: 12px 16px;
            background: var(--bg-base-2, #1b1b29);
            border: 1px solid var(--border-soft, #2a2a40);
            border-radius: var(--radius-sm, 6px);
            cursor: pointer;
            transition: all 0.15s ease;
            font-family: var(--font-sans, sans-serif);
            font-size: 0.92rem;
            color: var(--text-secondary, #a3a3c2);
            display: flex;
            align-items: center;
            gap: 12px;
        `;
    optionDiv.dataset.index = index;

    const letter = String.fromCharCode(65 + index);
    const letterSpan = document.createElement("span");
    letterSpan.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 28px;
            height: 28px;
            background: var(--bg-panel, #1e1e2e);
            border: 1px solid var(--border, #34344f);
            border-radius: 50%;
            font-family: var(--font-mono, monospace);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-muted, #6c6c8c);
            transition: all 0.15s ease;
        `;
    letterSpan.textContent = letter;
    optionDiv.appendChild(letterSpan);

    const textSpan = document.createElement("span");
    textSpan.textContent = option;
    optionDiv.appendChild(textSpan);

    optionDiv.addEventListener("click", () => selectOption(index));
    optionDiv.addEventListener("mouseenter", () => {
      if (!quizState.answered) {
        optionDiv.style.borderColor = "var(--border, #34344f)";
        optionDiv.style.background = "var(--bg-panel-alt, #23233a)";
      }
    });
    optionDiv.addEventListener("mouseleave", () => {
      if (!quizState.answered) {
        optionDiv.style.borderColor = "var(--border-soft, #2a2a40)";
        optionDiv.style.background = "var(--bg-base-2, #1b1b29)";
      }
    });

    optionsContainer.appendChild(optionDiv);
  });

  quizState.answered = false;
  document.getElementById("explanationContainer").style.display = "none";
  document.getElementById("nextQuestionBtn").style.opacity = "0.5";
  document.getElementById("nextQuestionBtn").style.pointerEvents = "none";
}

function selectOption(index) {
  if (quizState.answered) return;

  const q = quizState.questions[quizState.currentQuestion];
  const isCorrect = index === q.correct;
  quizState.answered = true;

  const options = document.querySelectorAll("#optionsContainer > div");
  options.forEach((opt, i) => {
    opt.style.cursor = "default";
    opt.style.pointerEvents = "none";

    if (i === q.correct) {
      opt.style.borderColor = "var(--accent-sql, #8ec07c)";
      opt.style.background = "rgba(142, 192, 124, 0.12)";
      const letterSpan = opt.querySelector("span:first-child");
      if (letterSpan) {
        letterSpan.style.borderColor = "var(--accent-sql, #8ec07c)";
        letterSpan.style.background = "rgba(142, 192, 124, 0.2)";
        letterSpan.style.color = "var(--accent-sql, #8ec07c)";
      }
    }

    if (i === index && !isCorrect) {
      opt.style.borderColor = "var(--accent-html, #f3a072)";
      opt.style.background = "rgba(243, 160, 114, 0.12)";
      const letterSpan = opt.querySelector("span:first-child");
      if (letterSpan) {
        letterSpan.style.borderColor = "var(--accent-html, #f3a072)";
        letterSpan.style.background = "rgba(243, 160, 114, 0.2)";
        letterSpan.style.color = "var(--accent-html, #f3a072)";
      }
    }
  });

  if (isCorrect) quizState.score++;

  const explanationContainer = document.getElementById("explanationContainer");
  const explanationText = document.getElementById("explanationText");
  explanationText.textContent = q.explanation;
  explanationContainer.style.display = "block";

  const nextBtn = document.getElementById("nextQuestionBtn");
  nextBtn.style.opacity = "1";
  nextBtn.style.pointerEvents = "auto";
}

function nextQuestion() {
  if (quizState.currentQuestion < quizState.questions.length - 1) {
    quizState.currentQuestion++;
    renderQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  if (quizState.timer) clearInterval(quizState.timer);

  quizState.timeLeft = 120;
  updateTimerDisplay();

  quizState.timer = setInterval(() => {
    quizState.timeLeft--;
    updateTimerDisplay();

    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timer);
      endQuiz(true);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(quizState.timeLeft / 60);
  const seconds = quizState.timeLeft % 60;
  const display = document.getElementById("timerDisplay");
  display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  if (quizState.timeLeft <= 10) {
    display.style.color = "var(--accent-html, #f3a072)";
    display.style.animation = "pulseTimer 1s ease-in-out infinite";
  } else {
    display.style.color = "var(--accent-js, #f0c674)";
    display.style.animation = "none";
  }
}

function endQuiz(timeUp = false) {
  if (quizState.timer) {
    clearInterval(quizState.timer);
    quizState.timer = null;
  }

  const total = quizState.questions.length;
  const score = quizState.score;
  const passed = score === total;

  const quizContent = document.getElementById("quizContent");
  const quizResults = document.getElementById("quizResults");
  quizContent.style.display = "none";
  quizResults.style.display = "block";

  const emoji = passed ? "🎉" : timeUp ? "⏰" : "😅";
  const title = passed
    ? "Level Complete!"
    : timeUp ? "Time's Up!" : "Keep Practicing!";
  let message = `You scored ${score}/${total}!`;

  if (passed) {
    message += " 🌟 Perfect score! You've mastered switch statements!";
  } else if (timeUp) {
    message += ` ⏱️ You ran out of time. Need ${total}/${total} to pass.`;
  } else {
    message += ` Need ${total}/${total} to pass. Review the material and try again!`;
  }

  document.getElementById("resultEmoji").textContent = emoji;
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMessage").textContent = message;

  if (passed) {
    const progress = JSON.parse(localStorage.getItem("levelProgress")) || {};
    progress["level39"] = true;
    localStorage.setItem("levelProgress", JSON.stringify(progress));

    const nextBtn = document.getElementById("nextLevelBtn");
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.href = "level40.html";
    }
  }
}

function closeQuiz() {
  if (quizState.timer) {
    clearInterval(quizState.timer);
    quizState.timer = null;
  }
  const overlay = document.getElementById("quizOverlay");
  if (overlay) {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }
}

function retryQuiz() {
  const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
  quizState = {
    questions: shuffledQuestions.slice(0, 10),
    currentQuestion: 0,
    score: 0,
    answered: false,
    timeLeft: 120,
    timer: null
  };

  const quizResults = document.getElementById("quizResults");
  const quizContent = document.getElementById("quizContent");
  quizResults.style.display = "none";
  quizContent.style.display = "block";
  renderQuestion();
  startTimer();
}

document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById("typedTitle");
  const text = "Switch Statements";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  if (reduceMotion) {
    el.textContent = text;
    return;
  }

  let i = 0;
  function step() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) setTimeout(step, 35);
  }
  step();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { startQuiz, QUIZ_QUESTIONS };
}
