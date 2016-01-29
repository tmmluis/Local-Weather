$(document).ready(function() {

      // Get location information.
      $.getJSON("http://ip-api.com/json", function(data) {
        var city = data.city;
        var country = data.country;
        $("#location").text(city + ", " + country);

        // Building the request url.
        var domain = "https://query.yahooapis.com/v1/public/yql?q=";
        var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"" + city + "\"" + ")";
        var parameters = "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
        var url = domain + query + parameters;

        // Get weather information.
        $.getJSON(url, function(weatherData) {
          var temperature = Number(weatherData.query.results.channel.item.condition.temp);
          var celsius = (temperature - 32) * (5/9);
          $("#temperature").text(Math.round(celsius) + "°C");
          var weather = weatherData.query.results.channel.item.condition.text;
          $("#weather").text(weather);

          // Setting the icon based on condition codes.
          var conditionCode =  Number(weatherData.query.results.channel.item.condition.code);
          switch (conditionCode) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
              $("#weatherIcon").addClass("thunder");
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
              $("#weatherIcon").addClass("rainy");
              break;
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
              $("#weatherIcon").addClass("snowy");
              break;
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
              $("#weatherIcon").addClass("cloudy");
              break;
            case 31:
              $("#weatherIcon").addClass("clear-night");
              break;
            case 32:
              $("#weatherIcon").addClass("clear-day");
              break;
            case 33:
              $("#weatherIcon").addClass("clear-night");
              break;
            case 34:
              $("#weatherIcon").addClass("clear-day");
              break;
            case 35:
              $("#weatherIcon").addClass("rainy");
              break;
            case 36:
              $("#weatherIcon").addClass("clear-day");
              break;
            case 37:
            case 38:
            case 39:
              $("#weatherIcon").addClass("thunder");
              break;
            case 40:
              $("#weatherIcon").addClass("rainy");
              break;
            case 41:
            case 42:
            case 43:
              $("#weatherIcon").addClass("snowy");
              break;
            case 44:
            case 45:
            case 46:
            case 47:
              $("#weatherIcon").addClass("rainy");
              break;
            case 3200: // not available, do nothing.
          }
        });

      });
});
