/**
 * Level 35: String Operations
 * 
 * This file demonstrates string operations in JavaScript.
 * All code here will run when the page loads.
 */

// ============================================
// STRING OPERATIONS
// ============================================

console.log("--- String Operations ---");

const hello = "Hello";
const world = "World";
const greeting = hello + " " + world;
console.log('hello + " " + world =', greeting);
console.log('"Hello" + " World" =', "Hello" + " World");
console.log('"Hello" + "World" =', "Hello" + "World");

// ============================================
// STRING LENGTH
// ============================================

const text = "JavaScript";
console.log('"JavaScript".length =', text.length);
console.log('"Hello".length =', "Hello".length);
console.log('"".length =', "".length);

// ============================================
// TO UPPERCASE
// ============================================

const lower = "hello";
const upper = lower.toUpperCase();
console.log('"hello".toUpperCase() =', upper);
console.log('"JavaScript".toUpperCase() =', "JavaScript".toUpperCase());

// ============================================
// TO LOWERCASE
// ============================================

const upperText = "WORLD";
const lowerText = upperText.toLowerCase();
console.log('"WORLD".toLowerCase() =', lowerText);
console.log('"HELLO".toLowerCase() =', "HELLO".toLowerCase());

// ============================================
// MORE EXAMPLES
// ============================================

console.log("\n--- More Examples ---");

const name = "John";
const message = "Hello, " + name + "!";
console.log('"Hello, " + name + "!" =', message);
console.log('message.length =', message.length);
console.log('message.toUpperCase() =', message.toUpperCase());
console.log('message.toLowerCase() =', message.toLowerCase());

// ============================================
// TEMPLATE LITERALS
// ============================================

const age = 25;
const template = `My name is ${name} and I am ${age} years old.`;
console.log('Template literal:', template);
console.log('Template length:', template.length);

// ============================================
// STRING CONCATENATION
// ============================================

const numString = "42";
const concatResult = "The answer is " + numString;
console.log('"The answer is " + "42" =', concatResult);
console.log('concatResult.length =', concatResult.length);

const part1 = "This";
const part2 = " is";
const part3 = " a";
const part4 = " sentence.";
const fullSentence = part1 + part2 + part3 + part4;
console.log('Full sentence:', fullSentence);
console.log('Sentence length:', fullSentence.length);
console.log('Sentence uppercase:', fullSentence.toUpperCase());

// ============================================
// STRINGS ARE IMMUTABLE
// ============================================

const original = "Hello";
const modified = original.toUpperCase();
console.log("\n--- Strings are Immutable ---");
console.log('Original:', original);
console.log('Modified:', modified);
console.log('Original still:', original);

// ============================================
// QUIZ SYSTEM
// ============================================

// Quiz questions database
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What is the result of "Hello" + "World"?',
        options: [
            "Hello World",
            "HelloWorld",
            "Hello+World",
            "Hello World!"
        ],
        correct: 1,
        explanation: 'The + operator with strings concatenates them without adding a space, resulting in "HelloWorld".'
    },
    {
        id: 2,
        question: 'What does "JavaScript".length return?',
        options: [
            "8",
            "9",
            "10",
            "11"
        ],
        correct: 2,
        explanation: '"JavaScript" has 10 characters: J-a-v-a-S-c-r-i-p-t (count them!).'
    },
    {
        id: 3,
        question: 'What is the result of "hello".toUpperCase() ?',
        options: [
            "Hello",
            "HELLO",
            "hello",
            "hELLO"
        ],
        correct: 1,
        explanation: 'toUpperCase() converts all characters to uppercase, so "hello" becomes "HELLO".'
    },
    {
        id: 4,
        question: 'Which method converts a string to lowercase?',
        options: [
            "toUpperCase()",
            "toLowerCase()",
            "lowerCase()",
            "toLower()"
        ],
        correct: 1,
        explanation: 'toLowerCase() is the correct method to convert a string to lowercase.'
    },
    {
        id: 5,
        question: 'What will be the output? "Hello" + " " + "World"',
        options: [
            "HelloWorld",
            "Hello World",
            "Hello+World",
            "Hello World!"
        ],
        correct: 1,
        explanation: 'The string " " adds a space between "Hello" and "World", resulting in "Hello World".'
    },
    {
        id: 6,
        question: 'What is the length of an empty string ""?',
        options: [
            "0",
            "1",
            "undefined",
            "null"
        ],
        correct: 0,
        explanation: 'An empty string "" has a length of 0 because it contains no characters.'
    },
    {
        id: 7,
        question: 'What does template literal syntax use to embed expressions?',
        options: [
            "${}",
            "{}",
            "[]",
            "()"
        ],
        correct: 0,
        explanation: 'Template literals use ${} syntax to embed expressions, like `Hello ${name}`.'
    },
    {
        id: 8,
        question: 'What is the result of "WORLD".toLowerCase() ?',
        options: [
            "WORLD",
            "world",
            "World",
            "wORLD"
        ],
        correct: 1,
        explanation: 'toLowerCase() converts all characters to lowercase, so "WORLD" becomes "world".'
    },
    {
        id: 9,
        question: 'What happens when you call toUpperCase() on the string "Hello"?',
        options: [
            "It modifies the original string",
            "It returns a new string, original unchanged",
            "It throws an error",
            "It returns undefined"
        ],
        correct: 1,
        explanation: 'Strings are immutable in JavaScript. toUpperCase() returns a new string while the original remains unchanged.'
    },
    {
        id: 10,
        question: 'What is the result of "The answer is" + 42?',
        options: [
            "The answer is42",
            "The Answer is 42",
            "The answer is 42",
            "Error: Cannot add string and number"
        ],
        correct: 0,
        explanation: 'When a string is added to a number, JavaScript converts the number to a string and concatenates, resulting in "The answer is42" (no space) expect you manually give it space.'
    }
];

// Quiz state
let quizState = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    answered: false,
    timeLeft: 120,
    timer: null
};

// DOM elements
let quizModal, quizContent, quizResults;

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Create and inject quiz modal into DOM
 */
function createQuizModal() {
    // Check if modal already exists
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
                <!-- Modal Header -->
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
                        ">Level 35 Quiz</h2>
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

                <!-- Quiz Content -->
                <div id="quizContent" style="padding: 32px 24px 24px;">
                    <!-- Timer & Progress -->
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
                            ">1:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            
                            <span id="progressDisplay">1 / 10</span>
                        </div>
                    </div>

                    <!-- Progress Bar -->
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

                    <!-- Question -->
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

                    <!-- Options -->
                    <div id="optionsContainer" style="
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-bottom: 24px;
                    "></div>

                    <!-- Explanation (hidden initially) -->
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

                    <!-- Buttons -->
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

                <!-- Results (hidden initially) -->
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

    // Append modal to body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);

    // Add styles for animations
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

    // Store references
    quizModal = document.getElementById('quizModal');
    quizContent = document.getElementById('quizContent');
    quizResults = document.getElementById('quizResults');

    // Add event listeners
    document.getElementById('closeQuizBtn').addEventListener('click', closeQuiz);
    document.getElementById('closeResultsBtn').addEventListener('click', closeQuiz);
    document.getElementById('retryQuizBtn').addEventListener('click', retryQuiz);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);

    // Close on overlay click
    document.getElementById('quizOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeQuiz();
    });

    return quizModal;
}

/**
 * Start the quiz
 */
function startQuiz(event) {
    if (event) event.preventDefault();

    // Check if quiz is already completed
    const progress = JSON.parse(localStorage.getItem('levelProgress')) || {};
    if (progress['level35']) {
        alert('✅ You have already completed this level!');
         const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level36.html';
        }
        return;
    }

    // Reset quiz state
    const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
    quizState = {
        questions: shuffledQuestions,
        currentQuestion: 0,
        score: 0,
        answered: false,
        timeLeft: 120,
        timer: null
    };

    // Show modal
    const modal = createQuizModal();
    const overlay = document.getElementById('quizOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Reset UI
    quizContent.style.display = 'block';
    quizResults.style.display = 'none';
    document.getElementById('nextQuestionBtn').style.opacity = '0.5';
    document.getElementById('nextQuestionBtn').style.pointerEvents = 'none';

    // Render first question
    renderQuestion();

    // Start timer
    startTimer();
}

/**
 * Render current question
 */
function renderQuestion() {
    const q = quizState.questions[quizState.currentQuestion];
    const total = quizState.questions.length;

    // Update progress
    document.getElementById('progressDisplay').textContent = `${quizState.currentQuestion + 1} / ${total}`;
    document.getElementById('progressBar').style.width = `${((quizState.currentQuestion + 1) / total) * 100}%`;
    document.getElementById('questionNumber').textContent = quizState.currentQuestion + 1;
    document.getElementById("questionText").innerHTML = q.question;

    // Render options
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

        // Letter indicator
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

    // Reset answered state
    quizState.answered = false;
    document.getElementById('explanationContainer').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.opacity = '0.5';
    document.getElementById('nextQuestionBtn').style.pointerEvents = 'none';
}

/**
 * Handle option selection
 */
function selectOption(index) {
    if (quizState.answered) return;

    const q = quizState.questions[quizState.currentQuestion];
    const isCorrect = index === q.correct;
    quizState.answered = true;

    // Highlight correct/incorrect
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

    // Update score
    if (isCorrect) quizState.score++;

    // Show explanation
    const explanationContainer = document.getElementById('explanationContainer');
    const explanationText = document.getElementById('explanationText');
    explanationText.textContent = q.explanation;
    explanationContainer.style.display = 'block';

    // Show next button
    const nextBtn = document.getElementById('nextQuestionBtn');
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
}

/**
 * Go to next question
 */
function nextQuestion() {
    if (quizState.currentQuestion < quizState.questions.length - 1) {
        quizState.currentQuestion++;
        renderQuestion();
    } else {
        endQuiz();
    }
}

/**
 * Start timer
 */
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

/**
 * Update timer display
 */
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

/**
 * End quiz
 */
function endQuiz(timeUp = false) {
    if (quizState.timer) {
        clearInterval(quizState.timer);
        quizState.timer = null;
    }

    const total = quizState.questions.length;
    const score = quizState.score;
    const passed = score === total;

    // Show results
    quizContent.style.display = 'none';
    quizResults.style.display = 'block';

    const emoji = passed ? '🎉' : (timeUp ? '⏰' : '😅');
    const title = passed ? 'Level Complete!' : (timeUp ? "Time's Up!" : 'Keep Practicing!');
    let message = `You scored ${score}/${total}!`;
    
    if (passed) {
        message += ' 🌟 Perfect score! You\'ve mastered string operations!';
    } else if (timeUp) {
        message += ` ⏱️ You ran out of time. Need ${total}/${total} to pass.`;
    } else {
        message += ` Need ${total}/${total} to pass. Review the material and try again!`;
    }

    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;

    // Save progress if passed
    if (passed) {
        const progress = JSON.parse(localStorage.getItem('levelProgress')) || {};
        progress['level35'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        // Update UI
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level36.html';
        }
    }
}

/**
 * Close quiz modal
 */
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

/**
 * Retry quiz
 */
function retryQuiz() {
    // Reset and restart
    const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
    quizState = {
        questions: shuffledQuestions,
        currentQuestion: 0,
        score: 0,
        answered: false,
        timeLeft: 120,
        timer: null
    };

    quizResults.style.display = 'none';
    quizContent.style.display = 'block';
    renderQuestion();
    startTimer();
}

/**
 * Typewriter effect for the hero title
 */
document.addEventListener('DOMContentLoaded', function() {
    const el = document.getElementById('typedTitle');
    const text = 'String Operations';
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

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startQuiz, QUIZ_QUESTIONS };
}