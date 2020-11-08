
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

    cityInputVal = document.querySelector("#search-city").value.trim();
    if (!cityInputVal) {  // if user types an unknown city
        alert("Please enter a city.") // alert pops up for aware the user
        return; // starts over
    }
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
            return response.json();
        })
        .then((requestData) => {
            if (cityInputVal !== requestData.name) {
                alert("It's not a city. Please enter the name of the city.") // alerts the user they entered an unknown city
                return // starts
            }
    
            results(requestData); // run results function 
            getUvUrl(requestData); // runs getUvUrl function
            getApiFuture(requestData); // run getApiFuture function
        });
};

// function to create a list of cities searched by user
function results(requestData) {
    createLi = document.createElement("li"); // create li element
    createLi.classList.add("list-group-item");
    createLi.innerHTML = requestData.name; // input name of city in li
    cityList.appendChild(createLi); // append to browser (line 37 in html)
    // createLi.addEventListener("click", clickingCity); // click on click previous city to see the city current conditions

};
// // function to click the input buttons of past cities searched
// function clickingCity(e) {
//     getApi(e.target.textContent);
// }

// function to fetch uv index
function getUvUrl(requestData) {
    uvUrl = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2");

    fetch(uvUrl)
        .then((response) => {
            return response.json();
        })
        .then((uvData) => {
            date = moment.unix(requestData.dt).format("MM/DD/YYYY"); // current date converted unix code with moment
            cityDiv = document.createElement("div"); // create city div
            cityDiv.classList.add("card", "card-body"); // add class to city div
            cityName = document.createElement("h4"); // create h4 element for title city name
            cityName.classList.add("card-title"); // add class to h4 
            cityName.innerHTML = requestData.name + " " + "(" + date + ")"
            weatherImg = document.createElement("img"); // create img div
            weatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData.weather[0].icon + ".png"); // shows weather img
            weatherImg.setAttribute("style", "width: 50px") // added width to make image smaller
            tempPara = document.createElement("p"); // create temp paragragh
            tempPara.classList.add("card-text"); // add class to temp paragraph
            tempPara.innerHTML = ("Temperature: " + Math.ceil((requestData.main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // shows temp data. 
            humidityPara = document.createElement("p"); // create humidity paragraph
            humidityPara.classList.add("card-text"); // add class to humidity paragraph
            humidityPara.innerHTML = ("Humidity: " + requestData.main.humidity + " %"); // shows humidity data
            windSpeedPara = document.createElement("p"); // create wind speed paragraph
            windSpeedPara.classList.add("card-text"); // add class to wind speed paragraph
            windSpeedPara.innerHTML = ("Wind Speed: " + requestData.wind.speed + " MPH"); // shows wind speed data
            uvPara = document.createElement("p"); // create uv paragraph
            uvParaValue = document.createElement("p")
            uvPara.classList.add("card-text"); // add class to uv paragraph
            uvPara.setAttribute("href", ("http://api.openweathermap.org/data/2.5/uvi?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&appid=453aa8aa937d813f343ce451eb44cfc2"));
            uvPara.innerHTML = "UV Index: " // input current uv from data. Had to move this here to push the uv value.
            uvParaValue.innerHTML = uvData.value;
            uvPara.appendChild(uvParaValue)

            // conditionals for different UV levels
            if (uvData.value < 3) { // if uv value is less then 3 then
                uvParaValue.setAttribute("class", "btn btn-success") // add green button to uv paragraph
            } else if (uvData.value >= 3 || uvData.value < 8) { // if uv value is greater than and equal to 3 or uv value is less than 6 then
                uvParaValue.setAttribute("class", "btn btn-warning") // add yellow button to uv paragraph
            } else { // anything over 8
                uvParaValue.setAttribute("input", "btn btn-danger") // add green button to uv paragraph
            };

            // its appending time
            cityDiv.append(cityName, weatherImg, tempPara, humidityPara, windSpeedPara, uvPara); // append all this to citydiv
            currentCity.innerHTML = ""; // clears the current city div to update the new city that was searched
            currentCity.append(cityDiv); // append cityDiv to currentCity

        })
};

// function to fetch 5 day forecast
function getApiFuture(requestData) {
    var forecastUrl = ("http://api.openweathermap.org/data/2.5/forecast?lat=" + requestData.coord.lat + "&lon=" + requestData.coord.lon + "&cnt=50&appid=453aa8aa937d813f343ce451eb44cfc2")
    fetch(forecastUrl)
        .then((response) => {
            return response.json();
        })
        .then((requestData2) => {
            firstDayForecast(requestData2) // runs first day
            secondDayForecast(requestData2) // runs second day
            thirdDayForecast(requestData2) // runs third day
            fourthDayForecast(requestData2) // runs fourth day
            fifthDayForecast(requestData2) // runs fifth day
        });
};
// function to show first day forecast
function firstDayForecast(requestData2) {

    // creating the forecast
    cardDiv = document.createElement("div"); // created card div
    cardDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardDiv.setAttribute("style", "max-width: 10rem;"); // added a max width
    cardBodyDiv = document.createElement("div"); // created card-body div
    cardBodyDiv.setAttribute("class", "card-body"); // added card body a class card-body from bootstrap
    dateDiv = document.createElement("h5"); // created a h5 element for the date
    dateDiv.setAttribute("style", "card-title"); // set card-title style
    dateDiv.innerHTML = moment.unix(requestData2.list[8].dt).format("MM/DD/YYYY"); // show date
    dayOneWeatherImg = document.createElement("img"); // create img div
    dayOneWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[1].weather[0].icon + ".png"); // show weather icon
    dayOneWeatherImg.setAttribute("style", "width: 50px;"); // added width to make image smaller
    dayOneTempPara = document.createElement("p"); // create temp paragraph
    dayOneTempPara.classList.add("card-text"); // added class to temp paragraph
    dayOneTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[1].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // show temp data
    dayOneHumidityPara = document.createElement("p"); // create humidity paragraph
    dayOneHumidityPara.classList.add("card-text"); // added class to humidity paragraph
    dayOneHumidityPara.innerHTML = ("Humidity: " + requestData2.list[1].main.humidity + " %"); // show humidity data

    // its appending time
    cardBodyDiv.append(dateDiv, dayOneWeatherImg, dayOneTempPara, dayOneHumidityPara); // append all this to the cardBodyDiv
    cardDiv.append(cardBodyDiv); // append cardBodyDiv to cardDiv
    dayOneForecast.innerHTML = ""; // refresh
    dayOneForecast.append(cardDiv); // shows data in first day forecast div
}

// function to show second day forecast
function secondDayForecast(requestData2) {

    // creating the forecast
    cardTwoDiv = document.createElement("div"); // created card div
    cardTwoDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardTwoDiv.setAttribute("style", "max-width: 10rem;"); // added a max width
    cardBodyTwoDiv = document.createElement("div"); // created card-body div
    cardBodyTwoDiv.setAttribute("class", "card-body"); // added card body a class card-body from bootstrap
    dateTwoDiv = document.createElement("h5"); // created a h5 element for the date
    dateTwoDiv.setAttribute("style", "card-title"); // set card-title style
    dateTwoDiv.innerHTML = moment.unix(requestData2.list[16].dt).format("MM/DD/YYYY"); // show date
    dayTwoWeatherImg = document.createElement("img"); // create img div
    dayTwoWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[2].weather[0].icon + ".png"); // show weather icon
    dayTwoWeatherImg.setAttribute("style", "width: 50px;"); // added width to make icon smaller
    dayTwoTempPara = document.createElement("p"); // create temp paragraph
    dayTwoTempPara.classList.add("card-text"); // added class to temp paragraph
    dayTwoTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[2].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // show temp data
    dayTwoHumidityPara = document.createElement("p"); // create humidity paragraph
    dayTwoHumidityPara.classList.add("card-text"); // added class to humidity paragraph
    dayTwoHumidityPara.innerHTML = ("Humidity: " + requestData2.list[2].main.humidity + " %"); // show humidity data

    // its appending time
    cardBodyTwoDiv.append(dateTwoDiv, dayTwoWeatherImg, dayTwoTempPara, dayTwoHumidityPara); // append all this to cardBodyTwoDiv
    cardTwoDiv.append(cardBodyTwoDiv); // append cardBodyTwoDiv to cardTwoDiv
    dayTwoForecast.innerHTML = ""; // refreshes
    dayTwoForecast.append(cardTwoDiv); // show data of second day forecast
}

// function to show third day forecast
function thirdDayForecast(requestData2) {

    // creating the forecast
    cardThreeDiv = document.createElement("div"); // created card div
    cardThreeDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardThreeDiv.setAttribute("style", "max-width: 10rem;"); // added a max width
    cardBodyThreeDiv = document.createElement("div"); // created card-body div
    cardBodyThreeDiv.setAttribute("class", "card-body"); // added card body a class card-body from bootstrap
    dateThreeDiv = document.createElement("h5"); // created a h5 element for the date
    dateThreeDiv.setAttribute("style", "card-title"); // set card-title style
    dateThreeDiv.innerHTML = moment.unix(requestData2.list[24].dt).format("MM/DD/YYYY"); // show date
    dayThreeWeatherImg = document.createElement("img"); // create img div
    dayThreeWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[3].weather[0].icon + ".png"); // show weather icon
    dayThreeWeatherImg.setAttribute("style", "width: 50px;") // added width to make icon smaller
    dayThreeTempPara = document.createElement("p"); // create temp paragraph
    dayThreeTempPara.classList.add("card-text"); // added class to temp paragraph
    dayThreeTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[3].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // show temp data
    dayThreeHumidityPara = document.createElement("p"); // create humidity paragraph
    dayThreeHumidityPara.classList.add("card-text"); // added class to humidity data
    dayThreeHumidityPara.innerHTML = ("Humidity: " + requestData2.list[3].main.humidity + " %"); // show humidity data

    // its appending time
    cardBodyThreeDiv.append(dateThreeDiv, dayThreeWeatherImg, dayThreeTempPara, dayThreeHumidityPara); // append all this to cardBodyThreeDiv
    cardThreeDiv.append(cardBodyThreeDiv); // append cardBodyThreeDiv to cardThreeDiv
    dayThreeForecast.innerHTML = ""; // refreshes
    dayThreeForecast.append(cardThreeDiv); // show data for third day forecast
}

// function to show fourth day forecast
function fourthDayForecast(requestData2) {

    // creating the forecast
    cardFourDiv = document.createElement("div"); // created card div
    cardFourDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardFourDiv.setAttribute("style", "max-width: 10rem;"); // added a max width
    cardBodyFourDiv = document.createElement("div"); // created card-body div
    cardBodyFourDiv.setAttribute("class", "card-body"); // added card body a class card-body from bootstrap
    dateFourDiv = document.createElement("h5"); // created a h5 element for the date
    dateFourDiv.setAttribute("style", "card-title"); // set card-title style
    dateFourDiv.innerHTML = moment.unix(requestData2.list[32].dt).format("MM/DD/YYYY"); // show date
    dayFourWeatherImg = document.createElement("img"); // create img div
    dayFourWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[4].weather[0].icon + ".png"); // show weather icon
    dayFourWeatherImg.setAttribute("style", "width: 50px;"); // added width to make icon smaller
    dayFourTempPara = document.createElement("p"); // create temp paragraph
    dayFourTempPara.classList.add("card-text"); // added class to temp paragraph
    dayFourTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[4].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // show temp data
    dayFourHumidityPara = document.createElement("p"); // create humidity paragraph
    dayFourHumidityPara.classList.add("card-text"); // added class to humidity paragraph
    dayFourHumidityPara.innerHTML = ("Humidity: " + requestData2.list[4].main.humidity + " %"); // show humidity data

    // its appending time
    cardBodyFourDiv.append(dateFourDiv, dayFourWeatherImg, dayFourTempPara, dayFourHumidityPara); // appended all this to cardBodyFourDiv
    cardFourDiv.append(cardBodyFourDiv); // appended cardBodyFourDiv to cardFourDiv
    dayFourForecast.innerHTML = ""; // refreshes
    dayFourForecast.append(cardFourDiv); // shows fourth day forecast data
}

// function to show fifth day forecast
function fifthDayForecast(requestData2) {

    // creating the forecast
    cardFiveDiv = document.createElement("div"); // created card div
    cardFiveDiv.setAttribute("class", "card text-white bg-primary col-sm-2 mb-3"); // added class to card div 
    cardFiveDiv.setAttribute("style", "max-width: 10rem"); // added a max width
    cardBodyFiveDiv = document.createElement("div"); // created card-body div
    cardBodyFiveDiv.setAttribute("class", "card-body"); // added card body a class card-body from bootstrap
    dateFiveDiv = document.createElement("h5"); // created a h5 element for the date
    dateFiveDiv.setAttribute("style", "card-title"); // set card-title style
    dateFiveDiv.innerHTML = moment.unix(requestData2.list[39].dt).format("MM/DD/YYYY"); // show date
    dayFiveWeatherImg = document.createElement("img"); // create img div
    dayFiveWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + requestData2.list[5].weather[0].icon + ".png"); // shows weather icon
    dayFiveWeatherImg.setAttribute("style", "width: 50px;"); // added width to make icon smaller
    dayFiveTempPara = document.createElement("p"); // create temp paragraph
    dayFiveTempPara.classList.add("card-text"); // added class to temp paragraph
    dayFiveTempPara.innerHTML = ("Temp: " + Math.ceil((requestData2.list[5].main.temp - 273.15) * 1.80 + 32) + " &deg" + "F"); // show temp data
    dayFiveHumidityPara = document.createElement("p"); // create humidity paragraph
    dayFiveHumidityPara.classList.add("card-text"); // add class to humidity paragraph
    dayFiveHumidityPara.innerHTML = ("Humidity: " + requestData2.list[5].main.humidity + " %"); // show humidity data

    // its appending time
    cardBodyFiveDiv.append(dateFiveDiv, dayFiveWeatherImg, dayFiveTempPara, dayFiveHumidityPara); // appended all this to cardBodyFiveDiv
    cardFiveDiv.append(cardBodyFiveDiv); // appended cardBodyFiveDiv to cardFivDiv
    dayFiveForecast.innerHTML = ""; // refreshes
    dayFiveForecast.append(cardFiveDiv); // show fifth day forecast data
}

searchFormEl.addEventListener("submit", formSubmit); // works
fetchButton.addEventListener("submit", getApi); // works



