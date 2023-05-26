// navbar color changes based on active page
const navbarItems = document.querySelectorAll('#navbar-sticky a');
let display = document.querySelector(".itemwrapper")
const addToCartButton = document.createElement("a")
const dateItem = document.getElementById("datePicker")

// Get the current HTML file (page) name
var currentHTMLFile = window.location.pathname.split('/').pop();
const baseURL = `http://localhost:5432`;



//callbacks
const errCallback = err => console.log(err.response.data)

// axios request
const getAllProducts = () => axios.get(`${baseURL}/rentals`).then(res => displayProducts(res))

const displayProducts = (res) =>{
        // console.log(res.data)
        display.innerHTML= ""  

        res.data.forEach(product => {
            const{item_description,
                  item_id, item_name,
                  item_price, item_url} = product

                  
                  let itemWrapper = document.createElement("div")
                  itemWrapper.setAttribute("class", "itemwrapper2")
                  let anchor = document.createElement("a")
                  anchor.setAttribute("href","#")
                  
                  let image = document.createElement("img")
                  image.setAttribute("class","p-8 rounded-t-lg px-4 mx-auto max-w-screen-xs text-center py-10 lg:py-36")
                  image.setAttribute("src",`${item_url}`)
                  image.style.width = "400px"
                  image.style.height = "50%"
                  image.style.paddingTop = "20px"
                  
                  anchor.appendChild(image)
                  itemWrapper.appendChild(anchor)
                  
                  let body = document.createElement("div")
                  body.setAttribute("class","px-5 pb-5")
                  body.style.paddingBottom = "20px"
                  
                  let anchorBody = document.createElement("a")
                  anchorBody.setAttribute("href","#")
                  
                  let title = document.createElement("h5")
                  title.setAttribute("class","text-xl font-semibold tracking-tight text-gray-900 dark:text-white")
                  title.textContent = `${item_name}`
                  
                  anchorBody.appendChild(title)
                  let brk = document.createElement("br")
                  anchorBody.appendChild(brk)
                  body.appendChild(anchorBody)
                  
                  let descriptionSpan = document.createElement("span");
                  descriptionSpan.setAttribute("class", "bg-blue-100 text-blue-800 text-xs mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3 center-text");
                  descriptionSpan.style.height = "170px"
                  descriptionSpan.textContent = `${item_description}`;
                  
                  let descriptionContainer = document.createElement("div");
                  descriptionContainer.setAttribute("class", "flex items-center mt-2.5 mb-3");
                  descriptionContainer.appendChild(descriptionSpan);
                  body.appendChild(descriptionContainer);
                  
                  let priceSpan = document.createElement("span");
                  priceSpan.setAttribute("class", "text-3xl font-bold text-gray-900 dark:text-white");
                  priceSpan.textContent = `$${item_price}`;
                  
                  let addToCartLink = document.createElement("a");
                  addToCartLink.setAttribute("onclick", `addButton(${item_id})`);
                  addToCartLink.setAttribute("class", "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800");
                  addToCartLink.textContent = "Reserve";
                  
                  let priceContainer = document.createElement("div");
                  priceContainer.setAttribute("class", "flex items-center justify-between");
                  priceContainer.appendChild(priceSpan);
                  priceContainer.appendChild(addToCartLink);
                  body.appendChild(priceContainer);
                  itemWrapper.appendChild(body)
                  display.appendChild(itemWrapper);
        });

}

const dateInput = document.getElementById('datePicker');
dateInput.addEventListener('change', function(event) {
  // Update the value attribute with the selected date
  dateInput.setAttribute('value', event.target.value);
});


// Get the current date
var today = new Date();

// Extract the date, month, and year
var todaysdate = today.getDate();
var todaysmonth = today.getMonth() + 1; // Note: Month is zero-indexed
var todaysyear = today.getFullYear();

// Create the date string
var dateString = todaysmonth + '-' + todaysdate + '-' + todaysyear;
dateItem.setAttribute("value", dateString)
// dateItem.setAttribute("min", dateString)
  
// addToCartButton.addEventListener('click', (e) => {
//     e.preventDefault()})


function addButton(id){
    let date = document.getElementById('datePicker').value
    if(date === ""){
      alert('Please pick a reservation date')
    }
    let body = {
    item_id: id,
    booking_date: date
    }
    axios.post(`${baseURL}/cart`, body).then(res => alert('Item reserved'))
}

//invoking
getAllProducts()




























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