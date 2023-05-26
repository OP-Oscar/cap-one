// navbar color changes based on active page
const navbarItems = document.querySelectorAll('#navbar-sticky a');
let display = document.querySelector(".itemwrapper")
let displayInner = document.querySelector(".itemwrapper3")
const removeCartButton = document.createElement("a")

// Get the current HTML file (page) name
var currentHTMLFile = window.location.pathname.split('/').pop();
const baseURL = `http://localhost:5432`;



//callbacks
const errCallback = err => console.log(err.response.data)

// axios request
const getReservations = () => axios.get(`${baseURL}/cart`).then(res => displayProducts(res))

const displayProducts = (res) =>{
        // console.log(res.data)
        // display.innerHTML= ""  
        function removeElementsByClass(className){
            const elements = document.getElementsByClassName(className);
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
        removeElementsByClass('itemwrapper3')

        res.data.forEach(product => {
            const{item_description,
                  cart_id, item_name,
                  item_price, item_url, booking_date} = product

                  
                  let itemWrapper = document.createElement("div")
                  itemWrapper.setAttribute("class", "itemwrapper3")
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


                  let date = document.createElement("h6")
                  date.setAttribute("class","text-xs   text-blue-600 dark:text-blue")
                  date.textContent = `Booked for ${booking_date}`
                  
                  anchorBody.appendChild(date)

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
                  priceSpan.textContent = `${item_price}`;
                  
                  let addToCartLink = document.createElement("a");
                  addToCartLink.setAttribute("onclick", `removeButton(${cart_id})`);
                  addToCartLink.setAttribute("class", "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800");
                  addToCartLink.textContent = "Remove";
                  
                  let priceContainer = document.createElement("div");
                  priceContainer.setAttribute("class", "flex items-center justify-between");
                  priceContainer.appendChild(priceSpan);
                  priceContainer.appendChild(addToCartLink);
                  body.appendChild(priceContainer);
                  itemWrapper.appendChild(body)
                  display.appendChild(itemWrapper);
        });


}


removeCartButton.addEventListener('click', (e) => {
    e.preventDefault()})

function removeButton(id){
    axios.delete(`${baseURL}/cart/${id}`).then(getReservations()).then(res => {alert('Item has been removed')})
}

//invoking
getReservations()




























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