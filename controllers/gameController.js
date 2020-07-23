const gameModel = require("../models/gameModel");

function searchGames(req, res) {
    //get a list of all games with that name
    console.log('Searching for: ');

    gameModel.searchGames(params, function(error, results) {
        res.json(results);
    });

}

function gameDetails(req, res) {
    //get game details for a single game
    var id = req.params.id;
    console.log("Getting details for..." + id);

    gameModel.gameDetails(id, function(error, results) {
        res.json(results);
    });
}

function addGame(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var published = req.body.published;
    var publisher = req.body.publisher;
    var min_players = req.body.min_players;
    var max_players = req.body.max_players;
    var min_playtime = req.body.min_playtime;
    var max_playtime = req.body.max_playtime;
    var game_description = req.body.game_description;
    var official_url = req.body.official_url;
    var thumb = req.body.thumb;


    console.log("Adding a new game to the database with name: " + name);
    console.log(req.body.description);

    gameModel.gameInsert(id, name, published, publisher, min_players, max_players, min_playtime, max_playtime, game_description, official_url, thumb, function(error, results) {
        res.json(results);
        console.log(results);
    });
}

function searchCabinetGames(req, res) {
    //get a list of all cabinet games with that name
    var name = req.query.name;
    console.log("Searching cabinet for: " + name);
    gameModel.searchCabinetGames(name, function(error, results) {
        res.json(results);

    });

}

function cabinetGameDetails(req, res) {
    //get game details for a single game
    var id = req.params.id;
    console.log("Getting details for..." + id);

    gameModel.cabinetGameDetails(id, function(error, results) {
        res.json(results);
    });
}


module.exports = {
    searchGames: searchGames,
    gameDetails: gameDetails,
    addGame: addGame,
    searchCabinetGames: searchCabinetGames,
    cabinetGameDetails: cabinetGameDetails
}

// function search() {
//     // Get the value from the search box
//     var searchString = $('#txtSearch').val();
//     console.log('Searching for: ' + searchString);

//     // Set up the parameters to send to the API
//     var params = { name: searchString, client_id: 'MgSCrB3V83' };
// }

// function searchGames() {
//     console.log("Getting games information.");
//     var searchString = $('#txtSearch').val();
//     console.log('Searching for: ' + searchString);

//     // // Set up the parameters to send to the API
//     var params = { name: searchString, client_id: 'MgSCrB3V83' };

//     // // Use jQuery to make the get request
//     $.get('https://www.boardgameatlas.com/api/search?', params, function(data, status) {
//         // var json = JSON.parse(data);
//         // var gameNameList = json.games.map(e => e.name);
//         // console.log(gameNameList);
//         // console.log(json.games[0].name);
//         console.log('Back from server with the following results:');
//         console.log(status);
//         console.log(data);


//         var gameNameList = data.games.map(e => e.name);
//         console.log(gameNameList);
//         updateResultList(data);
//     });
// }

// function updateResultList(data) {
//     if (data.games && data.games.length > 0) {
//         var header = $('#titleResults');
//         header.empty();
//         var resultList = $('#ulResults');
//         resultList.empty();
//         var image = $('#imgResults');
//         image.attr("src", "");

//         // you could use a forEach here as well...
//         for (var i = 0; i < data.games.length; i++) {
//             var title = data.games[i].name;
//             var id = data.games[i].id;
//             resultList.append("<li><p>" + title + "</p><button class='details' id='" + id + "'>View Details</button></li>");
//         }
//         $(".details").click(function() {
//             searchById(this.id);
//         });
//     }
// }

// function searchById(id) {
//     console.log(id);
//     // Get the value from the search box

//     console.log('Searching for: ' + id);

//     // Set up the parameters to send to the API
//     var params = { ids: id, client_id: 'MgSCrB3V83' };

//     // Use jQuery to make the get request
//     $.get('https://www.boardgameatlas.com/api/search?', params, function(data, status) {
//         // For debugging purposes, make a note that we're back
//         console.log('Back from server with the following results:');
//         console.log(status);
//         console.log(data);
//         getDetails(data);
//     });
// }

// function getDetails(data) {
//     // if (data && data.length > 0) {
//     console.log(data.games[0].name);
//     var header = $('#titleResults');
//     header.empty();
//     var resultList = $('#ulResults');
//     resultList.empty();
//     var image = $('#imgResults');
//     image.attr("src", "");
//     var params = {
//         name: data.games[0].name,
//         published: data.games[0].year_published,
//         publisher: data.games[0].primary_publisher,
//         min_players: data.games[0].min_players,
//         max_players: data.games[0].max_players,
//         thumb: data.games[0].thumb_url,
//         min_playtime: data.games[0].min_playtime,
//         max_playtime: data.games[0].max_playtime,
//         description: data.games[0].description,
//         official: data.games[0].official_url
//     }
//     var gameInfo = $.param(params);

//     var name = data.games[0].name;
//     var published = data.games[0].year_published;
//     var publisher = data.games[0].primary_publisher;
//     var min_players = data.games[0].min_players;
//     var max_players = data.games[0].max_players;
//     var thumb = data.games[0].thumb_url;
//     var min_playtime = data.games[0].min_playtime;
//     var max_playtime = data.games[0].max_playtime;
//     var description = data.games[0].description;
//     var official = data.games[0].official_url;

//     console.log(name);
//     header.append(name);
//     resultList.append("<li>Players:  " + min_players + " - " + max_players + "</li>");
//     resultList.append("<li>Playtime:  " + min_playtime + " - " + max_playtime + "</li>");
//     resultList.append("<li>Published:  " + published + "</li>");
//     resultList.append("<li>Publisher:  " + publisher + "</li>");
//     resultList.append("<a href='" + official + "' target='blank'><li>Official Site</li></a>");
//     resultList.append("<li>Description:  " + description + "</li>");
//     image.attr("src", thumb);
//     image.after("<button class='addToCabinet' id='" + name + "'>Add " + name + " to Cabinet</button>");

//     $(".addToCabinet").click(function() {
//         addToCabinet(gameInfo);

//     });
// }

// function addToCabinet(gameInfo) {
//     console.log(gameInfo);
// }