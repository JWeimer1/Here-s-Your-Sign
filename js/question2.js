let clockTime

function writeClock() {
    $("#clock").text(Math.floor(clockTime))
    //console.log("Writing time", clockTime)
    clockTime = clockTime - 1
}

function timeoutq2() {
    $.get("/timeout-question2?name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response) {
        window.location.href = response
    })
}

function timeq2(time) {
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq2, time)
}

$(function(){
	$.get("/time-question2?singleplayer=" + localStorage.getItem('singleplayer'), function(response) {
        console.log("Question 2 expires", response)
        timeq2(response)
        clockTime = (response) / 1000
        writeClock()
        setInterval(writeClock, 1000)
    })

    $("#a-btn").click(function(){
        $.get("/validate-question2?ans=a&name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response){
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
        $.get("/validate-question2?ans=b&name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response){
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
        $.get("/validate-question2?ans=c&name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response){
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
        $.get("/validate-question2?ans=d&name=" + localStorage.getItem('name') + "&singleplayer=" + localStorage.getItem('singleplayer'), function(response){
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