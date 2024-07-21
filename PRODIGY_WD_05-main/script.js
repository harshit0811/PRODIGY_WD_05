const apiKey = 'f7a094387bcb6cb8563507dec165cebb'; // Replace with your OpenWeatherMap API key

document.getElementById('fetch-weather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        getWeather(location);
    } else {
        alert("Please enter a location");
    }
});

function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                document.getElementById('weather-result').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weather-result').innerHTML = `<p>Error fetching weather data</p>`;
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherResult = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].description}</strong></p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-result').innerHTML = weatherResult;
}
