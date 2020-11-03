var searchFormEl = document.querySelector("#search-form");
var fetchButton = document.querySelector("#fetch-button");

function formSubmit(event) {
    event.preventDefault();

    var cityInputVal = document.querySelector("#search-city").value;
    console.log(cityInputVal);
    if (!cityInputVal) {
        console.error("You need type in a city");
        return;
    }
    getApi(cityInputVal);
};

function getApi(city) {
    var myApiKey = "&appid=453aa8aa937d813f343ce451eb44cfc2"
    var weatherUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + city + myApiKey);

    fetch(weatherUrl)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((requestData) => {
            console.log(requestData);
        })
};

searchFormEl.addEventListener("submit", formSubmit);
fetchButton.addEventListener("click", getApi);