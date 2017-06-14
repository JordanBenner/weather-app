var express = require('express');
var app = express();
var apicache = require('apicache');
var cache = apicache.middleware;

var axios = require('axios');

app.set('view engine', 'hbs');


//app.use(cache('5 minutes'))

app.use('/axios', express.static('node_modules/axios/dist'));
app.use('/static', express.static('public'));
app.get('/', function(request, response){
  response.render('home.hbs', {});
});

app.get('/api', function (request, response) {
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
  });
});

app.listen(8000, function(){
  console.log('Listening on port 8000');
})
