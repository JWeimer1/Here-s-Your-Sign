const express = require("express")
const bodyParser = require("body-parser")
const Pool = require("pg").Pool
const app = express()
require('dotenv').config()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

const pool = new Pool({
    /*user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',*/
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})
 
// This represents whether or not someone is hosting
let hosting = 0

// This represents whether or not a question is currently shown to users
let currentQuestion = 0

// These represent the time the first user enters each question
let timeq1 = 0, timeq2 = 0, timeq3 = 0

// These represent the total time allotted to each question
let lengthq1 = 27000, lengthq2 = 32000, lengthq3 = 37000

//let queuePlayer_Name = []
//let queuePlayer_Icon = []

//let player_names = []
//let player_oxygens = []

let player_oxy = {}
let player_lev = {}

let ready = 0

app.use(express.static("."))

// Host, key = 123
app.get("/host", function(req, res) {
    //let ismobile = req.query.ismobile
    if(hosting == 0) {
        hosting = 1
        res.json("host-123.html")
    } else {
        res.json("Game.html")
    }
    /*let key = req.query.key
    key = parseInt(key)
    if(key == 123) {
        res.json("host.html")
    } else {
        res.json("Game.html")
    }*/
})

app.get("/join", (req, res) => {

    // Add user to database
    const Player_name = req.query.name;
    const Player_icon = req.query.icon;
    if(Player_name in player_oxy) {
        res.json("name_duplicate")
    } else {
        console.log("Adding player Name: " + Player_name + " Icon: " + Player_icon)
        //player_names.push(Player_name)
        //player_oxygens.push(100)
        player_oxy[Player_name] = 100
        player_lev[Player_name] = 1
           
        const sql = "INSERT INTO PLAYERS (Player_name, Player_icon) VALUES ($1, $2)";
        const data = [Player_name, Player_icon]; 
    
        pool.query(sql, data, (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows)
        });
    }
    
})

/*app.get("/queue", function(req, res) {
    res.json({
        names: queuePlayer_Name,
        icons: queuePlayer_Icon
    })
    queuePlayer_Name = []
    queuePlayer_Icon = []
})*/

app.get("/load-players", (req, res) => {
    const sql = "SELECT * FROM PLAYERS";

    pool.query(sql, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    });
    
})

app.post("/remove-player", function (req, res) {

    console.log("Removing player " + req.body.name)
    const name = req.body.name
    const sql = "DELETE FROM PLAYERS WHERE player_name = '" + name + "'";
    delete player_oxy[name]
    delete player_lev[name]

    pool.query(sql, (error, results) => {
        if (error) throw error

        res.status(200).json(results.rows)
    });
})

app.get("/load-oxygen", function (req, res) {
    /*temp = []
    for(i = 0; i < player_names.length; i++) {
        data = {
            player_name: player_names[i],
            player_oxygen: player_oxygens[i]
        }
        temp.push(data)
    }*/
    res.json(player_oxy)
    console.log(player_oxy)
    
    // SQL Version
    /*const sql = "SELECT player_name, player_oxygen FROM PLAYERS"
    pool.query(sql, (error, results) => {
        if (error) throw error

        res.status(200).json(results.rows)
    });*/
})

/*app.get("/decrement-oxygen", function (req, res) {
    player_name = req.query.name
    player_oxygen = req.query.oxygen
    console.log("Updating player " + player_name + " oxygen to " + player_oxygen)
    
    player_oxy[player_name] = player_oxygen
    console.log("Successfully updated player")
    

    
})*/

/*app.get("get-oxygen", function(req, res) {
    let player_name = req.query.name
    res.json(player_oxy[player_name])
})*/

app.get("/set-ready", function (req, res) {
    ready = 1
})

app.get("/ready", function (req, res) {
    if(req.query.singleplayer == "True") {
        res.json("question1.html")
    }

    if(ready == 0) {
        res.json(0)
    } else {
        res.json("question1.html")
    }
})



// Question 1
function startq1() {
    if(currentQuestion == 1) {                                          // If question 1 is active
        for(player_name in player_lev) {                                // Iterate through every player
            if(player_lev[player_name] == 1) {                          // If the player is on level 1
                player_oxy[player_name] = player_oxy[player_name] - 1   // Decrease their oxygen
            }
        }
    }
}

app.get("/time-question1", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json(new Date().getTime() + lengthq1)
    }
    if(timeq1 == 0) {
        timeq1 = new Date().getTime() + lengthq1
        setInterval(function() {startq1()}, 1000)
        currentQuestion = 1
        //console.log("Setting time for q1: ", timeq1)
    }
    let sendTime = timeq1 - new Date().getTime()
    if(sendTime < 0) {
        sendTime = 0
    }
    console.log("Sending time ", sendTime)
    res.json(sendTime)
})

// Player ran out of time
app.get("/timeout-question1", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json("question1_timeout.html")
    }
    let name = req.query.name
    player_lev[name] = 2
    res.json("question1_timeout.html")
})

// Player's wait is over
app.get("/timeout-question1wait", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json("question2.html")
    }
    let name = req.query.name
    player_lev[name] = 2
    res.json("question2.html")
})

app.get("/validate-question1", function(req, res) {
    let ans = req.query.ans
    let name = req.query.name

    if(req.query.singleplayer == "True") {
        if(ans == "c") {
            res.json("question1_correct.html")
        }else{
            res.json("false")
        }
    }

    if(ans == "c") {
        res.json("question1_correct.html")
        player_lev[name] = 2
    }else{
        res.json("false")
        player_oxy[name] = parseInt(player_oxy[name]) - 10
    }
})



// Question 2
function startq2() {
    if(currentQuestion == 2) {                                          // If question 2 is active
        for(player_name in player_lev) {                                // Iterate through every player
            if(player_lev[player_name] == 2) {                          // If the player is on level 2
                player_oxy[player_name] = player_oxy[player_name] - 1   // Decrease their oxygen
            }
        }
    }
}

app.get("/time-question2", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json(new Date().getTime() + lengthq2)
    }
    
    if(timeq2 == 0) {
        //timeq2 = new Date().getTime() + lengthq2
        timeq2 = timeq1 + lengthq2 + 5
        setInterval(function() {startq2()}, 1000)
        currentQuestion = 2
        //console.log("Setting time for q2: ", timeq2)
    }
    let sendTime = timeq2 - new Date().getTime()
    if(sendTime < 0) {
        sendTime = 0
    }
    console.log("Sending time ", sendTime)
    res.json(sendTime)
})

app.get("/timeout-question2", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json("question2_timeout.html")
    }
    let name = req.query.name
    player_lev[name] = 3
    res.json("question2_timeout.html")
})

app.get("/timeout-question2wait", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json("question3.html")
    }
    let name = req.query.name
    player_lev[name] = 3
    res.json("question3.html")
})

app.get("/validate-question2", function(req, res) {
    let ans = req.query.ans
    let name = req.query.name

    if(req.query.singleplayer == "True") {
        if(ans == "b") {
            res.json("question2_correct.html")
        }else{
            res.json("false")
        }
    }

    if(ans == "b") {
        res.json("question2_correct.html")
        player_lev[name] = 3
    }else{
        res.json("false")
        player_oxy[name] = parseInt(player_oxy[name]) - 10
    }
})



// Question 3
function startq3() {
    if(currentQuestion == 3) {                                          // If question 3 is active
        for(player_name in player_lev) {                                // Iterate through every player
            if(player_lev[player_name] == 3) {                          // If the player is on level 3
                player_oxy[player_name] = player_oxy[player_name] - 1   // Decrease their oxygen
            }
        }
    }
}

app.get("/time-question3", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json(new Date().getTime() + lengthq3)
    }
    if(timeq3 == 0) {
        //timeq3 = new Date().getTime() + lengthq3
        timeq3 = timeq2 + lengthq3 + 5
        setInterval(function() {startq3()}, 1000)
        currentQuestion = 3
        //console.log("Setting time for q3: ", timeq3)
    }
    let sendTime = timeq3 - new Date().getTime()
    if(sendTime < 0) {
        sendTime = 0
    }
    console.log("Sending time ", sendTime)
    res.json(sendTime)
})

app.get("/timeout-question3", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json("Finished.html")
    }
    let name = req.query.name
    player_lev[name] = 4
    currentQuestion = 4
    res.json("Finished.html")
})

app.get("/timeout-question3wait", function(req, res) {
    if(req.query.singleplayer == "True") {
        res.json("Finished.html")
    }
    let name = req.query.name
    player_lev[name] = 4
    res.json("Finished.html")
})

app.get("/validate-question3", function(req, res) {
    let ans = req.query.ans
    let name = req.query.name

    if(req.query.singleplayer == "True") {
        if(ans == "a") {
            res.json("question3_correct.html")
        }else{
            res.json("false")
        }
    }

    if(ans == "a") {
        res.json("question3_correct.html")
        player_lev[name] = 4
    }else{
        res.json("false")
        player_oxy[name] = parseInt(player_oxy[name]) - 10
    }
})

app.post("/api/players/create", (req,res) => {
    const Player_name = req.body.name;
    const Player_icon = req.body.icon;
    const Player_level = req.body.level;
    console.log("Name: " + req.body.name + " Icon: " + req.body.icon + " Level: " + req.body.level)
    const sql = "INSERT INTO PLAYERS (Player_name, Player_icon, Player_level) VALUES ($1, $2, $3)";
    const data = [Player_name, Player_icon, Player_level]; 
    

    pool.query(sql, data, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    });

})



app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
