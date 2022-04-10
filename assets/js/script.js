// set a var to store API Key
var APIKey = "019e9eae1c058887e25d507a189a7e6f";

// Create Variables for the API Call - input city
var city;

//URL example of how to make an API call using just the city name
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Make the API Call Using Fetch to get the weather info
// fetch(queryURL)

// to get user input city
var userInput = document.getElementById("input");
var searchButton = document.getElementById("searchBtn");


//--------------- for local storage ----------------
// searchButton.addEventListener("click", function(event) {
    // event.preventDefault();
            
    // get input value from search form
    // var inputCity = userInput.value.trim();
           
    // use setItem to store the input text value in localStorage
    // localStorage.setItem("event", inputCity);
                
// });

// get the input text value from local storage
// var savedCity = localStorage.getItem("event");
// console.log(savedCity)

// to keep the saved city persists
// if (savedCity) {
//     userInput.value = savedCity;
// }




// Make the Geocoding API Call Using Fetch to get city lat and lon
function getCity(event) { 
    event.preventDefault();

    var inputCity = userInput.value.trim();
    // console.log(inputCity);

    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=1&appid=" + APIKey;
  
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);

        var cityLat = data[0].lat
        var cityLon = data[0].lon
        // console.log(cityLat);
        // console.log(cityLon);

    });

}

searchButton.addEventListener("click", getCity);
// ******* how to get the inputCity, cityLon and cityLat outside of the function? **********

var cityLat = "32.7174202";
var cityLon = "-117.1627728";
var currentTemp = document.getElementById("temp");
var currentWind = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");
var currentUV = document.getElementById("uvIndex");
var currentCityDate = document.getElementById("cityDate");
// for current date
var currentDay = moment ().format("MM/DD/YYYY");

// Make the oneCall API Call Using Fetch to get weather info
function getWeather() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + APIKey;
    var inputCity = "San Diego"

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // to show weather in the main weather box
        
        currentCityDate.textContent = inputCity + " (" + currentDay + ") + weather icon";
        currentTemp.textContent = data.current.temp + "°F";
        currentWind.textContent = data.current.wind_speed + " MPH";
        currentHumidity.textContent = data.current.humidity + " %";
        
        // to color the UV index
        if (data.current.uvi <= 2) {
            currentUV.classList.add("low");
        } else 
        if (3 <= data.current.uvi <= 5) {
            currentUV.classList.add("moderate");
        } else 
        if (data.current.uvi >= 6) {
            currentUV.classList.add("high");
        }
        
        currentUV.textContent = data.current.uvi;



      });
}
getWeather();






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

