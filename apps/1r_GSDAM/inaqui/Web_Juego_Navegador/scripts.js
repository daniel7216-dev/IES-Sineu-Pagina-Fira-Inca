const player = document.getElementById("player");
const platforms = document.querySelectorAll(".platform");
const goal = document.getElementById("goal");

let x = 50;
let y = 0;
let velocityY = 0;
let isJumping = false;

const gravity = 0.5;
const speed = 5;
const jumpPower = -12;

const keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function gameLoop() {

  // Movimiento
  if (keys["ArrowRight"]) x += speed;
  if (keys["ArrowLeft"]) x -= speed;

  // Salto
  if (keys["Space"] && !isJumping) {
    velocityY = jumpPower;
    isJumping = true;
  }

  // Gravedad
  velocityY += gravity;
  y += velocityY;

  // Colisiones plataformas
  platforms.forEach(platform => {
    const p = platform.getBoundingClientRect();
    const pl = player.getBoundingClientRect();

    if (
      pl.bottom <= p.top + 10 &&
      pl.bottom + velocityY >= p.top &&
      pl.right > p.left &&
      pl.left < p.right
    ) {
      y = p.top - pl.height;
      velocityY = 0;
      isJumping = false;
    }
  });

  // Meta (ganar)
  const g = goal.getBoundingClientRect();
  const pl = player.getBoundingClientRect(); 

  if (
    pl.right > g.left &&
    pl.left < g.right &&
    pl.bottom > g.top &&
    pl.top < g.bottom
  ) {
    alert("🎉 ¡Ganaste!");
    location.reload();
  }

  // Aplicar posición
  player.style.transform = `translate(${x}px, ${y}px)`;

  // Cámara (scroll lateral)
  window.scrollTo(x - window.innerWidth / 2, 0);

  requestAnimationFrame(gameLoop);
}

gameLoop();