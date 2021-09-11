window.onload = function () {
    document.getElementById("submitbtn").onclick = submitLoop;
    document.getElementById("start-time").placeholder = '00:00:00';
    document.getElementById("end-time").placeholder = '00:00:00'
}
function parseTime(t) {
    var ss = t.split(':')
    var sum = 0
    if (ss.length == 2) {
        sum = parseInt(ss[0]) * 60 + parseInt(ss[1])
    } else {
        sum = parseInt(ss[0]) * 3600 + parseInt(ss[1]) * 60 + parseInt(ss[0])
    }
    return sum
}
function submitLoop() {
    var stime = parseTime($('#start-time').val())
    var etime = parseTime($('#end-time').val())

    chrome.tabs.query({
        active: true,
        currentWindow: true,
        url : "https://*.bilibili.com/*"
    }, (tabs) => {
        let message = {
            action: "set123123",
            start : stime,
            end : etime
        }
        chrome.tabs.sendMessage(tabs[0].id, message, res => {
            if (res !== 'ack ok') {
                alert(res)
            }
        })
    })
}