// I am presented with the last searched city forecast

var cities = [];

var weatherContainerElement=document.getElementById("today_details_container");
var citySearchInputElement = document.getElementById("searched_city_name");
var forecastContainerEl = document.getElementById("fiveday_container");
var pastSearchButtonEl = document.getElementById("past_search_buttons");
var cityInputElement=document.getElementById("search_bar_text");


function clickSearch(event){
    // event.preventDefault();
    var city = cityInputElement.value.trim()
    ;
    if(city){
        getWeatherDetails(city);
        get5Day(city);
        cities.unshift({city});
        cityInputElement.value = "";
    } else{
        cityInputElement.textContent = "";
    }
    saveSearch();
    pastSearch(city);
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getWeatherDetails = function(city){
    var apiKey = "5986f3d444acf96a8c10d153f67f792b"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, city){
   //clear old content
   weatherContainerElement.textContent= "";  

   //console.log(weather);

//    create date element
   var currentDate = document.createElement("span")
   currentDate.textContent= weather.timezone;




   //create an image element
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

   citySearchInputElement.appendChild(weatherIcon);

   //create a span element to hold temperature data
   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °C";
  
   //create a span element to hold Humidity data
   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";

   //create a span element to hold Wind data
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   weatherContainerElement.append(cityInputElement.value)
   // apend to container
   weatherContainerElement.appendChild(currentDate);
    //append to container
   weatherContainerElement.appendChild(weatherIcon);
   //append to container
   weatherContainerElement.appendChild(temperatureEl);

   //append to container
   weatherContainerElement.appendChild(humidityEl);

   //append to container
   weatherContainerElement.appendChild(windSpeedEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var apiKey = "5986f3d444acf96a8c10d153f67f792b"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}
 
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainerElement.appendChild(uvIndexEl);
}

var get5Day = function(city){
    var apiKey = "5986f3d444acf96a8c10d153f67f792b"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

var forecastTitleElement = document.getElementById("forecast_title");
forecastTitleElement.textContent = "5-Day Forecast:";

var display5Day = function(weather){

    forecastContainerEl.textContent = ""


    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");


       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

var pastSearch = function(pastSearch){
 
    // console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;

    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getWeatherDetails(city);
        get5Day(city);
    }pastSearchHandler
}

// pastSearch();

pastSearchButtonEl.addEventListener("click", );


// search for a city

//presented with current and future conditions for that city
//city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// UV index shows presented with a color that indicates whether the conditions are favorable, moderate, or severe
// future weather conditions for that city
// presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// city is added to the search history