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