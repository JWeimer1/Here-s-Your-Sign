function checkReady() {
    $.get("/ready", function(response) {
        if(response == 0) {
            
        } else {
            window.location.href = response
        }
    })
}

$(function() {
    setInterval(checkReady, 1000)
})