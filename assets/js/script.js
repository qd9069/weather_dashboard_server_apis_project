// set all vars for weather info
var currentTemp = document.getElementById("temp");
var currentWind = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");
var currentUV = document.getElementById("uvIndex");
var currentCityDate = document.getElementById("cityDate");
// for current date
var currentDay = moment ().format("MM/DD/YYYY");

var date1 = document.getElementById("date1");
var date2 = document.getElementById("date2");
var date3 = document.getElementById("date3");
var date4 = document.getElementById("date4");
var date5 = document.getElementById("date5");
var dates = [date1, date2, date3, date4, date5];

var date1Temp = document.getElementById("date1Temp");
var date2Temp = document.getElementById("date2Temp");
var date3Temp = document.getElementById("date3Temp");
var date4Temp = document.getElementById("date4Temp");
var date5Temp = document.getElementById("date5Temp");
var datesTemp = [date1Temp, date2Temp, date3Temp, date4Temp, date5Temp];

var date1Wind = document.getElementById("date1Wind");
var date2Wind = document.getElementById("date2Wind");
var date3Wind = document.getElementById("date3Wind");
var date4Wind = document.getElementById("date4Wind");
var date5Wind = document.getElementById("date5Wind");
var datesWind = [date1Wind, date2Wind, date3Wind, date4Wind, date5Wind];

var date1Hum = document.getElementById("date1Hum");
var date2Hum = document.getElementById("date2Hum");
var date3Hum = document.getElementById("date3Hum");
var date4Hum = document.getElementById("date4Hum");
var date5Hum = document.getElementById("date5Hum");
var datesHum = [date1Hum, date2Hum, date3Hum, date4Hum, date5Hum];

var date1Icon = document.getElementById("date1Icon");
var date2Icon = document.getElementById("date2Icon");
var date3Icon = document.getElementById("date3Icon");
var date4Icon = document.getElementById("date4Icon");
var date5Icon = document.getElementById("date5Icon");
var datesIcon = [date1Icon, date2Icon, date3Icon, date4Icon, date5Icon];


// set a var to store API Key
var APIKey = "019e9eae1c058887e25d507a189a7e6f";

// to get user input city
var userInput = document.getElementById("input");
var searchButton = document.getElementById("searchBtn");

// to hide the window info before clicking search button
var right = document.getElementById("right");
right.style.display = "none";


// Make the Geocoding API Call Using Fetch to get city lat and lon
function getCity(event) { 
    event.preventDefault();

    // to show the window info after clicking the search button
    right.style.display = "block";

    var inputCity = userInput.value.trim();
    // console.log(inputCity);

    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=1&appid=" + APIKey;
  
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var cityLat = data[0].lat
        var cityLon = data[0].lon
        // console.log(cityLat);
        // console.log(cityLon);
        getWeather();

        // Make the oneCall API Call Using Fetch to get weather info
        function getWeather() {
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + APIKey;
            // to print the inputCity as upper case
            function capitalizeFirstLetter(inputCity) {
                return inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
              }
            var printInputCity = capitalizeFirstLetter(inputCity);
        
            fetch(queryURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                // console.log(data);
        
                // to show weather in the main weather box
                var icon = document.getElementById("icon");
                var addIcon = icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
        
                currentCityDate.textContent = printInputCity + " (" + currentDay + ")";
                currentTemp.textContent = data.current.temp + "°F";
                currentWind.textContent = data.current.wind_speed + " MPH";
                currentHumidity.textContent = data.current.humidity + " %";
                
                // to color the UV index
                if (data.current.uvi < 3) {
                    currentUV.classList.add("low");
                } 
                else if (3 <= data.current.uvi && data.current.uvi < 6) {
                    currentUV.classList.add("moderate");
                } 
                else {
                    currentUV.classList.add("high");
                }
                
                currentUV.textContent = data.current.uvi;
        
                // to show weather in  the forecastBlock array [1] for the tomorrow ... [5] for 5 days later
                for (var i=1; i < 6; i++) {
                    dates[i-1].textContent = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
                    datesTemp[i-1].textContent = "Temp: " + data.daily[i].temp.day + "°F";
                    datesWind[i-1].textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                    datesHum[i-1].textContent = "Humidity: " + data.daily[i].humidity + " %";
                    var addDatesIcon = datesIcon[i-1].setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                }
        
              });
        }


    });

}

searchButton.addEventListener("click", getCity);


//--------------- for local storage ----------------
var cityHistory = [];

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
            
    // get input value from search form
    var inputCity = userInput.value.trim();
           
    // Return from function early if inputCity is blank
    if (inputCity === "") {
    return;
    }

    // Add new city to cityHistory array, clear the input
    cityHistory.push(inputCity);
    userInput.value = "";

    // store value: stringify and set key in localStorage to cityHistroy array
    localStorage.setItem("city", JSON.stringify(cityHistory));

    renderCityHistory();
                
});

var cityList = document.querySelector("#historyCities");
function renderCityHistory () {

    cityList.innerHTML = "";

    // Render a new li for each todo
    for (var i = 0; i < cityHistory.length; i++) {
      
        var searchedCity = cityHistory[i];

        var button = document.createElement("button");
        button.textContent = searchedCity;
        button.setAttribute("data-index", i);
        button.classList.add("btn-block");
        button.classList.add("btn-secondary");
        button.classList.add("btn");

        cityList.appendChild(button);
        
    }

}

// This function is being called below and will run when the page loads.
function init() {
    // Get stored cities from localStorage
    var storedCities = JSON.parse(localStorage.getItem("city"));
  
    // If saved cities were retrieved from localStorage, update the cityHistory array to it
    if (storedCities) {
      cityHistory = storedCities;
    }

    renderCityHistory();
  }

// Calls init to retrieve data and render it to the page on load
init()

//----------------------------------------------------

// searchButton.addEventListener("click", getCity);


// example for Geocoding API
// function geoLocationApiExample() { 
//     var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=San Diego&limit=5&appid=" + APIKey;
  
//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//       });
// }
// geoLocationApiExample();



// example for one call api
// function getApi() {
//     var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid=" + APIKey;
  
//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//       });
// }
// getApi();

