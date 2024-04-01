let show = 0

function toggleChart() {
    if (show === 1) {
        $("#sign-chart").hide()
        show = 0
    } else {
        $("#sign-chart").show()
        show = 1
    }
}

$(function() {
    $("#sign-chart").hide()
    $("#btn-chart").click(toggleChart)
})