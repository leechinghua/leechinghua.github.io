const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
var ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let groundHeight = 5;
let brickArray = [];
let count = 0;
// min, max
function getRandomArbitary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visiable = true;
  }
  drawBrick() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

// 製作所有brick
for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitary(0, 950), getRandomArbitary(0, 550));
}
c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function draw() {
  // 確認球是否打到磚塊
  brickArray.forEach((brick) => {
    if (brick.visiable && brick.touchingBall(circle_x, circle_y)) {
      count++;
      brick.visiable = false;
      // 改變球(x,y)的方向速度
      if (circle_y >= brick.y + brick.height) {
        // 下方撞擊
        ySpeed *= -1;
      } else if (circle_y <= brick.y) {
        // 上方撞擊
        ySpeed *= -1;
      } else if (circle_x <= brick.x) {
        // 左方撞擊
        xSpeed *= -1;
      } else if (circle_x >= brick.x + brick.width) {
        // 右方撞擊
        xSpeed *= -1;
      }
      // 將brick從brickArray移除
      // brickArray.splice(index, 1);
      if (count == 10) {
        alert("遊戲結束");
        clearInterval(game);
      }
    }
  });
  // 確認球是否打到橘色地板
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }
  // 確認球有沒有打到邊界
  if (circle_x >= canvasWidth - radius) {
    // 更動球的座標
    // 確認右邊界
    xSpeed *= -1;
  }
  // 確認左邊界
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  // 確認上邊界
  if (circle_y <= radius) {
    ySpeed *= -1;
  }
  // 確認下邊界
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  circle_x += xSpeed;
  circle_y += ySpeed;
  //   畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  // 畫下所有brick
  brickArray.forEach((brick) => {
    if (brick.visiable) {
      brick.drawBrick();
    }
  });
  // 畫出可控制地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, groundHeight);
  //   畫出圓球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(draw, 25);
