/**
 * Level 31: console.log and Comments
 * 
 * This file demonstrates the use of console.log() and comments
 * in JavaScript. All code here will run when the page loads.
 */

// ============================================
// SINGLE-LINE COMMENTS
// ============================================

// This is a single-line comment
// It explains what the code below does
// Use // for brief explanations

// ============================================
// MULTI-LINE COMMENTS
// ============================================

/* 
   This is a multi-line comment
   It can span multiple lines
   Useful for longer explanations
   or documenting complex code
*/

// ============================================
// CONSOLE.LOG() EXAMPLES
// ============================================

// Log a simple greeting to the console
console.log("Hello World!");

// Log a welcome message
console.log("Welcome to JavaScript!");

// Log the result of a math operation
console.log(2 + 2);

// Log multiple items with one console.log
console.log("The answer is:", 4);

// Log different data types
console.log("String", 42, true, null, undefined);

// ============================================
// CONSOLE.LOG() WITH VARIABLES
// ============================================

// Create some variables
const userName = "Full-Stack Developer";
const userAge = 31;
const isLearning = true;

// Log variables
console.log("User:", userName);
console.log("Age:", userAge);
console.log("Is learning?", isLearning);

// ============================================
// CONSOLE.LOG() WITH EXPRESSIONS
// ============================================

console.log("15 + 27 =", 15 + 27);
console.log("100 - 45 =", 100 - 45);
console.log("6 * 8 =", 6 * 8);
console.log("144 / 12 =", 144 / 12);

// ============================================
// STYLING CONSOLE OUTPUT
// ============================================

// You can add CSS styling to console.log
console.log(
  "%c🌟 Level 31 Complete!",
  "font-size: 20px; color: #f0c674; font-weight: bold;"
);
console.log(
  "%cGreat job learning console.log and comments!",
  "font-size: 14px; color: #8ec07c;"
);

// ============================================
// QUIZ SYSTEM
// ============================================

// Quiz questions database
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does console.log() do in JavaScript?",
    options: [
      "A) Displays output in the browser's console",
      "B) Creates a new JavaScript file",
      "C) Deletes browser cookies",
      "D) Opens a new browser window"
    ],
    correct: 0,
    explanation:
      "console.log() is used to print or display output in the browser's console, which is helpful for debugging."
  },
  {
    id: 2,
    question:
      "Which of the following is a correct way to write a single-line comment in JavaScript?",
    options: [
      "A) # This is a comment",
      "B) // This is a comment",
      "C) /* This is a comment */",
      "D) <!-- This is a comment -->"
    ],
    correct: 1,
    explanation:
      "// is used for single-line comments in JavaScript. /* */ is for multi-line comments."
  },
  {
    id: 3,
    question: "What will console.log('Hello' + 'World') output?",
    options: [
      "A) Hello World",
      "B) HelloWorld",
      "C) Hello+World",
      "D) Error: Invalid operation"
    ],
    correct: 1,
    explanation:
      "The + operator with strings concatenates them, producing 'HelloWorld' without a space."
  },
  {
    id: 4,
    question: "Which type of comment is this: /* This is a comment */",
    options: [
      "A) Single-line comment",
      "B) Multi-line comment",
      "C) HTML comment",
      "D) CSS comment"
    ],
    correct: 1,
    explanation:
      "/* */ creates a multi-line comment that can span multiple lines in JavaScript."
  },
  {
    id: 5,
    question: "What does console.log(2 + 2) display in the console?",
    options: ["A) '2 + 2'", "B) 22", "C) 4", "D) Error"],
    correct: 2,
    explanation:
      "JavaScript evaluates the expression 2 + 2 and outputs the result, which is 4."
  },
  {
    id: 6,
    question: "How do you log multiple items with a single console.log()?",
    options: [
      "A) console.log('Item1', 'Item2', 'Item3')",
      "B) console.log('Item1' + 'Item2' + 'Item3')",
      "C) Both A and B",
      "D) console.log(['Item1', 'Item2', 'Item3'])"
    ],
    correct: 2,
    explanation:
      "You can pass multiple arguments separated by commas to console.log(), like console.log('Item1', 'Item2', 'Item3') and you can also use concatenation console.log('Item1' + 'Item2' + 'Item3')."
  },
  {
    id: 7,
    question: "What is the purpose of comments in code?",
    options: [
      "A) To make the code run faster",
      "B) To explain code and make it more readable",
      "C) To hide code from execution",
      "D) Both B and C"
    ],
    correct: 3,
    explanation:
      "Comments help explain code for developers and can also be used to temporarily prevent code from executing (commenting out)."
  },
  {
    id: 8,
    question: "Which statement is true about console.log()?",
    options: [
      "A) It can only log strings",
      "B) It can log different data types",
      "C) It cannot be used with variables",
      "D) It only works in Node.js"
    ],
    correct: 1,
    explanation:
      "console.log() can log strings, numbers, booleans, objects, arrays, and other data types."
  },
  {
    id: 9,
    question: "What will be logged? let x = 5; console.log('Value:', x);",
    options: ["A) Value: x", "B) Value: 5", "C) 'Value:' 5", "D) undefined"],
    correct: 1,
    explanation:
      "The first argument is the string 'Value:', and the second is the value of variable x, which is 5."
  },
  {
    id: 10,
    question: "How can you style console.log() output with CSS?",
    options: [
      "A) Use %c and pass CSS styles as arguments",
      "B) Use %s for CSS styling",
      "C) Use console.logCSS() method",
      "D) It's not possible to style console output"
    ],
    correct: 0,
    explanation:
      "You can use %c in the string and pass CSS styles as the next argument to style console output."
  }
];

// Quiz state
let quizState = {
  questions: [],
  currentQuestion: 0,
  score: 0,
  answered: false,
  timeLeft: 60,
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
                        ">Level 31 Quiz</h2>
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
                            ">1:00</span>
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
  if (progress["level31"]) {
    alert("✅ You have already completed this level!");
    const nextBtn = document.getElementById("nextLevelBtn");
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.href = "level32.html";
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
    timeLeft: 60,
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

/**
 * Update timer display
 */
function updateTimerDisplay() {
  const minutes = Math.floor(quizState.timeLeft / 60);
  const seconds = quizState.timeLeft % 60;
  const display = document.getElementById("timerDisplay");
  display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  if (quizState.timeLeft <= 10) {
    display.style.color = "var(--accent-html, #f3a072)";
  } else {
    display.style.color = "var(--accent-js, #f0c674)";
  }
}

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
    message += " 🌟 Perfect score! Amazing work!";
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
    progress["level31"] = true;
    localStorage.setItem("levelProgress", JSON.stringify(progress));

    // Update UI
    const nextBtn = document.getElementById("nextLevelBtn");
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.href = "level32.html";
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
  const text = "console.log() & Comments";
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
