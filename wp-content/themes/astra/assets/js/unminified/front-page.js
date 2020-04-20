// SEARCH BAR JS
function addrSearch() {
    var inp = document.getElementById("locationInput").value;
    if (!checkInput(inp)) {
        alert("Name can't be empty");
        return false;
    }
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + inp;
    var myArr = httpGet(url);
    //Checking if the location is found from the map
    if (!checkInput(myArr)) {
        alert("This location doesn't exist")
    } else {
        var latLoc = myArr[0].lat;
        var lonLoc = myArr[0].lon;
        document.getElementById("lat").value = latLoc;
        document.getElementById("lon").value = lonLoc;
        enterCoordinates(latLoc, lonLoc)
    }
}

function checkInput(inp) {
    if (inp.length == 0) {
        document.getElementById("locationInput").style.borderColor = "red";
        return false;
    }
    document.getElementById("locationInput").style.borderColor = "";
    return true;
}


//ENTER COORDINATES JS
function enterCoordinates(latitude, longitude) {
    //https://epsg.io/4326
    if (latitude > 90 || latitude < -90) {
        document.getElementById("lat").style.borderColor = "red";
        cleanOutput();
        return false
    } else if (longitude < -180 || longitude > 180) {
        document.getElementById("lon").style.borderColor = "red";
        cleanOutput();
        return false
    } else {
        document.getElementById("badInput").innerHTML = "";
        document.getElementById("lat").style.borderColor = "";
        document.getElementById("lon").style.borderColor = "";
    }
    var valjund = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude;
    updateMap();
    createDiv(httpGet(valjund))
}

function cleanOutput() {
    document.getElementById("badInput").innerHTML = "Inappropriate input";
    document.getElementById("sunrise").innerHTML = "-";
    document.getElementById("sunset").innerHTML = "-";
    document.getElementById("length").innerHTML = "-"
}

function createDiv(responsetext) {
    var split = responsetext.results.day_length.split(":");
    document.getElementById("sunrise").innerHTML = responsetext.results.sunrise;
    document.getElementById("sunset").innerHTML = responsetext.results.sunset;
    document.getElementById("length").innerHTML = split[0] + " hours and " + split[1] + " minutes";
}

function httpGet(theUrl) {
    //This function came from StackOverFlow
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        }
    };
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    return JSON.parse(xmlhttp.responseText);
}


//MAP JS
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


//BETWEEN DATES JS
function checkDate(startDate, endDate) {
    //This function checks if the end date is greater than start date
    //If it is not, then this will be shown
    //If everything is correct, plot will be drawn
    var dateTime1 = new Date(startDate).getTime();
    var dateTime2 = new Date(endDate).getTime();
    var diff = dateTime2 - dateTime1;
    if (diff < 0) {
        alert("endDate must be greater than startDate");
        return false;
    } else {
        var dateList = getDatesRange(startDate, endDate);
        var durationList = findAllLengths(dateList);
        drawNewPlot(dateList, durationList)
    }
}

function parseDayLength(day) {
    var latitude = document.getElementById('lat').value;
    var longitude = document.getElementById('lon').value;
    var url = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + day;
    return httpGet(url).results.day_length;
}

function findAllLengths(dayList) {
    //Finds all day lengths and converts those to minutes
    var dayLength = [];
    for (i = 0; i < dayList.length; i++) {
        var pieces = parseDayLength(dayList[i]).split(":");
        var all = (parseInt(pieces[0]) * 60) + parseInt(pieces[1]) + (parseInt(pieces[2]) / 60);
        dayLength.push(all);
    }
    return dayLength;
}

function getDatesRange(startDate, endDate) {
    //This function finds out all the dates in the range, for example startDate: 20/04/2020, endDate: 22/04/2020
    //Function returns "20/04/2020", "21/04/2020", "22/04/2020"
    //This is needed for requesting day lengths
    var Days = [];
    var dateMove = new Date(startDate);
    var strDate = startDate;

    while (strDate < endDate) {
        var strDate = dateMove.toISOString().slice(0, 10);
        Days.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
    }
    return Days;
}


//CHART JS
function drawNewPlot(dateList, durationList) {
    //Draws net plot by input
    var data = [
        {
            x: dateList,
            y: durationList,
            type: 'scatter'
        }
    ];
    var layout = {
        title: 'Day duration change',
        xaxis: {
            title: 'Dates',
        },
        yaxis: {
            title: 'Length of the day (minutes)',
        }
    };
    Plotly.newPlot('myDiv', data, layout);
}







