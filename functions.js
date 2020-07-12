function updateResultList(data) {
    if (data.Search && data.Search.length > 0) {
        var header = $('#titleResults');
        header.empty();
        var resultList = $('#ulResults');
        resultList.empty();
        var image = $('#imgResults');
        image.attr("src", "");

        // you could use a forEach here as well...
        for (var i = 0; i < data.Search.length; i++) {
            var title = data.Search[i].Title;
            var id = data.Search[i].imdbID;
            resultList.append("<li><p>" + title + "</p><button class='details' id='" + id + "'>View Details</button></li>");
        }
        $(".details").click(function() {
            searchById(this.id);
        });
    }
}


function searchById(id) {
    console.log(id);
    // Get the value from the search box

    console.log('Searching for: ' + id);

    // Set up the parameters to send to the API
    var params = { i: id, apikey: '59739bc0' };

    // Use jQuery to make the get request
    $.get('http://www.omdbapi.com/', params, function(data, status) {
        // For debugging purposes, make a note that we're back
        console.log('Back from server with the following results:');
        console.log(status);
        console.log(data);
        getDetails(data);
    });
}


function getDetails(data) {
    // if (data && data.length > 0) {
    console.log(data.Title);
    var header = $('#titleResults');
    header.empty();
    var resultList = $('#ulResults');
    resultList.empty();
    var image = $('#imgResults');
    image.attr("src", "");
    // you could use a forEach here as well...

    var title = data.Title;
    var released = data.Released;
    var rated = data.Rated;
    var runtime = data.Runtime;
    var poster = data.Poster;
    var plot = data.Plot;

    console.log(title);
    header.append(title);
    resultList.append("<li>Released:  " + released + "</li>");
    resultList.append("<li>Rated:  " + rated + "</li>");
    resultList.append("<li>Runtime:  " + runtime + "</li>");
    resultList.append("<li>Plot:  " + plot + "</li>");
    image.attr("src", poster);
}