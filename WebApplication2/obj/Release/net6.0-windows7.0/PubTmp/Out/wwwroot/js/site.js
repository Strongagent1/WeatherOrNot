// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById
    ('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecasetEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',];


const API_KEY = '88a9d28142add300f6d5312c98018332';

//let locationIcon = document.querySelector('.weather-icon');
//const { icon } = data.weather[0];
//location.innerHTML = `<img src="icons/${icon}.png">`;


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span
    id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);



getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {


        let { latitude, longitude } = success.coords;



        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,mintuely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {

            console.log(data);
            showWeatherData(data);
        })

    })
}

function showWeatherData(data) {
    let { humidity, feels_like, sunrise, sunset, wind_speed, temp } = data.current;

    timezone.innerHTML = "Timezone " + data.timezone;


    countryEl.innerHTML = data.lat + "   " + '  ' + data.lon + '';


    currentWeatherItemsEl.innerHTML =
        `   <div class="weather-item">
                <div>Current Temp</div>
                <div>${temp}&#176; F</div>
            </div>
             <div class="weather-item">
                <div>Feels Like</div>
                <div>${feels_like}&#176; F</div>
            </div>
            <div class="weather-item">
                <div>Humidity</div>
                <div>${humidity}%</div>        
            </div>
           
            <div class="weather-item">
                <div>Wind Speed</div>
                <div>${wind_speed} mph</div>
            </div>
            <div class="weather-item">
                <div>Sunrise</div>
                <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
            </div>
            <div class="weather-item">
                <div>Sunset</div>
                <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
            </div>        
         `;


    let otherDayForecast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                    <div class="temp">Conditions - ${day.weather[0].description}</div>
                    <div class="temp">High - ${day.temp.max}&#176; F</div>
                    <div class="temp">Low - ${day.temp.min}&#176; F</div>
                   
                </div> 
            
                `

        } else {
            otherDayForecast += `
                <div class="weather-forecast-item">                
                    <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon"> 
                    <div class="temp">High - ${day.temp.max}&#176; F</div>
                    <div class="temp">Low - ${day.temp.min}&#176; F</div>
                    <div class="temp">Conditions - ${day.weather[0].description}</div>
                </div>            
            
                `
        }
        weatherForecasetEl.innerHTML = otherDayForecast;


    })



}

