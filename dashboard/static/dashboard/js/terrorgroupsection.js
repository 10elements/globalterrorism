/**
 * Created by zhangtianyao on 4/13/17.
 */
$(function () {
    // sent ajax request when filterForm is submitted
    var filterForm = $('#filter_form'),
        canvas = $('#keywordscloud'),
        body_height = $('body').height(),// absolute height in px
        terror_group_section_height = $('#terror_group').height(),// absolute height
        cloud_container_height = $('#cloud_container').height() / 100,// percentage height
        canvas_height = terror_group_section_height * cloud_container_height,
        canvas_width = $(window).width() * $('#cloud_container').width() / 100;
    console.log("body height: " + body_height);
    console.log("body width: " + $("body").width());
    console.log("terror group section height: " + terror_group_section_height);
    console.log("terror group section width: " + $('#terror_group').width());
    console.log("cloud container section height " + cloud_container_height);
    console.log("canvas width: " + canvas_width);
    console.log("canvas height: " + canvas_height);
    canvas.attr("height", canvas_height);
    canvas.attr("width", canvas_width);

    WordCloud.minFontSize = "15px";
    filterForm.submit(function (event) {
        $.ajax({
            type: filterForm.attr('method'),
            url: filterForm.attr('action'),
            data: filterForm.serialize(),
            dataType: "json",
            success: function (data) {
                WordCloud(canvas[0], {
                    list: data,
                    gridSize: 18,
                    weightFactor: 3,
                    fontFamily: 'Times, serif',
                    color: 'random-dark',
                    rotateRatio: 0.5,
                    rotationSteps: 2,
                    backgroundColor: '#DCDCDC'
                });
            },
            statusCode:{
                404: function () {
                    var inputbox = $('#g_name');
                    if (inputbox.val() !==''){
                        alert(inputbox.val() + ' not found');
                    }else {
                        alert('please input terror group of interest');
                    }
                }
            }
        });

        // prevent the form from being submitted
        event.preventDefault();
    });

    // auto complete input box
    var groupNames = [];
    $.each(terrorGroups, function (key, val) {
        groupNames.push(key);
    });
    var gnameInput = $('#g_name')[0];
    var autoComplete = new Awesomplete(gnameInput, {
        list: groupNames
    });

});