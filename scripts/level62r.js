/**
 * Level 62: Simple Timer - setInterval & clearInterval
 * 
 * This file contains the interactive timer and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// SIMPLE TIMER DEMO
// ============================================

let totalSeconds = 10;
let remainingSeconds = 10;
let timerId = null;
let isRunning = false;

const timerDisplay = () => document.getElementById("timerDisplay");
const progressFill = () => document.getElementById("progressFill");
const statusEl = () => document.getElementById("timerStatus");
const startBtn = () => document.getElementById("startBtn");
const pauseBtn = () => document.getElementById("pauseBtn");
const resetBtn = () => document.getElementById("resetBtn");

function setStatus(message, color = "#a3a3c2") {
    const el = statusEl();
    if (el) {
        el.textContent = message;
        el.style.color = color;
    }
}

function updateDisplay(animate = false) {
    const display = timerDisplay();
    const fill = progressFill();

    if (display) {
        display.textContent = remainingSeconds;

        // Update color based on remaining time
        display.classList.remove("warning", "done");
        if (remainingSeconds === 0) {
            display.classList.add("done");
        } else if (remainingSeconds <= 3) {
            display.classList.add("warning");
        }

        // Animate on tick
        if (animate) {
            display.classList.add("tick");
            setTimeout(() => display.classList.remove("tick"), 150);
        }
    }

    if (fill) {
        const pct = (remainingSeconds / totalSeconds) * 100;
        fill.style.width = pct + "%";

        fill.classList.remove("warning");
        if (remainingSeconds <= 3 && remainingSeconds > 0) {
            fill.classList.add("warning");
        }
    }
}

function startTimer() {
    if (isRunning) return;
    if (remainingSeconds <= 0) {
        setStatus("Timer already finished. Click Reset to start again.", "#f3a072");
        return;
    }

    isRunning = true;
    startBtn().disabled = true;
    pauseBtn().disabled = false;

    setStatus(`⏱️ Counting down from ${remainingSeconds}...`, "#f0c674");
    console.log("Timer started at", remainingSeconds);

    timerId = setInterval(() => {
        remainingSeconds--;
        updateDisplay(true);
        console.log("Tick:", remainingSeconds);

        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            timerId = null;
            isRunning = false;

            startBtn().disabled = true;
            pauseBtn().disabled = true;

            setStatus("⏰ Time's up!", "#8ec07c");
            console.log("Timer finished!");
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timerId);
    timerId = null;
    isRunning = false;

    startBtn().disabled = false;
    pauseBtn().disabled = true;

    setStatus(`⏸️ Paused at ${remainingSeconds}. Click Start to resume.`, "#7ec8e3");
    console.log("Timer paused at", remainingSeconds);
}

function resetTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    isRunning = false;

    remainingSeconds = totalSeconds;
    updateDisplay(false);

    startBtn().disabled = false;
    pauseBtn().disabled = true;

    setStatus(`↺ Timer reset to ${totalSeconds}. Click Start to begin.`, "#a3a3c2");
    console.log("Timer reset to", totalSeconds);
}

function setPreset(seconds) {
    totalSeconds = seconds;
    remainingSeconds = seconds;

    // Update active preset button
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.classList.toggle("active", Number(btn.dataset.seconds) === seconds);
    });

    // If running, stop the timer so the new preset takes effect
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    isRunning = false;

    updateDisplay(false);
    startBtn().disabled = false;
    pauseBtn().disabled = true;

    setStatus(`Preset set to ${seconds} seconds. Click Start.`, "#a3a3c2");
    console.log("Preset set to", seconds, "seconds");
}

// Typing animation + initial state
document.addEventListener("DOMContentLoaded", function() {
    const el = document.getElementById('typedTitle');
    const text = 'Simple Timer';
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

    updateDisplay(false);
});

// ============================================
// QUIZ SYSTEM (Simple Timer)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What does setInterval() do?',
        options: [
            "Runs a function repeatedly at a specified interval",
            "Runs a function once after a delay",
            "Stops a running timer",
            "Returns the current time"
        ],
        correct: 0,
        explanation: 'setInterval() runs a function repeatedly at a specified interval in milliseconds.'
    },
    {
        id: 2,
        question: 'What does clearInterval() do?',
        options: [
            "Stops an interval started by setInterval()",
            "Runs a function once",
            "Resets the timer to 0",
            "Pauses for a moment"
        ],
        correct: 0,
        explanation: 'clearInterval() stops a running interval using the ID returned by setInterval().'
    },
    {
        id: 3,
        question: 'What is the output?<br><code>let id = setInterval(() => console.log("Hi"), 1000);<br>clearInterval(id);</code>',
        options: [
            'Nothing is logged',
            '"Hi" once',
            '"Hi" repeatedly',
            "Error"
        ],
        correct: 0,
        explanation: 'The interval is cleared immediately, so the callback never runs.'
    },
    {
        id: 4,
        question: 'How many milliseconds are in one second?',
        options: [
            "1000",
            "100",
            "10",
            "10000"
        ],
        correct: 0,
        explanation: 'There are 1000 milliseconds in 1 second.'
    },
    {
        id: 5,
        question: 'Why should you store the return value of setInterval()?',
        options: [
            "So you can stop it later with clearInterval()",
            "Because it is required",
            "To make it run faster",
            "To log it to the console"
        ],
        correct: 0,
        explanation: 'The return value is the interval ID needed to stop it later with clearInterval().'
    },
    {
        id: 6,
        question: 'What is the output?<br><code>let count = 3;<br>let id = setInterval(() => {<br>&nbsp;&nbsp;count--;<br>&nbsp;&nbsp;console.log(count);<br>&nbsp;&nbsp;if (count === 0) clearInterval(id);<br>}, 1000);</code>',
        options: [
            "2, 1, 0",
            "3, 2, 1",
            "3, 2, 1, 0",
            "0"
        ],
        correct: 0,
        explanation: 'count starts at 3, decrements to 2, 1, then 0. The interval stops when count hits 0.'
    },
    {
        id: 7,
        question: 'What happens if you call clearInterval() with no running interval?',
        options: [
            "Nothing happens",
            "It throws an error",
            "It restarts the interval",
            "It returns true"
        ],
        correct: 0,
        explanation: 'clearInterval() silently does nothing if no interval matches the ID.'
    },
    {
        id: 8,
        question: 'Which method runs code only once after a delay?',
        options: [
            "setTimeout()",
            "setInterval()",
            "setTimer()",
            "delay()"
        ],
        correct: 0,
        explanation: 'setTimeout() runs code once after a delay, while setInterval() runs it repeatedly.'
    },
    {
        id: 9,
        question: 'What is the output?<br><code>let x = 5;<br>let id = setInterval(() => {<br>&nbsp;&nbsp;x--;<br>&nbsp;&nbsp;console.log(x);<br>&nbsp;&nbsp;if (x === 2) clearInterval(id);<br>}, 500);</code>',
        options: [
            "4, 3, 2",
            "5, 4, 3, 2",
            "4, 3, 2, 1",
            "2"
        ],
        correct: 0,
        explanation: 'x decrements from 5 to 4, 3, 2, and stops when it reaches 2.'
    },
    {
        id: 10,
        question: 'What is the typical delay used for a 1-second tick?',
        options: [
            "1000ms",
            "100ms",
            "10ms",
            "1ms"
        ],
        correct: 0,
        explanation: '1000 milliseconds (1000ms) equals 1 second.'
    },
    {
        id: 11,
        question: 'What does setInterval() return?',
        options: [
            "An interval ID",
            "A Promise",
            "The callback function",
            "A number of remaining ticks"
        ],
        correct: 0,
        explanation: 'setInterval() returns a numeric ID that identifies the interval.'
    },
    {
        id: 12,
        question: 'What is the output?<br><code>let id = setInterval(() => console.log("Tick"), 1000);<br>setTimeout(() => clearInterval(id), 3500);</code>',
        options: [
            '"Tick" three times',
            '"Tick" four times',
            '"Tick" once',
            '"Tick" forever'
        ],
        correct: 0,
        explanation: 'The interval logs every 1s and stops after 3.5s, so it logs at 1s, 2s, and 3s.'
    },
    {
        id: 13,
        question: 'Which pair of methods is used to start and stop a repeating timer?',
        options: [
            "setInterval() and clearInterval()",
            "setTimeout() and clearTimeout()",
            "startTimer() and stopTimer()",
            "run() and stop()"
        ],
        correct: 0,
        explanation: 'setInterval() starts the timer and clearInterval() stops it.'
    },
    {
        id: 14,
        question: 'What is the output?<br><code>let n = 0;<br>let id = setInterval(() => {<br>&nbsp;&nbsp;n++;<br>&nbsp;&nbsp;if (n === 3) clearInterval(id);<br>&nbsp;&nbsp;console.log(n);<br>}, 1000);</code>',
        options: [
            "1, 2, 3",
            "1, 2",
            "0, 1, 2",
            "3"
        ],
        correct: 0,
        explanation: 'n increments to 1, 2, 3 and stops when it reaches 3.'
    },
    {
        id: 15,
        question: 'What should you do before starting a new interval if one is already running?',
        options: [
            "Clear the previous one with clearInterval()",
            "Nothing, they can run together",
            "Reload the page",
            "Wait for it to finish"
        ],
        correct: 0,
        explanation: 'Always clear the previous interval with clearInterval() before starting a new one to avoid multiple timers running.'
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
                        ">Level 62 Quiz · Simple Timer</h2>
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
                            <span id="timerDisplayQuiz" style="
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
    if (progress['level62']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level63.html';
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
    startQuizTimer();
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

function startQuizTimer() {
    if (quizState.timer) clearInterval(quizState.timer);
    
    quizState.timeLeft = 120;
    updateQuizTimerDisplay();

    quizState.timer = setInterval(() => {
        quizState.timeLeft--;
        updateQuizTimerDisplay();

        if (quizState.timeLeft <= 0) {
            clearInterval(quizState.timer);
            endQuiz(true);
        }
    }, 1000);
}

function updateQuizTimerDisplay() {
    const minutes = Math.floor(quizState.timeLeft / 60);
    const seconds = quizState.timeLeft % 60;
    const display = document.getElementById('timerDisplayQuiz');
    if (!display) return;
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
        message += ' 🌟 Perfect score! You\'ve mastered simple timers!';
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
        progress['level62'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level63.html';
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
    startQuizTimer();
}

// Export for potential module use (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startQuiz, QUIZ_QUESTIONS };
}