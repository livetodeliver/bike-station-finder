function findStations() {
    // This function will zoom in to map based on submitted address or location.
}; 

function returnBike() {
    // This function will filter markers to only display stations with open docks
    // Eventlistener toggle click/check (submit does not need to be pressed)
    if ((document.getElementById("bike-return").checked = true) && (docksAvailable === 0)) {
        for (var i = 0; i < features.length; i++)
          map.data.remove(features[i]);
    }
};

function getBike() {
     // This function will filter markers to only display stations with available bikes
    // Eventlistener toggle click/check (submit does not need to be pressed)
    if ((document.getElementById("bike-get").checked = true) && (bikesAvailable === 0)) {
        for (var i = 0; i < features.length; i++)
          map.data.remove(features[i]);
    } 
};





  
   /* let getBike = document.querySelector("#bike-get");
    let returnBike = document.querySelector("#bike-return")

    getBike.addEventListener( 'change', function() {
        if(this.checked) {
            
        
    };


    returnBike.addEventListener( 'change', function() {
        if(this.checked) {
            // Checkbox is checked..
        } */

    // This function will filter markers to only display stations with available bikes
    // Eventlistener toggle click/check (submit does not need to be pressed)



function getWeather() {
    // This function called the Open Weather Map API to display weather of address.
}

function weatherAlert() {
    // This function display a weather alert for hazardous conditions
} 


function initMap() {

    // Creates map and centers it on Philadelphia
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 39.95378,
            lng: -75.16374
        }
    });

    // Adds bike route layer to map
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    // Event listener for closing the infowindow
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

    // Sets map market icons to cycling icon
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

}  
