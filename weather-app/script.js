localStoragecd//Checking for Geolocation Support
if (!("geolocation" in navigator)) {
    console.log('Geolocation is not supported by this browser');
}

const apiKey = "e01389a77a293f7416e56c22d096342d";

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');

    //Show loading message
    loadingMessage.textContent = 'Fetching weather data...';
    errorMessage.textContent = ''; //To clear previous messages

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`) // <-- Changed to backticks
        .then(response => {
            //Hide loading message
            loadingMessage.textContent = '';

            if (response.status === 404) {
                throw new Error('City not found.');
            }
            if (!response.ok) {
                throw new Error('Failed to fetch weather data. Please try again.');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            errorMessage.textContent = error.message;
        });
}

function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data.');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.log('Error', error.message);
        });
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // <-- Changed to backticks
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
}

/*if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        },
        error => {
            console.log('Error obtaining location:', error.message);
        }
    )
}*/

document.getElementById("currentLocationWeather").addEventListener("click", getWeatherAtCurrentLocation);

function getWeatherAtCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

