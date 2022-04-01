class Canvas {
	constructor({ canvasId, w, h, fillStyle, backgroundColor }) {
		this.eCanvas = document.getElementById(canvasId);
		this.resize(w, h);
		this.ctx = this.eCanvas.getContext("2d");
		this.cx = this.w / 2;
		this.cy = this.h / 2;
		this.r = 150;
		this.fillStyle = fillStyle;
		this.backgroundColor = backgroundColor;
	}

	resize(w, h) {
		this.w = w;
		this.h = h;
		this.cx = this.w / 2;
		this.cy = this.h / 2;
		this.eCanvas.width = w;
		this.eCanvas.height = h;
	}
}
let tt = 0
var mousePos = {
	x: 0,
	y: 0
};

function mousemove(evt) {
	mousePos.x = evt.x;
	mousePos.y = evt.y;
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

document.addEventListener("DOMContentLoaded", () => {
	let w = window.innerWidth;
	let h = window.innerHeight;

	const canvas = new Canvas({
		canvasId: "canvas",
		w: w,
		h: h,
		backgroundColor: `#000000`,
		fillStyle: "#FF3636"
	});

	const canvas2 = new Canvas({
		canvasId: "canvas2",
		w: w,
		h: h,
		backgroundColor: "#ffffff",
		fillStyle: "#000000"
	});

	canvas.draw = function() {
		ctx = this.ctx;
		requestAnimationFrame(() => {
			this.draw(ctx);
		});

		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.lineWidth = 5;
		ctx.font = "bold 100px Montserrat";
		text = "Monoame";
		var textWidth = ctx.measureText(text).width;
		var textHeight = parseInt(ctx.font.match(/\d+/), 10);
		ctx.fillText("Monoame", this.cx - textWidth / 2, this.cy - textHeight / 2);
		ctx.fillText("Studio", this.cx - textWidth / 2, this.cy + textHeight / 2);
	};

	canvas2.draw = function() {
		tt++
		ctx = this.ctx;
		requestAnimationFrame(() => {
			this.draw(this.ctx);
		});
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.beginPath();

		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 5;
		ctx.font = "bold 100px Montserrat";
		text = "Monoame";
		var textWidth = ctx.measureText(text).width;
		var textHeight = parseInt(ctx.font.match(/\d+/), 10);
		ctx.fillText("Monoame", this.cx - textWidth / 2, this.cy - textHeight / 2);
		ctx.fillText("Studio", this.cx - textWidth / 2, this.cy + textHeight / 2);

		ctx.globalCompositeOperation = "destination-out";
		ctx.fillStyle = "rgba(255, 0, 0, 1)";
		ctx.save();
		ctx.translate(mousePos.x,mousePos.y)
		
		for(var i=0;i<360;i++){
			let deg = i/360*(Math.PI*2) 
			let ttt = tt/10;
			let r = 200 + Math.sin( deg*4 + ttt )*(10 + 10*Math.sin(ttt))
						+ Math.sin( deg*1 + ttt )*(10 + 5*Math.sin(ttt))
						+ Math.sin( deg*2 + ttt )*(20 + 10*Math.sin(ttt))
						+ Math.sin( deg*3 + ttt )*(20 + 8*Math.sin(ttt))
						+ Math.sin( deg*5 + ttt )*(20 + 10*Math.sin(ttt))
			ctx.lineTo(r*Math.cos(deg),r*Math.sin(deg) )
		}
		ctx.restore();
		// ctx.arc(mousePos.x, mousePos.y, this.r, 0, Math.PI * 2, false);
		ctx.fill();

		ctx.globalCompositeOperation = "source-over";
		ctx.closePath();
	};

	canvas.draw();
	canvas2.draw();

	window.addEventListener("mousemove", mousemove);

	window.addEventListener("resize", () => {
		w = window.innerWidth;
		h = window.innerHeight;
		canvas.resize(w, h);
		canvas2.resize(w, h);
	});
});
