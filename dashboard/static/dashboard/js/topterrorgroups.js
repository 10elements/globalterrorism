$(function(){
    Highcharts.chart('top_terror_groups', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Top 10 Terror Groups'
    },
    subtitle: {
        text: 'Source: Global Terrorism Database'
    },
    xAxis: {
        categories: [
            'Taliban',
            'Shining Path',
            'FMLN',
            'ISIS',
            'IRA',
            'FARC',
            'NPA',
            'Al-Shabaab',
            'ETA',
            'BokoHaram'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Attacks'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{Terror Attacks}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Terror Group',
        data: [5502, 4548, 3351, 2833, 2670, 2474, 2241, 2127, 2014, 1839]

    },]
});

});
