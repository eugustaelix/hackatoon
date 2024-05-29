
const apiKey = "72f33a98b09ccaa739cea91139a68912";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity");
const windElement = document.querySelector("#wind");

const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  try {
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter dados do clima:", error);
  }
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  if (!data || data.cod === "404") {
    console.error("Erro ao obter dados do clima: Cidade não encontrada.");
    return;
  }
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;
  weatherContainer.classList.remove("hide");
};

// Chama a função showWeatherData para Mongaguá ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  showWeatherData("Mongaguá");
});
window.onload = function () {
  document.getElementById("pagina-inicio").style.opacity = 1;
};