document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (cityName !== '') {
            getWeatherData(cityName);
        }
    });
});

async function getWeatherData(cityName) {
    const apiKey = 'c161f795f252b6e166b03ab6cc8d9ba4'; // Înlocuiește cu cheia ta API de la OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verificăm dacă răspunsul conține date valide
        if (data.cod === 200) {
            displayWeatherInfo(data);
        } else {
            console.error('Error fetching weather data. Please try again.');
            console.log('Response details:', data);
        }
    } catch (error) {
        console.error('Error fetching weather data. Please try again.', error);
    }
}

function displayWeatherInfo(data) {
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const weatherDescriptionElement = document.getElementById('weather-description');
    const weatherIconElement = document.getElementById('weather-icon');

    cityNameElement.textContent = `City: ${data.name}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
    weatherDescriptionElement.textContent = `Weather: ${data.weather[0].description}`;
    
    // Încarcăm imaginea asociată condițiilor meteorologice
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIconElement.src = iconUrl;
}
