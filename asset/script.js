// I am presented with the last searched city forecast

var apiKey = "5986f3d444acf96a8c10d153f67f792b";
var currentDay = moment("LL")
var cityList = [];

// call function for current condition
function todayWeather () {

    var callURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.fetch(callURL) 
        .then(response)
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
    
        
}
// click function
var cityName;
var cityList = [];
function clickSearch() {
    // if (!city || "") {return}

    saveHistory()
}

function saveHistory() {
    var searchText = document.getElementById("search_bar");
    var searchTextJson = JSON.stringify(searchText);
    var inputArr = localStorage.setItem(cityName, searchTextJson);

    for(let i=o; i <inputArr.length; i++) {
        
        var listItem = document.createElement(li)



    }
}


// search for a city

//presented with current and future conditions for that city
//city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// UV index shows presented with a color that indicates whether the conditions are favorable, moderate, or severe
// future weather conditions for that city
// presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// city is added to the search history