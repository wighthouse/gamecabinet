const express = require('express');
const path = require("path");
require('dotenv').config();

const gameController = require('./controllers/gameController.js')
var app = express();
var bodyParser = require('body-parser');



// var request = require('request');

// const { Pool } = require("pg");

// // const connectionString = process.env.DATABASE_URL || 'postgres://lmxkeojfykpsoc:b25684f5d6f8d2d42da800fb853d530778ba99017dbe54d0b26e8cfdcff8d4c6@ec2-3-215-83-17.compute-1.amazonaws.com:5432/d6r09rg0mnqpmt';
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
app.get("/searchCabinet", gameController.searchCabinetGames);
//get all games in cabinet
app.get("/cabinetGameDetails", gameController.cabinetGameDetails);
//get details from cabinet


app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});