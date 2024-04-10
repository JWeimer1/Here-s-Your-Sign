function timeoutq2wait() {
    $.get("/timeout-question2wait?name=" + localStorage.getItem('name'), function(response) {
        window.location.href = response
    })
}

function timeq2wait(time) {
    time = parseInt(time) + 5000
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq2wait, time)
}

$(function () {
    $.get("/time-question2", function(response) {
        console.log("Question 2 expires", response)
        timeq2wait(response)
    })
})