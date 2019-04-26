'use strict';

const weatherKey = config.WEATHER_KEY;

function returnBike() {
    // This function will filter markers to only display stations with open docks
}

function getBike() {
    // This function will filter markers to only display stations with available bikes
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
    // If console.log(found) returns 'undefined' there should not be a weather alert, 
    //if it returns as 'true' weather alert should be seen. 
    console.log(found);
    console.log(hazardId);

    const fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
    const description = d.weather[0].description;
    const weatherIcon = '<img src="http://openweathermap.org/img/w/' + d.weather[0].icon + '.png"/>';


    document.getElementById('location').innerHTML = d.name;
    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;F';
    document.getElementById('icon').innerHTML = weatherIcon;
}

window.onload = function () {
    getWeather(4560349);
}


//MAP

function initMap() {

    /* Creates map and centers it on Philadelphia
    This function also includes marker styling, the addition of a bike route layer to the map, 
    and the creation and content for the infowindow */

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 39.95378,
            lng: -75.16374
        }
    });

    const geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });

    // Adds bike route layer to map
    const bikeLayer = new google.maps.BicyclingLayer();
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
        const stationName = event.feature.getProperty("name");
        const stationAddress = event.feature.getProperty("addressStreet");
        const bikesAvailable = event.feature.getProperty("bikesAvailable");
        const docksAvailable = event.feature.getProperty("docksAvailable");
        infowindow.setContent("<div style='width:150px; font-size:14px'> <span style='font-weight: bold; font-style: italic; font-size:18px'>" + stationName +
            "</span><br>" + stationAddress +
            "<p> <span style='font-weight: bolder'>Bikes Available: " 
            + bikesAvailable + "<br>Open Docks: " + docksAvailable +
            "</span></div>");
        infowindow.setPosition(event.feature.getGeometry().get());
        infowindow.setOptions({
            pixelOffset: new google.maps.Size(0, -30)
        });
        infowindow.open(map);
    });

    // Loads GeoJSON data onto map from Indego 
    map.data.loadGeoJson('https://www.rideindego.com/stations/json/');
}


//ADDRESS BAR INPUT & GEOCODER

/* This function connects with the address bar input to geocode the given location, 
zoom the the location area, and creates a bouncing toggle marker for the given location. */

function geocodeAddress(geocoder, resultsMap) {

    const address = document.getElementById('address-box').value;

    geocoder.geocode({
        'address': address
    }, function (results, status) {

        // Creates marker
        let marker = new google.maps.Marker({
            map: resultsMap,
            draggable: true,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            },
            animation: google.maps.Animation.DROP,
            position: results[0].geometry.location,
        });

        // Creates toggle and animation for marker
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                return marker.setAnimation(null);
            } else {
                return marker.setAnimation(google.maps.Animation.BOUNCE);
            };
        }
        marker.addListener('click', toggleBounce)

        // If geocode is successful, causes map to zoom in on location, if not returns an error alert
        if (status === 'OK') {
            return resultsMap.setCenter(results[0].geometry.location),
                resultsMap.setZoom(15);
        } else {
            return alert('Geocode was not successful for the following reason: ' + status);
        };
    });

}