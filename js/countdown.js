var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600 * 1000);
var curShowTimeSeconds = 0;
var sout = function (str) {
    console.log(str);
}
var balls = [];
var randomColor = function () {
    var str = "rgba(";
    for (let i = 0; i < 3; i++) {
        str += parseInt(Math.random() * 256);
        str += ',';
    }
    str += '1)';
    return str;
}
window.onload = function () {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    sout(WINDOW_HEIGHT);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        () => {
            render(context);
            update();
        },
        50
    )

}
var getCurrentShowTimeSeconds = function () {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000)
    ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();//改造成时钟效果
    return ret >= 0 ? ret : 0;
}
var update = function () {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nexthours = parseInt(nextShowTimeSeconds / 3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthours * 3600) / 60);
    var nextseconds = parseInt(nextShowTimeSeconds % 60);

    var curhours = parseInt(curShowTimeSeconds / 3600);
    var curminutes = parseInt((curShowTimeSeconds - curhours * 3600) / 60);
    var curseconds = parseInt(curShowTimeSeconds % 60);

    if (nextseconds !== curseconds) {
        if (parseInt(curhours / 10) !== parseInt(nexthours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curhours / 10));
        }
        if (parseInt(curhours % 10) !== parseInt(nexthours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours % 10));
        }
        if (parseInt(curminutes / 10) !== parseInt(nextminutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes / 10));
        }
        if (parseInt(curminutes % 10) !== parseInt(nextminutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes % 10));
        }
        if (parseInt(curseconds / 10) !== parseInt(nextseconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curseconds / 10));
        }
        if (parseInt(curseconds % 10) !== parseInt(nextseconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curseconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
    // sout(balls.length);

}

function updateBalls() {
    balls.forEach(
        (item) => {
            item.x += item.vx;
            item.y += item.vy;
            item.vy += item.g;
            if (item.y > WINDOW_HEIGHT - RADIUS) {
                item.y = WINDOW_HEIGHT - RADIUS;
                item.vy = -item.vy * 0.75;
            }

        }
    )
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
    while (balls.length > Math.min(300, cnt)) {
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: randomColor(),

                }
                balls.push(aBall);
            }
        }
    }
}

var render = function (ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = parseInt(curShowTimeSeconds % 60);
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    balls.forEach(
        (item) => {
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.arc(item.x, item.y, RADIUS, 0, 2 * Math.PI, true);
            ctx.closePath();

            ctx.fill();
        }
    )
}

var renderDigit = function (x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}
