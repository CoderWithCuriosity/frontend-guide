/**
 * Level 63: Template Literals - Clean HTML Generation
 * 
 * This file contains the interactive demo and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// TEMPLATE LITERAL HTML GENERATION DEMO
// ============================================

const SAMPLE_ITEMS = ["JavaScript", "HTML", "CSS", "DOM", "Fetch API"];

function setOutput(html, color = "#f0c674") {
    const out = document.getElementById("outputArea");
    if (out) {
        out.textContent = html;
        out.style.color = color;
    }
}

function readInputs() {
    const name = (document.getElementById("nameField").value || "Alice").trim();
    const age = (document.getElementById("ageField").value || "28").trim();
    const city = (document.getElementById("cityField").value || "Portland").trim();
    const role = (document.getElementById("roleField").value || "Developer").trim();
    return { name, age, city, role };
}

function generateCard() {
    const { name, age, city, role } = readInputs();

    const html = `<div class="user-card">
  <h2>${name}</h2>
  <p>Age: ${age}</p>
  <p>City: ${city}</p>
  <p>Role: ${role}</p>
  <span class="tag">${role}</span>
</div>`;

    const preview = document.getElementById("previewTarget");
    if (preview) preview.innerHTML = html;

    setOutput(html, "#f0c674");
    console.log("Generated user card HTML:\n", html);
}

function generateList() {
    const { name } = readInputs();

    const itemsHtml = SAMPLE_ITEMS
        .map((item, i) => `    <li data-index="${i}">${item}</li>`)
        .join("\n");

    const html = `<div class="user-card">
  <h2>${name}'s Skills</h2>
  <ul>
${itemsHtml}
  </ul>
</div>`;

    const preview = document.getElementById("previewTarget");
    if (preview) preview.innerHTML = html;

    setOutput(html, "#7ec8e3");
    console.log("Generated list HTML:\n", html);
}

function generateRaw() {
    const { name, age, city, role } = readInputs();

    const html = `<div class="user-card">
  <h2>${name}</h2>
  <p>Age: ${age}</p>
  <p>City: ${city}</p>
  <p>Role: ${role}</p>
</div>`;

    setOutput(html, "#8ec07c");
    console.log("Raw HTML string:", html);
    console.log("String length:", html.length);

    // Do NOT update preview in this mode
}

function clearPreview() {
    const preview = document.getElementById("previewTarget");
    if (preview) {
        preview.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">Click a button to render HTML...</span>';
    }
    setOutput("// The generated HTML string will appear here...", "#a3a3c2");
    console.log("Preview cleared");
}

// Typing animation + live input logging
document.addEventListener("DOMContentLoaded", function() {
    const el = document.getElementById('typedTitle');
    const text = 'Template Literals & HTML';
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

    ["nameField", "ageField", "cityField", "roleField"].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", function() {
                console.log(`${id} changed to:`, this.value);
            });
        }
    });
});

// ============================================
// QUIZ SYSTEM (Template Literals — Clean HTML Generation)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What characters wrap a template literal?',
        options: [
            "Backticks (`)",
            "Single quotes (')",
            "Double quotes (\")",
            "Square brackets ([])"
        ],
        correct: 0,
        explanation: 'Template literals are wrapped in backticks (`).'
    },
    {
        id: 2,
        question: 'How do you embed a variable inside a template literal?',
        options: [
            "${variable}",
            "#{variable}",
            "{{variable}}",
            "$(variable)"
        ],
        correct: 0,
        explanation: 'Use ${variable} to embed a variable or expression.'
    },
    {
        id: 3,
        question: 'What is the output?<br><code>let n = "Alice";<br>console.log(`&lt;h1&gt;${n}&lt;/h1&gt;`);</code>',
        options: [
            '&lt;h1&gt;Alice&lt;/h1&gt;',
            '&lt;h1&gt;${n}&lt;/h1&gt;',
            '&lt;h1&gt;n&lt;/h1&gt;',
            "Error"
        ],
        correct: 0,
        explanation: '${n} is replaced with "Alice", producing &lt;h1&gt;Alice&lt;/h1&gt;.'
    },
    {
        id: 4,
        question: 'Why are template literals better than concatenation for HTML?',
        options: [
            "They are more readable and support multi-line markup",
            "They run faster",
            "They are required in modern browsers",
            "They automatically escape HTML"
        ],
        correct: 0,
        explanation: 'Template literals are more readable and allow multi-line HTML without + signs.'
    },
    {
        id: 5,
        question: 'How do you insert a list of array items into a template literal?',
        options: [
            'items.map(i => `&lt;li&gt;${i}&lt;/li&gt;`).join("")',
            "items.join()",
            "items.toString()",
            "items.forEach()"
        ],
        correct: 0,
        explanation: 'Use .map() to build each item and .join("") to concatenate them into one string.'
    },
    {
        id: 6,
        question: 'What is the output?<br><code>let a = 5;<br>let b = 3;<br>console.log(`${a} + ${b} = ${a + b}`);</code>',
        options: [
            "5 + 3 = 8",
            "5 + 3 = ${a + b}",
            "${a} + ${b} = ${a + b}",
            "Error"
        ],
        correct: 0,
        explanation: 'All ${} expressions are evaluated: 5, 3, and 8.'
    },
    {
        id: 7,
        question: 'Can a template literal span multiple lines?',
        options: [
            "Yes, without any special characters",
            "No, only one line",
            "Only with \\n",
            "Only in Node.js"
        ],
        correct: 0,
        explanation: 'Template literals naturally support multi-line strings.'
    },
    {
        id: 8,
        question: 'What is the output?<br><code>let html = `&lt;p&gt;${1 + 1}&lt;/p&gt;`;<br>console.log(html);</code>',
        options: [
            "&lt;p&gt;2&lt;/p&gt;",
            "&lt;p&gt;1 + 1&lt;/p&gt;",
            "&lt;p&gt;${1 + 1}&lt;/p&gt;",
            "Error"
        ],
        correct: 0,
        explanation: '${1 + 1} is evaluated to 2, producing &lt;p&gt;2&lt;/p&gt;.'
    },
    {
        id: 9,
        question: 'What property do you set to render a template literal as HTML?',
        options: [
            "element.innerHTML",
            "element.textContent",
            "element.value",
            "element.style"
        ],
        correct: 0,
        explanation: 'Assign the template string to element.innerHTML to render it as HTML.'
    },
    {
        id: 10,
        question: 'What is the output?<br><code>let items = ["A","B"];<br>let html = `&lt;ul&gt;${items.map(i => `&lt;li&gt;${i}&lt;/li&gt;`).join("")}&lt;/ul&gt;`;<br>console.log(html);</code>',
        options: [
            "&lt;ul&gt;&lt;li&gt;A&lt;/li&gt;&lt;li&gt;B&lt;/li&gt;&lt;/ul&gt;",
            "&lt;ul&gt;A,B&lt;/ul&gt;",
            "&lt;ul&gt;${items}&lt;/ul&gt;",
            "Error"
        ],
        correct: 0,
        explanation: 'Each item is wrapped in &lt;li&gt; and joined into a single string.'
    },
    {
        id: 11,
        question: 'What is the output?<br><code>let name = "Alice";<br>console.log(`Hello ${name}!`.length);</code>',
        options: [
            "12",
            "11",
            "13",
            "Error"
        ],
        correct: 0,
        explanation: '"Hello Alice!" has 12 characters, including the space and exclamation mark.'
    },
    {
        id: 12,
        question: 'Can you nest template literals inside ${}?',
        options: [
            "Yes, but they must use a different approach or carefully nested backticks",
            "No, never",
            "Only in Node.js",
            "Only in strict mode"
        ],
        correct: 0,
        explanation: 'You can nest template literals inside ${}, though deeply nested ones reduce readability.'
    },
    {
        id: 13,
        question: 'What is the output?<br><code>let user = { name: "Alice", age: 28 };<br>console.log(`&lt;p&gt;${user.name} (${user.age})&lt;/p&gt;`);</code>',
        options: [
            "&lt;p&gt;Alice (28)&lt;/p&gt;",
            "&lt;p&gt;user.name (user.age)&lt;/p&gt;",
            "&lt;p&gt;${user.name} (${user.age})&lt;/p&gt;",
            "Error"
        ],
        correct: 0,
        explanation: 'The expressions ${user.name} and ${user.age} are evaluated, producing &lt;p&gt;Alice (28)&lt;/p&gt;.'
    },
    {
        id: 14,
        question: 'Why is it common to call .join("") after .map() in a template literal?',
        options: [
            "Because .map() returns an array and template literals need a string",
            "Because .map() mutates the array",
            "Because .join() sorts the items",
            "Because .map() only works on strings"
        ],
        correct: 0,
        explanation: '.map() returns an array; .join("") converts it into a single string for the template.'
    },
    {
        id: 15,
        question: 'What is the output?<br><code>let x = 10;<br>let html = `&lt;div&gt;${x > 5 ? "big" : "small"}&lt;/div&gt;`;<br>console.log(html);</code>',
        options: [
            "&lt;div&gt;big&lt;/div&gt;",
            "&lt;div&gt;small&lt;/div&gt;",
            "&lt;div&gt;${x &gt; 5 ? \"big\" : \"small\"}&lt;/div&gt;",
            "Error"
        ],
        correct: 0,
        explanation: '${x > 5 ? "big" : "small"} evaluates to "big" since 10 > 5, producing &lt;div&gt;big&lt;/div&gt;.'
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
                        ">Level 63 Quiz · Template Literals + HTML</h2>
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
    if (progress['level63']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level64.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered template literals for HTML!';
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
        progress['level63'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level64.html';
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