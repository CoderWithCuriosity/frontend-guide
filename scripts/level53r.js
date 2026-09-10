/**
 * Level 53: Object CRUD - Creating & Reading Properties
 * 
 * This file contains the interactive demo and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// OBJECT CRUD DEMO (Creating & Reading)
// ============================================

let demoObject = {
    name: "Alice",
    age: 28,
    city: "Portland",
    hobby: "coding",
    active: true,
    score: 95
};

function updateGrid() {
    const keys = Object.keys(demoObject);
    for (let i = 0; i < 6; i++) {
        const el = document.getElementById(`objVal${i}`);
        const keyEl = el ? el.parentElement.querySelector(".key") : null;
        if (el && i < keys.length) {
            const key = keys[i];
            el.textContent = JSON.stringify(demoObject[key]);
            if (keyEl) keyEl.textContent = key;
        } else if (el) {
            el.textContent = "undefined";
            if (keyEl) keyEl.textContent = "—";
        }
    }
}

function setOutput(msg, color = "#a3a3c2") {
    const out = document.getElementById("objectOutput");
    if (out) {
        out.innerHTML = msg;
        out.style.color = color;
    }
}

function readDot() {
    const key = document.getElementById("keyInput").value.trim();
    if (!key) {
        setOutput("⚠️ Please enter a key.", "#f3a072");
        return;
    }
    const value = demoObject[key];
    if (value === undefined) {
        setOutput(`obj.${key} → undefined  <span class="highlight">(property not found)</span>`, "#f3a072");
    } else {
        setOutput(`obj.${key} → ${JSON.stringify(value)}`, "#8ec07c");
    }
    console.log(`Read obj.${key}:`, value);
    updateGrid();
}

function readBracket() {
    const key = document.getElementById("keyInput").value.trim();
    if (!key) {
        setOutput("⚠️ Please enter a key.", "#f3a072");
        return;
    }
    const value = demoObject[key];
    if (value === undefined) {
        setOutput(`obj["${key}"] → undefined  <span class="highlight">(property not found)</span>`, "#f3a072");
    } else {
        setOutput(`obj["${key}"] → ${JSON.stringify(value)}`, "#8ec07c");
    }
    console.log(`Read obj["${key}"]:`, value);
    updateGrid();
}

function addProperty() {
    const key = document.getElementById("newKeyInput").value.trim();
    const val = document.getElementById("newValueInput").value.trim();
    if (!key) {
        setOutput("⚠️ Please enter a new key.", "#f3a072");
        return;
    }
    if (!val) {
        setOutput("⚠️ Please enter a value.", "#f3a072");
        return;
    }
    const old = demoObject[key];
    demoObject[key] = val;
    const action = old === undefined ? "Added" : "Updated";
    setOutput(`${action} obj["${key}"] = "${val}"  <span class="highlight">(previous: ${old !== undefined ? JSON.stringify(old) : 'undefined'})</span>`, "#8ec07c");
    console.log(`${action} obj["${key}"] = "${val}"`);
    updateGrid();
}

function resetObject() {
    demoObject = {
        name: "Alice",
        age: 28,
        city: "Portland",
        hobby: "coding",
        active: true,
        score: 95
    };
    setOutput('Object reset to { name: "Alice", age: 28, city: "Portland", hobby: "coding", active: true, score: 95 }', "#a3a3c2");
    console.log("Object reset");
    updateGrid();
}

function showObject() {
    const display = JSON.stringify(demoObject, null, 2);
    setOutput(`Full object:\n${display}`, "#7ec8e3");
    console.log("Object:", demoObject);
}

// Real-time input logging for demo object fields
document.addEventListener("DOMContentLoaded", function() {
    // Typing animation for hero title
    const el = document.getElementById('typedTitle');
    const text = 'Object CRUD: Create & Read';
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

    updateGrid();

    // Demo object input logging
    const keyInput = document.getElementById("keyInput");
    const newKeyInput = document.getElementById("newKeyInput");
    const newValueInput = document.getElementById("newValueInput");
    if (keyInput) {
        keyInput.addEventListener("input", function() {
            console.log("Key field changed to:", this.value);
        });
    }
    if (newKeyInput) {
        newKeyInput.addEventListener("input", function() {
            console.log("New key field changed to:", this.value);
        });
    }
    if (newValueInput) {
        newValueInput.addEventListener("input", function() {
            console.log("New value field changed to:", this.value);
        });
    }
});

// ============================================
// QUIZ SYSTEM (Object CRUD: Creating & Reading)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'How do you read the "name" property of an object <code>person</code> using dot notation?',
        options: ["person.name", "person->name", "person(name)", "person[name]"],
        correct: 0,
        explanation: 'Dot notation uses the literal property name: person.name.'
    },
    {
        id: 2,
        question: 'How do you read the "age" property using bracket notation?',
        options: ['person["age"]', "person[age]", "person{age}", "person(age)"],
        correct: 0,
        explanation: 'Bracket notation uses a string key: person["age"].'
    },
    {
        id: 3,
        question: 'What is the output?<br><code>let obj = { a: 1 }; console.log(obj.b);</code>',
        options: ["undefined", "null", "0", "Error"],
        correct: 0,
        explanation: 'Accessing a missing property returns undefined.'
    },
    {
        id: 4,
        question: 'What does <code>obj["key"] = "value"</code> do?',
        options: [
            "Adds or updates the property",
            "Deletes the property",
            "Reads the property",
            "Throws an error"
        ],
        correct: 0,
        explanation: 'Assigning to a property with bracket notation adds it if missing or updates it if it exists.'
    },
    {
        id: 5,
        question: 'When should you use bracket notation instead of dot notation?',
        options: [
            "When the key is stored in a variable",
            "When the key is a simple identifier",
            "Only for numbers",
            "Never"
        ],
        correct: 0,
        explanation: 'Bracket notation is required when the property name is dynamic (stored in a variable) or has special characters.'
    },
    {
        id: 6,
        question: 'What is the output?<br><code>let obj = { x: 10, y: 20 }; let k = "x"; console.log(obj[k]);</code>',
        options: ["10", '"x"', "undefined", "Error"],
        correct: 0,
        explanation: 'obj[k] uses the value of k ("x") as the key, so it returns 10.'
    },
    {
        id: 7,
        question: 'How do you create an empty object?',
        options: ["let obj = {}", "let obj = []", "let obj = ()", "let obj = null"],
        correct: 0,
        explanation: 'Curly braces {} create a new empty object.'
    },
    {
        id: 8,
        question: 'What is the output?<br><code>let obj = { name: "Sam" }; obj.name = "Alex"; console.log(obj.name);</code>',
        options: ["Alex", "Sam", "undefined", "Error"],
        correct: 0,
        explanation: 'Assigning to an existing property updates its value, so it becomes "Alex".'
    },
    {
        id: 9,
        question: 'What is the output?<br><code>let obj = { a: 1, b: 2 }; console.log(obj["a"] + obj["b"]);</code>',
        options: ["3", "12", "ab", "undefined"],
        correct: 0,
        explanation: 'obj["a"] is 1 and obj["b"] is 2, so 1 + 2 = 3.'
    },
    {
        id: 10,
        question: 'Which syntax correctly reads a property with a space in its name, like <code>"first name"</code>?',
        options: [
            'obj["first name"]',
            "obj.first name",
            "obj.first-name",
            "obj(first name)"
        ],
        correct: 0,
        explanation: 'Bracket notation is required for keys with spaces: obj["first name"].'
    },
    {
        id: 11,
        question: 'What is the output?<br><code>let obj = {}; obj["x"] = 5; console.log(obj.x);</code>',
        options: ["5", "undefined", "null", "Error"],
        correct: 0,
        explanation: 'Bracket notation and dot notation access the same property, so obj.x is 5.'
    },
    {
        id: 12,
        question: 'How do you check if a property exists in an object?',
        options: [
            'obj.hasOwnProperty("key")',
            "obj.exists(key)",
            "obj.contains(key)",
            "obj.has(key)"
        ],
        correct: 0,
        explanation: 'Use obj.hasOwnProperty("key") or the "in" operator to check property existence.'
    },
    {
        id: 13,
        question: 'What is the output?<br><code>let obj = { a: 1 }; let key = "a"; console.log(obj.key);</code>',
        options: ["undefined", "1", '"a"', "Error"],
        correct: 0,
        explanation: 'obj.key looks for a property literally named "key", not the variable key. Use obj[key] instead.'
    },
    {
        id: 14,
        question: 'What is the difference between <code>obj.name</code> and <code>obj["name"]</code>?',
        options: [
            "They read the same property",
            "obj.name only works for numbers",
            "obj[\"name\"] creates a new property",
            "obj.name deletes the property"
        ],
        correct: 0,
        explanation: 'Both read the same property when the key is a simple string; the syntax differs.'
    },
    {
        id: 15,
        question: 'What is the output?<br><code>let obj = { count: 0 }; console.log(obj.count);</code>',
        options: ["0", "undefined", "null", "Error"],
        correct: 0,
        explanation: 'The property count exists with value 0, so it returns 0.'
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
                        ">Level 53 Quiz · Object CRUD</h2>
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
    if (progress['level53']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level54.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered object reading and creating!';
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
        progress['level53'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level54.html';
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