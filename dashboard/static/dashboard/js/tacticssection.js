/**
 * Created by zhangtianyao on 4/14/17.
 */
$(function () {

    var window_height = $(window).height();
    var window_width = $(window).width();
    var width = window_width / 2 - 20,
        height = window_height / 1.5;
    var r1 = height / 2.5,
        r0 = r1 - r1 / 7;
    var x_dis = width / 2 + 50;
    var y_dis = height / 2 + 50;
    var fill = d3.scale.category10();

    var matrix = [
        [0, 110, 79, 2, 6, 102, 3, 0, 0],
        [110, 0, 1690, 31, 81, 1574, 945, 23, 0],
        [79, 1690, 0, 15, 45, 150, 227, 11, 1],
        [2, 31, 15, 0, 3, 22, 15, 1, 0],
        [6, 81, 45, 3, 0, 6, 41, 0, 0],
        [102, 1574, 150, 22, 6, 0, 314, 19, 2],
        [3, 945, 227, 15, 41, 314, 0, 20, 5],
        [0, 23, 11, 1, 0, 19, 20, 0, 0],
        [0, 0, 1, 0, 0, 2, 5, 0, 0]
    ];

    var labels = ["Assassination", "Armed Assault", "Bombing/Explosion", "Hijacking", "Hostage Taking(Barricade)",
        "Hostage Taking(Kidnapping)", "Facility/Infrastructure Attack", "Unarmed Assault", "Unknown"];

    var chord = d3.layout.chord()
        .padding(.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending)
        .matrix(matrix);

    var arc = d3.svg.arc()
        .innerRadius(r0)
        .outerRadius(r0 + 20);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + x_dis  + "," + y_dis + ")");

    var g = svg.selectAll("g.group")
        .data(chord.groups)
        .enter().append("svg:g")
        .attr("class", "group")
        .on("mouseover", fade(.02))
        .on("mouseout", fade(.40));

    g.append("svg:path")
        .style("stroke", function (d) {
            return fill(d.index);
        })
        .style("fill", function (d) {
            return fill(d.index);
        })
        .attr("d", arc);

    g.append("svg:text")
        .each(function (d) {
            d.angle = (d.startAngle + d.endAngle) / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
            return d.angle > Math.PI ? "end" : null;
        })
        .attr("transform", function (d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (r0 + 26) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function (d) {
            return labels[d.index];
        })
        .style("font-size", "1em")
        .style("font-family", "Allerta Stencil");

    svg.selectAll("path.chord")
        .data(chord.chords)
        .enter().append("svg:path")
        .attr("class", "chord")
        .style("stroke", function (d) {
            return d3.rgb(fill(d.source.index)).darker();
        })
        .style("fill", function (d) {
            return fill(d.source.index);
        })
        .attr("d", d3.svg.chord().radius(r0));


// Returns an event handler for fading a given chord group.
    function fade(opacity) {
        return function (d, i) {
            svg.selectAll("path.chord")
                .filter(function (c) {
                    return c.source.index !== i && c.source.subindex !== i;
                })
                .transition()
                .style("stroke-opacity", opacity)
                .style("fill-opacity", opacity);
        };
    }

    var attack_correlation_matrix = [
        [1.0, -0.20523122218522805, -0.34522150683457253, -0.020953080657652393, -0.025080406541731826, -0.08296571008355627, -0.09327694431335645, -0.026720907746848824, -0.06808187373049168],
        [-0.20523122218522805, 1.0, -0.5248317637429555, -0.02811612737996639, -0.02809391214251503, -0.05562317363297382, -0.09814121678221127, -0.03950773757073768, -0.11215864374326001],
        [-0.34522150683457253, -0.5248317637429555, 1.0, -0.055834932983192746, -0.06516129781862523, -0.24184459079283951, -0.243428064839309, -0.07104175119045969, -0.1857460558845238],
        [-0.020953080657652393, -0.02811612737996639, -0.055834932983192746, 1.0, -0.0002532619096611748, -0.005815665709630123, -0.00936241487587564, -0.0031032839477406825, -0.011531159426803416],
        [-0.025080406541731826, -0.02809391214251503, -0.06516129781862523, -0.0002532619096611748, 1.0, -0.017001820339801504, -0.005202999037086726, -0.005590103024516373, -0.014242955062050242],
        [-0.08296571008355627, -0.05562317363297382, -0.24184459079283951, -0.005815665709630123, -0.017001820339801504, 1.0, -0.0330269764553091, -0.01237527505859653, -0.04851634196347502],
        [-0.09327694431335645, -0.09814121678221127, -0.243428064839309, -0.00936241487587564, -0.005202999037086726, -0.0330269764553091, 1.0, -0.012574650710200782, -0.04917124300608785],
        [-0.026720907746848824, -0.03950773757073768, -0.07104175119045969, -0.0031032839477406825, -0.005590103024516373, -0.01237527505859653, -0.012574650710200782, 1.0, -0.014251174630946358],
        [-0.06808187373049168, -0.11215864374326001, -0.1857460558845238, -0.011531159426803416, -0.014242955062050242, -0.04851634196347502, -0.04917124300608785, -0.014251174630946358, 1.0]
    ];
    var attack_covariance_data = [];
    attack_correlation_matrix.forEach(function (val, i) {
        val.forEach(function (ele, j) {
            attack_covariance_data.push([i, j, ele]);
        });
    });


    Highcharts.chart('attack_correlation_matrix', {

        chart: {
            type: 'heatmap',
            plotBorderWidth: 1,
            backgroundColor: '#DCDCDC'
        },


        title: {
            text: 'Attacks Correlation Matrix'
        },

        xAxis: {
            categories: labels
        },

        yAxis: {
            categories: labels,
            title: null
        },

        colorAxis: {
            min: -1,
            max: 1,
            // minColor: '#efecf3',
            // maxColor: "#990041"
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },

        plotOptions: {
            heatmap: {
                cursor: "pointer",
                point: {
                    events: {
                        mouseOver: function () {
                            var i = this.x;
                            var j = this.y;
                            console.log(i + ", " + j);
                            var chords = svg.selectAll("path.chord");
                            chords.transition()
                                .style("stroke-opacity", 0.4)
                                .style("fill-opacity", 0.4);
                            chords.filter(function (c) {
                                    return (c.source.index !== i || c.source.subindex !== j) &&
                                        (c.source.index !== j || c.source.subindex !== i);
                                })
                                .transition()
                                .style("stroke-opacity", 0.02)
                                .style("fill-opacity", 0.02);
                        },

                        mouseOut: function () {
                            svg.selectAll("path.chord")
                                .transition()
                                .style("stroke-opacity", 0.4)
                                .style("fill-opacity", 0.4);
                        }
                        // click: function () {
                        //     var i = this.x;
                        //     var j = this.y;
                        //     console.log(i + ", " + j);
                        //     var chords = svg.selectAll("path.chord");
                        //     chords.transition()
                        //         .style("stroke-opacity", 0.4)
                        //         .style("fill-opacity", 0.4);
                        //     chords.filter(function (c) {
                        //             return (c.source.index !== i || c.source.subindex !== j) &&
                        //                 (c.source.index !== j || c.source.subindex !== i);
                        //         })
                        //         .transition()
                        //         .style("stroke-opacity", 0.02)
                        //         .style("fill-opacity", 0.02);
                        // }
                    }
                }
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.point.value + '</b>';
            }
        },

        series: [{
            name: 'attack_correlation',
            borderWidth: 1,
            data: attack_covariance_data,
            dataLabels: {
                enabled: false,
                color: '#000000'
            }
        }]

    });
});