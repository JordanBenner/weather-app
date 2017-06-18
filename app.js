var express = require('express');
var app = express();
var apicache = require('apicache');
var cache = apicache.middleware;

var axios = require('axios');
//var pgp=require('pg-promise')();
//var db = pgp(process.env.DATABASE.URL || {database: 'test'})

app.set('view engine', 'hbs');


//app.use(cache('5 minutes'))

app.use('/axios', express.static('node_modules/axios/dist'));
app.use('/static', express.static('public'));
app.get('/', function(request, response){
  response.render('home.hbs', {});
});
var weather = process.env.weather_key
app.get('/api', function (request, response, next) {
  console.log('Generating a new response', request.query.city);
  var config = {
    params: {
      q: request.query.city  || 'Houston,TX',
      appid: '080f7a0f29d490eae948e115f04c145f',
      units: 'imperial'
    }
  };
  axios.get('http://api.openweathermap.org/data/2.5/weather', config).then(function (r) {
    response.json(r.data);
  })
  .catch(next);
});

$(function SetUnits () {
    switch (localStorage.getItem("Units")) {
        case null:
            if (window.navigator.language == "en-US") {
                localStorage.Units = "imperial";
                $("#far").removeClass("inactive");
                $("#far").addClass("active");
            }

            else {
                localStorage.Units = "metric";
                $("#cel").removeClass("inactive");
                $("#cel").addClass("active");
            }

            break;
            case "metric":
            $("#cel").removeClass("inactive");
            $("#cel").addClass("active");
             break;

             case "imperial":
           $("#far").removeClass("inactive");
           $("#far").addClass("active");
           break;
   }
 });
function SetCelsius(){
  localStorage.Units = "metric";
  $("#cel").removeClass("inactive");
  $("#cel").addClass("active");
  $("#far").removeClass("active");
  $("#far").addClass("inactive");
  location.reload();
}

function SetFahrenheit() {
    localStorage.Units = "imperial";
    $("#far").removeClass("inactive");
    $("#far").addClass("active");
    $("#cel").removeClass("active");
    $("#cel").addClass("inactive");
    location.reload();
}
$(function geolocation (){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getcoordinates,showError);
    }
    else {
        $("#weather").html("Geolocation is not supported by this browser.");
    }
});

var PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT);
});
