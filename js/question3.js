let clockTime

function writeClock() {
    $("#clock").text(clockTime)
    //console.log("Writing time", clockTime)
    clockTime = clockTime - 1
}

function timeoutq3() {
    $.get("/timeout-question3?name=" + localStorage.getItem('name'), function(response) {
        window.location.href = response
    })
}

function timeq3(time) {
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq3, time)
}

$(function(){
	$.get("/time-question3", function(response) {
        console.log("Question 3 expires", response)
        timeq3(response)
        clockTime = (response) / 1000
        writeClock()
        setInterval(writeClock, 1000)
    })

    $("#a-btn").click(function(){
        $.get("/validate-question3?ans=a&name=" + localStorage.getItem('name'), function(response){
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
        $.get("/validate-question3?ans=b&name=" + localStorage.getItem('name'), function(response){
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
        $.get("/validate-question3?ans=c&name=" + localStorage.getItem('name'), function(response){
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
        $.get("/validate-question3?ans=d&name=" + localStorage.getItem('name'), function(response){
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