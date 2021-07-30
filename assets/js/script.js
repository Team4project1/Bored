 var select = document.getElementById('type');
 var option = select.options[select.selectedIndex].value;
 

//var participants = $("#participants").val().trim();
//var participants = document.getElementById('participants').value;
console.log(option);
//var type = document.getElementById("type").value;
//var urlApi = 'https://www.boredapi.com/api/activity?participants=3';
var urlApi = 'https://www.boredapi.com/api/activity?type=' + option + "&key=5881028";

$(".btn").click(function (event) {

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