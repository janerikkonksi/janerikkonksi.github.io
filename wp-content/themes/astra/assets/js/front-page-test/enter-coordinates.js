//ENTER COORDINATES JS
function enterCoordinates(latitude, longitude) {
    //https://epsg.io/4326
    if (latitude > 180 || latitude < -180) {
        document.getElementById("lat").style.borderColor = "red";
        cleanOutput();
        return false
    } else if (longitude < -90 || longitude > 90) {
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
    document.getElementById("tõus").innerHTML = "-";
    document.getElementById("langus").innerHTML = "-";
    document.getElementById("pikkus").innerHTML = "-"
}

function createDiv(responsetext) {
    var split = responsetext.results.day_length.split(":");
    document.getElementById("tõus").innerHTML = responsetext.results.sunrise;
    document.getElementById("langus").innerHTML = responsetext.results.sunset;
    document.getElementById("pikkus").innerHTML = split[0] + " hours and " + split[1] + " minutes";
}
