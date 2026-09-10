/**
 * Level 58: Background Color Changer - DOM Project
 * 
 * This file contains the interactive demo and quiz logic.
 * It runs when the page loads.
 */

// ============================================
// BACKGROUND COLOR CHANGER DEMO
// ============================================

const PRESET_COLORS = [
    "#f38ba8", // red
    "#fab387", // peach
    "#f9e2af", // yellow
    "#a6e3a1", // green
    "#89dceb", // sky
    "#cba6f7", // mauve
    "#94e2d5", // teal
    "#b4befe"  // lavender
];

let currentColorIndex = -1;
let originalBackground = null;

function setOutput(msg, color = "#a3a3c2") {
    const out = document.getElementById("colorOutput");
    if (out) {
        out.innerHTML = msg;
        out.style.color = color;
    }
}

function setTargetColor(color) {
    const target = document.getElementById("colorTarget");
    const display = document.getElementById("currentColorDisplay");
    if (!target || !display) return;

    if (originalBackground === null) {
        originalBackground = getComputedStyle(target).backgroundColor;
    }

    target.style.backgroundColor = color;
    display.textContent = color;
    display.style.color = color === "#f9e2af" ? "#1a1a1a" : "#e9e9f5";

    setOutput(`🎨 Background color set to <span class="highlight">${color}</span>`, "#8ec07c");
    console.log("Set target background color to:", color);
}

function randomColor() {
    // Generate a random hex color
    const random = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setTargetColor(random);
    setOutput(`🎲 Random color generated: <span class="highlight">${random}</span>`, "#f0c674");
    console.log("Random color:", random);
}

function cycleColors() {
    currentColorIndex = (currentColorIndex + 1) % PRESET_COLORS.length;
    const color = PRESET_COLORS[currentColorIndex];
    setTargetColor(color);
    setOutput(
        `🔄 Cycled to color ${currentColorIndex + 1}/${PRESET_COLORS.length}: <span class="highlight">${color}</span>`,
        "#7ec8e3"
    );
    console.log("Cycled to color:", color);
}

function changePageBackground() {
    const random = "#" + Math.floor(Math.random() * 0x333333).toString(16).padStart(6, "0");
    document.body.style.backgroundColor = random;
    setOutput(`🖼️ Page background changed to <span class="highlight">${random}</span>`, "#b58aef");
    console.log("Page background changed to:", random);
}

function resetColor() {
    const target = document.getElementById("colorTarget");
    const display = document.getElementById("currentColorDisplay");
    if (target) {
        target.style.backgroundColor = "";
    }
    if (display) {
        display.textContent = "Default";
        display.style.color = "#e9e9f5";
    }
    document.body.style.backgroundColor = "";
    currentColorIndex = -1;
    originalBackground = null;
    setOutput("↺ Reset to default colors.", "#a3a3c2");
    console.log("Colors reset to default");
}

// Typing animation + real-time logging
document.addEventListener("DOMContentLoaded", function() {
    const el = document.getElementById('typedTitle');
    const text = 'Background Color Changer';
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
});

// ============================================
// QUIZ SYSTEM (Background Color Changer)
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'How do you change the background color of an element in JavaScript?',
        options: [
            'element.style.backgroundColor = "red"',
            'element.background = "red"',
            'element.color = "red"',
            'element.bgColor = "red"'
        ],
        correct: 0,
        explanation: 'Use element.style.backgroundColor = "color" to change the background color.'
    },
    {
        id: 2,
        question: 'Which CSS property is controlled by <code>element.style.backgroundColor</code>?',
        options: [
            "background-color",
            "background",
            "color",
            "fill"
        ],
        correct: 0,
        explanation: 'element.style.backgroundColor maps to the CSS background-color property.'
    },
    {
        id: 3,
        question: 'What is the output?<br><code>let box = document.getElementById("box");<br>box.style.backgroundColor = "#a6e3a1";</code>',
        options: [
            'The box turns green',
            "The box turns red",
            "The box disappears",
            "Nothing happens"
        ],
        correct: 0,
        explanation: '#a6e3a1 is a green color, so the box turns green.'
    },
    {
        id: 4,
        question: 'How do you add a click listener to a button?',
        options: [
            'button.addEventListener("click", fn)',
            'button.onClick = fn',
            'button.click(fn)',
            'button.listen("click", fn)'
        ],
        correct: 0,
        explanation: 'Use addEventListener("click", function) to run code on click.'
    },
    {
        id: 5,
        question: 'What is the output?<br><code>let box = document.getElementById("box");<br>box.style.backgroundColor = "rgb(255, 0, 0)";</code>',
        options: [
            "The box turns red",
            "The box turns blue",
            "The box turns green",
            "Invalid color"
        ],
        correct: 0,
        explanation: 'rgb(255, 0, 0) is red, so the box turns red.'
    },
    {
        id: 6,
        question: 'How do you generate a random hex color?',
        options: [
            'Math.floor(Math.random() * 16777215).toString(16)',
            "Math.random().toString(16)",
            "Math.color()",
            "random.hex()"
        ],
        correct: 0,
        explanation: 'Multiply Math.random() by 16777215 (0xFFFFFF) and convert to base 16.'
    },
    {
        id: 7,
        question: 'What is the output?<br><code>Math.floor(Math.random() * 2)</code>',
        options: [
            "0 or 1",
            "1 or 2",
            "Any number",
            "0 only"
        ],
        correct: 0,
        explanation: 'Math.random() returns a value between 0 and 1, so Math.floor(random * 2) gives 0 or 1.'
    },
    {
        id: 8,
        question: 'What does <code>element.style.backgroundColor = ""</code> do?',
        options: [
            "Resets the inline background color",
            "Sets the color to black",
            "Throws an error",
            "Removes the element"
        ],
        correct: 0,
        explanation: 'Assigning an empty string clears the inline style, so the CSS default applies.'
    },
    {
        id: 9,
        question: 'Which of these is NOT a valid CSS color value for backgroundColor?',
        options: [
            "12345",
            "#ff0000",
            "rgb(255, 0, 0)",
            "red"
        ],
        correct: 0,
        explanation: '12345 is a number, not a valid color string. Colors must be strings like "#ff0000" or "red".'
    },
    {
        id: 10,
        question: 'What is the output?<br><code>let c = "#" + (123456).toString(16);<br>console.log(c);</code>',
        options: [
            '"#1e240"',
            '"#123456"',
            '"#12345"',
            "Error"
        ],
        correct: 0,
        explanation: '123456 in hex is 1e240, so the string is "#1e240".'
    },
    {
        id: 11,
        question: 'How do you apply a smooth transition to a background color change?',
        options: [
            "Add a CSS transition property",
            "Use a faster computer",
            "Call setTimeout",
            "Use an animation library only"
        ],
        correct: 0,
        explanation: 'CSS transitions (e.g., transition: background-color 0.4s ease) make color changes smooth.'
    },
    {
        id: 12,
        question: 'What is the output?<br><code>let x = "#f38ba8";<br>document.getElementById("box").style.backgroundColor = x;</code>',
        options: [
            "The box gets a pink/red background",
            "The box gets a blue background",
            "The box turns white",
            "Error"
        ],
        correct: 0,
        explanation: '#f38ba8 is a pink/red color, so the box becomes pink/red.'
    },
    {
        id: 13,
        question: 'Which syntax correctly sets an inline style from JavaScript?',
        options: [
            'el.style.color = "red"',
            "el.style-color = red",
            'el.css("color", "red")',
            'el.setStyle("color", "red")'
        ],
        correct: 0,
        explanation: 'Use camelCase in JavaScript: el.style.color = "red".'
    },
    {
        id: 14,
        question: 'What is the output?<br><code>let n = 255;<br>console.log(n.toString(16));</code>',
        options: [
            '"ff"',
            '"255"',
            '"FF"',
            "Error"
        ],
        correct: 0,
        explanation: '255 in hexadecimal is "ff" (lowercase because toString returns lowercase letters).'
    },
    {
        id: 15,
        question: 'Why might you store the original color before changing it?',
        options: [
            "To restore it later with a Reset button",
            "To speed up the page",
            "To prevent errors",
            "Because CSS requires it"
        ],
        correct: 0,
        explanation: 'Saving the original color lets you restore it later, e.g., with a Reset button.'
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
                        ">Level 58 Quiz · Color Changer</h2>
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
    if (progress['level58']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level59.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered DOM color changes!';
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
        progress['level58'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level59.html';
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