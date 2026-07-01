/**
 * Level 73: Shopping Cart
 * 
 * This file implements a shopping cart application.
 * All code here will run when the page loads.
 */

// ============================================
// SHOPPING CART
// ============================================

class ShoppingCart {
    constructor() {
        this.products = [
            { id: 1, name: "Laptop", price: 999.99, emoji: "💻" },
            { id: 2, name: "Mouse", price: 29.99, emoji: "🖱️" },
            { id: 3, name: "Keyboard", price: 79.99, emoji: "⌨️" },
            { id: 4, name: "Monitor", price: 299.99, emoji: "🖥️" },
            { id: 5, name: "Headphones", price: 49.99, emoji: "🎧" },
            { id: 6, name: "Speaker", price: 89.99, emoji: "🔊" },
            { id: 7, name: "USB Cable", price: 9.99, emoji: "🔌" },
            { id: 8, name: "Mouse Pad", price: 14.99, emoji: "🟦" }
        ];

        this.cart = [];
        this.loadCart();
        this.renderProducts();
        this.renderCart();
        this.setupEventListeners();
    }

    loadCart() {
        let saved = localStorage.getItem("shoppingCart");
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
            } catch (e) {
                this.cart = [];
            }
        }
        console.log("Loaded cart:", this.cart.length, "items");
    }

    saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    }

    addToCart(productId) {
        let product = this.products.find(p => p.id === productId);
        if (!product) return;

        let existing = this.cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                emoji: product.emoji
            });
        }

        this.saveCart();
        this.renderCart();
        console.log("Added to cart:", product.name);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
        console.log("Removed from cart:", productId);
    }

    updateQuantity(productId, change) {
        let item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        this.saveCart();
        this.renderCart();
        console.log("Updated quantity:", productId, item.quantity);
    }

    clearCart() {
        if (this.cart.length === 0) return;
        if (confirm("Are you sure you want to clear your cart?")) {
            this.cart = [];
            this.saveCart();
            this.renderCart();
            console.log("Cart cleared");
        }
    }

    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTotal() {
        return this.getSubtotal();
    }

    renderProducts() {
        let grid = document.getElementById("productGrid");
        grid.innerHTML = "";

        this.products.forEach(product => {
            let div = document.createElement("div");
            div.className = "product-item";
            div.innerHTML = `
                <div style="font-size: 2rem;">${product.emoji}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-btn" data-id="${product.id}">Add to Cart</button>
            `;
            grid.appendChild(div);

            div.querySelector(".add-btn").addEventListener("click", () => {
                this.addToCart(product.id);
            });
        });
    }

    renderCart() {
        let container = document.getElementById("cartItems");
        let subtotalEl = document.getElementById("subtotal");
        let totalEl = document.getElementById("totalPrice");
        let checkoutBtn = document.getElementById("checkoutBtn");

        if (this.cart.length === 0) {
            container.innerHTML = `<div class="cart-empty">Your cart is empty</div>`;
            subtotalEl.textContent = "$0.00";
            totalEl.textContent = "$0.00";
            checkoutBtn.disabled = true;
            return;
        }

        let html = "";
        this.cart.forEach(item => {
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-info">
                        <div class="item-name">${item.emoji} ${item.name}</div>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="item-qty">
                        <button class="qty-dec" data-id="${item.id}">−</button>
                        <span class="qty">${item.quantity}</span>
                        <button class="qty-inc" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">✕</button>
                </div>
            `;
        });
        container.innerHTML = html;

        // Add event listeners for quantity buttons
        container.querySelectorAll(".qty-dec").forEach(btn => {
            btn.addEventListener("click", () => {
                let id = parseInt(btn.dataset.id);
                this.updateQuantity(id, -1);
            });
        });

        container.querySelectorAll(".qty-inc").forEach(btn => {
            btn.addEventListener("click", () => {
                let id = parseInt(btn.dataset.id);
                this.updateQuantity(id, 1);
            });
        });

        container.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                let id = parseInt(btn.dataset.id);
                this.removeFromCart(id);
            });
        });

        // Update totals
        let subtotal = this.getSubtotal();
        let total = this.getTotal();
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    }

    setupEventListeners() {
        document.getElementById("clearCartBtn").addEventListener("click", () => {
            this.clearCart();
        });

        document.getElementById("checkoutBtn").addEventListener("click", () => {
            let total = this.getTotal();
            let items = this.getTotalItems();
            alert(`✅ Checkout complete!\nItems: ${items}\nTotal: $${total.toFixed(2)}\n\nThank you for shopping!`);
            this.clearCart();
        });
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let cart;

document.addEventListener("DOMContentLoaded", function() {
    cart = new ShoppingCart();
    console.log("Shopping Cart initialized!");
});

// ============================================
// QUIZ SYSTEM
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What does the addToCart() method do?',
        options: [
            "Adds a product to the cart",
            "Removes a product from the cart",
            "Updates product quantity",
            "Clears the cart"
        ],
        correct: 0,
        explanation: 'addToCart() adds a product to the shopping cart.'
    },
    {
        id: 2,
        question: 'What does the removeFromCart() method do?',
        options: [
            "Removes a product from the cart",
            "Adds a product to the cart",
            "Updates product quantity",
            "Clears the cart"
        ],
        correct: 0,
        explanation: 'removeFromCart() removes a product from the shopping cart.'
    },
    {
        id: 3,
        question: 'What does the updateQuantity() method do?',
        options: [
            "Changes the quantity of an item",
            "Adds a new item",
            "Removes an item",
            "Clears the cart"
        ],
        correct: 0,
        explanation: 'updateQuantity() changes the quantity of an item in the cart.'
    },
    {
        id: 4,
        question: 'What is the output: let cart = new ShoppingCart(); console.log(cart.products.length);',
        options: [
            "8",
            "6",
            "10",
            "0"
        ],
        correct: 0,
        explanation: 'There are 8 products in the product list.'
    },
    {
        id: 5,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); console.log(cart.cart.length);',
        options: [
            "1",
            "0",
            "2",
            "undefined"
        ],
        correct: 0,
        explanation: 'After adding one product, the cart length is 1.'
    },
    {
        id: 6,
        question: 'Where is the cart saved?',
        options: [
            "localStorage",
            "sessionStorage",
            "A database",
            "A file"
        ],
        correct: 0,
        explanation: 'The cart is saved in localStorage.'
    },
    {
        id: 7,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); cart.addToCart(1); console.log(cart.cart[0].quantity);',
        options: [
            "2",
            "1",
            "3",
            "0"
        ],
        correct: 0,
        explanation: 'Adding the same product twice increases the quantity to 2.'
    },
    {
        id: 8,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); cart.addToCart(2); console.log(cart.getTotalItems());',
        options: [
            "2",
            "1",
            "3",
            "0"
        ],
        correct: 0,
        explanation: 'Two items added, total items is 2.'
    },
    {
        id: 9,
        question: 'What does the clearCart() method do?',
        options: [
            "Removes all items from the cart",
            "Removes one item",
            "Adds sample items",
            "Checks out"
        ],
        correct: 0,
        explanation: 'clearCart() removes all items from the cart.'
    },
    {
        id: 10,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); cart.updateQuantity(1, -1); console.log(cart.cart.length);',
        options: [
            "0",
            "1",
            "2",
            "undefined"
        ],
        correct: 0,
        explanation: 'Decreasing quantity to 0 removes the item, length becomes 0.'
    },
    {
        id: 11,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); console.log(cart.getSubtotal());',
        options: [
            "999.99",
            "999.99",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'The subtotal is the price of the item: 999.99.'
    },
    {
        id: 12,
        question: 'What does the getTotal() method do?',
        options: [
            "Returns the total cost of the cart",
            "Returns the number of items",
            "Returns the subtotal",
            "Returns the product list"
        ],
        correct: 0,
        explanation: 'getTotal() returns the total cost of all items in the cart.'
    },
    {
        id: 13,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); cart.addToCart(2); cart.removeFromCart(1); console.log(cart.cart.length);',
        options: [
            "1",
            "2",
            "0",
            "undefined"
        ],
        correct: 0,
        explanation: 'Adding two items then removing one leaves 1 item.'
    },
    {
        id: 14,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); cart.updateQuantity(1, 2); console.log(cart.cart[0].quantity);',
        options: [
            "3",
            "2",
            "1",
            "0"
        ],
        correct: 0,
        explanation: 'Adding 1 then increasing by 2 gives quantity 3.'
    },
    {
        id: 15,
        question: 'What is the output: let cart = new ShoppingCart(); cart.addToCart(1); cart.addToCart(2); cart.addToCart(3); console.log(cart.getTotalItems());',
        options: [
            "3",
            "2",
            "1",
            "0"
        ],
        correct: 0,
        explanation: 'Three items added, total items is 3.'
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
        message += ' 🌟 Perfect score! You\'ve mastered the Shopping Cart!';
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
    const text = 'Shopping Cart';
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