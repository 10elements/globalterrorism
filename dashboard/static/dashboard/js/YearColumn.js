var attacks_per_year_chart;

var requestAll = function(){
    $.getJSON('attacksyearly/', function(data){
        attacks_per_year_chart.series[0].setData(data);
    });
};
$(function() {
    var data = [];
    for (let i = 1970; i < 2016; i++) {
        data.push(Math.round(Math.random() * 1000));
    }
    attacks_per_year_chart = Highcharts.chart('YearColumn', {
        chart: {
            type: 'column',
            events: {
                load: requestAll
            }
        },
        title: {
            text: 'Number of Yearly Terror Attacks'
        },
        subtitle: {
            text: 'Source: Global Terrorism Database'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Attacks'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
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
            name: 'Attacks',
            data: [],
            pointStart: 1970,
            pointInterval: 1
        }, ]
    });
});