//  var select = document.getElementById('type');
//  var option = select.options[select.selectedIndex].value;
 

//var participants = $("#participants").val().trim();
//var participants = document.getElementById('participants').value;
//var urlApi = 'https://www.boredapi.com/api/activity?participants=3';

$(".btn").click(function (event) {

  var type = document.getElementById("type").value;
  var urlApi = 'https://www.boredapi.com/api/activity?type=' + type;

  fetch(urlApi)
    .then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        });
    //});
    // .then(function(data) {
    //   console.log(data);
    
    //   $(".activity").text(data.activity);

    
    
    
    });
  })