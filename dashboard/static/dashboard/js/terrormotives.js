
$(document).ready(function () {

    // Build the chart
    Highcharts.chart('terror_motives', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Attack Motivations'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Motivations',
            colorByPoint: true,
            data: [{
                name: 'Religious',
                y: 56.33
            }, {
                name: 'Political',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Economic',
                y: 10.38
            }, {
                name: 'Social',
                y: 5.88
            }]
        }]
    });
});