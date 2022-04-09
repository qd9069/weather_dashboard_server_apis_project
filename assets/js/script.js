// set a var to store API Key
var APIKey = "019e9eae1c058887e25d507a189a7e6f";

// Create Variables for the API Call - input city
var city;

//URL example of how to make an API call using just the city name
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Make the API Call Using Fetch
// fetch(queryURL)