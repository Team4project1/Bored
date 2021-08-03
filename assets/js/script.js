//  var select = document.getElementById('type');
//  var option = select.options[select.selectedIndex].value;
 

//var participants = $("#participants").val().trim();
//var participants = document.getElementById('participants').value;
//var urlApi = 'https://www.boredapi.com/api/activity?participants=3';

$(".btn").click(function (event) {

  var type = document.getElementById("type").value;
  var price = document.getElementById("price").value;
  var accessibility = document.getElementById("accessibility").value;
  var participants = document.getElementById("participants").value;
  console.log(price);

  var urlApi = 'https://www.boredapi.com/api/activity?';


  if (price!== 'Select dropdown'){
      urlApi+='&price='+price;
  }

  if (type!=='Select dropdown'){
      urlApi+='&type='+type;
  }

  if (accessibility!=='Select dropdown'){
      urlApi+='&accesibility='+accessibility;
  }
    
  if (participants!=='Select dropdown'){
      urlApi+='&participants='+participants;
  }



  fetch(urlApi)
    .then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        var activityGen = document.getElementById('activity');
        activityGen.textContent=data.activity;
        });
    //});
    // .then(function(data) {
    //   console.log(data);
    
    //   $(".activity").text(data.activity);

    
    
    
    });
  })