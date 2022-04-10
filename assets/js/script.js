// set a var to store API Key
var APIKey = "019e9eae1c058887e25d507a189a7e6f";

// Create Variables for the API Call - input city
var city;

//URL example of how to make an API call using just the city name
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

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
    console.log(inputCity);

    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=1&appid=" + APIKey;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        var lon = data[0].lon
        var lat = data[0].lat
        console.log(lon);
        console.log(lat);

      });
}

searchButton.addEventListener("click", getCity);


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

// Make the API Call Using Fetch to get the weather info
// fetch(queryURL)


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

