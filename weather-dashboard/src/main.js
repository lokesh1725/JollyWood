const API_KEY = 'YOUR_API_KEY_HERE'; // User will need to provide this
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const currentDateDisplay = document.getElementById('current-date');
const temperatureDisplay = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-description');
const humidityDisplay = document.getElementById('humidity');
const windSpeedDisplay = document.getElementById('wind-speed');
const pressureDisplay = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-items');
const errorMessage = document.getElementById('error-message');

/**
 * Initialize the app
 */
function init() {
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        }
    });

    // Default city on load
    getWeather('London');
}

const MOCK_DATA = {
    'chennai': {
        name: 'Chennai',
        sys: { country: 'IN' },
        main: { temp: 32, humidity: 70, pressure: 1008 },
        wind: { speed: 4.5 },
        weather: [{ icon: '01d', description: 'sunny' }]
    },
    'london': {
        name: 'London',
        sys: { country: 'GB' },
        main: { temp: 18, humidity: 55, pressure: 1012 },
        wind: { speed: 3.2 },
        weather: [{ icon: '03d', description: 'cloudy' }]
    },
    'new york': {
        name: 'New York',
        sys: { country: 'US' },
        main: { temp: 22, humidity: 45, pressure: 1015 },
        wind: { speed: 5.1 },
        weather: [{ icon: '02d', description: 'partly cloudy' }]
    }
};

const MOCK_FORECAST = [
    { dt: 1716912000, main: { temp: 24 }, weather: [{ icon: '01d' }] },
    { dt: 1716998400, main: { temp: 26 }, weather: [{ icon: '02d' }] },
    { dt: 1717084800, main: { temp: 25 }, weather: [{ icon: '03d' }] },
    { dt: 1717171200, main: { temp: 27 }, weather: [{ icon: '01d' }] },
    { dt: 1717257600, main: { temp: 28 }, weather: [{ icon: '02d' }] }
];

/**
 * Fetch weather data from API
 * @param {string} city 
 */
async function getWeather(city) {
    const cityLower = city.toLowerCase();

    // Use mock data if API key is not provided
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        if (MOCK_DATA[cityLower]) {
            hideError();
            updateCurrentWeather(MOCK_DATA[cityLower]);
            updateForecast(MOCK_FORECAST);
            return;
        } else {
            // Generate random mock data for any city
            hideError();
            const genericData = {
                name: city.charAt(0).toUpperCase() + city.slice(1),
                sys: { country: 'World' },
                main: { temp: Math.floor(Math.random() * 15) + 15, humidity: 50, pressure: 1010 },
                wind: { speed: Math.random() * 10 },
                weather: [{ icon: '04d', description: 'overcast clouds' }]
            };
            updateCurrentWeather(genericData);
            updateForecast(MOCK_FORECAST);
            return;
        }
    }

    try {
        hideError();
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        updateCurrentWeather(data);
        getForecast(city);
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Fetch 5-day forecast
 * @param {string} city 
 */
async function getForecast(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        // Filter for forecast at 12:00 PM for each day
        const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        updateForecast(dailyForecast);
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

/**
 * Update UI with current weather
 * @param {object} data 
 */
function updateCurrentWeather(data) {
    cityNameDisplay.textContent = `${data.name}, ${data.sys.country}`;
    
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    currentDateDisplay.textContent = now.toLocaleDateString('en-GB', options);
    
    temperatureDisplay.textContent = `${Math.round(data.main.temp)}°`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherDesc.textContent = data.weather[0].description;
    
    humidityDisplay.textContent = `${data.main.humidity}%`;
    windSpeedDisplay.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    pressureDisplay.textContent = `${data.main.pressure} hPa`;
}

/**
 * Update UI with forecast data
 * @param {array} forecastList 
 */
function updateForecast(forecastList) {
    forecastContainer.innerHTML = '';
    
    forecastList.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const item = document.createElement('div');
        item.className = 'forecast-item glass-card';
        item.innerHTML = `
            <span class="day">${dayName}</span>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather">
            <span class="temp">${Math.round(day.main.temp)}°</span>
        `;
        forecastContainer.appendChild(item);
    });
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

init();
