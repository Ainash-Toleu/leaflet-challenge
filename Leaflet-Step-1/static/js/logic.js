

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
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  // Create a new marker
  // Pass in some initial options, and then add it to the map using the addTo method
  var marker = L.marker([data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]], {
    draggable: true,
    title: "Earthquake"
  }).addTo(myMap);

  // Binding a pop-up to our marker
  marker.bindPopup(data.features[0].properties.title);

});





