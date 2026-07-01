/**
 * Level 32: Variables: let & const
 * 
 * This file demonstrates the use of let and const variables
 * in JavaScript. All code here will run when the page loads.
 */

// ============================================
// LET VARIABLES (Can Change)
// ============================================

console.log("--- let Variables (Can Change) ---");
let name = "John";
let age = 25;
let city = "New York";

console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// We can reassign let variables
name = "Jane";
age = 26;
city = "Los Angeles";

console.log("\n--- After Changing let Variables ---");
console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// ============================================
// CONST VARIABLES (Cannot Change)
// ============================================

console.log("\n--- const Variables (Cannot Change) ---");
const PI = 3.14159;
const BIRTH_YEAR = 1998;
const COUNTRY = "USA";

console.log("PI:", PI);
console.log("Birth Year:", BIRTH_YEAR);
console.log("Country:", COUNTRY);

// ============================================
// DIFFERENT DATA TYPES
// ============================================

console.log("\n--- Different Data Types ---");
const GREETING = "Hello World!";
const IS_LEARNING = true;
const SCORE = 95;

console.log("Greeting:", GREETING);
console.log("Is Learning:", IS_LEARNING);
console.log("Score:", SCORE);

// ============================================
// SUMMARY
// ============================================

console.log("\n--- Summary ---");
console.log("Use 'let' when the value might change");
console.log("Use 'const' when the value should stay constant");
console.log("Always use 'const' by default, use 'let' only when needed");

// ============================================
// QUIZ SYSTEM
// ============================================

// Quiz questions database
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question:
      "Which keyword is used to declare a variable that CAN be reassigned?",
    options: ["A) const", "B) let", "C) var", "D) Both B and C"],
    correct: 1,
    explanation:
      "'let' is used for variables that can be reassigned. 'var' also allows reassignment but has different scoping rules."
  },
  {
    id: 2,
    question: "What happens if you try to reassign a const variable?",
    options: [
      "A) It works normally",
      "B) It throws a TypeError",
      "C) It creates a new variable",
      "D) It returns undefined"
    ],
    correct: 1,
    explanation:
      "Reassigning a const variable throws a TypeError because const variables cannot be reassigned after declaration."
  },
  {
    id: 3,
    question: "Which declaration is preferred by default in modern JavaScript?",
    options: ["A) var", "B) let", "C) const", "D) None of the above"],
    correct: 2,
    explanation:
      "const is preferred by default because it makes your code more predictable and prevents accidental reassignment."
  },
  {
    id: 4,
    question: "What will be the output? let x = 5; x = 10; console.log(x);",
    options: ["A) 5", "B) 10", "C) undefined", "D) Error"],
    correct: 1,
    explanation:
      "The let variable x is reassigned from 5 to 10, so console.log outputs 10."
  },
  {
    id: 5,
    question: "What will be the output? const y = 5; y = 10; console.log(y);",
    options: ["A) 5", "B) 10", "C) undefined", "D) TypeError"],
    correct: 3,
    explanation:
      "This throws a TypeError because const variables cannot be reassigned. The code would not reach console.log."
  },
  {
    id: 6,
    question: "Which of the following is a valid const declaration?",
    options: [
      "A) const name;",
      "B) const name = 'John';",
      "C) const name = 'John'; name = 'Jane';",
      "D) Both A and B"
    ],
    correct: 1,
    explanation:
      "const variables must be initialized at declaration and cannot be reassigned. Option B is correct, Option A is invalid (needs initialization), Option C attempts reassignment."
  },
  {
    id: 7,
    question: "What is the difference between let and const?",
    options: [
      "A) let can be reassigned, const cannot",
      "B) let is block-scoped, const is function-scoped",
      "C) let is for numbers, const is for strings",
      "D) There is no difference"
    ],
    correct: 0,
    explanation:
      "The key difference is that let variables can be reassigned, while const variables cannot be reassigned after initialization."
  },
  {
    id: 8,
    question: "Which of these is a best practice for variable declaration?",
    options: [
      "A) Use var for all variables",
      "B) Use let for all variables",
      "C) Use const by default, let only when reassignment is needed",
      "D) Use const for numbers only"
    ],
    correct: 2,
    explanation:
      "Modern JavaScript best practice is to use const by default and only use let when you know the variable needs to be reassigned."
  },
  {
    id: 9,
    question: "Can you declare a const variable without assigning a value?",
    options: [
      "A) Yes, it will be undefined",
      "B) Yes, it will be null",
      "C) No, it must be initialized",
      "D) Yes, but only in strict mode"
    ],
    correct: 2,
    explanation:
      "const declarations must be initialized with a value. const name; is invalid and will throw a SyntaxError."
  },
  {
    id: 10,
    question:
      "What will be logged? let a = 1; let b = a; a = 2; console.log(b);",
    options: ["A) 1", "B) 2", "C) undefined", "D) Error"],
    correct: 0,
    explanation:
      "b stores the value of a at the time of assignment (1). Changing a later doesn't affect b because primitive values are copied by value."
  },
  {
    id: 11,
    question: "Which of the following is a valid JavaScript variable name?",
    options: ["A) 1name", "B) first-name", "C) firstName", "D) first name"],
    correct: 2,
    explanation:
      "Variable names cannot start with a number, contain spaces, or use hyphens. 'firstName' is valid."
  },
  {
    id: 12,
    question: "What character can a JavaScript variable name start with?",
    options: [
      "A) A number",
      "B) A hyphen (-)",
      "C) A letter, underscore (_), or dollar sign ($)",
      "D) A space"
    ],
    correct: 2,
    explanation:
      "JavaScript variable names must start with a letter, underscore (_), or dollar sign ($)."
  },
  {
    id: 13,
    question: "Which variable declaration is INVALID?",
    options: [
      "A) let userName;",
      "B) let _count;",
      "C) let $price;",
      "D) let 2users;"
    ],
    correct: 3,
    explanation:
      "Variable names cannot begin with a number. '2users' is invalid."
  },
  {
    id: 14,
    question: "Are JavaScript variable names case-sensitive?",
    options: ["A) Yes", "B) No", "C) Only with const", "D) Only with let"],
    correct: 0,
    explanation:
      "JavaScript variable names are case-sensitive. 'userName' and 'username' are different variables."
  },
  {
    id: 15,
    question:
      "Which of the following variable names follows common JavaScript naming conventions?",
    options: ["A) user_name", "B) UserName", "C) userName", "D) USERNAME"],
    correct: 2,
    explanation:
      "JavaScript commonly uses camelCase for variable names, such as 'userName'."
  },
  {
    id: 16,
    question:
      "What happens if you use a JavaScript reserved keyword as a variable name?",
    options: [
      "A) It works normally",
      "B) It becomes undefined",
      "C) It causes a SyntaxError",
      "D) JavaScript automatically renames it"
    ],
    correct: 2,
    explanation:
      "Reserved keywords such as 'let', 'const', 'if', and 'for' cannot be used as variable names."
  },
  {
    id: 17,
    question: "Which of the following is NOT a valid variable name?",
    options: ["A) user123", "B) _user", "C) $user", "D) user-name"],
    correct: 3,
    explanation:
      "Hyphens are not allowed in variable names because JavaScript treats '-' as the subtraction operator."
  },
  {
    id: 18,
    question: "Which declaration will cause an error?",
    options: [
      "A) let userName = 'John';",
      "B) let user_name = 'John';",
      "C) let first name = 'John';",
      "D) let $name = 'John';"
    ],
    correct: 2,
    explanation:
      "Variable names cannot contain spaces. 'first name' is invalid."
  },
  {
    id: 19,
    question: "Which variable name starts with an allowed special character?",
    options: ["A) @price", "B) #price", "C) $price", "D) &price"],
    correct: 2,
    explanation:
      "The dollar sign ($) is allowed at the beginning of JavaScript variable names."
  },
  {
    id: 20,
    question: "Which statement about JavaScript variable names is TRUE?",
    options: [
      "A) They can start with numbers",
      "B) They can contain spaces",
      "C) They can use reserved keywords",
      "D) They are case-sensitive"
    ],
    correct: 3,
    explanation:
      "JavaScript variable names are case-sensitive. Numbers cannot be the first character, spaces are not allowed, and reserved keywords cannot be used."
  }
];

// Quiz state
let quizState = {
  questions: [],
  currentQuestion: 0,
  score: 0,
  answered: false,
  timeLeft: 120, // 2 minutes
  timer: null
};

// DOM elements
let quizModal, quizContent, quizResults;

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Create and inject quiz modal into DOM
 */
function createQuizModal() {
  // Check if modal already exists
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
                <!-- Modal Header -->
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
                        
                        <h2 style="
                            font-family: var(--font-mono, monospace);
                            font-size: 1.1rem;
                            font-weight: 600;
                            color: var(--text-primary, #e9e9f5);
                            margin: 0;
                        ">Level 32 Quiz</h2>
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

                <!-- Quiz Content -->
                <div id="quizContent" style="padding: 32px 24px 24px;">
                    <!-- Timer & Progress -->
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
                            
                            <span id="timerDisplay" style="
                                font-weight: 600;
                                color: var(--accent-js, #f0c674);
                                font-size: 1.1rem;
                            ">2:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            
                            <span id="progressDisplay">1 / 10</span>
                        </div>
                    </div>

                    <!-- Progress Bar -->
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

                    <!-- Question -->
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

                    <!-- Options -->
                    <div id="optionsContainer" style="
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-bottom: 24px;
                    "></div>

                    <!-- Explanation (hidden initially) -->
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

                    <!-- Buttons -->
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

                <!-- Results (hidden initially) -->
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
                        ">Retry</button>
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

  // Append modal to body
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);

  // Add styles for animations
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
        .option-hover:hover:not(.answered) {
            border-color: var(--border, #34344f) !important;
            background: var(--bg-panel-alt, #23233a) !important;
        }
    `;
  document.head.appendChild(style);

  // Store references
  quizModal = document.getElementById("quizModal");
  quizContent = document.getElementById("quizContent");
  quizResults = document.getElementById("quizResults");

  // Add event listeners
  document.getElementById("closeQuizBtn").addEventListener("click", closeQuiz);
  document
    .getElementById("closeResultsBtn")
    .addEventListener("click", closeQuiz);
  document.getElementById("retryQuizBtn").addEventListener("click", retryQuiz);
  document
    .getElementById("nextQuestionBtn")
    .addEventListener("click", nextQuestion);

  // Close on overlay click
  document.getElementById("quizOverlay").addEventListener("click", function(e) {
    if (e.target === this) closeQuiz();
  });

  return quizModal;
}

/**
 * Start the quiz
 */
function startQuiz(event) {
  if (event) event.preventDefault();

  // Check if quiz is already completed
  const progress = JSON.parse(localStorage.getItem("levelProgress")) || {};
  if (progress["level32"]) {
    alert("✅ You have already completed this level!");
    const nextBtn = document.getElementById("nextLevelBtn");
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.href = "level33.html";
    }
    return;
  }

  // Reset quiz state
  const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
  quizState = {
    questions: shuffledQuestions,
    currentQuestion: 0,
    score: 0,
    answered: false,
    timeLeft: 120, // 2 minutes
    timer: null
  };

  // Show modal
  const modal = createQuizModal();
  const overlay = document.getElementById("quizOverlay");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Reset UI
  quizContent.style.display = "block";
  quizResults.style.display = "none";
  document.getElementById("nextQuestionBtn").style.opacity = "0.5";
  document.getElementById("nextQuestionBtn").style.pointerEvents = "none";

  // Render first question
  renderQuestion();

  // Start timer
  startTimer();
}

/**
 * Render current question
 */
function renderQuestion() {
  const q = quizState.questions[quizState.currentQuestion];
  const total = quizState.questions.length;

  // Update progress
  document.getElementById(
    "progressDisplay"
  ).textContent = `${quizState.currentQuestion + 1} / ${total}`;
  document.getElementById(
    "progressBar"
  ).style.width = `${(quizState.currentQuestion + 1) / total * 100}%`;
  document.getElementById("questionNumber").textContent =
    quizState.currentQuestion + 1;
  document.getElementById("questionText").innerHTML = q.question;

  // Render options
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

    // Letter indicator
    const letter = String.fromCharCode(65 + index); // A, B, C, D
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
    textSpan.textContent = option.replace(/^[A-D]\)\s*/, ""); // Remove letter prefix if present
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

  // Reset answered state
  quizState.answered = false;
  document.getElementById("explanationContainer").style.display = "none";
  document.getElementById("nextQuestionBtn").style.opacity = "0.5";
  document.getElementById("nextQuestionBtn").style.pointerEvents = "none";
}

/**
 * Handle option selection
 */
function selectOption(index) {
  if (quizState.answered) return;

  const q = quizState.questions[quizState.currentQuestion];
  const isCorrect = index === q.correct;
  quizState.answered = true;

  // Highlight correct/incorrect
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

  // Update score
  if (isCorrect) quizState.score++;

  // Show explanation
  const explanationContainer = document.getElementById("explanationContainer");
  const explanationText = document.getElementById("explanationText");
  explanationText.textContent = q.explanation;
  explanationContainer.style.display = "block";

  // Show next button
  const nextBtn = document.getElementById("nextQuestionBtn");
  nextBtn.style.opacity = "1";
  nextBtn.style.pointerEvents = "auto";
}

/**
 * Go to next question
 */
function nextQuestion() {
  if (quizState.currentQuestion < quizState.questions.length - 1) {
    quizState.currentQuestion++;
    renderQuestion();
    // Restart timer if needed
  } else {
    // Quiz complete
    endQuiz();
  }
}

/**
 * Start timer
 */
function startTimer() {
  if (quizState.timer) clearInterval(quizState.timer);

  quizState.timeLeft = 120; // 2 minutes
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

/**
 * Update timer display
 */
function updateTimerDisplay() {
  const minutes = Math.floor(quizState.timeLeft / 60);
  const seconds = quizState.timeLeft % 60;
  const display = document.getElementById("timerDisplay");
  display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  if (quizState.timeLeft <= 30) {
    display.style.color = "var(--accent-html, #f3a072)";
    // Add pulse animation when time is low
    display.style.animation = "pulseTimer 1s ease-in-out infinite";
  } else {
    display.style.color = "var(--accent-js, #f0c674)";
    display.style.animation = "none";
  }
}

// Add pulse animation for timer
const timerStyle = document.createElement("style");
timerStyle.textContent = `
    @keyframes pulseTimer {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(timerStyle);

/**
 * End quiz
 */
function endQuiz(timeUp = false) {
  if (quizState.timer) {
    clearInterval(quizState.timer);
    quizState.timer = null;
  }

  const total = quizState.questions.length;
  const score = quizState.score;
  const passed = score === total;

  // Show results
  quizContent.style.display = "none";
  quizResults.style.display = "block";

  const emoji = passed ? "🎉" : timeUp ? "⏰" : "😅";
  const title = passed
    ? "Level Complete!"
    : timeUp ? "Time's Up!" : "Keep Practicing!";
  let message = `You scored ${score}/${total}!`;

  if (passed) {
    message += " 🌟 Perfect score! You've mastered let and const!";
  } else if (timeUp) {
    message += ` ⏱️ You ran out of time. Need ${total}/${total} to pass.`;
  } else {
    message += ` Need ${total}/${total} to pass. Review the material and try again!`;
  }

  document.getElementById("resultEmoji").textContent = emoji;
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMessage").textContent = message;

  // Save progress if passed
  if (passed) {
    const progress = JSON.parse(localStorage.getItem("levelProgress")) || {};
    progress["level32"] = true;
    localStorage.setItem("levelProgress", JSON.stringify(progress));

    // Update UI
    const nextBtn = document.getElementById("nextLevelBtn");
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.href = "level33.html";
    }
  }
}

/**
 * Close quiz modal
 */
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

/**
 * Retry quiz
 */
function retryQuiz() {
  // Reset and restart
  const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
  quizState = {
    questions: shuffledQuestions,
    currentQuestion: 0,
    score: 0,
    answered: false,
    timeLeft: 120,
    timer: null
  };

  quizResults.style.display = "none";
  quizContent.style.display = "block";
  renderQuestion();
  startTimer();
}

/**
 * Typewriter effect for the hero title
 */
document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById("typedTitle");
  const text = "Variables: let & const";
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

// Export for use in HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = { startQuiz, QUIZ_QUESTIONS };
}
