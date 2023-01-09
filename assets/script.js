const apiKey = "ac7437e88584ea0f43a5fd5d0443bd26"

$('form').submit(function(event) {
  event.preventDefault();
  $('#weather-display').empty();
  var city = $('input').val();
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast',
    data: {
      q: city,
      appid: apiKey,
      units: `imperial`
    },
    success: function(response) {
      var forecastDays = [];
      for (var i = 0; i < response.list.length; i++) {
       var forecast = response.list[i];
        var forecastDate = new Date(forecast.dt * 1000);
        var existingForecast = forecastDays.find(function(day) {
          return day.date.getDate() === forecastDate.getDate();
        });
        if (existingForecast) {
          existingForecast.forecasts.push(forecast);
        } else {
          forecastDays.push({
            date: forecastDate,
            forecasts: [forecast]
          });
        }
      }
      forecastDays.forEach(function(day) {
        var container = $('<div>').addClass('card mb-3 bg-info-subtle w-25');
        var header = $('<div>').addClass('card-header').text(day.date.toDateString());
        var body = $('<div>').addClass('card-body');
        container.append(header, body);
        day.forecasts.forEach(function(forecast) {
         var forecastContainer = $('<div>').addClass('d-flex align-items-center mb-2');
           var icon = $('<i>').addClass('wi wi-owm-' + forecast.weather[0].id);
           var text = $('<div>').addClass('ml-3');
            text.append(`<p>${forecast.weather[0].description}</p>`);
            text.append(`<p> ${forecast.main.temp} °F</p>`);
           text.append(`<p>feels like ${forecast.main.feels_like}'°F</p>`)
           text.append(`<p> humidity will be ${forecast.main.humidity}% </p>`)
           forecastContainer.append(icon, text);
          body.append(forecastContainer);
        });
        $('#weather-display').append(container);
 });
    }
  });
});

$('.city-button').click(function() {
  $('#current-weather-container').empty();
  $('#weather-display').empty();
  var city = $(this).data('city');
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast',
    data: {
      q: city,
      appid: apiKey,
      units: `imperial`
    },
    success: function(response) {
      var forecastDays = [];
 for (var i = 0; i < response.list.length; i++) {
  var forecast = response.list[i];
   var forecastDate = new Date(forecast.dt * 1000);
   var existingForecast = forecastDays.find(function(day) {
     return day.date.getDate() === forecastDate.getDate();
   });
   if (existingForecast) {
     existingForecast.forecasts.push(forecast);
   } else {
     forecastDays.push({
       date: forecastDate,
       forecasts: [forecast]
     });
   }
 }
 forecastDays.forEach(function(day) {
   var container = $('<div>').addClass('card mb-3 bg-info-subtle w-25');
   var header = $('<div>').addClass('card-header').text(day.date.toDateString());
   var body = $('<div>').addClass('card-body');
   container.append(header, body);
   day.forecasts.forEach(function(forecast) {
    var forecastContainer = $('<div>').addClass('d-flex align-items-center mb-2');
      var icon = $('<i>').addClass('wi wi-owm-' + forecast.weather[0].id);
      var text = $('<div>').addClass('ml-3');
       text.append(`<p>${forecast.weather[0].description}</p>`);
       text.append(`<p> ${forecast.main.temp} °F</p>`);
      text.append(`<p>feels like ${forecast.main.feels_like}'°F</p>`)
      text.append(`<p> humidity will be ${forecast.main.humidity}% </p>`)
      forecastContainer.append(icon, text);
     body.append(forecastContainer);
   });
   $('#weather-display').append(container);
 });
    }
  });
});
