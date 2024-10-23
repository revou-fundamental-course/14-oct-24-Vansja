window.onload = function() {
    // Meminta nama pengguna
    var userName = prompt("Masukkan nama Anda:");
    if (userName) {
        updateWelcomeMessage(userName);
    }

    changeBackgroundImage(); 
};

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

function validateForm(event) {
    event.preventDefault(); 

    var namaInput = document.getElementById("nama");
    var tanggalInput = document.getElementById("tanggal");
    var namaBubble = namaInput.nextElementSibling; 
    var tanggalBubble = tanggalInput.nextElementSibling;

    let isValid = true; 
    
    // Validasi Nama
    if (namaInput.value.trim() === "") {
        namaInput.classList.add("invalid"); 
        namaBubble.style.display = "block"; 
        isValid = false;
        namaInput.focus(); // Fokus pada input nama
    } else {
        namaInput.classList.remove("invalid"); 
        namaBubble.style.display = "none"; 
    }

    // Validasi Tanggal
    if (tanggalInput.value.trim() === "") {
        tanggalInput.classList.add("invalid"); 
        tanggalBubble.style.display = "block"; 
        isValid = false;
        if (isValid) {
            tanggalInput.focus(); // Fokus pada input tanggal
        }
    } else {
        tanggalInput.classList.remove("invalid"); 
        tanggalBubble.style.display = "none"; 
    }

    // Jika valid, tampilkan alert dan reset form
    if (isValid) {
        alert("Nama berhasil dikirim: " + namaInput.value + "\nTanggal Lahir: " + tanggalInput.value);
        document.getElementById("form-isi").reset();
        namaBubble.style.display = "none"; 
        tanggalBubble.style.display = "none"; 
    }
}

// Event listeners untuk form
document.getElementById('form-isi').addEventListener('submit', validateForm);
document.getElementById('nama').addEventListener('input', function() {
    this.classList.remove('invalid');
    this.nextElementSibling.style.display = 'none';
});
document.getElementById('tanggal').addEventListener('input', function() {
    this.classList.remove('invalid');
    this.nextElementSibling.style.display = 'none';
});

// Array URL gambar untuk slideshow background
const images = [
    'https://png.pngtree.com/thumb_back/fh260/background/20230416/pngtree-building-looking-up-at-the-background-of-high-rise-buildings-image_2394729.jpg',
    'https://media.istockphoto.com/id/511061090/id/foto/gedung-kantor-bisnis-di-london-inggris.jpg?b=1&s=612x612&w=0&k=20&c=FSjmeAkmZpXFg4BLfdTYLfxkMm5kqIW-HuwIpsauTL0=',
    'https://statics.indozone.news/local/62aed57ed4f16.jpg'
];

let currentImageIndex = 0;
const bannerElement = document.getElementById('slideshow-banner');

// Fungsi untuk mengganti gambar background
function changeBackgroundImage() {
    bannerElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Mengganti gambar setiap 3 detik
setInterval(changeBackgroundImage, 3000);

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



var scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; // Tampilkan tombol saat di-scroll ke bawah
    } else {
        scrollToTopBtn.style.display = "none"; // Sembunyikan tombol saat di atas
    }
};

scrollToTopBtn.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'}); // Scroll ke atas dengan efek halus
};