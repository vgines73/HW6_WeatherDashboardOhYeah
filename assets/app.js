
// define variables
var searchFormEl = document.querySelector("#search-form");
var fetchButton = document.querySelector("#fetch-button");
var cityList = document.querySelector("#city-list")
var currentCity = document.querySelector("#current-city")
var fiveDayForecast = document.querySelector("#five-day-forecast")

// prevent browser from refreshing
function formSubmit(event) {
    event.preventDefault();
    // console.log("formSubmit") //works

    cityInputVal = document.querySelector("#search-city").value;
    // console.log(cityInputVal); // works
    if (!cityInputVal) {  // if user types an unknown city
        // console.error("You need type in a city I know");
        alert("You need to type in a city I know") // alert pops up for aware the user
        return; // starts over
    }
    // console.log(`cityInput ${cityInputVal}`); // works
    getApi(cityInputVal); // obtain the city input
    localStorage.setItem("city", cityInputVal) // saves city in local storage
    savedCities = localStorage.getItem("city"); // doesn't save after refreshing
};



// to get the api using fetch
function getApi(cityInputVal) {
    var myApiKey = "&appid=453aa8aa937d813f343ce451eb44cfc2"
    var weatherUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + "&cnt=5" + myApiKey);

    fetch(weatherUrl)
        .then((response) => {
            // console.log(response); // works
            return response.json();
        })
        .then((requestData) => {
            // console.log(requestData); // works
            // console.log(requestData.name); // works name of city
            // console.log(requestData.weather[0].icon); // works weather icon
            // console.log(requestData.main.temp); //works current temperature
            // console.log(requestData.main.humidity); // works humidity
            // console.log(requestData.wind.speed); // works wind speed
            // console.log(requestData.coord.lat); //works uv index
            // console.log(requestData.coord.lon); //works uv index
            results(requestData); // run results function 
            currentCityForecast(requestData) // run currentCityForecast function
            futureCityForecast(requestData) // runs five day forecast * doesn't show all five
        })

};

// function to create a list of cities searched by user
function results(requestData) {
    createLi = document.createElement("li"); // create li element
    // need to figure out how to make this an input type button
    createLi.classList.add("list-group-item");
    createLi.innerHTML = requestData.name; // input name of city in li
    createLi.setAttribute("input", "button")
    console.log(createLi)
    cityList.appendChild(createLi); // append to browser (line 37 in html)
    // console.log(cityList); // works
    createLi.addEventListener("click", clickingCity);
};

function clickingCity(e) {
    getApi(e.target.textContent)
}
// function to show current city weather conditions 
function currentCityForecast(requestData) {
    cityDiv = document.createElement("div"); // create city div
    cityDiv.classList.add("card", "card-body"); // add class to city div
    cityName = document.createElement("h4"); // create h4 element for title city name
    cityName.classList.add("card-title"); // add class to h4 
    cityName.innerHTML = requestData.name; // input city name from the data
    weatherImg = document.createElement("img")
    weatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData.weather[0].icon + ".png")
    weatherImg.setAttribute("style", "width: 50px")
    tempPara = document.createElement("p"); // create temp paragragh
    tempPara.classList.add("card-text", "current-temp"); // add class to temp paragraph
    tempPara.innerHTML = ("Temperature: " + Math.ceil((requestData.main.temp - 273.15) * 1.80 + 32) + "&deg" + "F"); // input current temp from the data
    humidityPara = document.createElement("p"); // create humidity paragraph
    humidityPara.classList.add("card-text", "current-humidity"); // add class to humidity paragraph
    humidityPara.innerHTML = ("Humidity: " + requestData.main.humidity); // input current humidity from data
    windSpeedPara = document.createElement("p"); // create wind speed paragraph
    windSpeedPara.classList.add("card-text", "current-wind-speed"); // add class to wind speed paragraph
    windSpeedPara.innerHTML = ("Wind Speed: " + requestData.wind.speed); // input current wind speed from data
    uvPara = document.createElement("p"); // create uv paragraph
    uvPara.classList.add("card-text", "current-uv"); // add class to uv paragraph
    uvPara.setAttribute("href", ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2"));
    //uvPara.innerHTML = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2"); // input current uv from data
    console.log(uvPara)
    // its appending time
    cityDiv.append(cityName, weatherImg, tempPara, humidityPara, windSpeedPara, uvPara) // append all this to citydiv
    // console.log(cityDiv)     // works
    // console.log(currentCity); // works
    currentCity.innerHTML = ""; // clears the current city div to update the new city that was searched
    currentCity.append(cityDiv); // append cityDiv to currentCity
    // console.log(currentCity) // works
}

// function for results of 5 day forecast
// key for 5 days http://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt=5&appid=453aa8aa937d813f343ce451eb44cfc2"

// function for 5 day forecast
function futureCityForecast(requestData) {
    cardDiv = document.createElement("div");
    console.log(cardDiv) // works
    cardDiv.classList.add("card", "mb-3");
    cardDiv.setAttribute("class", "text-white bg-primary", "col-sm-2");
    cardDiv.setAttribute("style", "max-width: 18rem;");
    cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "card-body")
    console.log(cardBodyDiv);
    dateDiv = document.createElement("h5");
    dateDiv.classList.add("card-title");
    dateDiv = requestData.name;
    futureWeatherImg = document.createElement("img")
    futureWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData.weather[0].icon + ".png")
    futureWeatherImg.setAttribute("style", "width: 50px", "padding: 13px")
    futureTempPara = document.createElement("p")
    futureTempPara.classList.add("card-text")
    futureTempPara = ("Temp: " + Math.ceil((requestData.main.temp - 273.15) * 1.80 + 32) + "&deg" + "F");
    futureHumidityPara = document.createElement("p")
    futureHumidityPara.classList.add("card-text")
    futureHumidityPara = "Humidity: " + requestData.main.humidity;
    
    cardBodyDiv.append(dateDiv, futureWeatherImg, futureTempPara, futureHumidityPara)
    console.log(cardBodyDiv) // works
    cardDiv.append(cardBodyDiv)
    fiveDayForecast.innerHTML = "";
    fiveDayForecast.append(cardDiv)


}
searchFormEl.addEventListener("submit", formSubmit); // works
fetchButton.addEventListener("submit", getApi); // works


// searched city input button works but when click appends a new button.
// uv converted and needs bg-color text-white padding-13px
// local storage is inside, but doesn't save the next city
// create another function for 5 day forecast
