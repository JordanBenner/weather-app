$("#submit").click(function(){
  var stock = $("#temp").val();
  var config = {
    params: {
      city: stock
    }
  };
  axios.get('/api', config).then(function (response){
    console.log(response.data);
    var t= document.getElementById('results');
    t.innerHTML = response.data.main.temp;
  });
});
