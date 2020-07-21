const express = require('express');
const gameController = require('./controllers/gameController.js')
var app = express();
var bodyParser = require('body-parser');
const path = require("path");

// var request = require('request');

// const { Pool } = require("pg");

// // const connectionString = process.env.DATABASE_URL || "postgres://";
// // const pool = new Pool({ connectionString: connectionString });
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //support url encoded bodies
// app.set("views", "views");
// app.set("view engine", "ejs");
app.set("port", (process.env.PORT || 5000));

app.get("/search", gameController.searchGames);
//searh API for new games
app.get("/gameDetails", gameController.gameDetails);
//get gameDetails from API
app.post("/addGame", gameController.addGame);
//add new game to cabinet
app.get("/getCabinetGamesList");
//get all games in cabinet
app.get("/getCabinetGameDetails");
//get details from cabinet


app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});