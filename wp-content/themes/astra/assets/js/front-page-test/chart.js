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

