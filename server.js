const express = require("express")
const bodyParser = require("body-parser")
const Pool = require("pg").Pool
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'pass',     // Change to 'postgres'
    port: 5432,
 })
 

let hosting = 0

// These represent the time the first user enters each question
let timeq1 = 0, timeq2 = 0, timeq3 = 0

// These represent the total time allotted to each question
let lengthq1 = 25000, lengthq2 = 30000, lengthq3 = 35000

let queueNames = []
let queueIcons = []

let ready = 0

app.use(express.static("."))

// Host, key = 123
app.get("/host", function(req, res) {
    /*let key = req.query.key
    key = parseInt(key)
    if(key == 123) {
        res.json("host.html")
    } else {
        res.json("Game.html")
    }*/
    if(hosting == 0) {
        hosting = 1
        res.json("host-123.html")
    } else {
        res.json("Game.html")
    }
})

app.post("/join", (req, res) => {
    //console.log("Received join request " + req.body.name)
    queueNames.push(req.body.name)
    queueIcons.push(req.body.icon)
    console.log("queueNames: " + queueNames)
    console.log("queueIcons: " + queueIcons)
    res.json(req.body)
})

app.get("/queue", function(req, res) {
    res.json({
        names: queueNames,
        icons: queueIcons
    })
    queueNames = []
    queueIcons = []
})

app.get("/set-ready", function (req, res) {
    ready = 1
})

app.get("/ready", function (req, res) {
    if(ready == 0) {
        res.json(0)
    } else {
        res.json("question1.html")
    }
})

// Question 1
app.get("/time-question1", function(req, res) {
    if(timeq1 == 0) {
        timeq1 = new Date().getTime() + lengthq1
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
    res.json("question1_timeout.html")
})

// Player's wait is over
app.get("/timeout-question1wait", function(req, res) {
    res.json("question2.html")
})

app.get("/validate-question1", function(req, res) {
    let ans = req.query.ans

    if(ans == "c") {
        res.json("question1_correct.html")
    }else{
        res.json("false")
    }
})



// Question 2
app.get("/time-question2", function(req, res) {
    if(timeq2 == 0) {
        timeq2 = new Date().getTime() + lengthq2
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
    res.json("question2_timeout.html")
})

app.get("/timeout-question2wait", function(req, res) {
    res.json("question3.html")
})

app.get("/validate-question2", function(req, res) {
    let ans = req.query.ans

    if(ans == "b") {
        res.json("question2_correct.html")
    }else{
        res.json("false")
    }
})



// Question 3
app.get("/time-question3", function(req, res) {
    if(timeq3 == 0) {
        timeq3 = new Date().getTime() + lengthq3
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
    res.json("Finished.html")
})

app.get("/timeout-question3wait", function(req, res) {
    res.json("Finished.html")
})

app.get("/validate-question3", function(req, res) {
    let ans = req.query.ans

    if(ans == "a") {
        res.json("question3_correct.html")
    }else{
        res.json("false")
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
