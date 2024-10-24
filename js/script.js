// js/script.js

// sambutan nama
window.onload = function() {
    var userName = prompt("Masukkan nama Anda:");
    if (userName) {
        updateWelcomeMessage(userName);
    }

    changeBackgroundImage(); 
};

// Fungsi untuk mengubah pesan selamat datang
function updateWelcomeMessage(userName) {
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = userName; 
    userNameElement.style.color = "blue"; 
    userNameElement.style.cursor = "pointer"; 

    userNameElement.onclick = function() {
        var newName = prompt("Masukkan nama baru Anda:");
        if (newName) {
            updateWelcomeMessage(newName); 
        }
    };

    document.getElementById('page-title').textContent = `Halo ${userName}, selamat datang!`;
}


// Fungsi validasi form
function validateForm(event) {
    event.preventDefault(); // Mencegah form dikirim secara otomatis

    // Ambil elemen input
    var namaInput = document.getElementById("nama");
    var tanggalInput = document.getElementById("tanggal");
    var genderInput = document.getElementById("jenis-kelamin"); // Dropdown untuk gender
    var messageInput = document.getElementById("message");

    // Inisialisasi status validasi
    let isValid = true;

    // Validasi Nama
    if (namaInput.value.trim() === "") {
        namaInput.classList.add("invalid"); // Tambahkan kelas invalid
        isValid = false;
        namaInput.focus();
    } else {
        namaInput.classList.remove("invalid"); // Hapus kelas invalid jika valid
    }

    // Validasi Tanggal
    if (tanggalInput.value.trim() === "") {
        tanggalInput.classList.add("invalid"); // Tambahkan kelas invalid
        isValid = false;
        tanggalInput.focus();
    } else {
        tanggalInput.classList.remove("invalid"); // Hapus kelas invalid jika valid
    }

    // Validasi Gender (tidak terbaca)
    if (genderInput.value === "Pilih") {
        genderInput.classList.add("invalid"); // Tambahkan kelas invalid ke dropdown
        isValid = false;
    } else {
        genderInput.classList.remove("invalid"); // Hapus kelas invalid jika valid
    }

    // Validasi Pesan
    if (messageInput.value.trim() === "") {
        messageInput.classList.add("invalid"); // Tambahkan kelas invalid ke textarea
        isValid = false;
    } else {
        messageInput.classList.remove("invalid"); // Hapus kelas invalid jika valid
    }

    // Jika validasi berhasil, tampilkan pesan
    if (isValid) {
        setMessage(namaInput.value, tanggalInput.value, genderInput.value, messageInput.value);
        alert("Form berhasil dikirim!");

        // Reset form
        document.getElementById("form-isi").reset();
    }
}

// Function to set displayed messages
function setMessage(name, birthDate, gender, message) {
    document.getElementById("sender-nama").innerHTML = name;
    document.getElementById("sender-tanggal-lahir").innerHTML = birthDate;
    document.getElementById("sender-jenis-kelamin").innerHTML = gender;
    document.getElementById("sender-message").innerHTML = message;
}

// Tambahkan event listener pada form
document.getElementById('form-isi').addEventListener('submit', validateForm);

// Slideshow functionality
const images = [
    'https://wallpapers.com/images/featured/skyscraper-8scefc1q0icwddbz.jpg',
    'https://cdn.wallpapersafari.com/67/51/e4vsLG.jpg',
    'https://statics.indozone.news/local/62aed57ed4f16.jpg'
];

let currentImageIndex = 0;
const bannerElement = document.getElementById('slideshow-banner');

// Change background image
function changeBackgroundImage() {
    bannerElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Change image every 3 seconds
setInterval(changeBackgroundImage, 3000);

// Scroll to top button functionality
var scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none"; 
    }
};

scrollToTopBtn.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'}); 
};

// Slideshow navigation functions
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = x.length; }
    
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex - 1].style.display = "block";  
}


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
