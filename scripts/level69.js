/**
 * Level 69: Weather App
 * 
 * This file implements a weather application using the free WeatherAPI.com.
 * All code here will run when the page loads.
 */

// ============================================
// WEATHER APP
// ============================================

class WeatherApp {
    constructor() {
        // Using WeatherAPI.com - FREE tier (no credit card required)
        // Get your free key at: https://www.weatherapi.com/signup.aspx
        // For demo purposes, we use a demo key (limited to 10 requests/day)
        // Sign up for your own key for unlimited development use
        this.apiKey = "f46cfcba11864926881190243262906"; // Replace with your own key: "your-api-key"
        this.apiUrl = "https://api.weatherapi.com/v1/current.json";
        this.recentSearches = [];
        this.maxRecent = 5;
        
        this.loadRecentSearches();
        this.setupEventListeners();
        
        // Auto-load weather for default city
        setTimeout(() => {
            this.getWeather("London");
        }, 300);
    }

    setupEventListeners() {
        let searchBtn = document.getElementById("searchBtn");
        let cityInput = document.getElementById("cityInput");

        searchBtn.addEventListener("click", () => {
            let city = cityInput.value.trim();
            if (city) {
                this.getWeather(city);
            }
        });

        cityInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                let city = cityInput.value.trim();
                if (city) {
                    this.getWeather(city);
                }
            }
        });
    }

    loadRecentSearches() {
        let saved = localStorage.getItem("weatherRecent");
        if (saved) {
            try {
                this.recentSearches = JSON.parse(saved);
            } catch (e) {
                this.recentSearches = [];
            }
        }
        this.renderRecentSearches();
    }

    saveRecentSearches() {
        localStorage.setItem("weatherRecent", JSON.stringify(this.recentSearches));
    }

    addRecentSearch(city) {
        // Remove if already exists
        this.recentSearches = this.recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
        
        // Add to front
        this.recentSearches.unshift(city);
        
        // Limit size
        if (this.recentSearches.length > this.maxRecent) {
            this.recentSearches.pop();
        }
        
        this.saveRecentSearches();
        this.renderRecentSearches();
    }

    renderRecentSearches() {
        let container = document.getElementById("recentTags");
        
        if (this.recentSearches.length === 0) {
            container.innerHTML = '<span style="color: var(--text-muted); font-size: 0.85rem;">No recent searches</span>';
            return;
        }
        
        let html = "";
        this.recentSearches.forEach(city => {
            html += `<span class="recent-tag" data-city="${city}">${city}</span>`;
        });
        container.innerHTML = html;
        
        // Add click handlers
        container.querySelectorAll(".recent-tag").forEach(tag => {
            tag.addEventListener("click", () => {
                let city = tag.dataset.city;
                document.getElementById("cityInput").value = city;
                this.getWeather(city);
            });
        });
    }

    getWeather(city) {
        let display = document.getElementById("weatherDisplay");
        
        // Show loading
        display.innerHTML = `<div class="loading">⏳ Loading weather for ${city}...</div>`;
        
        // WeatherAPI.com endpoint with query parameters
        let url = `${this.apiUrl}?q=${encodeURIComponent(city)}&key=${this.apiKey}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error("City not found. Please check the spelling.");
                    }
                    if (response.status === 403) {
                        throw new Error("API key invalid or exceeded quota. Please sign up for a free key at weatherapi.com");
                    }
                    throw new Error("Failed to fetch weather data.");
                }
                return response.json();
            })
            .then(data => {
                this.displayWeather(data);
                this.addRecentSearch(city);
                console.log("Weather data:", data);
            })
            .catch(error => {
                display.innerHTML = `<div class="error">❌ ${error.message}</div>`;
                console.error("Error:", error);
            });
    }

    displayWeather(data) {
        let display = document.getElementById("weatherDisplay");
        
        // WeatherAPI.com response structure
        let name = data.location.name;
        let country = data.location.country;
        let temp = Math.round(data.current.temp_c);
        let feelsLike = Math.round(data.current.feelslike_c);
        let description = data.current.condition.text;
        let humidity = data.current.humidity;
        let windSpeed = Math.round(data.current.wind_kph);
        let icon = data.current.condition.icon;
        let uv = data.current.uv;
        let lastUpdated = data.current.last_updated;
        
        // Get emoji for weather condition
        let weatherEmoji = this.getWeatherEmoji(data.current.condition.code);
        
        display.innerHTML = `
            <div class="city-name">${name}, ${country}</div>
            <div class="temperature">${temp}°C</div>
            <div class="weather-description">${weatherEmoji} ${description}</div>
            <div class="weather-details">
                <span>🌡️ Feels like: ${feelsLike}°C</span>
                <span>💧 Humidity: ${humidity}%</span>
                <span>💨 Wind: ${windSpeed} km/h</span>
                <span>☀️ UV Index: ${uv}</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 12px;">
                Updated: ${lastUpdated}
            </div>
        `;
    }

    getWeatherEmoji(conditionCode) {
        // WeatherAPI.com condition codes mapping
        // See: https://www.weatherapi.com/docs/weather_conditions.json
        if (conditionCode === 1000) return "☀️"; // Sunny
        if (conditionCode === 1003) return "⛅"; // Partly cloudy
        if (conditionCode === 1006) return "☁️"; // Cloudy
        if (conditionCode === 1009) return "☁️"; // Overcast
        if (conditionCode >= 1030 && conditionCode < 1060) return "🌫️"; // Mist/Fog
        if (conditionCode >= 1063 && conditionCode < 1090) return "🌧️"; // Rain
        if (conditionCode >= 1114 && conditionCode < 1120) return "❄️"; // Snow
        if (conditionCode >= 1150 && conditionCode < 1190) return "🌧️"; // Drizzle
        if (conditionCode >= 1192 && conditionCode < 1220) return "⛈️"; // Heavy rain/storm
        if (conditionCode >= 1222 && conditionCode < 1240) return "❄️"; // Snow
        if (conditionCode >= 1243 && conditionCode < 1250) return "⛈️"; // Thunderstorm
        if (conditionCode >= 1273 && conditionCode < 1280) return "⛈️"; // Thunderstorm with rain
        return "🌡️";
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let app;

document.addEventListener("DOMContentLoaded", function() {
    app = new WeatherApp();
    console.log("Weather App initialized!");
    console.log("API Key:", app.apiKey === "demo" ? "⚠️ Using demo key (limited to 10/day) - Get your free key at weatherapi.com" : "✅ Using custom API key");
});

// ============================================
// QUIZ SYSTEM - Focused on API understanding
// ============================================

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What free weather API is used in this app?',
        options: [
            "WeatherAPI.com",
            "OpenWeatherMap",
            "Weather.gov",
            "AccuWeather"
        ],
        correct: 0,
        explanation: 'The app uses WeatherAPI.com, which offers a free tier with 1 million calls/month and no credit card required.'
    },
    {
        id: 2,
        question: 'What is the API endpoint URL for getting current weather?',
        options: [
            "https://api.weatherapi.com/v1/current.json",
            "https://api.weatherapi.com/v1/weather.json",
            "https://weatherapi.com/api/current",
            "https://api.weather.com/current"
        ],
        correct: 0,
        explanation: 'The endpoint is https://api.weatherapi.com/v1/current.json'
    },
    {
        id: 3,
        question: 'What query parameters are required for the WeatherAPI.com request?',
        options: [
            "q and key",
            "city and apikey",
            "q and appid",
            "location and token"
        ],
        correct: 0,
        explanation: 'The required parameters are "q" (city/query) and "key" (your API key).'
    },
    {
        id: 4,
        question: 'What does the demo API key "demo" do?',
        options: [
            "Limited to 10 requests per day",
            "Unlimited requests",
            "Requires payment",
            "Only works for London"
        ],
        correct: 0,
        explanation: 'The "demo" key is limited to 10 requests per day for testing purposes.'
    },
    {
        id: 5,
        question: 'How does the app handle a city that doesn\'t exist?',
        options: [
            "Shows a 400 error message",
            "Shows nothing",
            "Loads default city",
            "Crash"
        ],
        correct: 0,
        explanation: 'When a city is not found, the API returns a 400 status code and the app shows an error message.'
    },
    {
        id: 6,
        question: 'What temperature unit does the app use?',
        options: [
            "Celsius (°C)",
            "Fahrenheit (°F)",
            "Kelvin (K)",
            "Rankine (°R)"
        ],
        correct: 0,
        explanation: 'The app uses Celsius by default (temp_c from the API).'
    },
    {
        id: 7,
        question: 'What are the weather details displayed?',
        options: [
            "Temperature, humidity, wind speed, UV index",
            "Only temperature",
            "Temperature and pressure",
            "Only conditions"
        ],
        correct: 0,
        explanation: 'The app displays temperature, feels-like, humidity, wind speed, UV index, and condition description.'
    },
    {
        id: 8,
        question: 'Where are recent searches stored?',
        options: [
            "localStorage",
            "sessionStorage",
            "Cookies",
            "Server database"
        ],
        correct: 0,
        explanation: 'Recent searches are saved in localStorage for persistence across page reloads.'
    },
    {
        id: 9,
        question: 'What happens if the API returns a 403 (Forbidden) error?',
        options: [
            "Shows API key quota error",
            "Shows city not found",
            "Retries automatically",
            "Shows server error"
        ],
        correct: 0,
        explanation: 'A 403 error indicates the API key is invalid or has exceeded its quota.'
    },
    {
        id: 10,
        question: 'How many recent searches are kept?',
        options: [
            "5",
            "3",
            "10",
            "∞"
        ],
        correct: 0,
        explanation: 'The app keeps the last 5 recent searches in localStorage.'
    },
    {
        id: 11,
        question: 'What is the response format from WeatherAPI.com?',
        options: [
            "JSON",
            "XML",
            "CSV",
            "HTML"
        ],
        correct: 0,
        explanation: 'WeatherAPI.com returns JSON data which is easy to parse in JavaScript.'
    },
    {
        id: 12,
        question: 'How do you get a free API key for WeatherAPI.com?',
        options: [
            "Sign up at weatherapi.com/signup.aspx",
            "Send an email request",
            "It comes pre-installed",
            "Pay monthly fee"
        ],
        correct: 0,
        explanation: 'You can sign up for a free account at weatherapi.com/signup.aspx - no credit card required.'
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
                        ">Level 69 Quiz</h2>
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
    if (progress['level69']) {
        alert('✅ You have already completed this level!');
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level70.html';
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
        message += ' 🌟 Perfect score! You\'ve mastered the Weather API!';
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
        progress['level69'] = true;
        localStorage.setItem('levelProgress', JSON.stringify(progress));

        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.href = 'level70.html';
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
    const text = 'Weather App';
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