// script.js


const API_KEY = 'd774e118e3a62892031382cbc8f20ce9'; // Replace with your Weather API key
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

async function fetchWeather(latitude, longitude) {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city!');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?q=${city}&units=metric&cnt=7&appid=${API_KEY}`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';

    if (data.list) {
        data.list.forEach((day) => {
            const div = document.createElement('div');
            div.className = 'forecast-day';
            div.innerHTML = `
                <h3>${new Date(day.dt_txt).toDateString()}</h3>
                <p><strong>${day.weather[0].main}</strong></p>
                <p>Temp: ${day.main.temp}°C</p>
                <p>Humidity: ${day.main.humidity}%</p>
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<p>No weather data found for the entered city.</p>';
    }
}

navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetchWeather(latitude, longitude);
});


