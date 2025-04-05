function updateWeather(response){
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");

iconElement.innerHTML =  `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
                        

cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
humidityElement.innerHTML =`${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/H`;
temperatureElement.innerHTML = Math.round(temperature); 
descriptionElement.innerHTML = response.data.condition.description;
}
function formatDate(date){
let minutes = date.getMinutes();
let hours = date.getHours();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
let day = days[date.getDay()];
if (minutes < 10){
minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey = "o55206ae8847051e1ff334btaf13bafe";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");

searchCity(searchInput.value);
}

function displayForecast(){
let days = ["Tue","Wed","Thur","Fri","Sat"];
let forecastHtml = " ";

days.forEach(function (day) {
forecastHtml =
forecastHtml +  ` <div class="weather-forecast-day">
                    <div class="forcast-date">${day}</div>
                    <div class="forcast-icon">⛈</div>
                    <div class="forcast-temperature">
                        <div class="forcast-temp"><strong>15°</strong>
                        </div>
                        <div class="forcast-temp">9°</div>
                    </div>
                 </div>
  `;
  });
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("San Francisco");
displayForecast();
