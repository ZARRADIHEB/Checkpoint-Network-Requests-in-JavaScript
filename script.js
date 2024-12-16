let icon = document.getElementById("icon");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let pressure = document.getElementById("pressure");
let input = document.getElementById("input");
let cityName = document.getElementById("city-name");
const update = document.getElementById("last-update");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
    e.target.blur();

    icon.classList.remove("animate");
    void icon.offsetWidth; // Trigger reflow
    icon.classList.add("animate");
  }
});

const getWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=db009158515db738274a4e4ae5f60f87&units=metric`
    );
    const info = await response.json();
    if (response.status !== 200) {
      return (
        (cityName.innerText = "City Not Found"),
        (temperature.innerText = ""),
        (humidity.innerText = ""),
        (wind.innerText = ""),
        (pressure.innerText = ""),
        (icon.innerHTML = ""),
        (input.value = "")
      );
    }
    cityName.innerText = input.value;

    if (info.main.temp >= 25) {
      icon.innerHTML = '<img src="./icons/hot-temperature.png" alt="hot icon">';
      temperature.style.cssText = `color: red ; opacity: 1`;
      document.body.classList = "";
      document.body.classList.add("hot-weather");
    }
    //
    else if (info.main.temp < 25 && info.main.temp >= 16) {
      icon.innerHTML = '<img src="https://github.com/ZARRADIHEB/Checkpoint-Network-Requests-in-JavaScript/icons/sunny.png" alt="sunny icon">';
      temperature.style.cssText = `color: orange ; opacity: 1`;
      document.body.classList = "";
      document.body.classList.add("sunny-weather");
    }
    //
    else if (info.main.temp <= 15 && info.main.temp >= 0) {
      icon.innerHTML = '<img src="./icons/snowflake.png" alt="snowflake icon">';
      temperature.style.cssText = `color: deepskyblue ; opacity: 1`;
      document.body.classList = "";
      document.body.classList.add("snow-flake-weather");
    }
    //
    else {
      icon.innerHTML = '<img src="./icons/snow.png" alt="snow icon">';
      temperature.style.cssText = `color: lightblue ; opacity: 1`;
      document.body.classList = "";
      document.body.classList.add("snow-weather");
    }
    temperature.innerText = Math.round(info.main.temp) + "°C";
    humidity.innerText = info.main.humidity + "%";
    wind.innerText = info.wind.speed + "km/h";
    pressure.innerText = info.main.pressure + "hPa";
    input.value = "";
    console.log(info);
  } catch (error) {
    console.log("An Error Has Occured", error);
  }
};

// ? Last Update Time
const date = new Date();
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");
update.textContent = `  Last update:
    ${hours}:${minutes}`;
