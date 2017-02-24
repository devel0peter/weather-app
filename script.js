//Get user's location via IP and create url for weather API

var unit = ' &deg;C';
var getLocation = function (data) {
    var lat = data.lat;
    var lon = data.lon;
    $('.location').html(data.city + ", " + data.countryCode);

    //URL for the weather API
    url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=762d8c2477d864e811878f44c0934ccc' + '&units=';
    

    //Get weather data and display it
    getWeather = function (data) {
        $('.temperature').html(Math.floor(data.main.temp) + unit);
        $('.description').html(data.weather[0].description);

        //Change the icon accordingly
        switch ((data.weather[0].main).toLowerCase()) {
        case 'clear sky':
            $('#icon').addClass('ion-ios-sunny-outline');
            break;
        case 'few clouds':
            $('#icon').addClass('ion-ios-partlysunny-outline');
            break;
        case 'clouds':
        case 'scattered clouds':
        case 'broken clouds':
            $('#icon').addClass('ion-ios-cloudy-outline');
            break;
        case 'shower rain':
        case 'rain':
            $('#icon').addClass('ion-ios-rainy-outline');
            break;
        case 'thunderstorm':
            $('#icon').addClass('ion-ios-thunderstorm-outline');
            break;
        case 'snow':
            $('#icon').addClass('ion-ios-snowy-outline');
            break;
        case 'snow':
        case 'mist':
            $('#icon').addClass('ion-ios-snowy-outline');git 
            break;
        }
    };

    //Calling getweather API
    $.getJSON(url + 'metric', getWeather, 'jsonp');
};

//When the document is loaded, call the location API, which calls the weather API
$(document).ready(function () {
    $.getJSON('http://ip-api.com/json', getLocation, 'jsonp');

    //Function to change between celsius and fahrenheit
    $('#fahrenheit').click(function () {
        $(this).addClass('active');
        $('#celsius').removeClass('active');
        unit = ' &deg;F';
        $.getJSON(url + 'imperial', getWeather, 'jsonp');

    });
    $('#celsius').click(function () {
        $(this).addClass('active');
        $('#fahrenheit').removeClass('active');
        unit = ' &deg;C';
        $.getJSON(url + 'metric', getWeather, 'jsonp');
    });
});