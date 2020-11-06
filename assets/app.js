
// define variables
var searchFormEl = document.querySelector("#search-form");
var fetchButton = document.querySelector("#fetch-button");
var cityList = document.querySelector("#city-list")
var currentCity = document.querySelector("#current-city")
var dayOneForecast = document.querySelector("#day-one-forecast")
var dayTwoForecast = document.querySelector("#day-two-forecast")
var dayThreeForecast = document.querySelector("#day-three-forecast")
var dayFourForecast = document.querySelector("#day-four-forecast")
var dayFiveForecast = document.querySelector("#day-five-forecast")

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
    var weatherUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + myApiKey); 
    
    fetch(weatherUrl)
        .then((response) => {
            // console.log(response); // works
            return response.json();
        })
        .then((requestData) => {
            //console.log(requestData); // works
            // console.log(requestData.name); // works name of city
            // console.log(requestData.weather[0].icon); // works weather icon
            // console.log(requestData.main.temp); //works current temperature
            // console.log(requestData.main.humidity); // works humidity
            // console.log(requestData.wind.speed); // works wind speed
            // console.log(requestData.coord.lat); //works uv index
            // console.log(requestData.coord.lon); //works uv index
            
            results(requestData); // run results function 
            currentCityForecast(requestData) // run currentCityForecast function
            getApifuture(requestData)
        })
        // uvUrl = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2");
        // fetch(uvUrl)
        //     .then((response) => {
        //         console.log(response)
        //         return response.json();
        //     })
        //     .then((uvData) => {
        //         console.log(uvData)
        //     })

};

// function to create a list of cities searched by user
function results(requestData) {
    createLi = document.createElement("li"); // create li element
    // need to figure out how to make this an input type button
    createLi.classList.add("list-group-item");
    createLi.innerHTML = requestData.name; // input name of city in li
    createLi.setAttribute("input", "button")
    //console.log(createLi)
    cityList.appendChild(createLi); // append to browser (line 37 in html)
    // console.log(cityList); // works
    createLi.addEventListener("click", clickingCity);
};
// function to click the input buttons of past cities searched
function clickingCity(e) {
    getApi(e.target.textContent)
}
// function to show current city weather conditions 
function currentCityForecast(requestData) {
    date = moment.unix(requestData.dt).format("MM/DD/YYYY")
    cityDiv = document.createElement("div"); // create city div
    cityDiv.classList.add("card", "card-body"); // add class to city div
    cityName = document.createElement("h4"); // create h4 element for title city name
    cityName.classList.add("card-title"); // add class to h4 
    cityName.innerHTML = requestData.name + " " + "(" + date + ")"; // input city name from the data
    weatherImg = document.createElement("img")
    weatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData.weather[0].icon + ".png")
    weatherImg.setAttribute("style", "width: 50px")
    tempPara = document.createElement("p"); // create temp paragragh
    tempPara.classList.add("card-text", "current-temp"); // add class to temp paragraph
    tempPara.innerHTML = ("Temperature: " + Math.ceil((requestData.main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // input current temp from the data
    humidityPara = document.createElement("p"); // create humidity paragraph
    humidityPara.classList.add("card-text", "current-humidity"); // add class to humidity paragraph
    humidityPara.innerHTML = ("Humidity: " + requestData.main.humidity + " %"); // input current humidity from data
    windSpeedPara = document.createElement("p"); // create wind speed paragraph
    windSpeedPara.classList.add("card-text", "current-wind-speed"); // add class to wind speed paragraph
    windSpeedPara.innerHTML = ("Wind Speed: " + requestData.wind.speed + " MPH"); // input current wind speed from data
    uvPara = document.createElement("p"); // create uv paragraph
    uvPara.classList.add("card-text", "current-uv"); // add class to uv paragraph
    uvPara.setAttribute("href", ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2"));
    uvPara.innerHTML = "UV Index: "// input current uv from data
    //console.log(uvPara)
    // its appending time
    cityDiv.append(cityName, weatherImg, tempPara, humidityPara, windSpeedPara, uvPara) // append all this to citydiv
    // console.log(cityDiv)     // works
    // console.log(currentCity); // works
    currentCity.innerHTML = ""; // clears the current city div to update the new city that was searched
    currentCity.append(cityDiv); // append cityDiv to currentCity
    // console.log(currentCity) // works
}

// function to fetch 5 day forecast
function getApifuture(requestData) {
    var forecastUrl = ("http://api.openweathermap.org/data/2.5/forecast?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2")
    fetch(forecastUrl)
        .then((response) => {
            console.log(response) // works
            return response.json();
        })
        .then((requestData2) => {
            console.log(requestData2) // works           
            firstDayForecast(requestData2) // runs first day
            secondDayForecast(requestData2) // runs second day
            thirdDayForecast(requestData2) // runs third day
            fourthDayForecast(requestData2) // runs fourth day
            fifthDayForecast(requestData2) // runs fifth day
        })
}
// function to show 5 day forecast
function firstDayForecast(requestData2) {

    // creating the forecast
    cardDiv = document.createElement("div"); // created card div
    // console.log(cardDiv); // works
    cardDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardDiv.setAttribute("style", "max-width: 12rem;"); // added a max width
    cardBodyDiv = document.createElement("div"); // created card-body div
    cardBodyDiv.setAttribute("class", "card-body") // added card body a class card-body from bootstrap
    // console.log(cardBodyDiv); // works
    dateDiv = document.createElement("h5"); // created a h5 element for the date
    dateDiv.setAttribute("style", "card-title"); // set card-title style
    dateDiv.innerHTML = moment.unix(requestData2.list[2].dt).format("MM/DD/YYYY"); // show date
    console.log(dateDiv); // works
    dayOneWeatherImg = document.createElement("img") // create img div
    dayOneWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[1].weather[0].icon + ".png")
    dayOneWeatherImg.setAttribute("style", "width: 50px;")
    console.log(dayOneWeatherImg) 
    dayOneTempPara = document.createElement("p")
    dayOneTempPara.classList.add("card-text")
    dayOneTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[1].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // input current temp from the data
    dayOneHumidityPara = document.createElement("p")
    dayOneHumidityPara.classList.add("card-text")
    dayOneHumidityPara.innerHTML = ("Humidity: " + requestData2.list[1].main.humidity + " %");

    // its appending time
    cardBodyDiv.append(dateDiv, dayOneWeatherImg, dayOneTempPara, dayOneHumidityPara)
    //console.log(cardBodyDiv) // works
    cardDiv.append(cardBodyDiv)
    dayOneForecast.innerHTML = "";
    dayOneForecast.append(cardDiv)
}

function secondDayForecast(requestData2) {

    // creating the forecast
    cardTwoDiv = document.createElement("div"); // created card div
    // console.log(cardTwoDiv); // works
    cardTwoDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardTwoDiv.setAttribute("style", "max-width: 12rem;"); // added a max width
    cardBodyTwoDiv = document.createElement("div"); // created card-body div
    cardBodyTwoDiv.setAttribute("class", "card-body") // added card body a class card-body from bootstrap
    // console.log(cardBodyTwoDiv); // works
    dateTwoDiv = document.createElement("h5"); // created a h5 element for the date
    dateTwoDiv.setAttribute("style", "card-title"); // set card-title style
    dateTwoDiv.innerHTML = moment.unix(requestData2.list[10].dt).format("MM/DD/YYYY"); // show date
    console.log(dateTwoDiv); // works
    dayTwoWeatherImg = document.createElement("img") // create img div
    dayTwoWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[2].weather[0].icon + ".png")
    dayTwoWeatherImg.setAttribute("style", "width: 50px;")
    console.log(dayTwoWeatherImg) 
    dayTwoTempPara = document.createElement("p")
    dayTwoTempPara.classList.add("card-text")
    dayTwoTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[2].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // input current temp from the data
    console.log(dayTwoTempPara)
    dayTwoHumidityPara = document.createElement("p")
    dayTwoHumidityPara.classList.add("card-text")
    dayTwoHumidityPara.innerHTML = ("Humidity: " + requestData2.list[2].main.humidity + " %");

    // its appending time
    cardBodyTwoDiv.append(dateTwoDiv, dayTwoWeatherImg, dayTwoTempPara, dayTwoHumidityPara)
    //console.log(cardBodyTwoDiv) // works
    cardTwoDiv.append(cardBodyTwoDiv)
    dayTwoForecast.innerHTML = "";
    dayTwoForecast.append(cardTwoDiv)
}

function thirdDayForecast(requestData2) {

    // creating the forecast
    cardThreeDiv = document.createElement("div"); // created card div
    // console.log(cardThreeDiv); // works
    cardThreeDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardThreeDiv.setAttribute("style", "max-width: 12rem;"); // added a max width
    cardBodyThreeDiv = document.createElement("div"); // created card-body div
    cardBodyThreeDiv.setAttribute("class", "card-body") // added card body a class card-body from bootstrap
    // console.log(cardBodyThreeDiv); // works
    dateThreeDiv = document.createElement("h5"); // created a h5 element for the date
    dateThreeDiv.setAttribute("style", "card-title"); // set card-title style
    dateThreeDiv.innerHTML = moment.unix(requestData2.list[25].dt).format("MM/DD/YYYY"); // show date
    console.log(dateThreeDiv); // works
    dayThreeWeatherImg = document.createElement("img") // create img div
    dayThreeWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[3].weather[0].icon + ".png")
    dayThreeWeatherImg.setAttribute("style", "width: 50px;")
    console.log(dayThreeWeatherImg) 
    dayThreeTempPara = document.createElement("p")
    dayThreeTempPara.classList.add("card-text")
    dayThreeTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[3].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // input current temp from the data
    console.log(dayThreeTempPara)
    dayThreeHumidityPara = document.createElement("p")
    dayThreeHumidityPara.classList.add("card-text")
    dayThreeHumidityPara.innerHTML = ("Humidity: " + requestData2.list[3].main.humidity + " %");

    // its appending time
    cardBodyThreeDiv.append(dateThreeDiv, dayThreeWeatherImg, dayThreeTempPara, dayThreeHumidityPara)
    //console.log(cardBodyThreeDiv) // works
    cardThreeDiv.append(cardBodyThreeDiv)
    dayThreeForecast.innerHTML = "";
    dayThreeForecast.append(cardThreeDiv)
}

function fourthDayForecast(requestData2) {

    // creating the forecast
    cardFourDiv = document.createElement("div"); // created card div
    // console.log(cardFourDiv); // works
    cardFourDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardFourDiv.setAttribute("style", "max-width: 12rem;"); // added a max width
    cardBodyFourDiv = document.createElement("div"); // created card-body div
    cardBodyFourDiv.setAttribute("class", "card-body") // added card body a class card-body from bootstrap
    // console.log(cardBodyFourDiv); // works
    dateFourDiv = document.createElement("h5"); // created a h5 element for the date
    dateFourDiv.setAttribute("style", "card-title"); // set card-title style
    dateFourDiv.innerHTML = moment.unix(requestData2.list[30].dt).format("MM/DD/YYYY"); // show date
    console.log(dateFourDiv); // works
    dayFourWeatherImg = document.createElement("img") // create img div
    dayFourWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[4].weather[0].icon + ".png")
    dayFourWeatherImg.setAttribute("style", "width: 50px;")
    console.log(dayFourWeatherImg) 
    dayFourTempPara = document.createElement("p")
    dayFourTempPara.classList.add("card-text")
    dayFourTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[4].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // input current temp from the data
    console.log(dayFourTempPara)
    dayFourHumidityPara = document.createElement("p")
    dayFourHumidityPara.classList.add("card-text")
    dayFourHumidityPara.innerHTML = ("Humidity: " + requestData2.list[4].main.humidity + " %");

    // its appending time
    cardBodyFourDiv.append(dateFourDiv, dayFourWeatherImg, dayFourTempPara, dayFourHumidityPara)
    //console.log(cardBodyFourDiv) // works
    cardFourDiv.append(cardBodyFourDiv)
    dayFourForecast.innerHTML = "";
    dayFourForecast.append(cardFourDiv)
}

function fifthDayForecast(requestData2) {

    // creating the forecast
    cardFiveDiv = document.createElement("div"); // created card div
    // console.log(cardFiveDiv); // works
    cardFiveDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardFiveDiv.setAttribute("style", "max-width: 12rem"); // added a max width
    cardBodyFiveDiv = document.createElement("div"); // created card-body div
    cardBodyFiveDiv.setAttribute("class", "card-body") // added card body a class card-body from bootstrap
    // console.log(cardBodyFiveDiv); // works
    dateFiveDiv = document.createElement("h5"); // created a h5 element for the date
    dateFiveDiv.setAttribute("style", "card-title"); // set card-title style
    dateFiveDiv.innerHTML = moment.unix(requestData2.list[39].dt).format("MM/DD/YYYY"); // show date
    console.log(dateFiveDiv); // works
    dayFiveWeatherImg = document.createElement("img") // create img div
    dayFiveWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[5].weather[0].icon + ".png")
    dayFiveWeatherImg.setAttribute("style", "width: 50px;")
    console.log(dayFiveWeatherImg) 
    dayFiveTempPara = document.createElement("p")
    dayFiveTempPara.classList.add("card-text")
    dayFiveTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[5].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // input current temp from the data
    console.log(dayFiveTempPara)
    dayFiveHumidityPara = document.createElement("p")
    dayFiveHumidityPara.classList.add("card-text")
    dayFiveHumidityPara.innerHTML = ("Humidity: " + requestData2.list[5].main.humidity + " %");

    // its appending time
    cardBodyFiveDiv.append(dateFiveDiv, dayFiveWeatherImg, dayFiveTempPara, dayFiveHumidityPara)
    //console.log(cardBodyFiveDiv) // works
    cardFiveDiv.append(cardBodyFiveDiv)
    dayFiveForecast.innerHTML = "";
    dayFiveForecast.append(cardFiveDiv)
}


searchFormEl.addEventListener("submit", formSubmit); // works
fetchButton.addEventListener("submit", getApi); // works

// searched city input button works but when click appends a new button.
// uv converted and needs bg-color text-white
// local storage is inside, but doesn't save the next city inputted
// fix column and dates in 5 day forecast 
// comment
