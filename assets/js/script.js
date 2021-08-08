//  var select = document.getElementById('type');
//  var option = select.options[select.selectedIndex].value;
 

//var participants = $("#participants").val().trim();
//var participants = document.getElementById('participants').value;
//var urlApi = 'https://www.boredapi.com/api/activity?participants=3';

var apiKey = "538681b1e89e9be05aae483d03e2774a";
var activityArr = [];

var currentCityEl = document.querySelector("#currentCity");
var currentIconEl = document.querySelector("#currentIcon");
var currentTempEl = document.querySelector("#currentTemp");
var currentWindEl = document.querySelector("#currentWind");
var currentHumidityEl = document.querySelector("#currentHumidity");
var currentUVIndexEl = document.querySelector("#currentUVIndex");
var futureForecastEl = document.querySelector("#futureForecast");

$(".btn").click(function (event) {

  var type = document.getElementById("type").value;
  var price = document.getElementById("price").value;
  var accessibility = document.getElementById("accessibility").value;
  var participants = document.getElementById("participants").value;
  console.log(price);

  var urlApi = 'https://www.boredapi.com/api/activity?';


  if (price!== 'Choose Price Level'){
      urlApi+='&price='+price;
  }

  if (type!=='Choose Type'){
      urlApi+='&type='+type;
  }

  if (accessibility!=='Choose Accessibility Level'){
      urlApi+='&accesibility='+accessibility;
  }
    
  if (participants!=='Choose Number of Participants'){
      urlApi+='&participants='+participants;
  }



  fetch(urlApi)
    .then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        var activityGen = document.getElementById('activity');
        activityGen.textContent = data.activity;
        activityArr.push(data.activity);
        localStorage.setItem("boredActivities", JSON.stringify(activityArr));
        activityArr = JSON.parse(localStorage.getItem("boredActivities"));
        });
    });
});



$(".modal-button").click(function() {
  var target = $(this).data("target");
  $("html").addClass("is-clipped");
  $(target).addClass("is-active");

  for (let i = 0; i < activityArr.length; i++) {
    var activityHistory=document.getElementById('history');
    var previousActivity=document.createElement("li");
    previousActivity.className = "task";
    previousActivity.innerHTML = activityArr[i];
    
    activityHistory.appendChild(previousActivity);
  }
});

var getCurrentCity = function(lat, lon) {
  var apiURL = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=5&appid=" + apiKey;

  fetch(apiURL).then(function(response){
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayCity(data);
        // displayFutureForecast(data);
      });
    }
  }).catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to OpenWeatherMap");
  });

};

var displayCity = function(city){
  var currentDate = moment();

  // check if api returned any forecast
  if (city.length === 0) {
    currentCityEl.textContent = "No Weather Forecast";
    return;
  }

  currentCityEl.textContent = city[0].name + ", " + city[0].country + currentDate.format(" (M/D/YYYY)");
};

var getCurrentWeather = function(lat, lon) {
  var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;

  fetch(apiURL).then(function(response){
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayForecast(data);
        // displayFutureForecast(data);
      });
    }
  }).catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to OpenWeatherMap");
  });

};

var displayForecast =  function(forecast) {

    // check if api returned any forecast
    if (forecast.length === 0) {
      currentIconEl.setAttribute("src", "");
      currentTempEl.textContent = "";
      currentWindEl.textContent = "";
      currentHumidityEl.textContent = "";
      currentUVIndexEl.textContent = "";
      return;
    }

    // display current forecast
    currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/"+ forecast.current.weather[0].icon +"@2x.png");
    currentTempEl.textContent = forecast.current.temp + " °C";
    currentWindEl.textContent = forecast.current.wind_speed + " m/s";
    currentHumidityEl.textContent = forecast.current.humidity + "%";
    currentUVIndexEl.textContent = forecast.current.uvi;

    // assign class according to UV Index
    if (currentUVIndexEl.textContent < 3 && currentUVIndexEl.textContent >= 0) {
      currentUVIndexEl.classList = "favorable";
    } else if (currentUVIndexEl.textContent < 6 && currentUVIndexEl.textContent >= 3) {
      currentUVIndexEl.classList = "moderate";
    } else if (currentUVIndexEl.textContent >= 6) {
      currentUVIndexEl.classList = "severe";
    } 
};

// var displayFutureForecast = function(futureForecast){
//   var currentDate = moment();

//   while (futureForecastEl.lastChild) {
//       futureForecastEl.removeChild(futureForecastEl.lastChild);
//   }

//   // loop through five days
//   for (var i = 1; i < 6; i++){
//     // create container
//     var forecastEl = document.createElement("div");
//     forecastEl.classList = "forecast is-full";

//     // create date element
//     var dateEl = document.createElement("p");
//     dateEl.classList = "forecast-content pb-0";
//     dateEl.textContent = currentDate.add(i, 'd').format("(M/D/YYYY)");

//     // append date element to container
//     forecastEl.appendChild(dateEl);

//     // create weather icon element
//     var iconEl = document.createElement("img");
//     iconEl.classList = "forecast-content pb-0";
//     iconEl.setAttribute("src", "http://openweathermap.org/img/wn/"+ futureForecast.daily[i].weather[0].icon +"@2x.png");

//     // append weather icon element to container
//     forecastEl.appendChild(iconEl);

//     // create temperature element
//     var tempEl = document.createElement("p");
//     tempEl.classList = "forecast-content";
//     tempEl.textContent = "Temp: " + futureForecast.daily[i].temp.day;

//     // append temperature element to container
//     forecastEl.appendChild(tempEl);

//     // create wind speed element
//     var windEl = document.createElement("p");
//     windEl.classList = "forecast-content";
//     windEl.textContent = "Wind: " + futureForecast.daily[i].wind_speed;
    
//     // append wind speed element to container
//     forecastEl.appendChild(windEl);

//     // create humidity element
//     var humidityEl = document.createElement("p");
//     humidityEl.classList = "forecast-content";
//     humidityEl.textContent = "Humidity: " + futureForecast.daily[i].humidity;
    
//     // append humidity element to container
//     forecastEl.appendChild(humidityEl);

//     // append container to five-day forecast element
//     futureForecastEl.appendChild(forecastEl);
//   }
// };

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getCurrentWeather(position.coords.latitude, position.coords.longitude);
      getCurrentCity(position.coords.latitude, position.coords.longitude);
    });
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();
