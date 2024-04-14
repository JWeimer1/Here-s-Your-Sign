let clockTime

function writeClock() {
    $("#clock").text(Math.floor(clockTime))
    //console.log("Writing time", clockTime)
    clockTime = clockTime - 1
}

function timeoutq1() {
    $.get("/timeout-question1?name=" + localStorage.getItem('name'), function(response) {
        window.location.href = response
    })
}

function timeq1(time) {
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq1, time)
}

$(function(){
	$.get("/time-question1", function(response) {
        console.log("Question 1 expires", response)
        timeq1(response)
        clockTime = (response) / 1000
        writeClock()
        setInterval(writeClock, 1000)
    })


    $("#a-btn").click(function(){
        $.get("/validate-question1?ans=a&name=" + localStorage.getItem('name'), function(response){
            if(response == "false") {
                oxygen = localStorage.getItem('oxygen')
                oxygen = oxygen - 10
                localStorage.setItem('oxygen', oxygen)
            } else {
                window.location.href = response
            }
        });
    })
    $("#b-btn").click(function(){
        $.get("/validate-question1?ans=b&name=" + localStorage.getItem('name'), function(response){
            if(response == "false") {
                oxygen = localStorage.getItem('oxygen')
                oxygen = oxygen - 10
                localStorage.setItem('oxygen', oxygen)
            } else {
                window.location.href = response
            }
        });
    })
    $("#c-btn").click(function(){
        $.get("/validate-question1?ans=c&name=" + localStorage.getItem('name'), function(response){
            if(response == "false") {
                oxygen = localStorage.getItem('oxygen')
                oxygen = oxygen - 10
                localStorage.setItem('oxygen', oxygen)
            } else {
                window.location.href = response
            }
        });
    })
    $("#d-btn").click(function(){
        $.get("/validate-question1?ans=d&name=" + localStorage.getItem('name'), function(response){
            if(response == "false") {
                oxygen = localStorage.getItem('oxygen')
                oxygen = oxygen - 10
                localStorage.setItem('oxygen', oxygen)
            } else {
                window.location.href = response
            }
        });
    })
})