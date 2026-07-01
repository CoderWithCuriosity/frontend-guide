/**
 * Level 70: Quiz Game
 * 
 * This file implements a quiz game application.
 * All code here will run when the page loads.
 */

// ============================================
// QUIZ GAME
// ============================================

class QuizGame {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this.results = [];
        this.totalQuestions = 10;
        
        this.loadQuestions();
        this.setupEventListeners();
        this.renderQuestion();
    }

    loadQuestions() {
        // JavaScript knowledge questions
        this.questions = [
            {
                question: 'What does the "typeof" operator return for an array?',
                options: ['"array"', '"object"', '"Array"', '"undefined"'],
                correct: 1,
                explanation: 'typeof [] returns "object" because arrays are a type of object in JavaScript.'
            },
            {
                question: 'Which method adds an element to the end of an array?',
                options: ['push()', 'pop()', 'shift()', 'unshift()'],
                correct: 0,
                explanation: 'push() adds one or more elements to the end of an array.'
            },
            {
                question: 'What is the result of 5 + "5" in JavaScript?',
                options: ['10', '"55"', '55', 'Error'],
                correct: 1,
                explanation: 'When adding a number and a string, JavaScript converts the number to a string and concatenates them, resulting in "55".'
            },
            {
                question: 'Which keyword is used to declare a constant variable?',
                options: ['let', 'var', 'const', 'static'],
                correct: 2,
                explanation: 'const is used to declare variables that cannot be reassigned.'
            },
            {
                question: 'What does the === operator check?',
                options: ['Only value', 'Only type', 'Value and type', 'Reference equality'],
                correct: 2,
                explanation: '=== checks both value and type equality (strict equality).'
            },
            {
                question: 'Which method removes the last element from an array?',
                options: ['push()', 'pop()', 'shift()', 'unshift()'],
                correct: 1,
                explanation: 'pop() removes the last element from an array and returns it.'
            },
            {
                question: 'What is the output of typeof null?',
                options: ['"null"', '"undefined"', '"object"', '"number"'],
                correct: 2,
                explanation: 'typeof null returns "object" (this is a well-known bug in JavaScript).'
            },
            {
                question: 'Which function is used to parse JSON data?',
                options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.toObject()'],
                correct: 0,
                explanation: 'JSON.parse() converts a JSON string into a JavaScript object.'
            },
            {
                question: 'What is the output of 3 + 4 * 2?',
                options: ['14', '11', '10', '8'],
                correct: 1,
                explanation: 'Multiplication happens before addition: 4 * 2 = 8, then 3 + 8 = 11.'
            },
            {
                question: 'Which event fires when a user clicks an element?',
                options: ['mouseover', 'click', 'keydown', 'change'],
                correct: 1,
                explanation: 'The click event fires when a user clicks on an element.'
            }
        ];
        
        // Shuffle and limit questions
        this.questions = this.shuffleArray(this.questions).slice(0, this.totalQuestions);
        this.results = new Array(this.questions.length).fill(null);
    }

    shuffleArray(array) {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    setupEventListeners() {
        document.getElementById("nextBtn").addEventListener("click", () => {
            this.nextQuestion();
        });

        document.getElementById("restartBtn").addEventListener("click", () => {
            this.restartQuiz();
        });
    }

    renderQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        let question = this.questions[this.currentIndex];
        let container = document.getElementById("optionsContainer");
        let questionText = document.getElementById("questionText");
        let feedback = document.getElementById("feedback");
        let nextBtn = document.getElementById("nextBtn");
        
        // Update header
        document.getElementById("currentQuestion").textContent = this.currentIndex + 1;
        document.getElementById("totalQuestions").textContent = this.questions.length;
        document.getElementById("scoreDisplay").textContent = this.score;
        
        // Update progress
        let progress = Math.round(((this.currentIndex) / this.questions.length) * 100);
        document.getElementById("progressDisplay").textContent = `Progress: ${progress}%`;
        
        // Show question
        questionText.textContent = question.question;
        
        // Render options
        container.innerHTML = "";
        question.options.forEach((option, index) => {
            let btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            btn.dataset.index = index;
            btn.addEventListener("click", () => {
                this.selectAnswer(index);
            });
            container.appendChild(btn);
        });
        
        // Reset state
        this.answered = false;
        feedback.textContent = "";
        feedback.className = "feedback";
        nextBtn.textContent = "Next Question →";
        nextBtn.disabled = true;
        
        // Hide result screen
        document.getElementById("resultScreen").style.display = "none";
        document.querySelector(".quiz-header").style.display = "flex";
        document.getElementById("questionText").style.display = "block";
        document.getElementById("optionsContainer").style.display = "flex";
        document.getElementById("quiz-footer").style.display = "flex";
    }

    selectAnswer(index) {
        if (this.answered) return;
        this.answered = true;
        
        let question = this.questions[this.currentIndex];
        let isCorrect = index === question.correct;
        let buttons = document.querySelectorAll(".option-btn");
        let feedback = document.getElementById("feedback");
        let nextBtn = document.getElementById("nextBtn");
        
        // Disable all buttons
        buttons.forEach(btn => {
            btn.classList.add("disabled");
        });
        
        // Highlight correct and wrong answers
        buttons.forEach((btn, i) => {
            if (i === question.correct) {
                btn.classList.add("correct");
            }
            if (i === index && !isCorrect) {
                btn.classList.add("wrong");
            }
            if (i === index) {
                btn.classList.add("selected");
            }
        });
        
        // Update score and feedback
        if (isCorrect) {
            this.score++;
            feedback.textContent = "✅ Correct! " + question.explanation;
            feedback.className = "feedback correct";
        } else {
            feedback.textContent = "❌ Wrong. " + question.explanation;
            feedback.className = "feedback wrong";
        }
        
        // Store result
        this.results[this.currentIndex] = {
            question: question.question,
            selected: index,
            correct: question.correct,
            isCorrect: isCorrect
        };
        
        // Update score display
        document.getElementById("scoreDisplay").textContent = this.score;
        
        // Enable next button
        nextBtn.disabled = false;
        
        // If last question, change button text
        if (this.currentIndex === this.questions.length - 1) {
            nextBtn.textContent = "See Results 🎯";
        }
    }

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        let resultScreen = document.getElementById("resultScreen");
        let quizContent = document.querySelector(".quiz-header");
        let questionText = document.getElementById("questionText");
        let optionsContainer = document.getElementById("optionsContainer");
        let quizFooter = document.getElementById("quiz-footer");
        let finalScore = document.getElementById("finalScore");
        let resultMessage = document.getElementById("resultMessage");
        let resultDetails = document.getElementById("resultDetails");
        
        // Hide quiz content
        quizContent.style.display = "none";
        questionText.style.display = "none";
        optionsContainer.style.display = "none";
        quizFooter.style.display = "none";
        
        // Show results
        resultScreen.style.display = "block";
        
        let total = this.questions.length;
        let percentage = Math.round((this.score / total) * 100);
        
        finalScore.textContent = `${this.score}/${total}`;
        
        let message = "";
        let emoji = "";
        if (percentage === 100) {
            message = "🎉 Perfect score! You're a JavaScript master!";
            emoji = "🌟";
        } else if (percentage >= 80) {
            message = "👏 Excellent! You really know your JavaScript!";
            emoji = "⭐";
        } else if (percentage >= 60) {
            message = "💪 Good job! Keep practicing to improve!";
            emoji = "📚";
        } else if (percentage >= 40) {
            message = "📖 Not bad! Review the basics and try again!";
            emoji = "🤔";
        } else {
            message = "Don't give up! Review the material and try again!";
            emoji = "💪";
        }
        
        resultMessage.textContent = `${emoji} ${message}`;
        
        // Show detailed results
        let detailsHTML = "";
        this.results.forEach((result, index) => {
            if (!result) return;
            let mark = result.isCorrect ? '<span class="correct-mark">✅</span>' : '<span class="wrong-mark">❌</span>';
            let q = result.question.length > 50 ? result.question.substring(0, 50) + "..." : result.question;
            detailsHTML += `
                <div class="detail-item">
                    ${mark} Q${index + 1}: ${q}
                </div>
            `;
        });
        resultDetails.innerHTML = detailsHTML;
        
        // Log results
        console.log("Quiz results:", {
            score: this.score,
            total: total,
            percentage: percentage,
            results: this.results
        });
    }

    restartQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.results = [];
        this.answered = false;
        this.loadQuestions();
        this.renderQuestion();
        console.log("Quiz restarted!");
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let quiz;

document.addEventListener("DOMContentLoaded", function() {
    quiz = new QuizGame();
    console.log("Quiz Game initialized!");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What is the output: let quiz = new QuizGame(); console.log(quiz.questions.length);',
        options: [
            "10",
            "5",
            "0",
            "Error"
        ],
        correct: 0,
        explanation: 'The quiz loads 10 questions by default.'
    },
    {
        id: 2,
        question: 'What does the selectAnswer() method do?',
        options: [
            "Records the user\'s answer and updates score",
            "Loads the next question",
            "Shows the results",
            "Restarts the quiz"
        ],
        correct: 0,
        explanation: 'selectAnswer() records the user\'s answer, updates the score, and provides feedback.'
    },
    {
        id: 3,
        question: 'What does the showResults() method do?',
        options: [
            "Displays the final score and results",
            "Loads the next question",
            "Records an answer",
            "Restarts the quiz"
        ],
        correct: 0,
        explanation: 'showResults() displays the final score and detailed results.'
    },
    {
        id: 4,
        question: 'What is the output: let quiz = new QuizGame(); quiz.score = 8; console.log(quiz.score);',
        options: [
            "8",
            "0",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'score is a property that can be set and accessed.'
    },
    {
        id: 5,
        question: 'What happens when you answer a question correctly?',
        options: [
            "The score increases by 1",
            "The score stays the same",
            "The score decreases by 1",
            "The quiz ends"
        ],
        correct: 0,
        explanation: 'Each correct answer increases the score by 1.'
    },
    {
        id: 6,
        question: 'What is the output: let quiz = new QuizGame(); console.log(quiz.totalQuestions);',
        options: [
            "10",
            "5",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'totalQuestions is set to 10 by default.'
    },
    {
        id: 7,
        question: 'What does the restartQuiz() method do?',
        options: [
            "Resets the quiz to the beginning",
            "Shows the results",
            "Loads the next question",
            "Records an answer"
        ],
        correct: 0,
        explanation: 'restartQuiz() resets the quiz to the beginning with new questions.'
    },
    {
        id: 8,
        question: 'What is the output: let quiz = new QuizGame(); quiz.questions = []; console.log(quiz.questions.length);',
        options: [
            "0",
            "10",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'The questions array can be modified.'
    },
    {
        id: 9,
        question: 'What is the output: let quiz = new QuizGame(); quiz.currentIndex = 3; console.log(quiz.currentIndex);',
        options: [
            "3",
            "0",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'currentIndex is a property that can be set.'
    },
    {
        id: 10,
        question: 'What is the output: let quiz = new QuizGame(); console.log(typeof quiz.questions);',
        options: [
            "object",
            "array",
            "string",
            "number"
        ],
        correct: 0,
        explanation: 'questions is an array, which is a type of object.'
    },
    {
        id: 11,
        question: 'What is the output: let quiz = new QuizGame(); quiz.answered = true; console.log(quiz.answered);',
        options: [
            "true",
            "false",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'answered is a boolean property that can be set to true.'
    },
    {
        id: 12,
        question: 'What is the output: let quiz = new QuizGame(); console.log(quiz.results.length);',
        options: [
            "10",
            "0",
            "5",
            "undefined"
        ],
        correct: 0,
        explanation: 'results is initialized with the same length as questions (10).'
    },
    {
        id: 13,
        question: 'What is the output: let quiz = new QuizGame(); quiz.score = 5; console.log(quiz.score);',
        options: [
            "5",
            "0",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'score is a property that can be modified.'
    },
    {
        id: 14,
        question: 'What is the output: let quiz = new QuizGame(); console.log(quiz.currentIndex);',
        options: [
            "0",
            "1",
            "10",
            "undefined"
        ],
        correct: 0,
        explanation: 'currentIndex starts at 0.'
    },
    {
        id: 15,
        question: 'What is the output: let quiz = new QuizGame(); quiz.showResults(); console.log("Results shown");',
        options: [
            "Results shown",
            "Error",
            "undefined",
            "null"
        ],
        correct: 0,
        explanation: 'showResults() displays the results and the code continues.'
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
                        ">Level 70 Quiz</h2>
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
    if (progress['level70']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level71.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered the Quiz Game!';
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
        progress['level70'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level71.html';
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
    const text = 'Quiz Game';
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