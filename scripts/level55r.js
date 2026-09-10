/**
 * Level 55: Array of Objects - Basic Structure & Access
 * 
 * This file contains the interactive demo and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// ARRAY OF OBJECTS DEMO
// ============================================

let demoList = [
    { name: "Alice", age: 28, role: "Developer" },
    { name: "Bob", age: 34, role: "Designer" },
    { name: "Carol", age: 25, role: "Manager" }
];

function updateGrid() {
    const grid = document.getElementById("userListGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const colorClasses = ["c0", "c1", "c2", "c3", "c4", "c5"];
    demoList.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = `list-card ${colorClasses[index % colorClasses.length]}`;
        const fields = Object.keys(item)
            .map(k => `<div class="field"><span class="key">${k}:</span> <span class="value">${JSON.stringify(item[k])}</span></div>`)
            .join("");
        card.innerHTML = `<span class="index-badge">list[${index}]</span>${fields}`;
        grid.appendChild(card);
    });
}

function setOutput(msg, color = "#a3a3c2") {
    const out = document.getElementById("listOutput");
    if (out) {
        out.innerHTML = msg;
        out.style.color = color;
    }
}

function accessProperty() {
    const index = parseInt(document.getElementById("indexInput").value, 10);
    const prop = document.getElementById("propInput").value.trim();
    if (isNaN(index) || index < 0) {
        setOutput("⚠️ Please enter a valid non-negative index.", "#f3a072");
        return;
    }
    if (!prop) {
        setOutput("⚠️ Please enter a property name.", "#f3a072");
        return;
    }
    if (index >= demoList.length) {
        setOutput(`⚠️ Index ${index} is out of bounds. List length is ${demoList.length}.`, "#f3a072");
        return;
    }
    const value = demoList[index][prop];
    if (value === undefined) {
        setOutput(`list[${index}].${prop} → undefined  <span class="highlight">(property not found)</span>`, "#f3a072");
    } else {
        setOutput(`list[${index}].${prop} → ${JSON.stringify(value)}`, "#8ec07c");
    }
    console.log(`Read list[${index}].${prop}:`, value);
    updateGrid();
}

function loopList() {
    if (demoList.length === 0) {
        setOutput("⚠️ The list is empty.", "#f3a072");
        return;
    }
    let lines = [];
    demoList.forEach((item, i) => {
        lines.push(`list[${i}] → ${JSON.stringify(item)}`);
    });
    setOutput(lines.join("\n"), "#7ec8e3");
    console.log("Looped through list:");
    demoList.forEach((item, i) => console.log(`  [${i}]`, item));
}

function listNames() {
    if (demoList.length === 0) {
        setOutput("⚠️ The list is empty.", "#f3a072");
        return;
    }
    const names = demoList.map(item => item.name);
    setOutput(`Names: ${names.join(", ")}`, "#8ec07c");
    console.log("All names:", names);
}

function showFullList() {
    const display = JSON.stringify(demoList, null, 2);
    setOutput(`Full list (${demoList.length} items):\n${display}`, "#f0c674");
    console.log("Full list:", demoList);
}

// Real-time input logging + typing animation
document.addEventListener("DOMContentLoaded", function() {
    const el = document.getElementById('typedTitle');
    const text = 'Array of Objects';
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

    const idxInput = document.getElementById("indexInput");
    const propInput = document.getElementById("propInput");
    if (idxInput) {
        idxInput.addEventListener("input", function() {
            console.log("Index field changed to:", this.value);
        });
    }
    if (propInput) {
        propInput.addEventListener("input", function() {
            console.log("Property field changed to:", this.value);
        });
    }
});

// ============================================
// QUIZ SYSTEM (Array of Objects)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'How do you access the "name" property of the first object in an array called <code>list</code>?',
        options: ["list[0].name", "list.name[0]", "list(0).name", "list.name.0"],
        correct: 0,
        explanation: 'Use list[0].name — index the array first, then use dot notation on the object.'
    },
    {
        id: 2,
        question: 'What is an array of objects best used for?',
        options: [
            "Storing a list of structured records",
            "Storing a single value",
            "Storing only numbers",
            "Replacing functions"
        ],
        correct: 0,
        explanation: 'Array of objects is ideal for storing lists of records, like users, products, or books.'
    },
    {
        id: 3,
        question: 'What is the output?<br><code>let a = [{x:1},{x:2}]; console.log(a[1].x);</code>',
        options: ["2", "1", "undefined", "Error"],
        correct: 0,
        explanation: 'a[1] is the second object, and its x property is 2.'
    },
    {
        id: 4,
        question: 'How do you get the number of objects in an array <code>users</code>?',
        options: ["users.length", "users.count", "users.size", "users.total"],
        correct: 0,
        explanation: 'The .length property gives the number of items in the array.'
    },
    {
        id: 5,
        question: 'How do you access the "title" of the last book in <code>books</code>?',
        options: [
            "books[books.length - 1].title",
            "books.last().title",
            "books[-1].title",
            "books[length].title"
        ],
        correct: 0,
        explanation: 'The last index is books.length - 1, so use books[books.length - 1].title.'
    },
    {
        id: 6,
        question: 'What is the output?<br><code>let a = [{n:"A"},{n:"B"}]; a.forEach(o => console.log(o.n));</code>',
        options: [
            '"A" then "B"',
            '"B" then "A"',
            '"[object Object]" twice',
            "undefined"
        ],
        correct: 0,
        explanation: 'forEach iterates in order, logging "A" then "B".'
    },
    {
        id: 7,
        question: 'Which is valid bracket notation for accessing an object in an array?',
        options: [
            'list[0]["name"]',
            'list["0"].name',
            'list[0][name]',
            'list("0").name'
        ],
        correct: 0,
        explanation: 'Both list[0]["name"] and list[0].name are valid and equivalent.'
    },
    {
        id: 8,
        question: 'What is the output?<br><code>let a = [{x:1}]; console.log(a[0].y);</code>',
        options: ["undefined", "null", "0", "Error"],
        correct: 0,
        explanation: 'The object has no "y" property, so it returns undefined.'
    },
    {
        id: 9,
        question: 'How do you add a new object to the end of an array <code>items</code>?',
        options: [
            'items.push({ id: 4 })',
            'items.add({ id: 4 })',
            'items.append({ id: 4 })',
            'items[length] = { id: 4 }'
        ],
        correct: 0,
        explanation: 'Use .push() to add a new object to the end of the array.'
    },
    {
        id: 10,
        question: 'What is the output?<br><code>let a = [{v:10},{v:20},{v:30}]; console.log(a[2].v);</code>',
        options: ["30", "20", "10", "undefined"],
        correct: 0,
        explanation: 'a[2] is the third object, and its v property is 30.'
    },
    {
        id: 11,
        question: 'How do you loop through an array of objects and log each name?',
        options: [
            'list.forEach(item => console.log(item.name))',
            'list.name.forEach(log)',
            'for (name of list) console.log(name)',
            'list.loop(name)'
        ],
        correct: 0,
        explanation: 'Use forEach with a callback that accesses item.name.'
    },
    {
        id: 12,
        question: 'What is the output?<br><code>let a = [{n:"A"},{n:"B"}]; console.log(a[0].n + a[1].n);</code>',
        options: ['"AB"', '"A B"', '"BA"', "undefined"],
        correct: 0,
        explanation: 'a[0].n is "A" and a[1].n is "B", so "A" + "B" = "AB".'
    },
    {
        id: 13,
        question: 'What is the difference between <code>list[0]</code> and <code>list[0].name</code>?',
        options: [
            "list[0] is the object; list[0].name is a property of it",
            "They are the same thing",
            "list[0] returns a string",
            "list[0].name returns the whole array"
        ],
        correct: 0,
        explanation: 'list[0] returns the first object; list[0].name returns a specific property from that object.'
    },
    {
        id: 14,
        question: 'What is the output?<br><code>let a = [{x:1},{x:2},{x:3}]; console.log(a.length);</code>',
        options: ["3", "2", "1", "undefined"],
        correct: 0,
        explanation: 'The array has 3 objects, so a.length is 3.'
    },
    {
        id: 15,
        question: 'Which syntax correctly stores an array of two user objects?',
        options: [
            'let users = [{ name: "A" }, { name: "B" }]',
            'let users = { name: "A" }, { name: "B" }',
            'let users = [name: "A", name: "B"]',
            'let users = ({ name: "A" }, { name: "B" })'
        ],
        correct: 0,
        explanation: 'An array of objects uses square brackets with objects separated by commas: [{...}, {...}].'
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
                        ">Level 55 Quiz · Array of Objects</h2>
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
    if (progress['level55']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level56.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered arrays of objects!';
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
        progress['level55'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level56.html';
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