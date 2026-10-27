/**
 * Level 76: Tailwind CSS Quiz
 *
 * A small Tailwind playground (preview runs in an iframe so Tailwind
 * does not change this page's own styles) and a 20-question quiz.
 * All code here will run when the page loads.
 */

// ============================================
// TAILWIND PLAYGROUND
// ============================================

const TAILWIND_CDN = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";

// Each preset: starting classes + the HTML that uses them
const PRESETS = {
    button: {
        classes: "bg-blue-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700",
        html: (c) => `<button class="${c}">Click me</button>`
    },
    card: {
        classes: "bg-white w-64 p-6 rounded-xl shadow-lg border border-gray-200 text-center",
        html: (c) => `<div class="${c}">
            <h3 class="text-xl font-bold text-gray-800">Hello Tailwind</h3>
            <p class="text-gray-500 mt-2">Change my classes above.</p>
        </div>`
    },
    flex: {
        classes: "flex justify-center items-center gap-4",
        html: (c) => `<div class="${c}">
            <div class="bg-pink-400 w-14 h-14 rounded-lg"></div>
            <div class="bg-amber-400 w-14 h-14 rounded-lg"></div>
            <div class="bg-emerald-400 w-14 h-14 rounded-lg"></div>
        </div>`
    }
};

let currentPreset = "button";
let previewTimer = null;

function updatePreview() {
    let classes = document.getElementById("twClasses").value
        .replace(/["<>]/g, "")   // keep it to plain class names
        .trim();
    let inner = PRESETS[currentPreset].html(classes);

    document.getElementById("twPreview").srcdoc = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="${TAILWIND_CDN}"><\/script>
</head>
<body class="min-h-screen flex justify-center items-center bg-slate-100 p-4">
    ${inner}
</body>
</html>`;
}

function choosePreset(name) {
    currentPreset = name;
    document.getElementById("twClasses").value = PRESETS[name].classes;
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.preset === name);
    });
    updatePreview();
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", () => choosePreset(btn.dataset.preset));
    });

    // Wait until the user stops typing for a moment before reloading the preview
    document.getElementById("twClasses").addEventListener("input", () => {
        clearTimeout(previewTimer);
        previewTimer = setTimeout(updatePreview, 400);
    });

    choosePreset("button");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_LENGTH = 20;   // questions per attempt
const QUIZ_TIME = 300;    // seconds

// 25 easy Tailwind CSS questions. 20 are picked each attempt.
// In every question "correct" points to the right option.
// Options are shuffled when the quiz starts.
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What kind of CSS framework is Tailwind?',
        options: ["Utility-first", "A JavaScript framework", "A database", "An image editor"],
        correct: 0,
        explanation: 'Tailwind is utility-first: you build designs from small single-purpose classes.'
    },
    {
        id: 2,
        question: 'Where do you write Tailwind classes?',
        options: [
            "In the class attribute of your HTML",
            "In the <title> tag",
            "In a JavaScript alert",
            "In the href attribute"
        ],
        correct: 0,
        explanation: 'You add them straight to elements, like class="text-center p-4".'
    },
    {
        id: 3,
        question: 'What does <code>text-center</code> do?',
        options: ["Centers the text", "Makes text bigger", "Makes text bold", "Centers the whole page"],
        correct: 0,
        explanation: 'text-center is the same as text-align: center.'
    },
    {
        id: 4,
        question: 'What does <code>bg-blue-500</code> do?',
        options: ["Gives a blue background", "Gives blue text", "Adds a blue border", "Adds 500px of padding"],
        correct: 0,
        explanation: 'bg- classes set the background color. blue-500 is a medium blue.'
    },
    {
        id: 5,
        question: 'Which one is DARKER?',
        options: ["bg-red-900", "bg-red-100", "bg-red-300", "bg-red-50"],
        correct: 0,
        explanation: 'Higher numbers are darker. 50 and 100 are very light, 900 is very dark.'
    },
    {
        id: 6,
        question: 'What does <code>p-4</code> add?',
        options: ["Padding on all sides", "Margin on all sides", "4 paragraphs", "A 4px border"],
        correct: 0,
        explanation: 'p- is padding. p-4 is 1rem (16px) of padding on every side.'
    },
    {
        id: 7,
        question: 'What does <code>px-4</code> add?',
        options: [
            "Padding on the left and right",
            "Padding on the top and bottom",
            "4 pixels of margin",
            "Padding only on the left"
        ],
        correct: 0,
        explanation: 'x means left and right. py- would be top and bottom.'
    },
    {
        id: 8,
        question: 'What does <code>mt-4</code> add?',
        options: ["Margin on the top", "Margin on the bottom", "Padding on the top", "Max text size"],
        correct: 0,
        explanation: 'm is margin and t is top, so mt-4 is margin-top: 1rem.'
    },
    {
        id: 9,
        question: 'Which class makes an element <code>display: flex</code>?',
        options: ["flex", "display-flex", "flexbox", "d-flex"],
        correct: 0,
        explanation: 'Just add the class flex.'
    },
    {
        id: 10,
        question: 'Which class is <code>justify-content: center</code>?',
        options: ["justify-center", "items-center", "content-middle", "center-x"],
        correct: 0,
        explanation: 'justify-center centers items along the main axis of a flex container.'
    },
    {
        id: 11,
        question: 'Which class is <code>align-items: center</code>?',
        options: ["items-center", "justify-center", "align-middle", "center-y"],
        correct: 0,
        explanation: 'items-center lines up flex items in the middle on the cross axis.'
    },
    {
        id: 12,
        question: 'What does <code>rounded-lg</code> do?',
        options: ["Rounds the corners", "Makes the element large", "Makes it a circle always", "Adds a shadow"],
        correct: 0,
        explanation: 'rounded- classes set border-radius. lg is a large rounding.'
    },
    {
        id: 13,
        question: 'Which class makes text bold?',
        options: ["font-bold", "text-bold", "bold", "font-heavy-text"],
        correct: 0,
        explanation: 'font-bold sets font-weight: 700.'
    },
    {
        id: 14,
        question: 'Which class makes text bigger?',
        options: ["text-xl", "text-sm", "text-xs", "font-small"],
        correct: 0,
        explanation: 'Text sizes go xs, sm, base, lg, xl, 2xl and up. xl is bigger than the normal size.'
    },
    {
        id: 15,
        question: 'What does <code>hover:bg-blue-700</code> mean?',
        options: [
            "Use a darker blue background when the mouse is over it",
            "Always use a blue-700 background",
            "Hide the element on hover",
            "Make the text blue"
        ],
        correct: 0,
        explanation: 'The hover: prefix applies the class only while the mouse is over the element.'
    },
    {
        id: 16,
        question: 'What does <code>md:flex</code> mean?',
        options: [
            "Use flex on medium screens and bigger",
            "Use flex only on phones",
            "Make the flex box medium-sized",
            "Use flex on hover"
        ],
        correct: 0,
        explanation: 'Tailwind is mobile-first. md: applies from 768px wide and up.'
    },
    {
        id: 17,
        question: 'What does <code>w-full</code> do?',
        options: ["width: 100%", "width: 100px", "Full screen height", "Full border"],
        correct: 0,
        explanation: 'w-full sets the width to 100% of its parent.'
    },
    {
        id: 18,
        question: 'What do <code>grid grid-cols-3</code> create?',
        options: ["A grid with 3 columns", "3 rows", "3 grids", "A 3px gap"],
        correct: 0,
        explanation: 'grid turns on CSS grid and grid-cols-3 makes 3 equal columns.'
    },
    {
        id: 19,
        question: 'What does <code>gap-4</code> do?',
        options: [
            "Adds space between flex or grid items",
            "Adds space outside the element",
            "Adds 4 empty items",
            "Removes spacing"
        ],
        correct: 0,
        explanation: 'gap adds space between the children of a flex or grid container.'
    },
    {
        id: 20,
        question: 'Which class makes text white?',
        options: ["text-white", "bg-white", "white-text", "color-white"],
        correct: 0,
        explanation: 'text- with a color sets the text color. bg-white would change the background.'
    },
    {
        id: 21,
        question: 'Which class adds a box shadow?',
        options: ["shadow-md", "border-md", "shade-2", "dark-md"],
        correct: 0,
        explanation: 'shadow-sm, shadow-md, shadow-lg... add a box-shadow.'
    },
    {
        id: 22,
        question: 'Which class hides an element (<code>display: none</code>)?',
        options: ["hidden", "invisible-box", "none", "hide-all"],
        correct: 0,
        explanation: 'hidden sets display: none.'
    },
    {
        id: 23,
        question: 'What do <code>border border-gray-300</code> do together?',
        options: [
            "Add a 1px light gray border",
            "Add a 300px border",
            "Add a gray background",
            "Remove the border"
        ],
        correct: 0,
        explanation: 'border adds a 1px border and border-gray-300 colors it light gray.'
    },
    {
        id: 24,
        question: 'Which class makes an element as tall as the screen?',
        options: ["h-screen", "h-full-page", "height-100", "tall"],
        correct: 0,
        explanation: 'h-screen sets height: 100vh (the full screen height).'
    },
    {
        id: 25,
        question: 'What is the quickest way to try Tailwind in a plain HTML file?',
        options: [
            "Add the Tailwind CDN <script> tag in the <head>",
            "Rename the file to .tailwind",
            "Write tailwind() in JavaScript",
            "Add <tailwind> around the body"
        ],
        correct: 0,
        explanation: 'The Play CDN script tag lets you use Tailwind classes right away while learning.'
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
                        ">Level 76 Quiz</h2>
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
                            ">5:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            
                            <span id="progressDisplay">1 / 20</span>
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
                        ">QUESTION <span id="questionNumber">1</span>/20</div>
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
    if (progress['level76']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level77.html';
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
        message += ' 🌟 Perfect score! You know your Tailwind basics!';
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
        progress['level76'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level77.html';
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
    const text = 'Tailwind CSS Quiz';
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
