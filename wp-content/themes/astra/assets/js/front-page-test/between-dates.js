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