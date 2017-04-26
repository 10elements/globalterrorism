// map of attacks
var attacks_map;

// chart of yearly attacks
var attacks_per_year_chart;

// chart of yearly attacks for a specific country
var attacks_per_year_country_chart;

// map from country name to corresponding hc-key
var country_hc_key_map = new Map();

// map for targets
var targets_map;

// column chart for targets
var target_chart;

var target_names = ["Business", "Government", "Police", "Military", "Clinics", "Airport & Aircraft", "Diplomatic", "Education Institution",
    "Food/Water Supply", "Media", "Maritime", "NGO", "Other", "Citizens & Property", "Religious", "Telecommunication", "Terrorists/Militias",
    "Tourists", "Transportation", "Unknown", "Utilities", "Violent Political Parties"];
var target_indexes = new Map();
target_names.forEach(function (ele, index) {
    target_indexes.set(ele, index);
});

// ajax request for yearly attacks data
var requestAllYearlyAttacks = function () {
    $.getJSON('attacksyearly/', function (data) {
        attacks_per_year_chart.series[0].setData(data);
    });
};

// ajax request for attacks data for map
var requestAttacksMap = function () {
    var mapdata = [];
    $.getJSON('attacksmap/', function (data) {
        $.each(data, function (key, val) {
            if (country_hc_key_map.has(key)) {
                mapdata.push({
                    "hc-key": country_hc_key_map.get(key),
                    "value": val,
                    othername: key
                });
            }
        });
        attacks_map.series[0].setData(mapdata);
        attacks_map.setTitle({text: 'Global Terror Attacks 1970-2015'});
    });
};

$(function () {

    $('#overview').click(requestAttacksMap);

    // map country name to corresponding hc-key
    var property;
    Highcharts.maps['custom/world-palestine-lowres']['features'].forEach(function (ele) {
        property = ele['properties'];
        country_hc_key_map.set(property['name'], property['hc-key']);
    });
    country_hc_key_map.set('United States', 'us');

    // initiate attacks_map
    attacks_map = new Highcharts.Map('attacks_map', {

        chart: {
            events: {
                // ajax request for attacks data for map
                load: requestAttacksMap
            },
            backgroundColor: '#DCDCDC'
        },

        title: {
            text: 'Global Terror Attacks 1970-2015'
        },

        subtitle: {
            text: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0,
            // minColor: '#efecf3',
            // maxColor: '#990041'
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            var countryname = this.othername;
                            console.log(countryname);

                            // ajax request for yearly attacks data for a specific country
                            $.getJSON('attacksyearly/' + countryname + '/', function (data) {

                                // update attacks_per_year_chart with the newly requested data
                                attacks_per_year_country_chart.series[0].setData(data);
                                attacks_per_year_country_chart.setTitle({
                                    text: 'Number of Yearly Terror Attacks in '
                                    + countryname
                                });

                                // show chart
                                var apyc_chart = $('#columChartSpecificCountry');
                                apyc_chart.css('display', 'block');
                            });
                        }
                    }
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{series.name}</span><br/>',
            pointFormat: '{point.othername}: <b>{point.value:.1f}</b><br/>'
        },

        series: [{
            data: [],
            mapData: Highcharts.maps['custom/world-palestine-lowres'],
            joinBy: 'hc-key',
            name: 'attacks number',
            states: {
                hover: {
                    color: '#a4edba'
                }
            }
        }]
    });

    // initiate attacks_per_year_chart
    attacks_per_year_chart = Highcharts.chart('YearColumn', {

        chart: {
            type: 'column',
            events: {
                // ajax request for yearly attacks data
                load: requestAllYearlyAttacks
            },
            backgroundColor: '#DCDCDC'
        },

        title: {
            text: 'Number of Yearly Terror Attacks Worldwide'
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
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        mouseOver: function () {
                            var attacks_specific_year = [];
                            var year = this.x;

                            // ajax request for attacks data for a specific year
                            $.getJSON('attacksmap/' + year + '/', function (data) {
                                $.each(data, function (key, val) {
                                    if (country_hc_key_map.has(key)) {
                                        attacks_specific_year.push({
                                            "hc-key": country_hc_key_map.get(key),
                                            "value": val,
                                            othername: key
                                        });
                                    }
                                });

                                // update attacks_map with the newly requested data
                                attacks_map.series[0].setData(attacks_specific_year);
                                attacks_map.setTitle({text: 'Global Terror Attacks ' + year});
                            });
                        }
                    }
                }
            }
        },

        series: [{
            name: 'Attacks',
            data: [],
            pointStart: 1970,
            pointInterval: 1
        }]
    });

    // initiate attacks_per_year_country_chart
    attacks_per_year_country_chart = Highcharts.chart('columChartSpecificCountry', {

        chart: {
            type: 'column',
            events: {
                click: function (event) {
                    var apyc_chart = $('#columChartSpecificCountry');

                    // click to hide the chart
//                    if(apyc_chart.hasClass('w3-show')){
//                        apyc_chart.removeClass('w3-show');
//                    }
                    apyc_chart.css('display', 'none');
                }
            },
            backgroundColor: '#DCDCDC'
        },

        title: {
            text: 'Number of Yearly Terror Attacks'
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
            data: []
        }]
    });

    targets_map = new Highcharts.Map('targets_map', {

        chart: {
            events: {
                // initially show map for business target
                load: function () {
                    var mapdata = [];
                    $.getJSON('targetsmap/' + 1, function (data) {
                        $.each(data, function (key, val) {
                            if (country_hc_key_map.has(key)) {
                                mapdata.push({
                                    "hc-key": country_hc_key_map.get(key),
                                    "value": val
                                });
                                // console.log(key)
                            }
                        });
                        targets_map.series[0].setData(mapdata);
                        targets_map.setTitle({text: target_names[0] + " Targets"});
                    });
                }
            },
            backgroundColor: '#DCDCDC'
        },

        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
            // minColor: '#efecf3',
            // maxColor: '#990041'
        },

        plotOptions: {
            series: {
                cursor: 'pointer'
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{series.name}</span><br/>',
            pointFormat: '{point.othername}: <b>{point.value:.1f}</b><br/>'
        },

        series: [{
            data: [],
            mapData: Highcharts.maps['custom/world-palestine-lowres'],
            joinBy: 'hc-key',
            name: 'attacks number',
            states: {
                hover: {
                    color: '#a4edba'
                }
            }
        }]
    });

    target_chart = Highcharts.chart('targets_chart', {

        chart: {
            type: 'column',
            events: {
                // ajax request for targets data
                load: function () {
                    $.getJSON('targets/', function (data) {
                        var named_data = [];
                        data.forEach(function (ele) {
                            console.log(target_names[ele[0]]);
                            named_data.push([target_names[ele[0]], ele[1]]);
                        });
                        target_chart.series[0].setData(named_data);
                    });
                }
            },
            backgroundColor: '#DCDCDC'
        },

        title: {
            text: ''
        },

        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
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
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        mouseOver: function () {
                            var target_map_data = [];
                            var target_type = this.name;

                            // ajax request for attacks data for a specific year
                            $.getJSON('targetsmap/' + target_indexes.get(target_type) + '/', function (data) {
                                $.each(data, function (key, val) {
                                    if (country_hc_key_map.has(key)) {
                                        target_map_data.push({
                                            "hc-key": country_hc_key_map.get(key),
                                            "value": val,
                                        });
                                    }
                                });

                                // update attacks_map with the newly requested data
                                targets_map.series[0].setData(target_map_data);
                                targets_map.setTitle({text: target_type + ' Targets'});
                            });
                        }
                    }
                }
            }
        },

        series: [{
            name: 'Attacks',
            data: []
        }]
    });
})
;