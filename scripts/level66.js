/**
 * Level 66: To-Do List App
 * 
 * This file implements a complete to-do list application.
 * All code here will run when the page loads.
 */

// ============================================
// TO-DO LIST APP
// ============================================

class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskId = 0;
        this.loadTasks();
        this.render();
        this.setupEventListeners();
    }

    loadTasks() {
        let saved = localStorage.getItem("todoTasks");
        if (saved) {
            try {
                this.tasks = JSON.parse(saved);
                if (this.tasks.length > 0) {
                    this.taskId = Math.max(...this.tasks.map(t => t.id)) + 1;
                }
            } catch (e) {
                this.tasks = [];
            }
        }
    }

    saveTasks() {
        localStorage.setItem("todoTasks", JSON.stringify(this.tasks));
    }

    addTask(text) {
        if (!text.trim()) {
            return;
        }
        this.tasks.push({
            id: this.taskId++,
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        });
        this.saveTasks();
        this.render();
        console.log("Added task:", text.trim());
    }

    toggleTask(id) {
        let task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            console.log("Toggled task:", task.text, "-> completed:", task.completed);
        }
    }

    deleteTask(id) {
        let task = this.tasks.find(t => t.id === id);
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
        console.log("Deleted task:", task ? task.text : "unknown");
    }

    getActiveCount() {
        return this.tasks.filter(t => !t.completed).length;
    }

    getCompletedCount() {
        return this.tasks.filter(t => t.completed).length;
    }

    render() {
        let list = document.getElementById("taskList");
        let count = document.getElementById("taskCount");

        if (this.tasks.length === 0) {
            list.innerHTML = '<li class="empty-message">No tasks yet. Add one above!</li>';
            count.textContent = "0 tasks";
            return;
        }

        let html = "";
        this.tasks.forEach(task => {
            let completedClass = task.completed ? "completed" : "";
            html += `
                <li class="task-item" data-id="${task.id}">
                    <span class="task-text ${completedClass}">${this.escapeHtml(task.text)}</span>
                    <div class="task-actions">
                        <button class="delete-btn" data-id="${task.id}" title="Delete task">✕</button>
                    </div>
                </li>
            `;
        });

        list.innerHTML = html;

        let active = this.getActiveCount();
        let completed = this.getCompletedCount();
        let total = this.tasks.length;
        count.textContent = `${total} tasks (${active} active, ${completed} completed)`;

        // Add event listeners to task items
        list.querySelectorAll(".task-item").forEach(item => {
            let id = parseInt(item.dataset.id);
            
            // Click on text toggles completion
            let textEl = item.querySelector(".task-text");
            textEl.addEventListener("click", () => {
                this.toggleTask(id);
            });

            // Delete button
            let deleteBtn = item.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.deleteTask(id);
            });
        });
    }

    escapeHtml(text) {
        let div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    setupEventListeners() {
        let input = document.getElementById("taskInput");
        let btn = document.getElementById("addTaskBtn");

        btn.addEventListener("click", () => {
            this.addTask(input.value);
            input.value = "";
            input.focus();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.addTask(input.value);
                input.value = "";
                input.focus();
            }
        });

        // Focus input on load
        input.focus();
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let app;

document.addEventListener("DOMContentLoaded", function() {
    app = new TodoApp();
    console.log("To-Do List App initialized!");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What does the addTask() method do?',
        options: [
            "Adds a new task to the list",
            "Deletes a task",
            "Toggles a task completion",
            "Saves tasks to localStorage"
        ],
        correct: 0,
        explanation: 'addTask() adds a new task to the task list.'
    },
    {
        id: 2,
        question: 'What does the toggleTask() method do?',
        options: [
            "Marks a task as complete or incomplete",
            "Deletes a task",
            "Adds a new task",
            "Saves tasks to localStorage"
        ],
        correct: 0,
        explanation: 'toggleTask() toggles the completed status of a task.'
    },
    {
        id: 3,
        question: 'What does the deleteTask() method do?',
        options: [
            "Removes a task from the list",
            "Adds a new task",
            "Toggles a task completion",
            "Saves tasks to localStorage"
        ],
        correct: 0,
        explanation: 'deleteTask() removes a task from the list.'
    },
    {
        id: 4,
        question: 'Where are tasks saved?',
        options: [
            "localStorage",
            "sessionStorage",
            "A database",
            "A file"
        ],
        correct: 0,
        explanation: 'Tasks are saved in localStorage for persistence.'
    },
    {
        id: 5,
        question: 'What happens when you click on a task text?',
        options: [
            "Toggles the task completion",
            "Deletes the task",
            "Edits the task",
            "Nothing"
        ],
        correct: 0,
        explanation: 'Clicking on a task toggles its completion status.'
    },
    {
        id: 6,
        question: 'What does the escapeHtml() method do?',
        options: [
            "Prevents XSS attacks by escaping HTML",
            "Saves tasks to localStorage",
            "Renders the task list",
            "Adds a new task"
        ],
        correct: 0,
        explanation: 'escapeHtml() prevents XSS attacks by escaping HTML characters.'
    },
    {
        id: 7,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Buy milk"); console.log(app.tasks.length);',
        options: [
            "1",
            "0",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'After adding one task, the task list length is 1.'
    },
    {
        id: 8,
        question: 'What does the getActiveCount() method return?',
        options: [
            "Number of incomplete tasks",
            "Number of completed tasks",
            "Total number of tasks",
            "Number of deleted tasks"
        ],
        correct: 0,
        explanation: 'getActiveCount() returns the number of incomplete tasks.'
    },
    {
        id: 9,
        question: 'What does the getCompletedCount() method return?',
        options: [
            "Number of completed tasks",
            "Number of incomplete tasks",
            "Total number of tasks",
            "Number of deleted tasks"
        ],
        correct: 0,
        explanation: 'getCompletedCount() returns the number of completed tasks.'
    },
    {
        id: 10,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Task 1"); app.addTask("Task 2"); app.deleteTask(0); console.log(app.tasks.length);',
        options: [
            "1",
            "2",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'After adding two tasks and deleting one, the length is 1.'
    },
    {
        id: 11,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Task 1"); app.toggleTask(0); console.log(app.tasks[0].completed);',
        options: [
            "true",
            "false",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'toggleTask() toggles the completed status to true.'
    },
    {
        id: 12,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Task 1"); app.addTask("Task 2"); console.log(app.getActiveCount());',
        options: [
            "2",
            "1",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'With two tasks and none completed, active count is 2.'
    },
    {
        id: 13,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Task 1"); app.addTask("Task 2"); app.toggleTask(0); console.log(app.getCompletedCount());',
        options: [
            "1",
            "2",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'After toggling one task, completed count is 1.'
    },
    {
        id: 14,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Task 1"); app.addTask("Task 2"); app.deleteTask(1); console.log(app.tasks.length);',
        options: [
            "1",
            "2",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'After adding two tasks and deleting the second one, length is 1.'
    },
    {
        id: 15,
        question: 'What is the output: let app = new TodoApp(); app.addTask("Task 1"); app.addTask("Task 2"); app.toggleTask(1); app.toggleTask(1); console.log(app.tasks[1].completed);',
        options: [
            "false",
            "true",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'Toggling twice returns to the original state (false).'
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
                        ">Level 66 Quiz</h2>
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
    if (progress['level66']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level67.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered the To-Do List app!';
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
        progress['level66'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level67.html';
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
    const text = 'To-Do List App';
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