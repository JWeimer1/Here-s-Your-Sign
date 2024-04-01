$(function() {
    $('.progress-bar').css('width', localStorage.getItem('oxygen')+'%').attr('aria-valuenow', localStorage.getItem('oxygen'))
    
})