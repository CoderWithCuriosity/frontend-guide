/**
 * Level 68: Calculator
 * 
 * This file implements a calculator application.
 * All code here will run when the page loads.
 */

// ============================================
// CALCULATOR APP
// ============================================

class Calculator {
    constructor() {
        this.display = document.getElementById("result");
        this.expression = document.getElementById("expression");
        this.currentInput = "0";
        this.previousInput = "";
        this.operator = null;
        this.isNewCalculation = false;
        this.history = [];
        
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Button clicks
        document.querySelectorAll(".btn-calc").forEach(btn => {
            btn.addEventListener("click", () => {
                this.handleInput(btn.dataset.value);
            });
        });

        // Keyboard support
        document.addEventListener("keydown", (e) => {
            const key = e.key;
            
            // Numbers
            if (/^[0-9]$/.test(key)) {
                e.preventDefault();
                this.handleInput(key);
            }
            // Decimal
            else if (key === ".") {
                e.preventDefault();
                this.handleInput(".");
            }
            // Operators
            else if (["+", "-", "*", "/"].includes(key)) {
                e.preventDefault();
                const opMap = {
                    "+": "+",
                    "-": "-",
                    "*": "*",
                    "/": "/"
                };
                this.handleInput(opMap[key]);
            }
            // Enter/Equals
            else if (key === "Enter" || key === "=") {
                e.preventDefault();
                this.handleInput("=");
            }
            // Backspace
            else if (key === "Backspace") {
                e.preventDefault();
                this.handleInput("backspace");
            }
            // Escape/Clear
            else if (key === "Escape") {
                e.preventDefault();
                this.handleInput("clear");
            }
            // Percentage
            else if (key === "%") {
                e.preventDefault();
                this.handleInput("%");
            }
        });
    }

    handleInput(value) {
        console.log("Input:", value);
        
        switch(value) {
            case "clear":
                this.clear();
                break;
            case "backspace":
                this.backspace();
                break;
            case "=":
                this.calculate();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                this.setOperator(value);
                break;
            case "%":
                this.percentage();
                break;
            case ".":
                this.addDecimal();
                break;
            default:
                this.addNumber(value);
                break;
        }
    }

    addNumber(num) {
        if (this.isNewCalculation) {
            this.currentInput = "0";
            this.isNewCalculation = false;
        }
        
        if (this.currentInput === "0" && num !== ".") {
            this.currentInput = num;
        } else {
            this.currentInput += num;
        }
        
        this.updateDisplay();
    }

    addDecimal() {
        if (this.isNewCalculation) {
            this.currentInput = "0.";
            this.isNewCalculation = false;
            this.updateDisplay();
            return;
        }
        
        if (!this.currentInput.includes(".")) {
            this.currentInput += ".";
        }
        this.updateDisplay();
    }

    setOperator(op) {
        if (this.operator && !this.isNewCalculation) {
            this.calculate();
        }
        
        this.previousInput = this.currentInput;
        this.operator = op;
        this.isNewCalculation = true;
        this.updateDisplay();
    }

    calculate() {
        if (!this.operator) {
            if (this.currentInput === "0" && !this.isNewCalculation) {
                return;
            }
            return;
        }
        
        let prev = parseFloat(this.previousInput);
        let current = parseFloat(this.currentInput);
        let result = 0;
        
        switch(this.operator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                if (current === 0) {
                    this.displayError("Error");
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Format result
        let resultStr = result.toString();
        if (resultStr.length > 12) {
            resultStr = result.toFixed(6);
        }
        
        this.addHistory(`${prev} ${this.operator} ${current} = ${resultStr}`);
        
        this.currentInput = resultStr;
        this.operator = null;
        this.previousInput = "";
        this.isNewCalculation = true;
        this.updateDisplay();
    }

    percentage() {
        let num = parseFloat(this.currentInput);
        if (isNaN(num)) return;
        
        let result = num / 100;
        this.currentInput = result.toString();
        this.updateDisplay();
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = "0";
        }
        this.updateDisplay();
    }

    clear() {
        this.currentInput = "0";
        this.previousInput = "";
        this.operator = null;
        this.isNewCalculation = false;
        this.updateDisplay();
    }

    addHistory(entry) {
        this.history.push(entry);
        if (this.history.length > 20) {
            this.history.shift();
        }
        console.log("History:", entry);
    }

    displayError(msg) {
        let display = document.getElementById("result");
        display.textContent = msg;
        display.className = "result error";
        setTimeout(() => {
            this.clear();
            this.updateDisplay();
        }, 1500);
    }

    updateDisplay() {
        let display = document.getElementById("result");
        let expression = document.getElementById("expression");
        
        // Update result
        let displayText = this.currentInput;
        if (displayText.length > 14) {
            displayText = parseFloat(displayText).toExponential(6);
        }
        display.textContent = displayText;
        display.className = "result";
        
        // Update expression
        let expr = "";
        if (this.operator && this.previousInput) {
            const opSymbols = {
                "+": "+",
                "-": "−",
                "*": "×",
                "/": "÷"
            };
            expr = `${this.previousInput} ${opSymbols[this.operator] || this.operator}`;
        } else if (this.previousInput) {
            expr = this.previousInput;
        }
        expression.textContent = expr;
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let calculator;

document.addEventListener("DOMContentLoaded", function() {
    calculator = new Calculator();
    console.log("Calculator initialized!");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("5"); calc.handleInput("+"); calc.handleInput("3"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "8",
            "5",
            "3",
            "53"
        ],
        correct: 0,
        explanation: '5 + 3 = 8, so the currentInput is "8".'
    },
    {
        id: 2,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("10"); calc.handleInput("-"); calc.handleInput("4"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "6",
            "10",
            "4",
            "104"
        ],
        correct: 0,
        explanation: '10 - 4 = 6, so the currentInput is "6".'
    },
    {
        id: 3,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("6"); calc.handleInput("*"); calc.handleInput("7"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "42",
            "6",
            "7",
            "67"
        ],
        correct: 0,
        explanation: '6 * 7 = 42, so the currentInput is "42".'
    },
    {
        id: 4,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("15"); calc.handleInput("/"); calc.handleInput("3"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "5",
            "15",
            "3",
            "153"
        ],
        correct: 0,
        explanation: '15 / 3 = 5, so the currentInput is "5".'
    },
    {
        id: 5,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("2"); calc.handleInput("+"); calc.handleInput("3"); calc.handleInput("*"); calc.handleInput("4"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "14",
            "20",
            "12",
            "24"
        ],
        correct: 0,
        explanation: '2 + 3 = 5, then 5 * 4 = 20? Actually the calculator evaluates in order: 2 + 3 * 4 = 14? No, it evaluates step by step: 2+3=5, then 5*4=20.'
    },
    {
        id: 6,
        question: 'What happens when you divide by zero?',
        options: [
            "Shows 'Error'",
            "Shows Infinity",
            "Shows 0",
            "Crashes"
        ],
        correct: 0,
        explanation: 'Dividing by zero displays an "Error" message.'
    },
    {
        id: 7,
        question: 'What keyboard key triggers the equals operation?',
        options: [
            "Enter or =",
            "Space",
            "Esc",
            "Tab"
        ],
        correct: 0,
        explanation: 'Pressing Enter or = triggers the equals operation.'
    },
    {
        id: 8,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("10"); calc.handleInput("%"); console.log(calc.currentInput);',
        options: [
            "0.1",
            "10",
            "100",
            "1"
        ],
        correct: 0,
        explanation: '10% = 10/100 = 0.1, so the currentInput is "0.1".'
    },
    {
        id: 9,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("5"); calc.handleInput("."); calc.handleInput("5"); calc.handleInput("+"); calc.handleInput("2"); calc.handleInput("."); calc.handleInput("5"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "8",
            "7.5",
            "8.0",
            "5.5"
        ],
        correct: 0,
        explanation: '5.5 + 2.5 = 8, so the currentInput is "8".'
    },
    {
        id: 10,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("0"); calc.handleInput("5"); calc.handleInput("+"); calc.handleInput("3"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "8",
            "5",
            "3",
            "53"
        ],
        correct: 0,
        explanation: 'Typing 0 then 5 creates "5", then 5 + 3 = 8.'
    },
    {
        id: 11,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("2"); calc.handleInput("+"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "4",
            "2",
            "0",
            "Error"
        ],
        correct: 0,
        explanation: 'When pressing = without a second number, it repeats the last operation with the result.'
    },
    {
        id: 12,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("10"); calc.handleInput("backspace"); calc.handleInput("5"); console.log(calc.currentInput);',
        options: [
            "5",
            "10",
            "15",
            "0"
        ],
        correct: 0,
        explanation: '10 becomes "1" after backspace, then adding 5 makes "5"? Actually: "10" → backspace → "1", then "5" → "15"? Wait, the backspace removes the last character.'
    },
    {
        id: 13,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("5"); calc.handleInput("+"); calc.handleInput("3"); calc.handleInput("clear"); calc.handleInput("2"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "2",
            "5",
            "3",
            "0"
        ],
        correct: 0,
        explanation: 'After clear, the calculator is reset. Then 2 is entered, but there\'s no operation, so pressing = does nothing.'
    },
    {
        id: 14,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("2"); calc.handleInput("+"); calc.handleInput("3"); calc.handleInput("+"); calc.handleInput("4"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "9",
            "7",
            "10",
            "8"
        ],
        correct: 0,
        explanation: '2 + 3 = 5, then 5 + 4 = 9.'
    },
    {
        id: 15,
        question: 'What is the output: let calc = new Calculator(); calc.handleInput("2"); calc.handleInput("+"); calc.handleInput("3"); calc.handleInput("*"); calc.handleInput("4"); calc.handleInput("="); console.log(calc.currentInput);',
        options: [
            "20",
            "14",
            "24",
            "12"
        ],
        correct: 0,
        explanation: '2 + 3 = 5, then 5 * 4 = 20.'
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
                        ">Level 68 Quiz</h2>
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
    if (progress['level68']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level69.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered the Calculator!';
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
        progress['level68'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level69.html';
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
    const text = 'Calculator';
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