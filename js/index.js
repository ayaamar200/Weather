// ! ***************************** Global Variables *****************************

let searchInput = document.getElementById("search");
let btnFind = document.getElementById("btnFind");


// ! ***************************** Global Functions *****************************

async function startApp(cityName = "Cairo") {
  let weatherData = await getWeatherData(cityName);
  if (!weatherData.error) {
    displayTodayWeather(weatherData);
    displayTomorrowWeather(weatherData);
  }
}

startApp();

async function getWeatherData(cityName) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0298ebed4d51410f89f175639240612&q=${cityName}&days=3`
  );

  if (response.ok) {
    let weatherData = await response.json();
    // console.log(weatherData);
    return weatherData;
  }
}

function displayTodayWeather(weatherData) {
  let todayDate = new Date();

  let todayName = todayDate.toLocaleDateString("en-US", { weekday: "long" });
  let todayMonth = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  let todayNumber = todayDate.getDate();

  document.getElementById("rowData").innerHTML = `
          <div class="col-md-4 weather-col">
                <div class="today weather">
                  <div
                    class="weather-header d-flex justify-content-between align-items-center">
                    <div id="todayName">${todayName}</div>
                    <div>
                      <span id="todayNumber">${todayNumber}</span>
                      <span id="todayMonth">${todayMonth}</span>
                    </div>
                  </div>

                  <div class="weather-content" id="current">
                    <div class="location text-white" id="todayLocation">${weatherData.location.name}</div>
                    <div
                      class="degree d-flex flex-wrap justify-content-between align-items-center"
                    >
                      <div class="num" id="todayTemp">${weatherData.current.temp_c}°C</div>

                      <div class="weather-icon">
                        <img
                          id="todayWeatherIcon"
                          src="${weatherData.current.condition.icon}"
                          alt="Weather Condition Icon"
                          width="90"
                        />
                      </div>
                    </div>
                    <div
                      id="todayDesc"
                      class="custom main-color py-4"
                    >${weatherData.current.condition.text}</div>

                    <div class="d-flex gap-3">
                      <div
                        class="d-flex justify-content-center align-items-center gap-1"
                      >
                        <img
                          src="./imgs/icon-umberella@2x.png"
                          alt="Icon Umbrella"
                          width="20"
                        />
                        <span>20%</span>
                      </div>
                      <div
                        class="d-flex justify-content-center align-items-center gap-1"
                      >
                        <img
                          src="./imgs/icon-wind@2x.png"
                          alt="Icon Wind"
                          width="20"
                        />
                        <span>18km/h</span>
                      </div>
                      <div
                        class="d-flex justify-content-center align-items-center gap-1"
                      >
                        <img
                          src="./imgs/icon-compass@2x.png"
                          alt="Icon Compass"
                          width="20"
                        />
                        <span>East</span>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
  `;
}

function displayTomorrowWeather(weatherData) {
  let tomorrowData = weatherData.forecast.forecastday;
  let container = "";

  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(tomorrowData[i + 1].date);
    let nextDayName = nextDate.toLocaleDateString("en-US", { weekday: "long" });
    container += `
      <div class="col-md-4 weather-col">
        <div class="weather">
            <div class="weather-header text-center">
              <div id="nextDayName">${nextDayName}</div>
            </div>
            <div class="weather-content">
              <div class="weather-icon">
                <img src="${
                  tomorrowData[i + 1].day.condition.icon
                }" alt="Weather Condition Icon" width="48" id="nextDayIcon" />
              </div>
              <div class="degree" id="nextDayMaxTemp">${
                tomorrowData[i + 1].day.maxtemp_c
              }°C</div>
              <span id="nextDayMinTemp">${
                tomorrowData[i + 1].day.mintemp_c
              }°C</span>
              <div
                class="custom main-color py-4"
                id="nextDayDesc"
              >${tomorrowData[i + 1].day.condition.text}</div>
            </div>
        </div>
      </div>
    `;
  }

  document.getElementById("rowData").innerHTML += container;
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
