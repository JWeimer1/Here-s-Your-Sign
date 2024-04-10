function timeoutq1wait() {
    $.get("/timeout-question1wait?name=" + localStorage.getItem('name'), function(response) {
        window.location.href = response
    })
}

function timeq1wait(time) {
    time = parseInt(time) + 5000
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq1wait, time)
}

$(function () {
    $.get("/time-question1", function(response) {
        console.log("Question 1 expires", response)
        timeq1wait(response)
    })
})