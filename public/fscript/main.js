// navbar color changes based on active page
const navbarItems = document.querySelectorAll('#navbar-sticky a');



// Get the current HTML file (page) name
var currentHTMLFile = window.location.pathname.split('/').pop();

console.log(currentHTMLFile);


//event listeners






































// // Get user's location using Geolocation API
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//   } else {
//     console.log('Geolocation is not supported by this browser.');
//   }
  
//   // Success callback function for Geolocation API
//   function successCallback(position) {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;
  
//     // Call weather API using the retrieved coordinates
//     getWeatherForecast(latitude, longitude);
//   }
  
//   // Error callback function for Geolocation API
//   function errorCallback(error) {
//     console.log('Error occurred while retrieving location:', error.message);
//   }
  
//   // Function to fetch weather forecast using weather.gov API
//   function getWeatherForecast(latitude, longitude) {
//     var apiUrl = 'https://api.weather.gov/points/' + latitude + ',' + longitude + '/forecast';
  
//     fetch(apiUrl)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(data) {
//         // Process the weather forecast data
//         console.log(data);
//       })
//       .catch(function(error) {
//         console.log('Error:', error);
//       });
//   }