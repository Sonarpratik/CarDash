console.log("start");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", start);

let player = { speed: 3, ultimate: 5, scam: 10, score: 0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w:false,
  d:false,
  a:false,
  s:false,
};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;

  //   console.log(e.key);
  //   consol e.log(keys);
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;

  //   console.log(e.key);
}
function gamePlay() {
  // console.log("Hey I am clicked");

  let road = gameArea.getBoundingClientRect();
  // console.log(road);

  let car = document.querySelector(".car");
  if (player.start) {
    moveLines();
    moveEnemy(car);

    if ((keys.ArrowUp ||keys.w) && player.y > road.top + 200) {
      player.y -= player.ultimate;
    }
    if ((keys.ArrowDown || keys.s)&& player.y < road.bottom - 70) {
      player.y += player.ultimate;
    }
    if ((keys.ArrowLeft ||keys.a)&& player.x > 0) {
      player.x -= player.ultimate;
    }
    if ((keys.ArrowRight ||keys.d)&& player.x < road.width - 50 - 14) {
      player.x += player.ultimate;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    // console.log(player.score++);

    player.score++;
    score.innerText = "Score : " + player.score;
  }
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 1000) {
      item.y -= 1050;
    }

    item.y += player.scam;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  let ps = player.score+2;
  startScreen.innerHTML =
  "Game Over <br> Your Final Score is " +
ps +
  " <br> Press Here to Restart the Game";
  startScreen.classList.remove("hide");
  player.start = false;

};

function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    if (isCollide(car, item)) {
      console.log("boom..!!!!");
      endGame();
    }
    if (item.y >= 800) {
      item.y = -850;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    // if(Math.random()>0.5){

    //   item.y += player.speed;
    // }
    // else if(Math.random()<0.5 && Math.random()>0.2){

    //   item.y += player.scam;
    // }
    // else{
    item.y += player.speed;

    item.style.top = item.y + "px";
  });
}

const randomColor = () => {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }

  return "#" + c() + c() + c();
};
function start() {
  // gameArea.classList.remove("hide");
  gameArea.innerHTML = " ";
  score.classList.remove("hide");
  startScreen.classList.add("hide");

  for (x = 0; x < 7; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  //   car.innerText = "HEY I am your car";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  //   console.log("top position" + car.offsetTop);
  //   console.log("left position" + car.offsetLeft);

  for (x = 0; x < 7; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    enemyCar.style.background = randomColor();
    gameArea.appendChild(enemyCar);
  }
}