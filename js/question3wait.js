function timeoutq3wait() {
    $.get("/timeout-question3wait?name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response) {
        window.location.href = response
    })
}

function timeq3wait(time) {
    time = parseInt(time) + 5000
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq3wait, time)
}

$(function () {
    $.get("/time-question3?singleplayer=" + localStorage.getItem('singleplayer'), function(response) {
        console.log("Question 3 expires", response)
        if(localStorage.getItem('singleplayer') == "True") {
            timeq3wait(0)
        } else {
            timeq3wait(response)
        }
    })
})