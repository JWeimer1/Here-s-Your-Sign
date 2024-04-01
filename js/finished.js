window.addEventListener('DOMContentLoaded', () => {
    $('.progress-bar').css('width', localStorage.getItem('oxygen')+'%').attr('aria-valuenow', localStorage.getItem('oxygen'))
    document.getElementById('progressvalue').textContent = localStorage.getItem('oxygen')+'%'
    })