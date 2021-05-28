function getColor(d) {
  return d > 90 ? '#800026' :
         d > 70  ? '#BD0026' :
         d > 50  ? '#feb24c' :
         d > 30  ? '#fbd5a1' :
         d > 10   ? '#ffeda0' : 
                    '#f7fcb9';
}

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Perform a GET request to the query URL
d3.json(url).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);
  console.log(data.features);
  console.log(data.features[0].geometry);
  console.log(data.features[0].geometry.coordinates);
  console.log(data.features[0].geometry.coordinates[0]);
  console.log(data.features[0].geometry.coordinates[1]);

  // Creating our initial map object
  // We set the longitude, latitude, and the starting zoom level
  // This gets inserted into the div with an id of 'map'
  var myMap = L.map("map", {
    center: [35.926, -117.7115],
    zoom: 13
  });

  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/light-v9',
    accessToken: API_KEY
  }).addTo(myMap);

  for (var i = 0; i < data.features.length; i++) {
    var lat = data.features[i].geometry.coordinates[1];
    var lng = data.features[i].geometry.coordinates[0];
    var depth = data.features[i].geometry.coordinates[2];
    var title = data.features[i].properties.title;
    var mag = data.features[i].properties.mag;
    console.log(i, lat, lng, depth, title, mag);
    // var circle = L.circle([lat, lng]).addTo(myMap);
    var circle = L.circle([lat, lng], {
      color: 'black',
      fillColor: getColor(depth),
  
      fillOpacity: 1,
      weight: 0.5,
      radius: mag*20000}).addTo(myMap);
    circle.bindPopup(title);
    // var marker = L.marker([lat, lng]).addTo(myMap);
    // marker.bindPopup(title);
  };

  var legend = L.control({position: 'bottomright'});


  legend.onAdd = function (myMap) {
    var legendDiv =  L.DomUtil.create('div', 'info legend'),
    grades = [-10, 10, 30, 50, 70, 90],
    labels = [];
    for ( var i=0; i < grades.length; i++) {
      labels.push('<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'));
    }
    legendDiv.innerHTML = labels.join('<br>');
    return legendDiv;
  }

  legend.addTo(myMap);
  // var legend = L.control({position: 'bottomright'});  
  //   legend.onAdd = function (map) {

  //     var div = L.DomUtil.create('div', 'info legend'),
  //     grades = [-10, 10, 30, 50, 70, 90],
  //     labels=[];

  //     for (var i = 0; i < grades.length; i++) {
  //       div.innerHTML +=
  //           '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
  //           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  //     }
    
  //     return div;
  //   };
  //   legend.addTo(map);

  

  
});





