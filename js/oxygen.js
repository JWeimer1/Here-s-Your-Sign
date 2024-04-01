$(function() {
    setInterval(function () {
        oxygen = localStorage.getItem('oxygen')
        oxygen = oxygen - 1
        localStorage.setItem('oxygen', oxygen)
        console.log("oxygen: " + localStorage.getItem('oxygen'))
        $('.progress-bar').css('width', localStorage.getItem('oxygen')+'%').attr('aria-valuenow', localStorage.getItem('oxygen'))
    }, 1000);
})