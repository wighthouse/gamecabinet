function searchGames() {
    console.log("Getting games information.");
    var searchString = $('#txtSearch').val();
    console.log('Searching for: ' + searchString);

    // // Set up the parameters to send to the API
    var params = { name: searchString, client_id: 'MgSCrB3V83' };
    console.log(params);
    // // Use jQuery to make the get request
    $.get('https://www.boardgameatlas.com/api/search?', params, function(data) {
        // var json = JSON.parse(data);
        // var gameNameList = json.games.map(e => e.name);
        // console.log(gameNameList);
        // console.log(json.games[0].name);
        console.log('Back from server with the following results:');
        // console.log(status);
        console.log(data);
        var gameNameList = data.games.map(e => e.name);
        console.log(gameNameList);
        updateResultList(data);
    });
}

function updateResultList(data) {
    if (data.games && data.games.length > 0) {
        var header = $('#titleResults');
        header.empty();
        var resultList = $('#ulResults');
        resultList.empty();
        var image = $('#imgResults');
        image.attr("src", "");

        // you could use a forEach here as well...
        for (var i = 0; i < data.games.length; i++) {
            var title = data.games[i].name;
            var id = data.games[i].id;
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
    var params = { ids: id, client_id: 'MgSCrB3V83' };

    // Use jQuery to make the get request
    $.get('https://www.boardgameatlas.com/api/search?', params, function(data, status) {
        // For debugging purposes, make a note that we're back
        console.log('Back from server with the following results:');
        console.log(status);
        console.log(data);
        getDetails(data);
    });
}

function getDetails(data) {
    // if (data && data.length > 0) {
    console.log(data.games[0].name);
    var header = $('#titleResults');
    header.empty();
    var resultList = $('#ulResults');
    resultList.empty();
    var image = $('#imgResults');
    image.attr("src", "");
    var button = $('.addToCabinet');
    button.remove();

    var params = {
        name: data.games[0].name,
        published: data.games[0].year_published,
        publisher: data.games[0].primary_publisher,
        min_players: data.games[0].min_players,
        max_players: data.games[0].max_players,
        thumb: data.games[0].thumb_url,
        min_playtime: data.games[0].min_playtime,
        max_playtime: data.games[0].max_playtime,
        description: data.games[0].description,
        official: data.games[0].official_url
    }
    var gameInfo = $.param(params);
    console.log(gameInfo);
    var name = data.games[0].name;
    var published = data.games[0].year_published;
    var publisher = data.games[0].primary_publisher;
    var min_players = data.games[0].min_players;
    var max_players = data.games[0].max_players;
    var thumb = data.games[0].thumb_url;
    var min_playtime = data.games[0].min_playtime;
    var max_playtime = data.games[0].max_playtime;
    var description = data.games[0].description;
    var official = data.games[0].official_url;

    console.log(name);
    header.append(name);
    resultList.append("<li>Players:  " + min_players + " - " + max_players + "</li>");
    resultList.append("<li>Playtime:  " + min_playtime + " - " + max_playtime + "</li>");
    resultList.append("<li>Published:  " + published + "</li>");
    resultList.append("<li>Publisher:  " + publisher + "</li>");
    resultList.append("<a href='" + official + "' target='blank'><li>Official Site</li></a>");
    resultList.append("<li>Description:  " + description + "</li>");
    image.attr("src", thumb);
    image.after("<button class='addToCabinet' id='" + name + "'>Add " + name + " to Cabinet</button>");

    $(".addToCabinet").click(function() {
        console.log(gameInfo);
        $.post("/addGame", gameInfo)
            // addToCabinet(gameInfo);

    });
}

// function addToCabinet(gameInfo) {
//     $.post("/addGame", gameInfo)
//     console.log(gameInfo);
// }