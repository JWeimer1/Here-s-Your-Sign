let clockTime

function writeClock() {
    $("#clock").text(clockTime)
    //console.log("Writing time", clockTime)
    clockTime = clockTime - 1
}

function timeoutq2() {
    $.get("/timeout-question2", function(response) {
        window.location.href = response
    })
}

function timeq2(time) {
    console.log("I am going to timeout in ", time, " ms.")
    setTimeout(timeoutq2, time)
}

$(function(){
	$.get("/time-question2", function(response) {
        console.log("Question 2 expires", response)
        timeq2(response)
        clockTime = (response) / 1000
        writeClock()
        setInterval(writeClock, 1000)
    })

    $("#a-btn").click(function(){
        $.get("/validate-question2?ans=a", function(response){
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
        $.get("/validate-question2?ans=b", function(response){
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
        $.get("/validate-question2?ans=c", function(response){
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
        $.get("/validate-question2?ans=d", function(response){
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