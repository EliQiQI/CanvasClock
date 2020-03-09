var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var endTime = new Date();
//用来设定倒计时时间距离当前时间多长,此处设置为1小时
endTime.setTime(endTime.getTime() + 3600 * 1000);
var curShowTimeSeconds = 0;

//重新console.log()方法方便调试
var sout = function (str) {
    console.log(str);
}
//定义存放彩色小球的数组
var balls = [];
//随机颜色函数
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
    //设置屏幕自适应
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    //设置距离左侧边界
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    //设置小球自适应半径
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    //设置距离顶端边界
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //定时器里绘图和更新
    setInterval(
        () => {
            render(context);
            update();
        },
        50
    )

}
//计算展示时间
var getCurrentShowTimeSeconds = function () {
    var curTime = new Date();
    //ret是倒计时时间
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000)
    ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();//改造成时钟效果
    return ret >= 0 ? ret : 0;
}
var update = function () {
    //重新计算展示时间,新的时间
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    //新的时分秒
    var nexthours = parseInt(nextShowTimeSeconds / 3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthours * 3600) / 60);
    var nextseconds = parseInt(nextShowTimeSeconds % 60);
    //旧的时分秒
    var curhours = parseInt(curShowTimeSeconds / 3600);
    var curminutes = parseInt((curShowTimeSeconds - curhours * 3600) / 60);
    var curseconds = parseInt(curShowTimeSeconds % 60);
    //不相等时候添加小球
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
        //当前显示时间重新赋值
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    //更新小球状态
    updateBalls();
}

function updateBalls() {
    balls.forEach(
        (item) => {
            item.x += item.vx;
            item.y += item.vy;
            item.vy += item.g;
            //碰撞判断
            if (item.y > WINDOW_HEIGHT - RADIUS) {
                item.y = WINDOW_HEIGHT - RADIUS;
                //转化系数,越大说明损失动能小
                item.vy = -item.vy * 0.75;
            }

        }
    )
    //性能优化,保证移出的小球从数组中清除掉
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
//添加小球的函数,对数字num添加
function addBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),//重力加速度
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,//随机的横向速度
                    vy: -5,//纵向移速
                    color: randomColor(),//随机颜色

                }
                //添加到数组
                balls.push(aBall);
            }
        }
    }
}
//绘制画面
var render = function (ctx) {
    //刷新画布
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    //得到时,分,秒
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = parseInt(curShowTimeSeconds % 60);
    //绘制每一个单数字
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);
    //绘制彩色小球
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

//绘制一个单数字的方法
var renderDigit = function (x, y, num, ctx) {
    //设置画笔的随机颜色
    ctx.fillStyle = randomColor;
    //绘制字母
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
