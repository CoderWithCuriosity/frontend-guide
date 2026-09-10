/**
 * Level 61: LocalStorage with Objects - JSON Basics
 * 
 * This file contains the interactive demo and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// LOCALSTORAGE WITH OBJECTS DEMO
// ============================================

const STORAGE_KEY = "level61_user";

function setOutput(msg, color = "#a3a3c2") {
    const out = document.getElementById("storageOutput");
    if (out) {
        out.innerHTML = msg;
        out.style.color = color;
    }
}

function updateDisplay(obj) {
    const el = document.getElementById("jsonDisplay");
    if (!el) return;

    if (obj === null || obj === undefined) {
        el.textContent = "(nothing saved yet)";
        el.classList.add("empty");
    } else {
        el.textContent = JSON.stringify(obj, null, 2);
        el.classList.remove("empty");
    }
}

function saveUser() {
    const name = document.getElementById("nameField").value.trim();
    const ageRaw = document.getElementById("ageField").value.trim();
    const city = document.getElementById("cityField").value.trim();

    if (name === "" || city === "" || ageRaw === "") {
        setOutput("⚠️ Please fill in all fields before saving.", "#f3a072");
        return;
    }

    const age = Number(ageRaw);
    if (isNaN(age)) {
        setOutput("⚠️ Age must be a valid number.", "#f3a072");
        return;
    }

    const user = { name, age, city };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        updateDisplay(user);
        setOutput(`✅ Object saved as JSON: <span class="highlight">${JSON.stringify(user)}</span>`, "#8ec07c");
        console.log("Saved user object:", user);
    } catch (error) {
        setOutput(`❌ Could not save: ${error.message}`, "#f3a072");
        console.error("Save error:", error);
    }
}

function loadUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw === null) {
            updateDisplay(null);
            setOutput("📭 No saved object found. Save something first!", "#f3a072");
            console.log("No saved object found");
            return;
        }

        const user = JSON.parse(raw);
        updateDisplay(user);

        // Fill inputs with the loaded values
        const nameField = document.getElementById("nameField");
        const ageField = document.getElementById("ageField");
        const cityField = document.getElementById("cityField");
        if (nameField) nameField.value = user.name ?? "";
        if (ageField) ageField.value = user.age ?? "";
        if (cityField) cityField.value = user.city ?? "";

        setOutput(`📂 Object loaded: <span class="highlight">${raw}</span>`, "#7ec8e3");
        console.log("Loaded user object:", user);
    } catch (error) {
        setOutput(`❌ Could not parse saved data: ${error.message}`, "#f3a072");
        console.error("Load error:", error);
    }
}

function removeUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
        updateDisplay(null);

        if (raw === null) {
            setOutput("ℹ️ Nothing was saved — removeItem had no effect.", "#a3a3c2");
        } else {
            setOutput(`🗑️ Removed saved object: <span class="highlight">${raw}</span>`, "#f3a072");
        }
        console.log("Removed from localStorage:", STORAGE_KEY);
    } catch (error) {
        setOutput(`❌ Could not remove: ${error.message}`, "#f3a072");
        console.error("Remove error:", error);
    }
}

function clearFields() {
    document.getElementById("nameField").value = "";
    document.getElementById("ageField").value = "";
    document.getElementById("cityField").value = "";
    setOutput("🧹 Input fields cleared (localStorage untouched).", "#a3a3c2");
    console.log("Input fields cleared");
}

// On page load, read any saved object and display it
document.addEventListener("DOMContentLoaded", function() {
    // Typing animation for hero title
    const el = document.getElementById('typedTitle');
    const text = 'LocalStorage with Objects';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && el) {
        let i = 0;
        el.textContent = '';
        function step() {
            el.textContent = text.slice(0, i);
            i++;
            if (i <= text.length) setTimeout(step, 35);
        }
        step();
    } else if (el) {
        el.textContent = text;
    }

    // Auto-load any saved object
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw !== null) {
            const user = JSON.parse(raw);
            updateDisplay(user);
            const nameField = document.getElementById("nameField");
            const ageField = document.getElementById("ageField");
            const cityField = document.getElementById("cityField");
            if (nameField) nameField.value = user.name ?? "";
            if (ageField) ageField.value = user.age ?? "";
            if (cityField) cityField.value = user.city ?? "";
            setOutput(`📂 Auto-loaded saved object: <span class="highlight">${raw}</span>`, "#7ec8e3");
            console.log("Auto-loaded user object:", user);
        } else {
            updateDisplay(null);
            setOutput("💡 Fill in the fields and click Save. Reload the page to see it persist!", "#a3a3c2");
        }
    } catch (error) {
        console.error("Initial load error:", error);
    }

    // Log keystrokes in the input fields
    ["nameField", "ageField", "cityField"].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", function() {
                console.log(`${id} changed to:`, this.value);
            });
        }
    });
});

// ============================================
// QUIZ SYSTEM (LocalStorage with Objects)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'Why do you need JSON.stringify() before saving an object to localStorage?',
        options: [
            "localStorage only stores strings",
            "localStorage only stores numbers",
            "JSON makes the data smaller",
            "It is optional"
        ],
        correct: 0,
        explanation: 'localStorage only stores strings, so objects must be converted with JSON.stringify().'
    },
    {
        id: 2,
        question: 'What does JSON.stringify() do?',
        options: [
            "Converts an object to a JSON string",
            "Converts a JSON string to an object",
            "Validates JSON",
            "Pretty prints JSON"
        ],
        correct: 0,
        explanation: 'JSON.stringify() converts an object into a JSON string.'
    },
    {
        id: 3,
        question: 'What does JSON.parse() do?',
        options: [
            "Converts a JSON string to an object",
            "Converts an object to a JSON string",
            "Validates JSON",
            "Minifies JSON"
        ],
        correct: 0,
        explanation: 'JSON.parse() parses a JSON string into a JavaScript object.'
    },
    {
        id: 4,
        question: 'What is the correct way to save an object?',
        options: [
            'localStorage.setItem("key", JSON.stringify(obj))',
            'localStorage.setItem("key", obj)',
            'localStorage.setItem(JSON.stringify(obj))',
            'localStorage.saveObject("key", obj)'
        ],
        correct: 0,
        explanation: 'Convert the object to a string with JSON.stringify() before saving.'
    },
    {
        id: 5,
        question: 'What is the correct way to load an object?',
        options: [
            'JSON.parse(localStorage.getItem("key"))',
            'localStorage.getItem("key")',
            'localStorage.getObject("key")',
            'JSON.stringify(localStorage.getItem("key"))'
        ],
        correct: 0,
        explanation: 'Read the string with getItem, then convert it back with JSON.parse().'
    },
    {
        id: 6,
        question: 'What is the output?<br><code>let o = { a: 1 };<br>console.log(JSON.stringify(o));</code>',
        options: [
            '{"a":1}',
            "{ a: 1 }",
            "1",
            "undefined"
        ],
        correct: 0,
        explanation: 'JSON.stringify({a:1}) returns the string {"a":1}.'
    },
    {
        id: 7,
        question: 'What is the output?<br><code>let s = \'{"name":"Alice"}\';<br>console.log(JSON.parse(s).name);</code>',
        options: [
            '"Alice"',
            '"name"',
            "undefined",
            "null"
        ],
        correct: 0,
        explanation: 'JSON.parse turns the string into an object, so .name is "Alice".'
    },
    {
        id: 8,
        question: 'What does localStorage.getItem() return if the key was never set?',
        options: [
            "null",
            "undefined",
            '"" (empty string)',
            "0"
        ],
        correct: 0,
        explanation: 'getItem returns null if the key does not exist, so guard before parsing.'
    },
    {
        id: 9,
        question: 'What happens if you call JSON.parse(null)?',
        options: [
            "It returns null",
            "It throws an error",
            "It returns undefined",
            "It returns 0"
        ],
        correct: 0,
        explanation: 'JSON.parse(null) actually returns null (it coerces to the string "null").'
    },
    {
        id: 10,
        question: 'Can localStorage store an array directly?',
        options: [
            "No, you must stringify it with JSON.stringify()",
            "Yes, arrays are stored as-is",
            "Only arrays of numbers",
            "Only arrays of strings"
        ],
        correct: 0,
        explanation: 'Arrays must be converted with JSON.stringify() before saving, just like objects.'
    },
    {
        id: 11,
        question: 'What is the output?<br><code>JSON.stringify([1,2,3])</code>',
        options: [
            '"[1,2,3]"',
            "[1,2,3]",
            '"1,2,3"',
            "undefined"
        ],
        correct: 0,
        explanation: 'JSON.stringify on an array returns the string "[1,2,3]".'
    },
    {
        id: 12,
        question: 'What is the output?<br><code>JSON.parse(\'[1,2,3]\').length</code>',
        options: [
            "3",
            "1",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'JSON.parse turns the string back into an array of length 3.'
    },
    {
        id: 13,
        question: 'Why should you wrap JSON.parse() in a try/catch?',
        options: [
            "Because invalid JSON throws a SyntaxError",
            "Because it is required by the spec",
            "Because it always throws",
            "Because it is asynchronous"
        ],
        correct: 0,
        explanation: 'JSON.parse throws a SyntaxError if the string is not valid JSON, so try/catch is safer.'
    },
    {
        id: 14,
        question: 'What is the output?<br><code>let obj = { n: 5 };<br>localStorage.setItem("k", JSON.stringify(obj));<br>console.log(typeof localStorage.getItem("k"));</code>',
        options: [
            '"string"',
            '"object"',
            '"number"',
            '"undefined"'
        ],
        correct: 0,
        explanation: 'localStorage stores strings, so getItem returns a string even though you saved an object.'
    },
    {
        id: 15,
        question: 'What is the output?<br><code>let obj = { n: 5 };<br>let s = JSON.stringify(obj);<br>console.log(JSON.parse(s).n);</code>',
        options: [
            "5",
            '"5"',
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'After stringify and parse, the object is restored, so .n is 5.'
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
                        ">Level 61 Quiz · LocalStorage + JSON</h2>
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
        #quizModal::-webkit-scrollbar { width: 6px; }
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
    if (progress['level61']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level62.html';
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

    createQuizModal();
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
        textSpan.innerHTML = option;
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
        message += ' 🌟 Perfect score! You\'ve mastered localStorage with JSON!';
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
        progress['level61'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level62.html';
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

// Export for potential module use (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startQuiz, QUIZ_QUESTIONS };
}