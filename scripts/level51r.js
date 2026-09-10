/**
 * Level 51: Array CRUD - Reading & Adding Elements
 * 
 * This file contains the interactive demo and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// ARRAY CRUD DEMO (Reading & Adding)
// ============================================

let demoArray = ["apple", "banana", "cherry"];

function updateGrid() {
    for (let i = 0; i < 4; i++) {
        const el = document.getElementById(`gridVal${i}`);
        if (el) {
            el.textContent = i < demoArray.length ? `"${demoArray[i]}"` : "undefined";
        }
    }
}

function setOutput(msg, color = "#a3a3c2") {
    const out = document.getElementById("arrayOutput");
    if (out) {
        out.innerHTML = msg;
        out.style.color = color;
    }
}

function readElement() {
    const index = parseInt(document.getElementById("indexInput").value, 10);
    if (isNaN(index) || index < 0) {
        setOutput("⚠️ Please enter a valid non-negative index.", "#f3a072");
        return;
    }
    const value = demoArray[index];
    if (value === undefined) {
        setOutput(`arr[${index}] → undefined  <span class="highlight">(index out of bounds)</span>`, "#f3a072");
    } else {
        setOutput(`arr[${index}] → "${value}"`, "#8ec07c");
    }
    console.log(`Read arr[${index}]:`, value);
    updateGrid();
}

function writeElement() {
    const index = parseInt(document.getElementById("indexInput").value, 10);
    const val = document.getElementById("valueInput").value.trim();
    if (isNaN(index) || index < 0) {
        setOutput("⚠️ Please enter a valid non-negative index.", "#f3a072");
        return;
    }
    if (!val) {
        setOutput("⚠️ Please enter a value to assign.", "#f3a072");
        return;
    }
    const old = demoArray[index];
    demoArray[index] = val;
    setOutput(`arr[${index}] = "${val}"  <span class="highlight">(previous: ${old !== undefined ? `"${old}"` : 'undefined'})</span>`, "#8ec07c");
    console.log(`Set arr[${index}] = "${val}"`);
    updateGrid();
}

function pushElement() {
    const val = document.getElementById("valueInput").value.trim();
    if (!val) {
        setOutput("⚠️ Please enter a value to push.", "#f3a072");
        return;
    }
    demoArray.push(val);
    setOutput(`Pushed "${val}" → array length is now ${demoArray.length}`, "#8ec07c");
    console.log(`Pushed "${val}"`);
    updateGrid();
}

function resetArray() {
    demoArray = ["apple", "banana", "cherry"];
    setOutput('Array reset to ["apple", "banana", "cherry"]', "#a3a3c2");
    console.log("Array reset");
    updateGrid();
}

function showArray() {
    const display = JSON.stringify(demoArray);
    setOutput(`Full array: ${display}  (length: ${demoArray.length})`, "#7ec8e3");
    console.log("Array:", demoArray);
}

// Real-time input logging for demo array fields
document.addEventListener("DOMContentLoaded", function() {
    // Typing animation for hero title
    const el = document.getElementById('typedTitle');
    const text = 'Array CRUD: Read & Add';
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

    // Demo array input logging
    const idxInput = document.getElementById("indexInput");
    const valInput = document.getElementById("valueInput");
    if (idxInput) {
        idxInput.addEventListener("input", function() {
            console.log("Index field changed to:", this.value);
        });
    }
    if (valInput) {
        valInput.addEventListener("input", function() {
            console.log("Value field changed to:", this.value);
        });
    }
});

// ============================================
// QUIZ SYSTEM (Array CRUD: Reading & Adding)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'How do you read the first element of an array <code>arr</code>?',
        options: ["arr[0]", "arr[1]", "arr.first()", "arr.get(0)"],
        correct: 0,
        explanation: 'Arrays are zero-indexed, so the first element is at index 0: arr[0].'
    },
    {
        id: 2,
        question: 'What does <code>arr[arr.length] = "new"</code> do?',
        options: [
            "Appends 'new' to the end of the array",
            "Adds 'new' at the beginning",
            "Replaces the last element with 'new'",
            "Throws an error"
        ],
        correct: 0,
        explanation: 'Since indices start at 0, arr.length is the next empty index — assigning there appends to the end.'
    },
    {
        id: 3,
        question: 'What is the value of <code>arr[10]</code> if the array has only 3 elements?',
        options: ["undefined", "null", "0", "Error"],
        correct: 0,
        explanation: 'Accessing an index beyond the array length returns undefined.'
    },
    {
        id: 4,
        question: 'Which property gives the number of elements in an array?',
        options: [".length", ".size", ".count", ".index"],
        correct: 0,
        explanation: 'The .length property returns the number of elements in an array.'
    },
    {
        id: 5,
        question: 'What does <code>arr[1] = "x"</code> do if arr is <code>["a", "b"]</code>?',
        options: [
            'Changes "b" to "x"',
            'Adds "x" at the end',
            'Adds "x" at the beginning',
            'Throws an error'
        ],
        correct: 0,
        explanation: 'Assigning to an existing index overwrites the current value. Here it changes index 1 from "b" to "x".'
    },
    {
        id: 6,
        question: 'How do you access the last element of an array?',
        options: [
            "arr[arr.length - 1]",
            "arr[arr.length]",
            "arr.last()",
            "arr[-1]"
        ],
        correct: 0,
        explanation: 'Since the last index is length - 1, you can use arr[arr.length - 1].'
    },
    {
        id: 7,
        question: 'What does <code>.push("value")</code> return?',
        options: [
            "The new length of the array",
            "The pushed value",
            "The array itself",
            "undefined"
        ],
        correct: 0,
        explanation: '.push() returns the new length of the array after adding the element(s).'
    },
    {
        id: 8,
        question: 'What is <code>arr.length</code> after <code>let arr = [1,2,3]; arr[3] = 4;</code>?',
        options: ["4", "3", "undefined", "Error"],
        correct: 0,
        explanation: 'Assigning to index 3 extends the array, so length becomes 4.'
    },
    {
        id: 9,
        question: 'Which syntax correctly adds "mango" at the end of <code>fruits</code>?',
        options: [
            'fruits[fruits.length] = "mango"',
            'fruits.push("mango")',
            'Both A and B',
            'fruits.add("mango")'
        ],
        correct: 2,
        explanation: 'Both bracket assignment at length and .push() append to the end of an array.'
    },
    {
        id: 10,
        question: 'What is the index of the first element in an array?',
        options: ["0", "1", "-1", "Depends on the array"],
        correct: 0,
        explanation: 'JavaScript arrays are zero-indexed, so the first element is at index 0.'
    },
    {
        id: 11,
        question: 'What does <code>arr[5] = "hi"</code> do if the array has 2 elements?',
        options: [
            "Creates empty slots at indices 2-4 then adds 'hi' at index 5",
            "Adds 'hi' at index 2",
            "Throws an error",
            "Adds 'hi' at index 0"
        ],
        correct: 0,
        explanation: 'Assigning beyond the current length creates a sparse array — intermediate indices become empty (undefined).'
    },
    {
        id: 12,
        question: 'How can you read the third element of <code>arr</code>?',
        options: ["arr[2]", "arr[3]", "arr.third", "arr(2)"],
        correct: 0,
        explanation: 'The third element is at index 2 (0-based indexing).'
    },
    {
        id: 13,
        question: 'What is the output?<br><code>let a = ["x","y"]; a[2] = "z"; console.log(a.length);</code>',
        options: ["3", "2", "undefined", "Error"],
        correct: 0,
        explanation: 'Assigning to index 2 adds a third element, so length becomes 3.'
    },
    {
        id: 14,
        question: 'Which of the following is NOT a way to add an element to an array?',
        options: [
            "arr.append('value')",
            "arr[arr.length] = 'value'",
            "arr.push('value')",
            "arr[3] = 'value' (if length is 3)"
        ],
        correct: 0,
        explanation: 'There is no .append() method in JavaScript arrays — use .push() or bracket assignment.'
    },
    {
        id: 15,
        question: 'What does <code>arr[0]</code> return if <code>arr = []</code>?',
        options: ["undefined", "null", "0", "Error"],
        correct: 0,
        explanation: 'An empty array has no elements, so accessing index 0 returns undefined.'
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
                        ">Level 51 Quiz · Array CRUD</h2>
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
    if (progress['level51']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level52.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered array reading and adding!';
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
        progress['level51'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level52.html';
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