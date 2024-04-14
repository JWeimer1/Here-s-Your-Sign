function clean_url(url) {
    //console.log("Starting url: " + url)
    let i = 0
    let temp = ""
    let slashcount = 0
    while(i < url.length) {
        if(url[i] == "/") {
            slashcount = slashcount + 1
            if(slashcount == 3) {
                i = i + 1
                while(url[i] != "." && i < url.length) {
                    temp = temp + url[i]
                    //console.log(temp)
                    i = i + 1
                }
            }

        }
        i = i + 1
    }

    //console.log(temp)
    return temp
}

$(function() {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        localStorage.setItem("ismobile?", "True")
        window.location.href = clean_url(window.location.href) + "-m.html"
        //clean_url(window.location.href)
    } else {
        //console.log("Not mobile")
        localStorage.setItem("ismobile?", "False")
    }
})