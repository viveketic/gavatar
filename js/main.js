//we only one single instance of app, so singleton
var Gavatar = new function() {
    var hexBox;
    var numBox;
    var seedBox;
    var canvas;
    
    var prevHex = "abcdef";
    
    var blockSize = 50;
    var avatarMargin = 20;
    var avatarCanvasSize = 290; //5*50 + 2*20
    
    this.init = function(event,hexBoxObject,numBoxObject,seedBoxObject,canvasObject) {
        hexBox = hexBoxObject;
        numBox = numBoxObject;
        seedBox = seedBoxObject;
        canvas = canvasObject;

        hexBox.value = "abcdef";
        numBox.value = "50";
        seedBox.value = "50";
        
        hexBox.onkeyup = function(event){
            draw(event);
        }

        numBox.oninput = function(event){
            draw(event)
        }

        seedBox.oninput = function(event){
            draw(event);
        }
        draw(event);
    }
    
    function draw(e) {
        var ctx = canvas.getContext("2d");
        
        if(!/^[0-9a-f]{0,6}$/i.test(hexBox.value)) {
            hexBox.value = prevHex;
            return;
        }
        
        drawPattern1(ctx, hexBox.value, numBox.value, seedBox.value);
        prevHex = hexBox.value;
    }    
    
    function drawPattern1(ctx, hex, num, seed) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, avatarCanvasSize, avatarCanvasSize);
        
        for(var x = 0; x < 3; x++) {
            for(var y = 0; y < 5; y++) {
                var r = rand(parseInt(seed) + x * 3 + y);
                if(r < num/100.0) {
                    ctx.fillStyle = "#" + hex;
                    ctx.fillRect(x * blockSize + avatarMargin, 
                                 y * blockSize + avatarMargin, 
                                 blockSize, blockSize);
                    ctx.fillStyle = "#" + hex;
                    ctx.fillRect((5 - 1 - x) * blockSize + avatarMargin, 
                                 y * blockSize + avatarMargin, 
                                 blockSize, blockSize);
                }
            }
        }
    }
}

function rand(x) {
    var z = (x<<13) ^ x;
    return (( 1.0 - ( (z * (z * z * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0)+1.0)/2.0;
}  

//Download
function download(filename, canvas) {
    var canvas = canvas;
    var canvasContext = canvas.getContext("2d");
    var imageData = 
        canvasContext.getImageData(0,0,canvas.width,canvas.height);

    var saveCanvas = document.createElement("canvas");
    saveCanvas.width = canvas.width;
    saveCanvas.height = canvas.height;
    var saveCanvasContext = saveCanvas.getContext('2d');
    saveCanvasContext.putImageData(imageData, 0, 0);
    var link = document.createElement('a'), e;
    link.download = filename;
    link.href = saveCanvas.toDataURL();
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
                         0, 0, 0, 0, 0, false, false, false, false, 0, null);
        
        link.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        link.fireEvent("onclick");
    }
}
