// Initializing variables

var imgCleanSky = "http://source.unsplash.com/collection/320954/";
var imgExtreme = "http://source.unsplash.com/collection/320960/";
var imgClouds = "http://source.unsplash.com/collection/320957/";
var imgSnow = "http://source.unsplash.com/collection/320943/";
var imgRain = "http://source.unsplash.com/collection/320971/";

var imgWeatherCon;

var currectDirection;
var currentDirectionIcon;

var latitude;
var longitude;

var weatherCondIcon;
var mainDesc;
var country;
var degrees;
var tempK;

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var displayDate = day + "/" + month + "/" + year;

var currentTime = new Date().toLocaleTimeString('en-GB', {
	hour: "numeric",
	minute: "numeric"
});


// convert Kelvin to Celsius
function fromKtoC(k) {
	return Math.round(k - 273.15);
}

// convert Kelving to Fahrenheit
function fromKtoF(k) {
	return Math.round(k * 9/5 - 459.67);
}

// calculate wind direction
function direction(deg) {
	var range = 360 / 16;
	var low = 360 - range / 2;
	var high = (low + range) % 360;
	var directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	for( i in directions ) {
		if ( deg >= low && deg < high ) {
			return directions[i];
		}
		low = (low + range) % 360;
		high = (high + range) % 360;
	}
	return "N";
}

// add background image conditionaly based on css rules
function checkSize(){
  if ($(".box").css("max-width") == "500px" ){

		$(".wrapper").css({
			"background": "url('" + imgWeatherCon + "')",
			"background-size": "cover",
			"background-repeat": "no-repeat",
			"background-position": "center center"
		});
  }
}

$(document).ready(function() {

	var $weatherIcon = $("#weather-icon i");
	var $description = $("#description");
	var $city = $("#city span");
	var $degrees = $("#degrees");
	var $degreesSymbol = $("#degrees-symbol");
	var $humidity = $("#humidity");
	var $windDirection = $("#direction");
	var $windDirectionIcon = $(".direction i");
	var $time = $("#time");
	var $timeIcon =$("#time-icon i");
	var $date = $("#date");
	var $btnC = $("#celsius");
	var $btnF = $("#fahrenheit");


	$(".title h1").click(function(){
		$(".box").toggleClass("flip");
	});

	// displaying current date and time
	$time.text(currentTime);
	$date.text(displayDate);

	// converting the temperature and changing the symbol
	$btnC.click(function() {
		$degreesSymbol.html('<i class="wi wi-celsius"></i>');
		$btnF.removeClass("selected");
		$(this).addClass("selected");
		$degrees.html(fromKtoC(tempK));
	});

	$btnF.click(function() {
		$degreesSymbol.html('<i class="wi wi-fahrenheit"></i>');
		$btnC.removeClass("selected");
		$(this).addClass("selected");
		$degrees.html(fromKtoF(tempK));
	});


	// setting the time icon
	$timeIcon.removeClass("wi-time-3");
	switch (currentTime.slice(0,2)) {
		case "01":
		case "13":
			$timeIcon.addClass("wi-time-1");
			break;
		case "02":
		case "14":
			$timeIcon.addClass("wi-time-2");
			break;
		case "03":
		case "15":
			$timeIcon.addClass("wi-time-3");
			break;
		case "04":
		case "16":
			$timeIcon.addClass("wi-time-4");
			break;
		case "05":
		case "17":
			$timeIcon.addClass("wi-time-5");
			break;
		case "06":
		case "18":
			$timeIcon.addClass("wi-time-6");
			break;
		case "07":
		case "19":
			$timeIcon.addClass("wi-time-7");
			break;
		case "08":
		case "20":
			$timeIcon.addClass("wi-time-8");
			break;
		case "09":
		case "21":
			$timeIcon.addClass("wi-time-9");
			break;
		case "10":
		case "22":
			$timeIcon.addClass("wi-time-10");
			break;
		case "11":
		case "23":
			$timeIcon.addClass("wi-time-11");
			break;
		case "00":
		case "12":
			$timeIcon.addClass("wi-time-12");
			break;
		default:
			$timeIcon.addClass("wi-time-3");
	}

	function curPosition(position) {
		latitude = position.coords.latitude;
    longitude = position.coords.longitude;

		var urlOWM = "http://api.openweathermap.org/data/2.5/weather";

		var passData = {
			lon: longitude,
			lat: latitude,
			APPID: "9d4ea1134778d469b9befff5cc5dbae8"
		};

		function postWeatherData(data){
			country = data.sys.country;
			tempK = data.main.temp;
			weatherCondIcon = data.weather[0].icon;
			mainDesc = data.weather[0].main;
			degrees = data.wind.deg;

			var flagUrl = '<img src="http://openweathermap.org/images/flags/';
		 	flagUrl += country.toLowerCase() + ".png" + '">';

			$city.html(flagUrl + " " + data.name);
			$humidity.text(data.main.humidity);
			$description.text(data.weather[0].description);
			currectDirection = direction(degrees);
			currentDirectionIcon = "wi-towards-" + currectDirection.toLowerCase();
			$windDirectionIcon.addClass(currentDirectionIcon);
			$windDirection.text(currectDirection);
			$degrees.text(fromKtoC(tempK));

			// setting the weather icon
			$weatherIcon.removeClass("wi-day-cloudy");
			switch (weatherCondIcon) {
				case "01d":
					$weatherIcon.addClass("wi-day-sunny");
					break;
				case "01n":
					$weatherIcon.addClass("wi-night-clear");
					break;
				case "02d":
					$weatherIcon.addClass("wi-day-cloudy");
					break;
				case "02n":
					$weatherIcon.addClass("wi-night-alt-cloudy");
					break;
				case "03d":
				case "03n":
					$weatherIcon.addClass("wi-cloud");
					break;
				case "04d":
				case "04n":
					$weatherIcon.addClass("wi-cloudy");
					break;
				case "09d":
				case "09n":
					$weatherIcon.addClass("wi-rain");
					break;
				case "10d":
					$weatherIcon.addClass("wi-day-rain");
				break;
				case "10n":
					$weatherIcon.addClass("wi-night-alt-rain");
				break;
				case "11d":
				case "11n":
					$weatherIcon.addClass("wi-thunderstorm");
					break;
				case "13d":
				case "13n":
					$weatherIcon.addClass("wi-snow");
					break;
				case "50d":
				case "50n":
					$weatherIcon.addClass("wi-windy");
					break;
				default:
					$weatherIcon.addClass("wi-na");
			}

			// setting the background image
			switch (mainDesc) {
				case "Thunderstorm":
					imgWeatherCon = imgExtreme;
					break;
				case "Drizzle":
				case "Rain":
					imgWeatherCon = imgRain;
					break;
				case "Snow":
					imgWeatherCon = imgSnow;
					break;
				case "Clouds":
					imgWeatherCon = imgClouds;
					break;
				case "Clear":
					imgWeatherCon = imgCleanSky;
					break;
				case "Extreme":
					imgWeatherCon = imgExtreme;
					break;
				default:
					imgWeatherCon = imgCleanSky;
			}

			// run test on initial page load
			checkSize();
			// run test on resize of the window
			$(window).resize(checkSize);
		}

		$.getJSON(urlOWM, passData, postWeatherData);
	}

	function errorHandler(error) {
		if (error.code == 1) {
			$(".box").html("<h2>Access denied</h2><p>In order to run the Weather app you have to establish a secure connection.</p><p>Add 'https://' before 'codepen.io/....'</p>").addClass("error");
    } else if (error.code == 2) {
				$(".box").html("<h2>Unavailable position</h2>").addClass("error");
    }
	}

	var options = {
		timeout: 6000,
		enableHighAccuracy : true
	};

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(curPosition, errorHandler, options);
		} else {
			$(".box").html("<h2>Your browser doesn't support geolocation</h2>").addClass("error");
		}
	}

	getLocation();

});
