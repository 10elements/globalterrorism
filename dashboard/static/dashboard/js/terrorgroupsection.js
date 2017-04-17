/**
 * Created by zhangtianyao on 4/13/17.
 */
$(function () {
    // sent ajax request when filterForm is submitted
    var filterForm = $('#filter_form');
    var keywords;
    WordCloud.minFontSize = "15px";
    filterForm.submit(function (event) {
        $.ajax({
            type: filterForm.attr('method'),
            url: filterForm.attr('action'),
            data: filterForm.serialize(),
            dataType: "json",
            success: function (data) {
                keywords = data;
                WordCloud($('#keywordscloud')[0], {
                    list: keywords,
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