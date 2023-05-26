// navbar color changes based on active page
const navbarItems = document.querySelectorAll('#navbar-sticky a');



// Get the current HTML file (page) name
var currentHTMLFile = window.location.pathname.split('/').pop();
const baseURL = `http://localhost:5432`;



//callbacks
const errCallback = err => console.log(err.response.data)





// check for page loads;
if(currentHTMLFile === "rentals.html"){
    console.log('Howdy, rentals page just loaded, running script getallprod')
    getAllProducts()

}else if(currentHTMLFile === "about.html"){
    console.log('Howdy, about page just loaded')

}else if(currentHTMLFile === "index.html"){
    console.log('Home page just loaded')
}


