
var lon = document.getElementById('lon').value;
var lat = document.getElementById('lat').value;
var mymap = L.map('mapid').setView([lat, lon], 13);
var marker = L.marker([lat, lon]).addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

function onMapClick(e) {
    marker
        .setLatLng(e.latlng)
        .bindPopup("<b>Choosed spot:</b><br>" + e.latlng.toString())
        .openPopup();
    mymap.setView(e.latlng);
    var latMap = e.latlng.lat;
    var lonMap = e.latlng.lng;
    document.getElementById("lat").value = latMap;
    document.getElementById("lon").value = lonMap;
}

mymap.on('click', onMapClick);

function updateMap() {
    lon = document.getElementById('lon').value;
    lat = document.getElementById('lat').value;
    var p = new L.LatLng(lat, lon);
    marker.setLatLng(p);
    mymap.setView(p);
}