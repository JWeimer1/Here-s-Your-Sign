function checkReady() {
    $.get("/ready", function(response) {
        if(response == 0) {
            
        } else {
            window.location.href = response
        }
    })
}

function beginSingleplayer() {
    $.get("/ready?singleplayer=True", function(response) {
        console.log("Calling ready")
        if(response == 0) {
            
        } else {
            window.location.href = response
        }
    })
}

$(function() {
    if(localStorage.getItem("singleplayer") == 'True') {
        setTimeout(beginSingleplayer, 5000)
    } else {
        setInterval(checkReady, 1000)
    }
})