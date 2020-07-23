const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;
//console.log(db_url);
const pool = new Pool({ connectionString: db_url, ssl: process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 });

function searchCabinetGames(name, callback) {
    console.log("Searching the DB for games with: " + name);
    //search the DB for games by name

    var sql = "SELECT id, name, published, publisher, min_players, max_players, min_playtime, max_playtime, game_description, official_url, thumb FROM game WHERE name = $1";
    var params = [name];
    pool.query(sql, params, function(err, db_results) {
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

function gameInsert(id, name, published, publisher, min_players, max_players, min_playtime, max_playtime, game_description, official_url, thumb, callback) {
    //add the new game to the cabinet
    console.log("Inserting a new game into DB with name of: " + name);
    //insert a game into DB
    console.log(published);
    console.log(id);
    var sql = "INSERT INTO game (id, name, published, publisher, min_players, max_players, min_playtime, max_playtime, game_description, official_url, thumb) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
    var params = [id, name, published, publisher, min_players, max_players, min_playtime, max_playtime, game_description, official_url, thumb];
    pool.query(sql, params, function(err, db_results) {
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

module.exports = {
    searchCabinetGames: searchCabinetGames,
    gameDetails: gameDetails,
    gameInsert: gameInsert
}