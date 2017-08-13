
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
    $greeting.text('So you want to live in ' + cityStr + '?');

    // load streetview
    var imgSrc = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    var backgroundImg = '<img class="bgimg" src="' + imgSrc + '">';
    $('body').append(backgroundImg);

    // nytimes header
    $nytHeaderElem.text('New York Times Articles for ' + cityStr);

    // nytimes articles
    var apiKey = 'c5a889f96706482984d1c5d640e5228a';
    var nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr +'&sort=newest&api-key=' + apiKey;

    $.getJSON(nytUrl, function( data ) {
      $nytElem.empty();

      var docs = data.response.docs;

      for (var i in docs) {

        var webUrl = docs[i].web_url;
        var printHeadline = docs[i].headline.print_headline;
        var snippet = docs[i].snippet;

        var article = '<li class="article"><a href="' + webUrl + '">' + printHeadline + '</a><p>' + snippet + '</p></li>';
        $nytElem.append(article);
      }

    }).fail(function(e) {
      $nytHeaderElem.text('New York Times Articles Could Not Load');
    });

    // wikipedia
    var wikiUrl = 'https://en.wikiadsfasdfasdfpedia.org/w/api.php?action=opensearch&format=json&search=' + cityStr;

    var wikiTimeout = setTimeout( function(){
      $wikiElem.text('Wikipedia Links Could Not Load');
    }, 15000 );

    $.ajax({
      url : wikiUrl,
      dataType : "jsonp"})
      .done( function( response ) {
        var links = response[1];

        for (var i in links) {
          var page = links[i];
          var link = '<li><a href="https://en.wikipedia.org/wiki/' + page + '">' + page + '</a></li>';
          $wikiElem.append( link );
        }

        wikiTimeout = clearTimeout(wikiTimeout);
      });

    return false;
};

$('#form-container').submit(loadData);
