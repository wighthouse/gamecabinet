function searchGames(params, callback) {
    console.log("Searching the API for games with: " + name);
    //search the API for games by name

    var results = {
        game: [
            { id: 1, name: "Game1" },
            { id: 2, name: "Game2" },
            { id: 3, name: "Game3" }
        ]
    }
    callback(null, results);
}

function gameDetails(id, callback) {
    //get game details from API by id
    var results = { id: id, name: "GameTitle" };

    callback(null, results);
}

function gameInsert(name, callback) {
    //add the new game to the cabinet
    var results = { success: true };

    callback(null, results);

}

module.exports = {
    searchGames: searchGames,
    gameDetails: gameDetails,
    gameInsert: gameInsert
}