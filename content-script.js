function parseTime(t) {

    var ss = t.replace(/：/,":").split(":");
    var sum = 0;
	
	if (ss.length == 1) {
		sum = parseInt(ss[0]);
	}
    if (ss.length == 2) {
        sum = parseInt(ss[0]) * 60 + parseInt(ss[1]);
    } else {
        sum = parseInt(ss[0]) * 3600 + parseInt(ss[1]) * 60 + parseInt(ss[2]);
    }
    return sum;
}



var i = -99;
var mytimeout = null;
function myLoop(s,e) {        
	mytimeout = setTimeout(function() {    
	  i++;
	  if (i > 0) {
	  	window.commentAgent.seek(s);                  
		myLoop(s,e); 
	  }                   
	}, (e-s) * 1000);
}

function ui_setup() {
	try {
		setTimeout(function() {
			var tar = document.getElementsByClassName("ops")[0];//original: rigth-btn
			if (tar) {
				var start = document.createElement('input');
				start.className = 'bilibili-player-video-time-seek';
				start.id = 'start';
				start.placeholder = 's00:00:00';
				start.style.width='auto'
				var end = document.createElement('input');
				end.className = 'bilibili-player-video-time-seek';
				end.id = 'end';
				end.placeholder = "e00:00:00";
				end.style.width='auto'
				var submit = document.createElement('button');
				submit.className = 'bui bui-button';
				submit.id = 'submitloop';
				submit.textContent = "Loop";
				var stop = document.createElement('button');
				stop.className = 'bui bui-button';
				stop.textContent = "Stop Loop";
				stop.id = 'break';
				tar.appendChild(start);
				tar.appendChild(end);
				tar.appendChild(submit);
				tar.appendChild(stop);
				document.getElementById('submitloop').onclick = function() {
					var starttime = parseTime(document.getElementById('start').value);
					var endtime = parseTime(document.getElementById('end').value);
					//console.log(starttime)
					//console.log(endtime)
					window.commentAgent.seek(starttime);
					i = 0;
					if (mytimeout) {
						clearTimeout(mytimeout);
						mytimeout = null;
					}
					myLoop(starttime, endtime);
				}
				
				document.getElementById('break').onclick = function() {
					i = -99;
					clearInterval(mytimeout);
					mytimeout = null;
				}
			}
			
		},3000);
	} catch (error){}
}

document.addEventListener("load", ui_setup());

var pushState = history.pushState;
history.pushState = function () {
    if (mytimeout) {
		clearInterval(mytimeout);
	}
	return pushState.apply(history, arguments);
};