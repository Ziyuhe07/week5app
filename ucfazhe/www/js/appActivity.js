var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);
L.circle([51.508, -0.11], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
			}).addTo(mymap).bindPopup("I am a circle.");
		
var myPolygon = L.polygon([
						   [51.509, -0.08],
						   [51.503, -0.06],
						   [51.51, -0.047]
			                ],{
								color: 'red',
								fillColor: '#f03',
								fillOpacity: 0.5
								}).addTo(mymap).bindPopup("I am a polygon.");
var geojsonFeature = {
 "type": "Feature",
 "properties": {
 "name": "London",
 "popupContent": "This is where UCL is based"
 },
 "geometry": {
 "type": "Point",
 "coordinates": [-0.118092, 51.509865]
 }
};
L.geoJSON(geojsonFeature).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
var popup = L.popup();
function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent("You clicked the map at " + e.latlng.toString())
.openOn(mymap);
}
mymap.on('click', onMapClick);

document.addEventListener('DOMContentLoaded', function() {
getEarthquakes();
}, false);

function loadEarthquakeData() {
// call the getEarthquakes code
// keep the alert message so that we know something is happening
alert("Loading Earthquakes");
getEarthquakes();
}
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
var client;
// create the code to get the Earthquakes data using an XMLHttpRequest
function getEarthquakes() {
client = new XMLHttpRequest();
client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
client.onreadystatechange = earthquakeResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function earthquakeResponse() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client.readyState == 4) {
// once the data is ready, process the data
var earthquakedata = client.responseText;
loadEarthquakelayer(earthquakedata);
}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadEarthquakelayer(earthquakedata) {
// convert the text to JSON
var earthquakejson = JSON.parse(earthquakedata);
// add the JSON layer onto the map - it will appear using the default icons
earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(earthquakelayer.getBounds());
}
// make sure that there is a variable for the earthquake layer to be referenced by
// this should be GLOBAL – i.e. not inside a function – so that any code can see the variable
var earthquakelayer;
function removeEarthquakeData() {
alert("Earthquake data will be removed");
mymap.removeLayer( earthquakelayer );
}

