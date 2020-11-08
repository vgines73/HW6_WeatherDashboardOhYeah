# HW6_WeatherDashboardOhYeah

The goal was to create a functional weather dashboard using a Third-Party APIs. Used Openweather Api and Moment.js to convert the dates since openweather gave their dates in unix codes. So the Dashboard shows the just the header with the title Weather Dashboard and a search bar for the user to input a city. Once the user does, user is able to: 

 - search for a city and is presented with current and future conditions for that city and that city is added to the search history.
 - view current weather conditions for that city and is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index.
 - see that the UV index will be presented with a color that indicates whether the conditions are favorable, moderate, or severe.
 - view future weather conditions for that city and is presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity.
 - click on a city in the search history
 and is presented with current and future conditions for that city.

 Used: bootstrap, fontawesome, moment.js, and openweather api to help create this weather dashboard.  

 for the html: 
 
For the header used bootstrap to obtain a nav bar and made the weather dashboard title. Then in my section, created a container row, and column with a form with input text and input button to create the search bar. For the button i used a font aweome icon. Then made an unordered list and used Javascript to append the listed items of searched cities. For the next column I created another div for the current city conditions and appended all the info using Javascript. Then created another div for the five day forecast and appended that info from Javascript. Used Bootstrap classes and used my own to override some bootstrap classes. 

 for Javascript: 

Defined my variables I needed access from html and created functions to get the app working. First I needed a function to prevent the form from refreshing after the user inputted the city and clicked the search bar. Added eventlisteners to submit the users input. Then I needed another function to fetch the weather api. Then inside that function runs the rest of the functions I create that were needed to run the app. To see more in depth, view js to read all the comments.

I'm still learning, feeling a little more confident in my work, but still takes me way too long to finish the assignment. I probably spent over 20 hours to do this assignment.  Majority of the time was watching class videos, reviewing the class activities, google fu'ing on how to do this and that, fixing issues but then having other issues after, but in the end I feel I was able to make it look like the finished product and functional. One particular issue I came across was the obtaining the uv index value. Once I obtained the info, I thought I just needed to push the value in. However in the browser, the value would come up undefined. I then thought, maybe if I obtain the uvData first and then get the requestedData next, it would work. Yet still came up undefined. It wasn't until I needed to push the value after fetching it in the getUvUrl function.  

So today 11/07/2020 I'm not sure if my assignment is functional. I ended up going over my quota for today and it won't give me access. Getting a error 429 code saying failed to load resource: the server responded with a status of 429. So the work I have up to now I haven't pushed and see if it works or if I get errors. I also need to add a screenshot, live link, and repo link. Hopefully everything is okay. I just realized I need a screenshot of my assignment but I have no access today. 

 screenshot
 
 [!repo link] https://github.com/vgines73/HW6_WeatherDashboardOhYeah

 ![live link] https://vgines73.github.io/HW6_WeatherDashboardOhYeah/

