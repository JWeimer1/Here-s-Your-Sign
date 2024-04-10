function oxygen() {
    oxygen = localStorage.getItem('oxygen')
    oxygen = oxygen - 1
    localStorage.setItem('oxygen', oxygen)
    console.log("oxygen: " + localStorage.getItem('oxygen'))
    $('.progress-bar').css('width', localStorage.getItem('oxygen')+'%').attr('aria-valuenow', localStorage.getItem('oxygen'))
    /*data = {
        name: localStorage.getItem('name'),
        oxygen: localStorage.getItem('oxygen')
    }
    console.log("Data looks like this: " + data)
    $.post("/decrement-oxygen", data, function(data) {
        console.log("Decremented oxygen")
    })*/
    str = "/decrement-oxygen?name=" + localStorage.getItem('name') + "&oxygen=" + localStorage.getItem('oxygen')
    console.log("Would have called: " + str)
    /*$.get(str, function(response) {
        console.log("Decremented oxygen")
    })
    */
}

function getOxygen() {
    str = "/get-oxygen?name=" + localStorage.getItem('name')
    // "/get-oxygen?name=Micah"
    $.get(str, function(response) {
        localStorage.setItem('oxygen', response)
    })
}

$(function() {
    setInterval(oxygen, 1000);
})