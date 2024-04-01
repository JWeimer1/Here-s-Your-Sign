function updateIcon(icon) {
    localStorage.setItem("icon", icon)
    console.log("Setting icon " + icon)
    document.getElementById("submit-icon").innerHTML = '<img src="/img/' + icon + '" width="100px" height="100px">'

}

$(function() {
    $("#btn-icon1").click(function() {
        updateIcon("Bella.jpg")
    })
    $("#btn-icon2").click(function() {
        updateIcon("Chester.jpg")
    })
    $("#btn-icon3").click(function() {
        updateIcon("Ghost.jpg")
    })
    $("#btn-icon4").click(function() {
        updateIcon("Gnome.jpg")
    })
    $("#btn-icon5").click(function() {
        updateIcon("minion.jpg")
    })
    $("#btn-icon6").click(function() {
        updateIcon("Odie.jpg")
    })
    $("#btn-icon7").click(function() {
        updateIcon("pig.jpg")
    })
    $("#btn-icon8").click(function() {
        updateIcon("SquishyCar.jpg")
    })
    $("#btn-submit").click(function() {

        data = {
            name: $("#text-displayname").val(),
            icon: localStorage.getItem("icon")
        }
        $.post("/join", data, function(data) {
            console.log("Succesfully posted data: " + data.name + ", " + data.icon)
            window.location.href = "waiting.html"
        })
    })
})