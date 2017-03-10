/**
 * Created by Administrator on 2017/3/3.
 */
//const WIDTH = 1200;
//const HEIGHT = 800;
//const RADIUS = 8;
//const LEFT = 100;
//const TOP = 300;

var endTimer = new Date();
endTimer.setTime(endTimer.getTime() + 3600 * 1000);
var curShowSeconds = 0;
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function () {
	WIDTH = document.body.clientWidth;
	HEIGHT = document.body.clientHeight;

	LEFT = Math.round(WIDTH / 10);
	RADIUS = (Math.round(WIDTH * 4 / 5 / 108)) - 1;
	TOP = Math.round(HEIGHT / 5);



	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	curShowSeconds = getCurShowSecond();
	setInterval(function () {
		render(ctx);
		update();
	}, 50)
};


function render(ctx) {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	var hours = parseInt(curShowSeconds / 3600);
	var minuter = parseInt((curShowSeconds - hours * 3600) / 60);
	var second = parseInt(curShowSeconds % 60);

	renderDight(LEFT, TOP, parseInt(hours / 10), ctx);
	renderDight(LEFT + 15 * (RADIUS + 1), TOP, parseInt(hours % 10), ctx);
	renderDight(LEFT + 30 * (RADIUS + 1), TOP, 10, ctx);

	renderDight(LEFT + 39 * (RADIUS + 1), TOP, parseInt(minuter / 10), ctx);
	renderDight(LEFT + 54 * (RADIUS + 1), TOP, parseInt(minuter % 10), ctx);
	renderDight(LEFT + 69 * (RADIUS + 1), TOP, 10, ctx);

	renderDight(LEFT + 78 * (RADIUS + 1), TOP, parseInt(second / 10), ctx);
	renderDight(LEFT + 93 * (RADIUS + 1), TOP, parseInt(second % 10), ctx);

	for ( var i = 0; i < balls.length; i++) {
		ctx.beginPath();
		ctx.fillStyle = balls[i].color;
		ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	console.log(balls.length);

}


function getCurShowSecond() {
	var curTimer = new Date();
	var ret = endTimer.getTime() - curTimer.getTime();
	ret = Math.round(ret / 1000);

	return ret >= 0 ? ret : 0;
}


function renderDight(x, y, num, ctx) {
	ctx.fillStyle = 'rgb(0,102,153)';
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] === 1) {
				ctx.beginPath();
				ctx.arc(x + j * 2 * (RADIUS+1) + (RADIUS+1), y + i * 2 * (RADIUS+1) + (RADIUS+1), RADIUS, 0, Math.PI * 2 );
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}

function update() {
	var nextShowSecond = getCurShowSecond();


	var nextHours = parseInt(nextShowSecond / 3600);
	var nextMinuter = parseInt((nextShowSecond - nextHours * 3600) / 60);
	var nextSecond = parseInt(nextShowSecond % 60);

	var curHours = parseInt(curShowSeconds / 3600);
	var curMinuter = parseInt((curShowSeconds - curHours * 3600) / 60);
	var curSecond = parseInt(curShowSeconds % 60);

	if (nextSecond != curSecond) {
		if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
			addBalls(LEFT + 0, TOP, parseInt(curHours / 10))
		}
		if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
			addBalls(LEFT + 15 * (RADIUS + 1), TOP, parseInt(curHours % 10))
		}

		if (parseInt(curMinuter / 10) != parseInt(nextMinuter / 10)) {
			addBalls(LEFT + 39 * (RADIUS + 1), TOP, parseInt(curMinuter / 10))
		}
		if (parseInt(curMinuter % 10) != parseInt(nextMinuter % 10)) {
			addBalls(LEFT + 54 * (RADIUS + 1), TOP, parseInt(curMinuter % 10))
		}

		if (parseInt(curSecond / 10) != parseInt(nextSecond / 10)) {
			addBalls(LEFT + 78 * (RADIUS + 1), TOP, parseInt(curSecond / 10))
		}
		if (parseInt(curSecond % 10) != parseInt(nextSecond % 10)) {
			addBalls(LEFT + 93 * (RADIUS + 1), TOP, parseInt(curSecond % 10))
		}
		curShowSeconds = nextShowSecond;
	}
	updateBalls();

}

function addBalls(x, y, num) {

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] === 1) {
				var eBall = {
					x: x + j * 2 * (RADIUS+1) + (RADIUS+1),
					y:y + i * 2 * (RADIUS+1) + (RADIUS+1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1,Math.floor(Math.random() * 100)) * 4,
					vy: -10,
					color: colors[Math.floor(Math.random() * colors.length)]
				};
				balls.push(eBall);
			}
		}
	}
}

function updateBalls() {
	var cnt =0;
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if (balls[i].y + RADIUS >= HEIGHT) {
			balls[i].y = HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}


	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + RADIUS < 0) {
			cnt++
		}
	}
	while(cnt) {
		balls.shift();
		cnt--;
	}
}