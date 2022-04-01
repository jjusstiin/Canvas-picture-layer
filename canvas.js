let w = window.innerWidth;//banner寬度
let h = window.innerHeight;//banner高度
let picUnder = "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3769021.jpg&fm=jpg"; //底層的照片
let picUpper = "https://images.pexels.com/photos/7236839/pexels-photo-7236839.jpeg?cs=srgb&dl=pexels-thirdman-7236839.jpg&fm=jpg"; //上層的照片
let title1 = "FishBrain"; //第一行文字
let title2 = "Studio"; //第二行文字
let titleUnderColor = "#ffff"; //下層文字顏色
let titleUpperColor = "brown"; //上層文字顏色
let fontFamily = "Montserrat"; //字型
let fontPx = "100px"; //字體大小
let fontWeight = "bold"; //字體粗細
let holeSize = 100; //透明區域大小
let tartgetStyle = "1";  //(Bug:輸入文字格式就會變十字)

//下層圖片
let canvasUn = document.getElementById("canvasUn")
let ctxUn = canvasUn.getContext("2d");
ctxUn.canvas.width  = w;
ctxUn.canvas.height = h;

let imgUnder = new Image();
imgUnder.onload=start;
imgUnder.src = picUnder;
function start(){
    ctxUn.drawImage(imgUnder,0,0,w,h);

    ctxUn.fillStyle = titleUnderColor;
    ctxUn.font = `${fontWeight} ${fontPx} ${fontFamily}`;
    text = title1;
    var textWidth = ctxUn.measureText(text).width;
    var textHeight = parseInt(ctxUn.font.match(/\d+/), 10);
    ctxUn.fillText(title1, (w - textWidth) / 2, (h - textHeight) / 2);
    ctxUn.fillText(title2, (w - textWidth) / 2, (h + textHeight) / 2);
    upperLoad();
}


// 上層圖片
function upperLoad(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.canvas.width  = w;
    ctx.canvas.height = h;

    let imgUpper = new Image();
    imgUpper.src = picUpper;
    ctx.drawImage(imgUpper,0,0,w,h);

    ctx.fillStyle = titleUpperColor;
    ctx.font = `${fontWeight} ${fontPx} ${fontFamily}`;
    text = title1;
    var textWidth = ctx.measureText(text).width;
    var textHeight = parseInt(ctx.font.match(/\d+/), 10);
    ctx.fillText(title1, (w - textWidth) / 2, (h - textHeight) / 2);
    ctx.fillText(title2, (w - textWidth) / 2, (h + textHeight) / 2);

    ctx.globalCompositeOperation = "destination-out";
    
    ctx.translate(mousePos.x,mousePos.y)

    // 透明區域公式(本來想做隨機波浪)
    for(var i=0; i<360; i++) {
        let deg =i*(Math.PI*2/360) 
        let x = holeSize + Math.cos(deg)+tartgetStyle;
        let y = holeSize - Math.sin(deg)+tartgetStyle;        
        ctx.lineTo(x*Math.cos(deg),y*Math.sin(deg))
    }
    
    ctx.fill()

    requestAnimationFrame(upperLoad);
}

//滑鼠初始位置
var mousePos = {
    x: 0,
    y: 0
};

function mousemove(e) {
    mousePos.x = e.x;
    mousePos.y = e.y;
    upperLoad();
}

window.addEventListener("mousemove", mousemove);