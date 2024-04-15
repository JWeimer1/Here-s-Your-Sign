$(function() {
    $("#btn-host").click(function() {
        url = "/host?key=" + localStorage.getItem("key")
        $.get(url, function(response){
            window.location.href = response
        })
    })
    $("#btn-singleplayer").click(function() {
        localStorage.setItem("singleplayer", "True")
        window.location.href = "singleplayer.html"
    })
})