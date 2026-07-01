/**
 * Level 72: Image Gallery
 * 
 * This file implements an image gallery application.
 * All code here will run when the page loads.
 */

// ============================================
// IMAGE GALLERY
// ============================================

class ImageGallery {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.maxStorageSize = 10 * 1024 * 1024; // 10MB max
        
        this.loadImages();
        this.setupEventListeners();
        this.renderGallery();
    }

    loadImages() {
        let saved = localStorage.getItem("galleryImages");
        if (saved) {
            try {
                this.images = JSON.parse(saved);
            } catch (e) {
                this.images = [];
            }
        }
        console.log("Loaded", this.images.length, "images");
    }

    saveImages() {
        localStorage.setItem("galleryImages", JSON.stringify(this.images));
    }

    addImage(dataUrl, name) {
        // Check storage limit
        let totalSize = this.images.reduce((sum, img) => sum + img.data.length, 0);
        if (totalSize + dataUrl.length > this.maxStorageSize) {
            alert("Storage limit exceeded. Please remove some images first.");
            return false;
        }

        this.images.push({
            id: Date.now() + Math.random(),
            data: dataUrl,
            name: name || "image_" + (this.images.length + 1),
            date: new Date().toLocaleDateString()
        });
        
        this.saveImages();
        this.renderGallery();
        console.log("Added image:", name);
        return true;
    }

    removeImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        this.saveImages();
        this.renderGallery();
        console.log("Removed image:", id);
    }

    clearGallery() {
        if (confirm("Are you sure you want to clear all images?")) {
            this.images = [];
            this.saveImages();
            this.renderGallery();
            console.log("Gallery cleared");
        }
    }

    renderGallery() {
        let grid = document.getElementById("galleryGrid");
        
        if (this.images.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">
                    No images yet. Upload some or click "Add Sample Images"!
                </div>
            `;
            return;
        }

        let html = "";
        this.images.forEach((image, index) => {
            html += `
                <div class="image-item" data-index="${index}">
                    <img src="${image.data}" alt="${image.name}">
                    <div class="image-label">${image.name}</div>
                </div>
            `;
        });
        grid.innerHTML = html;

        // Add click handlers for lightbox
        grid.querySelectorAll(".image-item").forEach(item => {
            item.addEventListener("click", () => {
                let index = parseInt(item.dataset.index);
                this.openLightbox(index);
            });
        });
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        let image = this.images[index];
        let modal = document.getElementById("modalOverlay");
        let modalImg = document.getElementById("modalImage");
        let modalInfo = document.getElementById("modalInfo");

        modalImg.src = image.data;
        modalInfo.textContent = `${image.name} • ${image.date} • ${(index + 1)}/${this.images.length}`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    closeLightbox() {
        let modal = document.getElementById("modalOverlay");
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    addSampleImages() {
        // Create sample images using canvas
        let sampleData = [
            { name: "Mountain", color: "#2d4a5e", text: "🏔️" },
            { name: "Ocean", color: "#1a6b8a", text: "🌊" },
            { name: "Forest", color: "#2d5e3a", text: "🌲" },
            { name: "Sunset", color: "#c46a3a", text: "🌅" },
            { name: "Night", color: "#1a1a3a", text: "🌙" },
            { name: "Flower", color: "#8a3a5e", text: "🌸" }
        ];

        let added = 0;
        sampleData.forEach(sample => {
            let canvas = document.createElement("canvas");
            canvas.width = 400;
            canvas.height = 400;
            let ctx = canvas.getContext("2d");
            
            // Background
            ctx.fillStyle = sample.color;
            ctx.fillRect(0, 0, 400, 400);
            
            // Emoji
            ctx.font = "100px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.fillText(sample.text, 200, 200);
            
            // Text
            ctx.font = "24px 'JetBrains Mono', monospace";
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText(sample.name, 200, 350);
            
            let dataUrl = canvas.toDataURL("image/png");
            if (this.addImage(dataUrl, sample.name)) {
                added++;
            }
        });
        
        console.log("Added", added, "sample images");
    }

    setupEventListeners() {
        // File input
        let fileInput = document.getElementById("fileInput");
        let uploadArea = document.getElementById("uploadArea");

        fileInput.addEventListener("change", (e) => {
            let files = e.target.files;
            this.handleFiles(files);
            fileInput.value = "";
        });

        // Upload area click
        uploadArea.addEventListener("click", () => {
            fileInput.click();
        });

        // Drag and drop
        uploadArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = "var(--accent-css)";
            uploadArea.style.background = "var(--bg-panel)";
        });

        uploadArea.addEventListener("dragleave", (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = "var(--border)";
            uploadArea.style.background = "transparent";
        });

        uploadArea.addEventListener("drop", (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = "var(--border)";
            uploadArea.style.background = "transparent";
            let files = e.dataTransfer.files;
            this.handleFiles(files);
        });

        // Add sample images
        document.getElementById("addSampleBtn").addEventListener("click", () => {
            this.addSampleImages();
        });

        // Clear gallery
        document.getElementById("clearGalleryBtn").addEventListener("click", () => {
            this.clearGallery();
        });

        // Modal close
        document.getElementById("modalClose").addEventListener("click", () => {
            this.closeLightbox();
        });

        document.getElementById("modalOverlay").addEventListener("click", (e) => {
            if (e.target === e.currentTarget) {
                this.closeLightbox();
            }
        });

        // Keyboard shortcuts
        document.addEventListener("keydown", (e) => {
            let modal = document.getElementById("modalOverlay");
            if (!modal.classList.contains("active")) return;

            if (e.key === "Escape") {
                this.closeLightbox();
            } else if (e.key === "ArrowLeft") {
                this.navigateLightbox(-1);
            } else if (e.key === "ArrowRight") {
                this.navigateLightbox(1);
            }
        });
    }

    handleFiles(files) {
        let added = 0;
        let validTypes = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"];

        Array.from(files).forEach(file => {
            if (!validTypes.includes(file.type)) {
                alert(`"${file.name}" is not a supported image type.`);
                return;
            }

            let reader = new FileReader();
            reader.onload = (e) => {
                let dataUrl = e.target.result;
                if (this.addImage(dataUrl, file.name)) {
                    added++;
                }
            };
            reader.readAsDataURL(file);
        });
    }

    navigateLightbox(direction) {
        let newIndex = this.currentImageIndex + direction;
        if (newIndex < 0) newIndex = this.images.length - 1;
        if (newIndex >= this.images.length) newIndex = 0;
        this.openLightbox(newIndex);
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let gallery;

document.addEventListener("DOMContentLoaded", function() {
    gallery = new ImageGallery();
    console.log("Image Gallery initialized!");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What does the addImage() method do?',
        options: [
            "Adds an image to the gallery",
            "Removes an image from the gallery",
            "Clears all images",
            "Opens the lightbox"
        ],
        correct: 0,
        explanation: 'addImage() adds a new image to the gallery.'
    },
    {
        id: 2,
        question: 'What does the removeImage() method do?',
        options: [
            "Removes an image from the gallery",
            "Adds an image to the gallery",
            "Clears all images",
            "Opens the lightbox"
        ],
        correct: 0,
        explanation: 'removeImage() removes a specific image from the gallery.'
    },
    {
        id: 3,
        question: 'What is the maximum storage size for images?',
        options: [
            "10MB",
            "5MB",
            "20MB",
            "1MB"
        ],
        correct: 0,
        explanation: 'The maximum storage size is 10MB.'
    },
    {
        id: 4,
        question: 'What happens when you click on an image in the gallery?',
        options: [
            "Opens the lightbox",
            "Deletes the image",
            "Downloads the image",
            "Opens in new tab"
        ],
        correct: 0,
        explanation: 'Clicking on an image opens it in the lightbox.'
    },
    {
        id: 5,
        question: 'What is the output: let gallery = new ImageGallery(); console.log(gallery.images.length);',
        options: [
            "0",
            "1",
            "5",
            "undefined"
        ],
        correct: 0,
        explanation: 'Initially, the gallery has no images.'
    },
    {
        id: 6,
        question: 'Where are images saved?',
        options: [
            "localStorage",
            "sessionStorage",
            "A database",
            "A file system"
        ],
        correct: 0,
        explanation: 'Images are saved in localStorage.'
    },
    {
        id: 7,
        question: 'What keyboard shortcut closes the lightbox?',
        options: [
            "Escape",
            "Enter",
            "Space",
            "Tab"
        ],
        correct: 0,
        explanation: 'Pressing Escape closes the lightbox.'
    },
    {
        id: 8,
        question: 'What is the output: let gallery = new ImageGallery(); gallery.addImage("data:image/png;base64,...", "test"); console.log(gallery.images.length);',
        options: [
            "1",
            "0",
            "undefined",
            "Error"
        ],
        correct: 0,
        explanation: 'After adding an image, the length becomes 1.'
    },
    {
        id: 9,
        question: 'What does the handleFiles() method do?',
        options: [
            "Processes uploaded files",
            "Adds sample images",
            "Clears the gallery",
            "Opens the lightbox"
        ],
        correct: 0,
        explanation: 'handleFiles() processes files uploaded by the user.'
    },
    {
        id: 10,
        question: 'What is the output: let gallery = new ImageGallery(); gallery.clearGallery(); console.log(gallery.images.length);',
        options: [
            "0",
            "1",
            "5",
            "undefined"
        ],
        correct: 0,
        explanation: 'clearGallery() removes all images, making the length 0.'
    },
    {
        id: 11,
        question: 'What does the openLightbox() method do?',
        options: [
            "Shows an image in full size",
            "Adds an image",
            "Removes an image",
            "Clears the gallery"
        ],
        correct: 0,
        explanation: 'openLightbox() displays an image in full size.'
    },
    {
        id: 12,
        question: 'What is the output: let gallery = new ImageGallery(); console.log(gallery.maxStorageSize);',
        options: [
            "10485760",
            "1024",
            "1048576",
            "10000000"
        ],
        correct: 0,
        explanation: '10MB = 10 * 1024 * 1024 = 10485760 bytes.'
    },
    {
        id: 13,
        question: 'What does the addSampleImages() method do?',
        options: [
            "Adds sample images to the gallery",
            "Removes all images",
            "Clears the gallery",
            "Opens the lightbox"
        ],
        correct: 0,
        explanation: 'addSampleImages() adds sample images to the gallery.'
    },
    {
        id: 14,
        question: 'What is the output: let gallery = new ImageGallery(); gallery.addImage("data", "test"); console.log(gallery.images[0].name);',
        options: [
            "test",
            "data",
            "image_1",
            "undefined"
        ],
        correct: 0,
        explanation: 'The name of the first image is "test".'
    },
    {
        id: 15,
        question: 'What does the navigateLightbox() method do?',
        options: [
            "Moves to the next/previous image",
            "Opens the lightbox",
            "Closes the lightbox",
            "Adds an image"
        ],
        correct: 0,
        explanation: 'navigateLightbox() moves to the next or previous image in the lightbox.'
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
                        ">Level 72 Quiz</h2>
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
    if (progress['level72']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level73.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered the Image Gallery!';
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
        progress['level72'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level73.html';
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
    const text = 'Image Gallery';
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