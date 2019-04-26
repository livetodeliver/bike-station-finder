//'use strict';
const weatherKey = config.WEATHER_KEY;

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

}

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
}

//WEATHER 

// This function calls the Open Weather Map API to get current weather information.
function getWeather(cityID) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + weatherKey)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            drawWeather(data);
        })
        .catch(function () {
            // catch any errors
        });
}

//This function displays the current weather
function drawWeather(d) {

    const hazardId = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 501, 502, 503, 504, 511, 520, 521, 522, 531, 600, 601, 602, 611, 612, 813, 615, 616, 620, 621, 622, 781];

    //This function should check the hazCond array to see if any of the values match the current weather id value. 
    //If any hazCond values matches the current weather Id, an alert should be displayed in the #warning section

    let found = hazardId.find(function (element) {
        return element == d.weather[0].id;
    });
    if (found == d.weather[0].id) {
        document.getElementById('warning').style.display = "block";
    };
    console.log(found);
    console.log(hazardId);

    let fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
    let description = d.weather[0].description;
    let weatherIcon = '<img src="http://openweathermap.org/img/w/' + d.weather[0].icon + '.png"/>';


    document.getElementById('location').innerHTML = d.name;
    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;F';
    document.getElementById('icon').innerHTML = weatherIcon;
}

window.onload = function () {
    getWeather(4560349);
}


//MAP

function initMap() {

    // Creates map and centers it on Philadelphia

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 39.95378,
            lng: -75.16374
        }
    });

    let geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
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
    let infowindow = new google.maps.InfoWindow();

    map.data.addListener('click', function (event) {
        var stationName = event.feature.getProperty("name");
        var stationAddress = event.feature.getProperty("addressStreet");
        var bikesAvailable = event.feature.getProperty("bikesAvailable");
        var docksAvailable = event.feature.getProperty("docksAvailable");
        infowindow.setContent("<div style='width:150px; font-size:14px'> <span style='font-weight: bold; font-style: italic; font-size:18px'>"+ stationName + 
        "</span><br>" + stationAddress + 
        "<p> <span style='font-weight: bolder'>Bikes Available: " + bikesAvailable + "<br>Open Docks: " + docksAvailable + "<s/pan></div>");
        infowindow.setPosition(event.feature.getGeometry().get());
        infowindow.setOptions({
            pixelOffset: new google.maps.Size(0, -30)
        });
        infowindow.open(map);
    });

    // Loads GeoJSON data from Indego 
    map.data.loadGeoJson('https://www.rideindego.com/stations/json/');

    //google.maps.event.addDomListener(window, 'load', initMap);
}

//ADDRESS BAR INPUT & GEOCODER
function geocodeAddress(geocoder, resultsMap) {

    let address = document.getElementById('address-box').value;

    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(15);

            marker = new google.maps.Marker({
                map: resultsMap,
                draggable: true,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                },
                animation: google.maps.Animation.DROP,
                position: results[0].geometry.location,
            });
            marker.addListener('click', toggleBounce);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        };
    });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    };
}