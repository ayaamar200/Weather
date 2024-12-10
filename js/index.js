// ! ***************************** Global Variables *****************************

let searchInput = document.getElementById("search");
let btnFind = document.getElementById("btnFind");

// *********** Today Details ***********
let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth = document.getElementById("todayMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayWeatherIcon = document.getElementById("todayWeatherIcon");
let todayDesc = document.getElementById("todayDesc");

// *********** Next Day Details ***********
let nextDayName = document.querySelectorAll("#nextDayName");
let nextDayLocation = document.querySelectorAll("#nextDayLocation");
let nextDayMaxTemp = document.querySelectorAll("#nextDayMaxTemp");
let nextDayMinTemp = document.querySelectorAll("#nextDayMinTemp");
let nextDayDesc = document.querySelectorAll("#nextDayDesc");
let nextDayWeatherIcon = document.querySelectorAll("#nextDayIcon");

// ! ***************************** Global Functions *****************************

startApp();
async function startApp(cityName = "Cairo") {
  let weatherData = await getWeatherData(cityName);
  if (!weatherData.error) {
    displayTodayWeather(weatherData);
    displayTomorrowWeather(weatherData);
  }
}

async function getWeatherData(cityName) {
  let responseData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0298ebed4d51410f89f175639240612&q=${cityName}&days=3`
  );
  let weatherData = await responseData.json();
  // console.log(weatherData);
  return weatherData;
}

function displayTodayWeather(weatherData) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayLocation.innerHTML = weatherData.location.name;
  todayTemp.innerHTML = weatherData.current.temp_c + "°C";
  todayWeatherIcon.setAttribute(
    "src",
    "https:" + weatherData.current.condition.icon
  );
  todayDesc.innerHTML = weatherData.current.condition.text;
}

function displayTomorrowWeather(weatherData) {
  let tomorrowData = weatherData.forecast.forecastday;
  // console.log(tomorrowData);

  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(tomorrowData[i + 1].date);

    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    nextDayMaxTemp[i].innerHTML = tomorrowData[i + 1].day.maxtemp_c + "°C";
    nextDayMinTemp[i].innerHTML = tomorrowData[i + 1].day.mintemp_c + "°C";
    nextDayDesc[i].innerHTML = tomorrowData[i + 1].day.condition.text;
    nextDayWeatherIcon[i].setAttribute(
      "src",
      "https:" + tomorrowData[i + 1].day.condition.icon
    );
  }
}

// *********** Search Events ***********
searchInput.addEventListener("input", function () {
  let cityName = searchInput.value;
  startApp(cityName);
  // console.log(searchValue);
});

btnFind.addEventListener("click", function () {
  let cityName = searchInput.value;
  startApp(cityName);
  // console.log(searchValue);
});

