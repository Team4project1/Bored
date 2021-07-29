fetch(
    'http://www.boredapi.com/api/activity?key=5881028'
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });