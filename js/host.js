let names = []

function addPlayer(name, icon) {
    codeBlock = document.getElementById("host2").innerHTML
    if(localStorage.getItem("ismobile?")) {
        console.log("Is mobile")
        codeBlock = codeBlock
        + '<div class="col-12" id="card-' + name + '">'
            + '<div class="card text-white bg-secondary mb-3 host2-card" style="max-width: 18rem;">'
                + '<div class="card-body">'
                    + '<div class="container">'
                        + '<div class="row">'
                            + '<div class="col">'
                                + '<img src="img/' + icon + '" width="40px" height="40px">'
                            + '</div>'
                            + '<div class="col">'
                                + '<p class="text-start"><span class="align-middle"><b>' + name + '</b></span></p>'
                            + '</div>'
                            + '<div class="col">'
                                + '<button type="button" class="btn btn-danger" id="btn-' + name + '">x</button>'
                            + '</div>'
                        + '</div>'
                        + '<div class="row">'
                            + '<p></p>'
                            + '<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'
                                + '<div class="progress-bar" id="bar-' + name + '" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
        + '</div>'
    } else {
        codeBlock = codeBlock
        + '<div class="col-3" id="card-' + name + '">'
            + '<div class="card text-white bg-secondary mb-3 host2-card" style="max-width: 18rem;">'
                + '<div class="card-body">'
                    + '<div class="container">'
                        + '<div class="row">'
                            + '<div class="col-sm-3">'
                                + '<img src="img/' + icon + '" width="40px" height="40px">'
                            + '</div>'
                            + '<div class="col-sm-6">'
                                + '<p class="text-start"><span class="align-middle"><b>' + name + '</b></span></p>'
                            + '</div>'
                            + '<div class="col-sm-3">'
                                + '<button type="button" class="btn btn-danger" id="btn-' + name + '">x</button>'
                            + '</div>'
                        + '</div>'
                        + '<div class="row">'
                            + '<p></p>'
                            + '<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'
                                + '<div class="progress-bar" id="bar-' + name + '" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
        + '</div>'
    }
    document.getElementById("host2").innerHTML = codeBlock
    console.log("Finished")
}
function removePlayer(cardId) {
    document.getElementById(cardId).remove()
    id = cardId.replace("card-", "")
    console.log("Removing player " + id)
    data = {
        name: id
    }
    $.post("/remove-player", data)
}

function checkQueue() {
    console.log("Checking queue")
    $.get("/queue", function(response) {    
        names = response.names
        icons = response.icons
        for(let i = 0; i < names.length; i++) {
            addPlayer(names[i], icons[i])
        }
        if(names.length > 0) {
            console.log("Received: " + names + icons)
        }
    })
}

function updateOxygen() {
    $.get("/load-oxygen", function(response) {
        for(player_name in response) {
            barid = "#bar-" + player_name
            oxygen = response[player_name]
            $(barid).css('width', oxygen+'%').attr('aria-valuenow', oxygen)
            console.log("Setting player " + player_name + "'s oxygen to " + oxygen)
        }
    })
}

function loadPlayers() {
    console.log("Loading players")
    $.get("/load-players", function(response) {
        //console.log("Response: " + response)
        //console.log(response[0])
        for(let i = 0; i < response.length; i++) {
            newname = response[i].player_name
            newicon = response[i].player_icon
            console.log("i is " + i + " name is " + newname)
            if(names.includes(newname)) {
                
            } else {
                console.log("Adding player " + newname)
                addPlayer(newname, newicon)
                names.push(newname)
            }
        }
    })
    updateOxygen()
}

function startQueue() {
    //setInterval(checkQueue, 1000)
    setInterval(loadPlayers, 1000)
    
}

$(function(){
    startQueue()
    $("#btn_add_player").click(function(){
        //addPlayer(localStorage.getItem("name"), localStorage.getItem("icon"))
        $.get("/set-ready", function(response) {
            
        })
    })
    $(document).on('click', '[id^="btn-"]', function() {
        // Your button click handler code here
        var buttonId = $(this).attr('id');
        console.log("Button with ID " + buttonId + " clicked!");
        cardId = buttonId.replace("btn", "card")
        console.log("Card ID is " + cardId)
        removePlayer(cardId)
    });
})