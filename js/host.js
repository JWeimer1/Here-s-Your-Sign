function addPlayer(name, icon) {
    codeBlock = document.getElementById("host2").innerHTML
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
    document.getElementById("host2").innerHTML = codeBlock
    console.log("Finished")
}
function removePlayer(cardId) {
    document.getElementById(cardId).remove()
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

function startQueue() {
    setInterval(checkQueue, 1000)
    
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