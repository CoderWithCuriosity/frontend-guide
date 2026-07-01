/**
 * Level 44: Return Values
 * 
 * This file demonstrates return values in JavaScript.
 * All code here will run when the page loads.
 */

// ============================================
// FUNCTION THAT RETURNS A VALUE
// ============================================

console.log("--- Function that Returns a Value ---");

function add(a, b) {
    return a + b;
}

let result = add(5, 3);
console.log("add(5, 3) =", result);
console.log("add(10, 20) =", add(10, 20));
console.log("add(100, 50) =", add(100, 50));

// ============================================
// RETURN STRING
// ============================================

console.log("\n--- Return String ---");

function greet(name) {
    return "Hello " + name + "!";
}

let greeting = greet("John");
console.log(greeting);
console.log(greet("Alice"));
console.log(greet("Bob"));

// ============================================
// RETURN BOOLEAN
// ============================================

console.log("\n--- Return Boolean ---");

function isEven(number) {
    if (number % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

console.log("isEven(4) =", isEven(4));
console.log("isEven(7) =", isEven(7));
console.log("isEven(10) =", isEven(10));

// ============================================
// MULTIPLE RETURN STATEMENTS
// ============================================

console.log("\n--- Multiple Return Statements ---");

function checkNumber(num) {
    if (num > 0) {
        return "Positive";
    } else if (num < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}

console.log("checkNumber(5) =", checkNumber(5));
console.log("checkNumber(-3) =", checkNumber(-3));
console.log("checkNumber(0) =", checkNumber(0));

// ============================================
// RETURN EARLY EXIT
// ============================================

console.log("\n--- Return Early Exit ---");

function getMessage(isLoggedIn) {
    if (!isLoggedIn) {
        return "Please log in first";
    }
    return "Welcome to the dashboard!";
}

console.log("getMessage(false) =", getMessage(false));
console.log("getMessage(true) =", getMessage(true));

// ============================================
// STORING RETURN VALUES
// ============================================

console.log("\n--- Storing Return Values ---");

function multiply(a, b) {
    return a * b;
}

let product1 = multiply(4, 5);
let product2 = multiply(7, 8);
let product3 = multiply(3, 10);

console.log("product1 =", product1);
console.log("product2 =", product2);
console.log("product3 =", product3);
console.log("Total =", product1 + product2 + product3);

// ============================================
// USING RETURN VALUES IN EXPRESSIONS
// ============================================

console.log("\n--- Using Return Values in Expressions ---");

function square(num) {
    return num * num;
}

console.log("square(5) + square(3) =", square(5) + square(3));
console.log("square(10) - square(6) =", square(10) - square(6));

// ============================================
// CHAINING FUNCTIONS
// ============================================

console.log("\n--- Chaining Functions ---");

function double(num) {
    return num * 2;
}

function addTen(num) {
    return num + 10;
}

let number = 5;
let resultChain = addTen(double(number));
console.log("double(5) =", double(5));
console.log("addTen(double(5)) =", addTen(double(5)));

// ============================================
// RETURN DIFFERENT DATA TYPES
// ============================================

console.log("\n--- Return Different Data Types ---");

function getInfo(type) {
    if (type === "number") {
        return 42;
    } else if (type === "string") {
        return "Hello World";
    } else if (type === "boolean") {
        return true;
    } else {
        return null;
    }
}

console.log("getInfo('number') =", getInfo("number"));
console.log("getInfo('string') =", getInfo("string"));
console.log("getInfo('boolean') =", getInfo("boolean"));
console.log("getInfo('other') =", getInfo("other"));

// ============================================
// NO RETURN (UNDEFINED)
// ============================================

console.log("\n--- No Return (Undefined) ---");

function noReturn() {
    let x = 5;
    let y = 3;
    let sum = x + y;
    // No return statement
}

let noReturnResult = noReturn();
console.log("noReturn() =", noReturnResult);

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What does the return statement do?',
        options: [
            "Stops the function and sends a value back",
            "Continues the function execution",
            "Creates a new variable",
            "Restarts the function"
        ],
        correct: 0,
        explanation: 'The return statement stops function execution and sends a value back to the caller.'
    },
    {
        id: 2,
        question: 'What is the output: function add(a, b) { return a + b; } console.log(add(5, 3));',
        options: [
            "8",
            "53",
            "5 + 3",
            "Error"
        ],
        correct: 0,
        explanation: 'add(5, 3) returns 8, so console.log outputs 8.'
    },
    {
        id: 3,
        question: 'What is the output: function greet() { return "Hello"; } let message = greet(); console.log(message);',
        options: [
            "Hello",
            "undefined",
            "Error",
            "null"
        ],
        correct: 0,
        explanation: 'greet() returns "Hello", which is stored in message and then printed.'
    },
    {
        id: 4,
        question: 'What happens if a function has no return statement?',
        options: [
            "It returns undefined",
            "It returns null",
            "It causes an error",
            "It returns 0"
        ],
        correct: 0,
        explanation: 'Functions without a return statement return undefined by default.'
    },
    {
        id: 5,
        question: 'What is the output: function isEven(num) { if (num % 2 === 0) { return true; } return false; } console.log(isEven(4));',
        options: [
            "true",
            "false",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: '4 is even, so the function returns true.'
    },
    {
        id: 6,
        question: 'What is the output: function double(n) { return n * 2; } let x = double(3); console.log(x + 1);',
        options: [
            "7",
            "6",
            "8",
            "Error"
        ],
        correct: 0,
        explanation: 'double(3) returns 6, x = 6, then 6 + 1 = 7.'
    },
    {
        id: 7,
        question: 'Can a function return different data types?',
        options: [
            "Yes",
            "No",
            "Only numbers",
            "Only strings"
        ],
        correct: 0,
        explanation: 'Yes, functions can return different data types based on the logic inside them.'
    },
    {
        id: 8,
        question: 'What is the output: function test() { return "A"; console.log("B"); } console.log(test());',
        options: [
            "A",
            "A B",
            "B",
            "Error"
        ],
        correct: 0,
        explanation: 'return stops the function, so "B" is never logged. Only "A" is output.'
    },
    {
        id: 9,
        question: 'What is the output: function max(a, b) { if (a > b) { return a; } else { return b; } } console.log(max(5, 10));',
        options: [
            "10",
            "5",
            "15",
            "Error"
        ],
        correct: 0,
        explanation: '5 > 10 is false, so b (10) is returned.'
    },
    {
        id: 10,
        question: 'What is the output: function sum(a, b, c) { return a + b + c; } let result = sum(1, 2, 3); console.log(result * 2);',
        options: [
            "12",
            "6",
            "3",
            "Error"
        ],
        correct: 0,
        explanation: 'sum(1, 2, 3) returns 6, then 6 * 2 = 12.'
    },
    {
        id: 11,
        question: 'What is the output: function getLength(str) { return str.length; } console.log(getLength("Hello"));',
        options: [
            "5",
            "Hello",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: '"Hello".length is 5, so the function returns 5.'
    },
    {
        id: 12,
        question: 'What is the output: function calculate(a, b) { return a * b; } console.log(calculate(3, 4) + calculate(5, 2));',
        options: [
            "22",
            "12",
            "10",
            "Error"
        ],
        correct: 0,
        explanation: '3 * 4 = 12, 5 * 2 = 10, 12 + 10 = 22.'
    },
    {
        id: 13,
        question: 'What is the output: function checkAge(age) { if (age >= 18) { return "Adult"; } return "Minor"; } console.log(checkAge(20));',
        options: [
            "Adult",
            "Minor",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: '20 >= 18 is true, so "Adult" is returned.'
    },
    {
        id: 14,
        question: 'What is the output: function message() { return "Hello"; return "Goodbye"; } console.log(message());',
        options: [
            "Hello",
            "Goodbye",
            "Hello Goodbye",
            "Error"
        ],
        correct: 0,
        explanation: 'The first return stops the function, so only "Hello" is returned.'
    },
    {
        id: 15,
        question: 'What is the output: function square(n) { return n * n; } let x = square(4); console.log(x);',
        options: [
            "16",
            "8",
            "4",
            "Error"
        ],
        correct: 0,
        explanation: 'square(4) returns 4 * 4 = 16.'
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
    if (document.getElementById('quizModal')) {
        return document.getElementById('quizModal');
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
                        
                        <h2 style="
                            font-family: var(--font-mono, monospace);
                            font-size: 1.1rem;
                            font-weight: 600;
                            color: var(--text-primary, #e9e9f5);
                            margin: 0;
                        ">Level 44 Quiz</h2>
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

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);

    const style = document.createElement('style');
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

    document.getElementById('closeQuizBtn').addEventListener('click', closeQuiz);
    document.getElementById('closeResultsBtn').addEventListener('click', closeQuiz);
    document.getElementById('retryQuizBtn').addEventListener('click', retryQuiz);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);

    document.getElementById('quizOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeQuiz();
    });

    return document.getElementById('quizModal');
}

function startQuiz(event) {
    if (event) event.preventDefault();

    const progress = JSON.parse(localStorage.getItem('levelProgress')) || {};
    if (progress['level44']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level45.html';
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
    const overlay = document.getElementById('quizOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    quizContent.style.display = 'block';
    quizResults.style.display = 'none';
    document.getElementById('nextQuestionBtn').style.opacity = '0.5';
    document.getElementById('nextQuestionBtn').style.pointerEvents = 'none';

    renderQuestion();
    startTimer();
}

function renderQuestion() {
    const q = quizState.questions[quizState.currentQuestion];
    const total = quizState.questions.length;

    document.getElementById('progressDisplay').textContent = `${quizState.currentQuestion + 1} / ${total}`;
    document.getElementById('progressBar').style.width = `${((quizState.currentQuestion + 1) / total) * 100}%`;
    document.getElementById('questionNumber').textContent = quizState.currentQuestion + 1;
    document.getElementById('questionText').innerHTML = q.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
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
        const letterSpan = document.createElement('span');
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

        const textSpan = document.createElement('span');
        textSpan.textContent = option;
        optionDiv.appendChild(textSpan);

        optionDiv.addEventListener('click', () => selectOption(index));
        optionDiv.addEventListener('mouseenter', () => {
            if (!quizState.answered) {
                optionDiv.style.borderColor = 'var(--border, #34344f)';
                optionDiv.style.background = 'var(--bg-panel-alt, #23233a)';
            }
        });
        optionDiv.addEventListener('mouseleave', () => {
            if (!quizState.answered) {
                optionDiv.style.borderColor = 'var(--border-soft, #2a2a40)';
                optionDiv.style.background = 'var(--bg-base-2, #1b1b29)';
            }
        });

        optionsContainer.appendChild(optionDiv);
    });

    quizState.answered = false;
    document.getElementById('explanationContainer').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.opacity = '0.5';
    document.getElementById('nextQuestionBtn').style.pointerEvents = 'none';
}

function selectOption(index) {
    if (quizState.answered) return;

    const q = quizState.questions[quizState.currentQuestion];
    const isCorrect = index === q.correct;
    quizState.answered = true;

    const options = document.querySelectorAll('#optionsContainer > div');
    options.forEach((opt, i) => {
        opt.style.cursor = 'default';
        opt.style.pointerEvents = 'none';
        
        if (i === q.correct) {
            opt.style.borderColor = 'var(--accent-sql, #8ec07c)';
            opt.style.background = 'rgba(142, 192, 124, 0.12)';
            const letterSpan = opt.querySelector('span:first-child');
            if (letterSpan) {
                letterSpan.style.borderColor = 'var(--accent-sql, #8ec07c)';
                letterSpan.style.background = 'rgba(142, 192, 124, 0.2)';
                letterSpan.style.color = 'var(--accent-sql, #8ec07c)';
            }
        }
        
        if (i === index && !isCorrect) {
            opt.style.borderColor = 'var(--accent-html, #f3a072)';
            opt.style.background = 'rgba(243, 160, 114, 0.12)';
            const letterSpan = opt.querySelector('span:first-child');
            if (letterSpan) {
                letterSpan.style.borderColor = 'var(--accent-html, #f3a072)';
                letterSpan.style.background = 'rgba(243, 160, 114, 0.2)';
                letterSpan.style.color = 'var(--accent-html, #f3a072)';
            }
        }
    });

    if (isCorrect) quizState.score++;

    const explanationContainer = document.getElementById('explanationContainer');
    const explanationText = document.getElementById('explanationText');
    explanationText.textContent = q.explanation;
    explanationContainer.style.display = 'block';

    const nextBtn = document.getElementById('nextQuestionBtn');
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
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
    const display = document.getElementById('timerDisplay');
    display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (quizState.timeLeft <= 10) {
        display.style.color = 'var(--accent-html, #f3a072)';
        display.style.animation = 'pulseTimer 1s ease-in-out infinite';
    } else {
        display.style.color = 'var(--accent-js, #f0c674)';
        display.style.animation = 'none';
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

    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    quizContent.style.display = 'none';
    quizResults.style.display = 'block';

    const emoji = passed ? '🎉' : (timeUp ? '⏰' : '😅');
    const title = passed ? 'Level Complete!' : (timeUp ? "Time's Up!" : 'Keep Practicing!');
    let message = `You scored ${score}/${total}!`;
    
    if (passed) {
        message += ' 🌟 Perfect score! You\'ve mastered return values!';
    } else if (timeUp) {
        message += ` ⏱️ You ran out of time. Need ${total}/${total} to pass.`;
    } else {
        message += ` Need ${total}/${total} to pass. Review the material and try again!`;
    }

    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;

    if (passed) {
        const progress = JSON.parse(localStorage.getItem('levelProgress')) || {};
        progress['level44'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level45.html';
        }
    }
}

function closeQuiz() {
    if (quizState.timer) {
        clearInterval(quizState.timer);
        quizState.timer = null;
    }
    const overlay = document.getElementById('quizOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
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

    const quizResults = document.getElementById('quizResults');
    const quizContent = document.getElementById('quizContent');
    quizResults.style.display = 'none';
    quizContent.style.display = 'block';
    renderQuestion();
    startTimer();
}

document.addEventListener('DOMContentLoaded', function() {
    const el = document.getElementById('typedTitle');
    const text = 'Return Values';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startQuiz, QUIZ_QUESTIONS };
}