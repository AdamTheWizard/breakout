var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy= -2;
var ballRadius = 10;

// Brick properties
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickOffSetLeft = 30;


var pageWidth = document.querySelector("body").scrollWidth;
alert(pageWidth);

function setCanvasWidth(){
    
    if (pageWidth >= 1000){
        
        canvas.setAttribute("width", "1060px");
        canvas.setAttribute("height", "640px");
        brickRowCount = 6;
        brickColumnCount = 10;
        brickWidth = 75;
        brickHeight = 20;
        brickPadding = 20;
        brickOffSetTop = 60;
        brickOffSetLeft = 60;
        
    } else if (pageWidth < 500){
        canvas.setAttribute("width", "240px");
        brickRowCount = 3;
        brickColumnCount = 3;
        brickWidth = 75;
        brickHeight = 5;
        brickPadding = 5;
        brickOffSetTop = 15;
        brickOffSetLeft = 15;
        
    }
}
setCanvasWidth();

// Paddle properties
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// keypress code
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// Make Bricks
var bricks = [];
for (c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0 };
    }
}


function keyDownHandler(e){
    if (e.keyCode == 39){
        rightPressed = true;
    } else if (e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if (e.keyCode == 39){
        rightPressed = false;
    } else if (e.keyCode == 37){
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#61dafb";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#61dafb";
    ctx.fill();
    ctx.closePath();
}
function drawBricks(){
    for (c = 0; c < brickColumnCount; c++){
        for (r = 0; r < brickRowCount; r++){
            var brickX = (c * (brickWidth + brickPadding)) + brickOffSetLeft;
            var brickY = (r * (brickHeight + brickPadding)) + brickOffSetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#61dafb";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    if (y + dy < ballRadius){
        
        dy = -dy;
        
    } else if (y + dy > canvas.height - (ballRadius + 10)){
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
        alert("game over");
        document.location.reload();
        }
    }
    
    
    
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    
}
setInterval(draw, 30);