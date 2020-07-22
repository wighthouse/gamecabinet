const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;
//console.log(db_url);
const pool = new Pool({ connectionString: db_url, ssl: process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 });

function searchCabinetGames(name, callback) {
    console.log("Searching the API for games with: " + name);
    //search the API for games by name

    var sql = "SELECT id, title, published, publisher, min_players, max_players, min_playtime, max_playtime, game_description, official_url, thumb FROM game ";

    pool.query(sql, function(err, db_results) {
        if (err) {
            throw err;
        } else {
            console.log("Back from the DB with: ");
            console.log(db_results);
        }
        var results = {
            games: db_results.rows
        };
        callback(null, results);
    });

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
    searchCabinetGames: searchCabinetGames,
    gameDetails: gameDetails,
    gameInsert: gameInsert
}