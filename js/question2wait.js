function timeoutq2wait() {
    $.get("/timeout-question2wait?name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response) {
        window.location.href = response
    })
}

function timeq2wait(time) {
    time = parseInt(time) + 5000
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq2wait, time)
}

$(function () {
    $.get("/time-question2?singleplayer=" + localStorage.getItem('singleplayer'), function(response) {
        console.log("Question 2 expires", response)
        if(localStorage.getItem('singleplayer') == "True") {
            timeq2wait(0)
        } else {
            timeq2wait(response)
        }
    })
})