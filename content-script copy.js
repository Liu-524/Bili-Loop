

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
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	alert("activated")
	if (request.action !== 'set123123') return
	// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
	//if (timerworker) {
	//	timerworker.terminate();
	//}
	console.log(request.start)
	sendResponse("ack ok");
	window.commentAgent.seek(res.start)
	$('.bilibili-player-video-time-now').onchanged = function() {
		if (parseTime(self.text()) == res.end) {
			window.commentAgent.seek(res.start)
		}
	}
	/**  
	timerworker = new Worker('timer-worker.js');
	timerworker.postMessage(request)
	timerworker.onmessage = function(msg) {
		window.commentAgent.seek(res.start)
	}
	*/
});