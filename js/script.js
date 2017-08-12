
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
    $greeting.text('So you want to live at ' + address + '?');

    // load streetview
    var imgSrc = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    var backgroundImg = '<img class="bgimg" src="' + imgSrc + '">';
    $('body').append(backgroundImg);

    // nytimes header
    $nytHeaderElem.text('New York Times Articles for ' + address);

    // nytimes articles
    var apiKey = 'c5a889f96706482984d1c5d640e5228a';
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + address +'&sort=newest&api-key=' + apiKey;

    $.getJSON(url, function( data ) {
      $nytElem.empty();

      var nytArticles = [];
      var docs = data.response.docs;

      for (var i in docs) {

        var webUrl = docs[i].web_url;
        var printHeadline = docs[i].headline.print_headline;
        var snippet = docs[i].snippet;

        var article = '<li class="article"><a href="' + webUrl + '">' + printHeadline + '</a><p>' + snippet + '</p></li>';
        nytArticles.push( article );
      }

      $nytElem.append(nytArticles.join( "" ));
  });

    // wikipedia


    return false;
};

$('#form-container').submit(loadData);
