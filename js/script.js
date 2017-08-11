
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load address
    var streetStr = $('#street').val();
    var cityStr = $('#city').val()
    var address = streetStr + ', ' + cityStr;

    // display greeting
    $('#greeting').text('So you want to live at ' + address + '?');

    // load streetview
    var imgSrc = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    var backgroundImg = '<img class="bgimg" src="' + imgSrc + '">';
    $('body').append(backgroundImg);


    return false;
};

$('#form-container').submit(loadData);
