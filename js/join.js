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
        localStorage.setItem('name', $("#text-displayname").val())
        data = {
            name: localStorage.getItem("name"),
            icon: localStorage.getItem("icon")
        }
        str = "/join?name=" + localStorage.getItem("name") + "&icon=" + localStorage.getItem("icon")
        console.log("Calling: " + str)
        $.get(str, function(response) {
            if(response == "name_duplicate") {
                alert("Sorry, this display name is already in use. Try a different one")
            } else {
                console.log("Succesfully posted data: " + data.name + ", " + data.icon)
                window.location.href = "waiting.html"
            }
           
        })
    })
})