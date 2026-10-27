/**
 * Level 73: Modal Popup
 *
 * One reusable modal that can show different content.
 * Closes with the X button, Cancel, a click on the overlay, or the Escape key.
 * All code here will run when the page loads.
 */

// ============================================
// MODAL POPUP
// ============================================

// Content for each kind of modal
const MODALS = {
    welcome: {
        title: "Welcome back!",
        text: "This is a modal popup. Click outside the box or press Escape to close it.",
        confirmText: "Got it",
        danger: false,
        hasInput: false
    },
    newsletter: {
        title: "Join the newsletter",
        text: "Get one short coding tip every week.",
        confirmText: "Subscribe",
        danger: false,
        hasInput: true
    },
    delete: {
        title: "Delete this item?",
        text: "This cannot be undone. Are you sure?",
        confirmText: "Delete",
        danger: true,
        hasInput: false
    }
};

let overlay;
let currentModal = null;

function openModal(name) {
    let data = MODALS[name];
    currentModal = name;

    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalText").textContent = data.text;

    let confirmBtn = document.getElementById("modalConfirmBtn");
    confirmBtn.textContent = data.confirmText;
    confirmBtn.classList.toggle("danger", data.danger);

    let extra = document.getElementById("modalExtra");
    extra.innerHTML = data.hasInput
        ? '<input class="input" type="email" id="modalEmail" placeholder="you@example.com" aria-label="Email address">'
        : "";

    overlay.classList.add("open");
    document.body.style.overflow = "hidden"; // stop the page from scrolling

    // Move keyboard focus into the modal
    let firstInput = document.getElementById("modalEmail");
    (firstInput || confirmBtn).focus();

    logEvent(`Opened the "${name}" modal`);
}

function closeModal(reason) {
    if (!overlay.classList.contains("open")) return;

    overlay.classList.remove("open");
    document.body.style.overflow = "";
    logEvent(`Closed with: ${reason}`);
    currentModal = null;
}

function confirmModal() {
    if (currentModal === "newsletter") {
        let email = document.getElementById("modalEmail").value.trim();
        if (!email.includes("@")) {
            document.getElementById("modalEmail").focus();
            logEvent("Please type a valid email first");
            return;
        }
        closeModal(`Subscribe (${email})`);
        return;
    }
    closeModal(document.getElementById("modalConfirmBtn").textContent + " button");
}

function logEvent(message) {
    document.getElementById("eventLog").textContent = message;
}

document.addEventListener("DOMContentLoaded", function() {
    overlay = document.getElementById("modalOverlay");

    // Every button with data-modal opens that modal
    document.querySelectorAll("[data-modal]").forEach(btn => {
        btn.addEventListener("click", () => openModal(btn.dataset.modal));
    });

    document.getElementById("modalCloseBtn").addEventListener("click", () => closeModal("X button"));
    document.getElementById("modalCancelBtn").addEventListener("click", () => closeModal("Cancel button"));
    document.getElementById("modalConfirmBtn").addEventListener("click", confirmModal);

    // Only close when the dark overlay itself is clicked, not the box
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal("click outside");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal("Escape key");
    });
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_LENGTH = 10;   // questions per attempt
const QUIZ_TIME = 120;    // seconds

// In every question "correct" points to the right option.
// Options are shuffled when the quiz starts.
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'Which CSS <code>position</code> makes the overlay cover the screen even when you scroll?',
        options: ["fixed", "static", "relative", "sticky"],
        correct: 0,
        explanation: 'position: fixed sticks the element to the screen, so it stays in place while scrolling.'
    },
    {
        id: 2,
        question: 'How do we show the modal in this level?',
        options: [
            'overlay.classList.add("open")',
            'overlay.remove()',
            'overlay.innerHTML = ""',
            'overlay.style.color = "open"'
        ],
        correct: 0,
        explanation: 'Adding the "open" class switches the CSS to opacity: 1 and visibility: visible.'
    },
    {
        id: 3,
        question: 'How do we hide the modal again?',
        options: [
            'overlay.classList.remove("open")',
            'overlay.classList.add("open")',
            'overlay.hide()',
            'document.close()'
        ],
        correct: 0,
        explanation: 'Removing the "open" class sends the modal back to its hidden style.'
    },
    {
        id: 4,
        question: 'How do we know the user clicked the dark overlay and NOT the box?',
        options: [
            "e.target === overlay",
            "e.key === overlay",
            "e.type === 'box'",
            "overlay.clicked === true"
        ],
        correct: 0,
        explanation: 'e.target is the exact element clicked. If it is the overlay itself, the click was outside the box.'
    },
    {
        id: 5,
        question: 'Which key should close a modal?',
        options: ["Escape", "Enter", "Space", "Tab"],
        correct: 0,
        explanation: 'Users expect Escape to close popups. We check e.key === "Escape".'
    },
    {
        id: 6,
        question: 'Why set <code>document.body.style.overflow = "hidden"</code> while the modal is open?',
        options: [
            "To stop the page behind from scrolling",
            "To hide the modal",
            "To make text bold",
            "To delete the page"
        ],
        correct: 0,
        explanation: 'It locks the page scroll so only the modal gets attention.'
    },
    {
        id: 7,
        question: 'Which CSS property puts the modal on top of other elements?',
        options: ["z-index", "font-size", "margin", "line-height"],
        correct: 0,
        explanation: 'A higher z-index puts an element above elements with a lower z-index.'
    },
    {
        id: 8,
        question: 'What does <code>inset: 0</code> mean?',
        options: [
            "top, right, bottom and left are all 0",
            "No padding",
            "No margin",
            "Width is 0"
        ],
        correct: 0,
        explanation: 'inset is a shortcut for top, right, bottom and left, so the overlay fills the screen.'
    },
    {
        id: 9,
        question: 'Why use <code>opacity</code> + <code>visibility</code> instead of <code>display: none</code>?',
        options: [
            "So we can animate a smooth fade in and out",
            "Because display: none does not work",
            "To make the modal bigger",
            "It loads faster"
        ],
        correct: 0,
        explanation: 'display cannot be animated with transition, but opacity can, so the modal fades smoothly.'
    },
    {
        id: 10,
        question: 'Which CSS centers the box inside the overlay in this level?',
        options: [
            "display: flex; justify-content: center; align-items: center;",
            "text-align: right;",
            "float: left;",
            "position: static;"
        ],
        correct: 0,
        explanation: 'Flexbox with justify-content and align-items set to center puts the box in the middle.'
    },
    {
        id: 11,
        question: 'What does <code>rgba(0, 0, 0, 0.6)</code> give the overlay?',
        options: [
            "A see-through dark background",
            "A solid white background",
            "A red border",
            "No background"
        ],
        correct: 0,
        explanation: 'rgba is black (0,0,0) with 0.6 opacity, so you can still faintly see the page behind.'
    },
    {
        id: 12,
        question: 'In this level, how do the demo buttons tell <code>openModal()</code> which modal to show?',
        options: [
            "With a data-modal attribute read through btn.dataset.modal",
            "With the button's color",
            "With localStorage",
            "With a fetch request"
        ],
        correct: 0,
        explanation: 'Each button has data-modal="welcome" (etc.), and btn.dataset.modal reads that value.'
    }
];

let quizState = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    answered: false,
    timeLeft: QUIZ_TIME,
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

// Picks random questions and shuffles each question's options,
// so the right answer is not always in the same spot.
function prepareQuestions() {
    return shuffleArray(QUIZ_QUESTIONS).slice(0, QUIZ_LENGTH).map(q => {
        const order = shuffleArray(q.options.map((_, i) => i));
        return {
            ...q,
            options: order.map(i => q.options[i]),
            correct: order.indexOf(q.correct)
        };
    });
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
                        ">Level 73 Quiz</h2>
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
    if (progress['level73']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level74.html';
        }
        return;
    }

        quizState = {
        questions: prepareQuestions(),
        currentQuestion: 0,
        score: 0,
        answered: false,
        timeLeft: QUIZ_TIME,
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
    
    quizState.timeLeft = QUIZ_TIME;
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
        message += ' 🌟 Perfect score! You can build modals like a pro!';
    } else if (timeUp) {
        message += ` ⏱️ You ran out of time. Need ${total}/${total} to pass.`;
    } else {
        message += ` Need ${total}/${total} to pass. Review the API documentation and try again!`;
    }

    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;

    if (passed) {
        const progress = JSON.parse(localStorage.getItem('levelProgress')) || {};
        progress['level73'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level74.html';
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
        quizState = {
        questions: prepareQuestions(),
        currentQuestion: 0,
        score: 0,
        answered: false,
        timeLeft: QUIZ_TIME,
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
    const text = 'Modal Popup';
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
