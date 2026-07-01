/**
 * Level 71: Password Generator
 * 
 * This file implements a password generator application.
 * All code here will run when the page loads.
 */

// ============================================
// PASSWORD GENERATOR
// ============================================

class PasswordGenerator {
    constructor() {
        this.charSets = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~"
        };
        
        this.setupEventListeners();
        this.generatePassword();
    }

    setupEventListeners() {
        // Generate button
        document.getElementById("generateBtn").addEventListener("click", () => {
            this.generatePassword();
        });

        // Length slider
        document.getElementById("lengthSlider").addEventListener("input", (e) => {
            document.getElementById("lengthDisplay").textContent = e.target.value;
            this.generatePassword();
        });

        // Checkboxes
        document.querySelectorAll("#includeUppercase, #includeLowercase, #includeNumbers, #includeSymbols").forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                this.generatePassword();
            });
        });

        // Copy button
        document.getElementById("copyBtn").addEventListener("click", () => {
            this.copyToClipboard();
        });
    }

    generatePassword() {
        let length = parseInt(document.getElementById("lengthSlider").value);
        let includeUppercase = document.getElementById("includeUppercase").checked;
        let includeLowercase = document.getElementById("includeLowercase").checked;
        let includeNumbers = document.getElementById("includeNumbers").checked;
        let includeSymbols = document.getElementById("includeSymbols").checked;

        // Build character pool
        let charPool = "";
        if (includeUppercase) charPool += this.charSets.uppercase;
        if (includeLowercase) charPool += this.charSets.lowercase;
        if (includeNumbers) charPool += this.charSets.numbers;
        if (includeSymbols) charPool += this.charSets.symbols;

        // Ensure at least one character type is selected
        if (charPool.length === 0) {
            document.getElementById("passwordDisplay").textContent = "Select at least one option";
            document.getElementById("strengthFill").style.width = "0%";
            document.getElementById("strengthText").textContent = "None";
            return;
        }

        // Generate password
        let password = "";
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool[randomIndex];
        }

        // Ensure at least one character from each selected type
        password = this.ensureCharTypes(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols, charPool, length);

        // Display password
        document.getElementById("passwordDisplay").textContent = password;

        // Calculate and display strength
        this.updateStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

        // Reset copy button
        let copyBtn = document.getElementById("copyBtn");
        copyBtn.textContent = "📋 Copy";
        copyBtn.classList.remove("copied");
    }

    ensureCharTypes(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols, charPool, length) {
        let types = [];
        if (includeUppercase) types.push(this.charSets.uppercase);
        if (includeLowercase) types.push(this.charSets.lowercase);
        if (includeNumbers) types.push(this.charSets.numbers);
        if (includeSymbols) types.push(this.charSets.symbols);

        // Check if each required type is present
        let passwordArray = password.split("");
        let needsFix = false;

        types.forEach(typeSet => {
            let hasChar = passwordArray.some(char => typeSet.includes(char));
            if (!hasChar) {
                needsFix = true;
                // Replace a random character with one from this type
                let randomIndex = Math.floor(Math.random() * passwordArray.length);
                let randomChar = typeSet[Math.floor(Math.random() * typeSet.length)];
                passwordArray[randomIndex] = randomChar;
            }
        });

        if (needsFix) {
            return passwordArray.join("");
        }

        return password;
    }

    updateStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        let strength = 0;
        let maxStrength = 4;

        // Length score
        if (length >= 8) strength += 1;
        if (length >= 12) strength += 1;

        // Character variety score
        if (includeUppercase) strength += 0.5;
        if (includeLowercase) strength += 0.5;
        if (includeNumbers) strength += 0.5;
        if (includeSymbols) strength += 0.5;

        // Cap at max
        if (strength > maxStrength) strength = maxStrength;

        // Determine strength level
        let level = "Weak";
        let color = "weak";
        let width = 25;

        if (strength >= 3.5) {
            level = "Strong";
            color = "strong";
            width = 100;
        } else if (strength >= 2.5) {
            level = "Medium";
            color = "medium";
            width = 65;
        } else if (strength >= 1.5) {
            level = "Weak";
            color = "weak";
            width = 35;
        } else {
            level = "Very Weak";
            color = "weak";
            width = 15;
        }

        // Update UI
        let fill = document.getElementById("strengthFill");
        fill.className = "strength-fill " + color;
        fill.style.width = width + "%";
        document.getElementById("strengthText").textContent = level;
    }

    copyToClipboard() {
        let password = document.getElementById("passwordDisplay").textContent;
        let copyBtn = document.getElementById("copyBtn");

        if (password === "Click Generate" || password === "Select at least one option") {
            return;
        }

        navigator.clipboard.writeText(password).then(() => {
            copyBtn.textContent = "✅ Copied!";
            copyBtn.classList.add("copied");
            console.log("Password copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy:", err);
            // Fallback for older browsers
            this.fallbackCopy(password);
        });
    }

    fallbackCopy(text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
            let copyBtn = document.getElementById("copyBtn");
            copyBtn.textContent = "✅ Copied!";
            copyBtn.classList.add("copied");
            console.log("Password copied (fallback)");
        } catch (err) {
            console.error("Fallback copy failed:", err);
        }
        document.body.removeChild(textArea);
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let passwordGen;

document.addEventListener("DOMContentLoaded", function() {
    passwordGen = new PasswordGenerator();
    console.log("Password Generator initialized!");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What is the output: let gen = new PasswordGenerator(); gen.generatePassword(); console.log(gen.password);',
        options: [
            "A string of characters",
            "undefined",
            "Error",
            "null"
        ],
        correct: 0,
        explanation: 'generatePassword() generates a password string.'
    },
    {
        id: 2,
        question: 'What does the copyToClipboard() method do?',
        options: [
            "Copies the password to clipboard",
            "Generates a new password",
            "Shows the password",
            "Checks password strength"
        ],
        correct: 0,
        explanation: 'copyToClipboard() copies the generated password to the clipboard.'
    },
    {
        id: 3,
        question: 'What is the default password length?',
        options: [
            "12",
            "8",
            "16",
            "20"
        ],
        correct: 0,
        explanation: 'The default password length is 12 characters.'
    },
    {
        id: 4,
        question: 'What is the output: let gen = new PasswordGenerator(); console.log(gen.charSets.uppercase.length);',
        options: [
            "26",
            "52",
            "10",
            "32"
        ],
        correct: 0,
        explanation: 'There are 26 uppercase letters in the alphabet.'
    },
    {
        id: 5,
        question: 'Which character type is NOT included by default?',
        options: [
            "All are included",
            "Symbols",
            "Numbers",
            "Uppercase"
        ],
        correct: 0,
        explanation: 'All character types are included by default.'
    },
    {
        id: 6,
        question: 'What is the output: let gen = new PasswordGenerator(); gen.generatePassword(); console.log(typeof gen.password);',
        options: [
            "string",
            "object",
            "number",
            "boolean"
        ],
        correct: 0,
        explanation: 'The password is a string.'
    },
    {
        id: 7,
        question: 'What does the fallbackCopy() method do?',
        options: [
            "Copies using an alternative method",
            "Generates a new password",
            "Shows the password",
            "Checks password strength"
        ],
        correct: 0,
        explanation: 'fallbackCopy() provides an alternative copy method for older browsers.'
    },
    {
        id: 8,
        question: 'What is the output: let gen = new PasswordGenerator(); gen.charSets.numbers = "123"; console.log(gen.charSets.numbers);',
        options: [
            "123",
            "0123456789",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'The numbers character set can be modified.'
    },
    {
        id: 9,
        question: 'What is the output: let gen = new PasswordGenerator(); console.log(gen.charSets.symbols.length);',
        options: [
            "26",
            "20",
            "32",
            "10"
        ],
        correct: 1,
        explanation: 'The symbols string has 26 characters.'
    },
    {
        id: 10,
        question: 'What is the output: let gen = new PasswordGenerator(); gen.generatePassword(); console.log(gen.password.length);',
        options: [
            "12",
            "8",
            "16",
            "20"
        ],
        correct: 0,
        explanation: 'By default, the password length is 12.'
    },
    {
        id: 11,
        question: 'What is the output: let gen = new PasswordGenerator(); console.log(gen.charSets.lowercase);',
        options: [
            "abcdefghijklmnopqrstuvwxyz",
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "0123456789",
            "!@#$%^&*()_+-=[]{}|;:,.<>?/~"
        ],
        correct: 0,
        explanation: 'lowercase contains all lowercase letters.'
    },
    {
        id: 12,
        question: 'What is the output: let gen = new PasswordGenerator(); gen.generatePassword(); console.log(gen.password !== "");',
        options: [
            "true",
            "false",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'The generated password is not empty.'
    },
    {
        id: 13,
        question: 'What is the output: let gen = new PasswordGenerator(); console.log(gen.charSets.uppercase[0]);',
        options: [
            "A",
            "a",
            "Z",
            "z"
        ],
        correct: 0,
        explanation: 'The first character in uppercase is "A".'
    },
    {
        id: 14,
        question: 'What is the output: let gen = new PasswordGenerator(); gen.generatePassword(); console.log(gen.password);',
        options: [
            "A string of characters",
            "undefined",
            "Error",
            "null"
        ],
        correct: 0,
        explanation: 'generatePassword() generates a string password.'
    },
    {
        id: 15,
        question: 'What is the output: let gen = new PasswordGenerator(); console.log(gen.charSets.numbers[0]);',
        options: [
            "0",
            "1",
            "9",
            "A"
        ],
        correct: 0,
        explanation: 'The first character in numbers is "0".'
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
                        ">Level 71 Quiz</h2>
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
    if (progress['level71']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level72.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered the Password Generator!';
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
        progress['level71'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level72.html';
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
    const text = 'Password Generator';
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