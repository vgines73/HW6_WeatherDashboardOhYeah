
// define variables
var searchFormEl = document.querySelector("#search-form");
var fetchButton = document.querySelector("#fetch-button");
var cityList = document.querySelector("#city-list")
var currentCity = document.querySelector("current-city")
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
            console.log(requestData.name); // works name of city
            console.log(requestData.weather[0].icon); // works weather icon
            console.log(requestData.main.temp); //works current temperature
            console.log(requestData.main.humidity); // works humidity
            console.log(requestData.wind.speed); // works wind speed
            console.log(requestData.coord.lat); //works uv index
            console.log(requestData.coord.lon); //works uv index
            results(requestData); // run results function 
            currentCityForecast(requestData) // run currentCityForecast function
        })
       
};

// function to create a list of cities searched by user
function results(requestData) {
    createLi = document.createElement("li"); // create li element
    createLi.classList.add("list-group-item");
    createLi.innerHTML = requestData.name; // input name of city in li
    cityList.appendChild(createLi); // append to browser (line 37 in html)
    console.log(cityList); // works
};

// function to show current city weather conditions 
function currentCityForecast(requestData) {
    cityDiv = document.createElement("div"); // create city div
    cityDiv.classList.add("card", "card-body"); // add class to city div
    cityName = document.createElement("h4"); // create h4 element for title city name
    cityName.classList.add("card-title"); // add class to h4 
    cityName.innerHTML = requestData.name; // input city name from the data
    // need to add the icon
    tempPara = document.createElement("p"); // create temp paragragh
    tempPara.classList.add("card-text", "current-temp"); // add class to temp paragraph
    tempPara.innerHTML = requestData.main.temp; // input current temp from the data
    // to convert temp to "imperial" (C to F) - ("api.openweathermap.org/data/2.5/find?q=" + requestData.name + "&units=imperial"
    humidityPara = document.createElement("p"); // create humidity paragraph
    humidityPara.classList.add("card-text", "current-humidity"); // add class to humidity paragraph
    humidityPara.innerHTML = requestData.main.humidity; // input current humidity from data
    windSpeedPara = document.createElement("p"); // create wind speed paragraph
    windSpeedPara.classList.add("card-text", "current-wind-speed"); // add class to wind speed paragraph
    windSpeedPara.innerHTML = requestData.wind.speed; // input current wind speed from data
    uvPara = document.createElement("p"); // create uv paragraph
    uvPara.classList.add("card-text", "current-uv"); // add class to uv paragraph
    uvPara.innerHTML = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2"); // input current uv from data


    cityDiv.append(cityName, tempPara, humidityPara, windSpeedPara, uvPara) // append all this to citydiv
    console.log(cityDiv) // works
    currentCity.append(cityDiv); // append cityDiv to current city
    console.log(currentCity) // doesn't work
    
}
searchFormEl.addEventListener("submit", formSubmit);
fetchButton.addEventListener("click", getApi);

// fix button issue, changed button type to submit and more errors appear
// convert temp to F line 67
// weather icon line 63 then append to cityDiv

// create another function for 5 day forecast