
// define variables
var searchFormEl = document.querySelector("#search-form");
var fetchButton = document.querySelector("#fetch-button");
var cityList = document.querySelector("#citylist")
city = "";
// prevent browser from refreshing
function formSubmit(event) {
    event.preventDefault();

    var cityInputVal = document.querySelector("#search-city").value;
    console.log(cityInputVal); // works
    if (!cityInputVal) {  // if user types an unknown city
        console.error("You need type in a city I know");
        alert("You need to type in a city I know") // alert pops up for aware the user
        return; // starts over
    }
    getApi(cityInputVal); // obtain the city input
};

// to get the api using fetch
function getApi(city) {
    var myApiKey = "&appid=453aa8aa937d813f343ce451eb44cfc2"
    var weatherUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + city + myApiKey);

    fetch(weatherUrl)
        .then((response) => {
            console.log(response); // works
            return response.json();
        })
        .then((requestData) => {
            console.log(requestData); // works
            console.log(requestData.name) // works name of city
            console.log(requestData.weather[0].icon) // works weather icon
            console.log(requestData.main.temp) //works current temperature
            console.log(requestData.main.humidity) // works humidity
            console.log(requestData.wind.speed) // works wind speed
            console.log(requestData.coord) //works uv index
            results();
        })
       
};

function results() {
//    var cityList = document.getElementById("city-list")
    var createLi = document.createElement("li")
    createLi.textContent = "";
    cityList.append(createli)

}
searchFormEl.addEventListener("submit", formSubmit);
fetchButton.addEventListener("click", getApi);