function initMap() {
    var infowindow = new google.maps.InfoWindow();
    features=[];
    function gotoFeature(featureNum) {
        var feature = map.data.getFeatureById(features[featureNum].getId());
        if (!!feature) google.maps.event.trigger(feature, 'changeto', {feature: feature});
        else alert('feature not found!');
    }
 
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 39.95378, lng: -75.16374}
  });
    google.maps.event.addListener(map,'click',function() {
        infowindow.close();
    });
    map.data.setStyle({
        icon: './cycling.png',
        clickable: true,
      });
  var featureId = 0;
  google.maps.event.addListener(map.data,'addfeature',function(e){
      if(e.feature.getGeometry().getType()==='Polygon'){
          features.push(e.feature);
          var bounds=new google.maps.LatLngBounds();
          
          e.feature.getGeometry().getArray().forEach(function(path){
          
             path.getArray().forEach(function(latLng){bounds.extend(latLng);})
          
          });
          e.feature.setProperty('bounds',bounds);
          e.feature.setProperty('featureNum',features.length-1);
        }
  });
  // When the user clicks, open an infowindow
  map.data.addListener('click', function(event) {
          var stationName = event.feature.getProperty("name");
          var stationAddress = event.feature.getProperty("addressStreet");
          var bikesAvailable = event.feature.getProperty("bikesAvailable");
          var docksAvailable = event.feature.getProperty("docksAvailable");
      infowindow.setContent("<div style='width:150px; text-align: center;'>"+stationName+" <p> "+stationAddress+" <p> <span>Bikes Available: "+bikesAvailable+" </span><br><span>Open Docks: "+docksAvailable+"<span></div>");
          infowindow.setPosition(event.feature.getGeometry().get());
      infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
          infowindow.open(map);
  });    
   map.data.loadGeoJson(
      'https://www.rideindego.com/stations/json/');
  
      google.maps.event.addDomListener(window, 'load', initMap);
}





/*var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.95378,
            lng: -75.16374
        },
        zoom: 12
    });

  map.data.loadGeoJson(
      'https://www.rideindego.com/stations/json/');
      console.log(map.data);

      map.data.setStyle({
        icon: './cycling.png',
        clickable: true,
      });

      var infowindow = new google.maps.InfoWindow({
          addressStreet,
            bikesAvailable,
          docksAvailable,
      });

      var marker = new google.maps.Marker({
        map: map,
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
}
*/



