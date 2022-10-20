// make json function
import { typeWeather, typeWeatherDays } from "./geolocation.js";
const searchvBtn = document.querySelector(".prewiew__task-bar-search-btn");
const searchBar = document.querySelector(".search");
const prewiewBar = document.querySelector(".prewiew");
const closeBtn = document.querySelector(".search__close");
const searchText = document.querySelector(".search__find-input");
const findCityBtn = document.querySelector(".search__find-btn");
const searchFrom = document.querySelector(".search__find-form");
const searchCont = document.querySelector(".search__find");
const searchBody = document.querySelector(".search__container");
// Variables for rewiew
const todayDeg = document.querySelector(".prewiew__dergee");
const currentDay = document.querySelector(".prewiew__when-date");
const curruntLocation = document.querySelector(".prewiew__where");
const currentWeather = document.querySelector(".prewiew__weather");
const gpsBtn = document.querySelector(".prewiew__task-bar-gps");
const rewiewPic = document.querySelector("#prewiew__picture");
const prewiewPic = document.querySelector(".prewiew__picture");
const key = "8b33b1d1e655f6558fd6ded7dfbd0caf";
//Variables for main body
const windStatus = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const airPressure = document.querySelector(".air-pressure");
//Variables with a days
const day1 = document.querySelector(".day-first");
const day2 = document.querySelector(".day-second");
const day3 = document.querySelector(".day-third");
const day4 = document.querySelector(".day-fourth");
const day5 = document.querySelector(".day-fifth");
const days = [day1, day2, day3, day4, day5];
//Variables with a temperatures
const day1Temp = document.querySelector(".day-first-temp");
const day2Temp = document.querySelector(".day-second-temp");
const day3Temp = document.querySelector(".day-third-temp");
const day4Temp = document.querySelector(".day-fourth-temp");
const day5Temp = document.querySelector(".day-fifth-temp");
//Variables with a pictures
const day1Pic = document.querySelector(".day-picture-first");
const day2Pic = document.querySelector(".day-picture-second");
const day3Pic = document.querySelector(".day-picture-third");
const day4Pic = document.querySelector(".day-picture-fourth");
const day5Pic = document.querySelector(".day-picture-fifth");

//Variables for humidity scale
const bar = document.querySelector(".details__info-bar-scale-yellow");
const picsDays = [day1Pic, day2Pic, day3Pic, day4Pic, day5Pic];
const daysTemps = [day1Temp, day2Temp, day3Temp, day4Temp, day5Temp];

//Variables for changing temperature
const celciusBtn = document.querySelector(".details__celcius");
const farengeitBtn = document.querySelector(".details__faringeits");

//==============================================================================================WORK VARIABLES================================================================================================//\
let daysDates = [5, 14, 23, 32, 39];
let now = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  month: "long",
  day: "numeric",
});
let currentCity = "";
let defaultTemp = "celcius";
function getDayName(date = new Date(), locale = "en-US") {
  return date.toLocaleDateString(locale, { weekday: "long" });
}
//==============================================================================================OPEN-CLOSR BAR================================================================================================//\
searchvBtn.addEventListener("click", function () {
  prewiewBar.classList.add("hidden");
  searchBar.classList.remove("hidden");
  searchBar.style.marginLeft = "0%";
});
closeBtn.addEventListener("click", function () {
  searchBar.classList.add("hidden");
  prewiewBar.classList.remove("hidden");
});
const citiesArr = [];
//==============================================================================================LOCAL STORAGE BAR================================================================================================//\
const loadCitiesBar = function () {
  const cities = JSON.parse(localStorage.getItem("cities"));
  if (cities) {
    cities.forEach((city) => {
      let town = localStorage.getItem(`${city}`);
      const markup = `<div class="search__locations ${town}">
    <div class="search__locations-first">${town}</div>
    <div class="search__locations-arrow">
      <i class="fa-sharp fa-solid fa-chevron-right"></i>
    </div>
  </div>`;
      searchCont.insertAdjacentHTML("afterend", markup);
      citiesArr.push(town);
    });
  } else {
    return;
  }
};

//==============================================================================================STARTING WEATHER================================================================================================//\

const successfulLookup = async (position) => {
  const { latitude, longitude } = position.coords;
  let city = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  )
    .then((response) => response.json())
    .then((data) => {
      const { locality, countryCode, postcode } = data;
      curruntLocation.innerHTML = locality;
      loadWeatherCode(postcode, countryCode);
      loadDayWeather(postcode, countryCode);
    });
};
window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log);

//==============================================================================================RENDER WEATHER FUNCTIONS================================================================================================//\
currentDay.innerHTML = now;
const loadWeatherCode = function (code, country) {
  let url = `https://api.openweathermap.org/data/2.5/weather?zip=${code},${country}&appid=8b33b1d1e655f6558fd6ded7dfbd0caf&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      todayDeg.innerHTML = `${Math.round(data.main.temp * 10) / 10}°C`;
      currentWeather.innerHTML = data.weather[0].main;
      typeWeather(data.weather[0].description, rewiewPic);
      windStatus.innerHTML = `${data.wind.speed} m/s`;
      humidity.innerHTML = `${data.main.humidity}%`;
      bar.style.width = `${data.main.humidity * 1.85}px`;
      visibility.innerHTML = `${data.visibility / 1000} km`;
      airPressure.innerHTML = `${data.main.pressure} hPa`;
    });
};
const loadWeatherCity = function (city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b33b1d1e655f6558fd6ded7dfbd0caf&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      todayDeg.innerHTML = `${Math.round(data.main.temp * 10) / 10}°C`;
      currentWeather.innerHTML = data.weather[0].main;
      typeWeather(data.weather[0].description, rewiewPic);
      windStatus.innerHTML = `${data.wind.speed} m/s`;
      humidity.innerHTML = `${data.main.humidity}%`;
      bar.style.width = `${data.main.humidity * 1.85}px`;
      visibility.innerHTML = `${data.visibility / 1000} km`;
      airPressure.innerHTML = `${data.main.pressure} hPa`;
    });
};

const loadDayWeather = function (code, country) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?zip=${code},${country}&appid=8b33b1d1e655f6558fd6ded7dfbd0caf&units=metric
  `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let futureWeather = data.list[20].weather[0].description;
      day1.innerHTML = getDayName(new Date(data.list[5].dt_txt.split(" ")[0]));
      day2.innerHTML = getDayName(new Date(data.list[14].dt_txt.split(" ")[0]));
      day3.innerHTML = getDayName(new Date(data.list[23].dt_txt.split(" ")[0]));
      day4.innerHTML = getDayName(new Date(data.list[32].dt_txt.split(" ")[0]));
      day5.innerHTML = getDayName(new Date(data.list[39].dt_txt.split(" ")[0]));
      days.forEach((day) => {
        daysDates.forEach((date) => {
          if (
            day.innerHTML ===
            getDayName(new Date(data.list[date].dt_txt.split(" ")[0]))
          ) {
            typeWeather(data.list[date].weather[0].description, day);
          }
        });
      });
      daysTemps.forEach((temp) => {
        for (let i = 0; i < daysDates.length; i++) {
          if (temp.innerHTML === daysTemps[i].innerHTML) {
            daysTemps[i].innerHTML = `${
              Math.round(data.list[daysDates[i]].main.temp * 10) / 10
            }°C`;
          }
        }
      });
    }); 
};
const loadDayWeatherCity = function (city) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8b33b1d1e655f6558fd6ded7dfbd0caf&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let futureWeather = data.list[20].weather[0].description;
      day1.innerHTML = getDayName(new Date(data.list[5].dt_txt.split(" ")[0]));
      day2.innerHTML = getDayName(new Date(data.list[14].dt_txt.split(" ")[0]));
      day3.innerHTML = getDayName(new Date(data.list[23].dt_txt.split(" ")[0]));
      day4.innerHTML = getDayName(new Date(data.list[32].dt_txt.split(" ")[0]));
      day5.innerHTML = getDayName(new Date(data.list[39].dt_txt.split(" ")[0]));
      days.forEach((day) => {
        daysDates.forEach((date) => {
          if (
            day.innerHTML ===
            getDayName(new Date(data.list[date].dt_txt.split(" ")[0]))
          ) {
            typeWeather(data.list[date].weather[0].description, day);
          }
        });
      });
      daysTemps.forEach((temp) => {
        for (let i = 0; i < daysDates.length; i++) {
          if (temp.innerHTML === daysTemps[i].innerHTML) {
            daysTemps[i].innerHTML = `${
              Math.round(data.list[daysDates[i]].main.temp * 10) / 10
            }°C`;
          }
        }
      });
    });
};
//==============================================================================================ADDING CITIES TO LEFT BAR FUNCTIONS================================================================================================//\
const addToFoundList = function (city) {
  const markup = `<div class="search__locations ${city}">
  <div class="search__locations-first">${city}</div>
  <div class="search__locations-arrow">
    <i class="fa-sharp fa-solid fa-chevron-right"></i>
  </div>
</div>`;
  searchCont.insertAdjacentHTML("afterend", markup);
  citiesArr.push(city);
  localStorage.setItem("cities", JSON.stringify(citiesArr));
  localStorage.setItem(`${city}`, [city]);
};

//==============================================================================================EVENT LISTENERS================================================================================================//\

gpsBtn.addEventListener("click", function () {
  window.location.reload();
});
searchFrom.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = searchText.value;
  prewiewPic.innerHTML = "";
  curruntLocation.innerHTML = city[0].toUpperCase() + city.slice(1);
  loadWeatherCity(city);
  loadDayWeatherCity(city);
  addToFoundList(city[0].toUpperCase() + city.slice(1));
  searchText.value = "";
  searchBar.classList.add("hidden");
  prewiewBar.classList.remove("hidden");
});
searchBody.addEventListener("click", function (e) {
  const cliked = e.target;
  // get second class from clicked element
  const city = cliked.closest(".search__locations").children[0].innerHTML;
  if (!cliked.classList.contains("search__locations")) {
    prewiewPic.innerHTML = "";
    curruntLocation.innerHTML = city[0].toUpperCase() + city.slice(1);
    loadWeatherCity(city);
    loadDayWeatherCity(city);
    searchText.value = "";
    searchBar.classList.add("hidden");
    prewiewBar.classList.remove("hidden");
  }
});
loadCitiesBar();


//Change temp to celsius or fahrenheit
const changeIntoCelcius = function () {
  if (defaultTemp === "celcius") {
    return;
  } else {
    defaultTemp = "celcius";
    celciusBtn.style.backgroundColor = "#e7e7eb";
    farengeitBtn.style.backgroundColor = "#585676";
    let prewieDegree = document.querySelector(".prewiew__dergee");
    let temp = document.querySelectorAll(".details__day-temperature-now");
    temp.forEach((temp) => {
      let num = temp.innerHTML.slice(0, -1);
      num.includes("°") ? (num = num.slice(0, -1)) : (num = num);
      temp.innerHTML = `${((num - 32) * (5 / 9)).toFixed(1)}°C`;
    });
    let degree = prewieDegree.innerHTML.slice(0, -1);
    degree.includes("°") ? (degree = degree.slice(0, -1)) : (degree = degree);
    prewieDegree.innerHTML = `${((degree - 32) * (5 / 9)).toFixed(1)}°C`;
  }
};
const changeIntoFarenheit = function () {
  if (defaultTemp === "farenheit") {
    return;
  } else {
    defaultTemp = "farenheit";
    farengeitBtn.style.backgroundColor = "#e7e7eb";
    celciusBtn.style.backgroundColor = "#585676";
    let prewieDegree = document.querySelector(".prewiew__dergee");
    let temp = document.querySelectorAll(".details__day-temperature-now");
    temp.forEach((temp) => {
      let num = temp.innerHTML.slice(0, -1);
      num.includes("°") ? (num = num.slice(0, -1)) : (num = num);
      temp.innerHTML = `${(num * (9 / 5) + 32).toFixed(1)}°F`;
    });
    let degree = prewieDegree.innerHTML.slice(0, -1);
    degree.includes("°") ? (degree = degree.slice(0, -1)) : (degree = degree);
    prewieDegree.innerHTML = `${(degree * (9 / 5) + 32).toFixed(1)}°F`;
  }
};
celciusBtn.addEventListener("click", changeIntoCelcius);
farengeitBtn.addEventListener("click", changeIntoFarenheit);
