// Global variables
let dataResponse = {};
let currentDayName = document.getElementById("currentDayName");
let currentNumDay = document.getElementById("currentNumDay");
let currentMonth = document.getElementById("currentMonth");
let nextDayName = document.getElementById("nextDayName");
let currentTemperature = document.getElementById("currentTemperature");
let afterNextDayName = document.getElementById("afterNextDayName");
let searchInput = document.getElementById("searchInput");
let currentLocation = document.getElementById("currentLocation");
let currentWeatherText = document.getElementById("currentWeatherText");
let nextTemperature = document.getElementById("nextTemperature");
let nextMinTemperature = document.getElementById("nextMinTemperature");
let nextWeatherText = document.getElementById("nextWeatherText");
let afterNextTemperature = document.getElementById("afterNextTemperature");
let afterNextMinTemperature = document.getElementById("afterNextMinTemperature");
let afterNextWeatherText = document.getElementById("afterNextWeatherText");

// Function to fetch weather data
async function getApiWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2070ce4abcac4289a2c161128230608&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        dataResponse = await response.json();
        displayWeather();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display functions for each day
function displayWeather() {
    displayCurrentDay();
    displayNextDay();
    displayAfterNextDay();
}

function displayCurrentDay() {
    const currentDate = new Date();
    currentDayName.textContent = currentDate.toLocaleDateString("en-US", { weekday: "long" });
    currentNumDay.textContent = currentDate.getDate();
    currentMonth.textContent = currentDate.toLocaleDateString("en-US", { month: "long" });
    currentLocation.textContent = dataResponse.location.name;
    currentTemperature.innerHTML = `${dataResponse.current.temp_c}<sup>o</sup>C`;
    currentWeatherText.textContent = dataResponse.current.condition.text;
}

function displayNextDay() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    nextDayName.textContent = tomorrow.toLocaleDateString("en-US", { weekday: "long" });
    nextTemperature.innerHTML = `${dataResponse.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    nextMinTemperature.textContent = `${dataResponse.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
    nextWeatherText.textContent = dataResponse.forecast.forecastday[1].day.condition.text;
}

function displayAfterNextDay() {
    const afterTomorrow = new Date();
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);
    afterNextDayName.textContent = afterTomorrow.toLocaleDateString("en-US", { weekday: "long" });
    afterNextTemperature.innerHTML = `${dataResponse.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    afterNextMinTemperature.textContent = `${dataResponse.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;
    afterNextWeatherText.textContent = dataResponse.forecast.forecastday[2].day.condition.text;
}

// Event listener for search input
searchInput.addEventListener('input', function(e) {
    getApiWeather(searchInput.value);
});

// Initial fetch with default city
getApiWeather("Cairo");
