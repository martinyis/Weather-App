export const typeWeather = function (weather, pic) {
  let type;
  if (weather === "clear sky") {
    type = "sun";
  } else if (weather === "few clouds") {
    type = "few-clouds";
  } else if (weather === "scattered clouds") {
    type = "scat-clouds";
  } else if (weather === "broken clouds") {
    type = "few-clouds";
  } else if (weather === "shower rain" || "light rain") {
    type = "shower-rain";
  } else if (weather === "moderate rain") {
    type = "shower-rain";
  } else if (weather === "rain") {
    type = "rain";
  } else if (weather === "thunderstorm") {
    type = "thunderstorm";
  } else if (weather === "snow") {
    type = "snow";
  } else if (weather === "mist") {
    type = "mist";
  }
  let img = `<img src="img/weather/${type}.png" alt="" />`;
  pic.insertAdjacentHTML("afterbegin", img);
};
export const typeWeatherDays = function (weather, pic) {
  let type;
  if (weather === "clear sky") {
    type = "sun";
  } else if (weather === "few clouds") {
    type = "few-clouds";
  } else if (weather === "scattered clouds") {
    type = "scat-clouds";
  } else if (weather === "broken clouds") {
    type = "few-clouds";
  } else if (weather === "shower rain") {
    type = "shower-rain";
  } else if (weather === "shower rain" || "light rain") {
    type = "shower-rain";
  } else if (weather === "rain") {
    type = "rain";
  } else if (weather === "thunderstorm") {
    type = "thunderstorm";
  } else if (weather === "snow") {
    type = "snow";
  } else if (weather === "mist") {
    type = "mist";
  }
  let img = `<img src="img/weather/${type}.png" alt="" />`;
  pic.insertAdjacentHTML("afterbegin", img);
};
