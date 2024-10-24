// Game Dino
const canvas = document.getElementById('dino-game');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 150, width: 20, height: 20, dy: 0, gravity: 0.6, jump: -10 };
let obstacles = [];
let score = 0;
let gameOver = false;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    document.getElementById('dino-game').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    obstacles = [];
    score = 0;
    gameOver = false;
    dino.y = 150;
    dino.dy = 0;
    gameLoop();
    document.addEventListener('keydown', jump);
}

function jump() {
    if (dino.y === 150) {
        dino.dy = dino.jump;
    }
}

function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.dy += dino.gravity;
    dino.y += dino.dy;

    if (dino.y >= 150) {
        dino.y = 150;
        dino.dy = 0;
    }

    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: 160, width: 20, height: 20 });
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= 5; // kecepatan obstacle

        ctx.fillStyle = 'red';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Cek tabrakan
        if (
            dino.x < obs.x + obs.width &&
            dino.x + dino.width > obs.x &&
            dino.y < obs.y + obs.height &&
            dino.height + dino.y > obs.y
        ) {
            gameOver = true;
            alert('Game Over! Skor Anda: ' + score);
            document.getElementById('dino-game').style.display = 'none';
            document.getElementById('start-button').style.display = 'block';
        }

        if (obs.x < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }

    requestAnimationFrame(gameLoop);
}
