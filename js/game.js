$(function() {
    $("#btn-host").click(function() {
        url = "/host?key=" + localStorage.getItem("key")
        $.get(url, function(response){
            window.location.href = response
        })
    })
})