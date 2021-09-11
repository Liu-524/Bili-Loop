self.onmessage = function(res) {
    while(1) {
        setTimeout(() => {this.self.postMessage("time")}, (res.end - res.start));
        
    }
}