//'use strict';

function returnBike() {
    // This function will filter markers to only display stations with open docks
    // Eventlistener toggle click/check (submit does not need to be pressed)
    /*if ((document.getElementById("bike-return").checked = true) && (docksAvailable === 0)) {
        for (var i = 0; i < features.length; i++)
          map.data.remove(features[i]);

          returnBike.addEventListener( 'change', function() {
            if(this.checked) {
                // Checkbox is checked..
            } */
    
};

function getBike() {
     // This function will filter markers to only display stations with available bikes
    // Eventlistener toggle click/check (submit does not need to be pressed)
   /*if ((document.getElementById("bike-get").checked = true) && (bikesAvailable === 0)) {
        for (var i = 0; i < features.length; i++)
          map.data.remove(features[i]);

          let getBike = document.querySelector("#bike-get");
    let returnBike = document.querySelector("#bike-return")

    getBike.addEventListener( 'change', function() {
        if(this.checked) {
            
        
    };
    } */
};


    // This function called the Open Weather Map API to display weather of address.
function getWeather( cityID ) {
        const key = '5a4c2852796dfbb1add54c9a1eeb93b4';
        fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
          drawWeather(data);
        })
        .catch(function() {
          // catch any errors
        });
      }
      function drawWeather( d ) {
        var celcius = Math.round(parseFloat(d.main.temp)-273.15);
        var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
        var description = d.weather[0].description;
        var weatherIcon = '<img src="http://openweathermap.org/img/w/' + d.weather[0].icon + '.png"/>'

        console.log(d.weather[0].icon);
        console.log(weatherIcon);

        document.getElementById('location').innerHTML = d.name;
        document.getElementById('description').innerHTML = d.weather[0].description;
        document.getElementById('temp').innerHTML = fahrenheit + '&deg;F';
        document.getElementById('icon').innerHTML = weatherIcon;

        if( description.indexOf('rain') > 0 ) {
            document.weather.id = 'rainy';
        } else if( description.indexOf('cloud') > 0 ) {
            document.weather.id = 'cloudy';
        } else if( description.indexOf('sunny') > 0 ) {
            document.weather.id = 'sunny';
        }
    }
      
      window.onload = function() {
        getWeather( 4560349 );
      }


function weatherAlert() {
    // This function display a weather alert for hazardous conditions
} 




function initMap() {

    // Creates map and centers it on Philadelphia

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 39.95378,
            lng: -75.16374
        }
    });

    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });

    // Adds bike route layer to map
    let bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    // Event listener for closing the infowindow
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

    // Sets map marker icons to cycling icon
    map.data.setStyle({
        icon: './cycling.png',
        clickable: true,
    });

    // When the user clicks, open an infowindow
    var infowindow = new google.maps.InfoWindow();

    map.data.addListener('click', function (event) {
        var stationName = event.feature.getProperty("name");
        var stationAddress = event.feature.getProperty("addressStreet");
        var bikesAvailable = event.feature.getProperty("bikesAvailable");
        var docksAvailable = event.feature.getProperty("docksAvailable");
        infowindow.setContent("<div style='width:150px; text-align: center;'>" + stationName + " <p> " + stationAddress + " <p> <span>Bikes Available: " + bikesAvailable + " </span><br><span>Open Docks: " + docksAvailable + "<span></div>");
        infowindow.setPosition(event.feature.getGeometry().get());
        infowindow.setOptions({
            pixelOffset: new google.maps.Size(0, -30)
        });
        infowindow.open(map);
    });

      // Loads GeoJSON data from Indego 
    map.data.loadGeoJson('https://www.rideindego.com/stations/json/');

    google.maps.event.addDomListener(window, 'load', initMap);
}; 

function geocodeAddress(geocoder, resultsMap) {
    
    var address = document.getElementById('address-box').value;
   // debugger;
console.log('HIIIIIII EVERYONE');



geocoder.geocode({'address': address}, function(results, status) {
  if (status === 'OK') {
    resultsMap.setCenter(results[0].geometry.location);
    resultsMap.setZoom(15);
    
     marker = new google.maps.Marker({
      map: resultsMap,
      draggable: true,
      icon: {
    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
          animation: google.maps.Animation.DROP,
      position: results[0].geometry.location,
    });
    marker.addListener('click', toggleBounce);
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});

}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  
   
 
   

    
