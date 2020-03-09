const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 600;
const RADIUS = 8;
const MARGIN_TOP = 60;
const MARGIN_LEFT = 30;
const endTime = new Date(2020, 2, 10, 10, 0, 0);
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
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        () => {
            render(context);
            update();
            canvas.style.background = randomColor();
        },
        50
    )

}
var getCurrentShowTimeSeconds = function () {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000)
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
        

        curShowTimeSeconds = nextShowTimeSeconds;
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
