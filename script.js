// Tambahkan kode ini di bagian atas file script.js
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) { // Ubah navbar menjadi solid setelah scroll 50px
        nav.classList.add('solid');
    } else {
        nav.classList.remove('solid');
    }
});
// Fungsi untuk modal login
function showLogin() {
    document.getElementById('login').style.display = 'block';
}

function hideLogin() {
    document.getElementById('login').style.display = 'none';
}

// Ketika user klik di luar modal, tutup modal
window.onclick = function(event) {
    if (event.target == document.getElementById('login')) {
        hideLogin();
    }
}

// Update kode game di script.js
const gameData = [
    {
        image: '/img/kucing.jpeg',
        jawaban: 'Kucing',
        pilihan: ['Kucing', 'Anjing', 'Kelinci', 'Hamster']
    },
    {
        image: '/img/motor.jpeg',
        jawaban: 'Motor',
        pilihan: ['Mobil', 'Motor', 'Sepeda', 'Bus']
    },
    {
        image: '/img/sapi.jpeg',
        jawaban: 'Sapi',
        pilihan: ['Kambing', 'Sapi', 'Kuda', 'Ayam']
    },
    // Tambahkan data gambar lainnya
];

let currentGameIndex = 0;

function updateGame() {
    const gameCard = document.querySelector('.game-card');
    const currentGame = gameData[currentGameIndex];
    
    // Update gambar
    gameCard.querySelector('.game-image').src = currentGame.image;
    
    // Update pilihan jawaban
    const pilihanContainer = gameCard.querySelector('.pilihan-container');
    pilihanContainer.innerHTML = '';
    
    // Acak urutan pilihan
    const shuffledPilihan = [...currentGame.pilihan].sort(() => Math.random() - 0.5);
    
    shuffledPilihan.forEach(pilihan => {
        const button = document.createElement('button');
        button.className = 'pilihan-btn';
        button.textContent = pilihan;
        button.addEventListener('click', () => checkJawaban(pilihan));
        pilihanContainer.appendChild(button);
    });
}

function checkJawaban(jawaban) {
    const currentGame = gameData[currentGameIndex];
    const buttons = document.querySelectorAll('.pilihan-btn');
    
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentGame.jawaban) {
            button.classList.add('correct');
        }
        if (button.textContent === jawaban && jawaban !== currentGame.jawaban) {
            button.classList.add('wrong');
        }
    });
    
    setTimeout(() => {
        currentGameIndex = (currentGameIndex + 1) % gameData.length;
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'wrong');
        });
        updateGame();
    }, 1500);
}

// Inisialisasi game
updateGame();

// Tambahkan kode ini untuk slider huruf
const huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let currentIndex = 0;
const hurufSlide = document.querySelector('.huruf-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const playBtn = document.querySelector('.play-sound');

// Fungsi untuk memperbarui huruf yang ditampilkan
function updateHuruf() {
    hurufSlide.innerHTML = `
        <div class="huruf" data-sound="/sounds/${huruf[currentIndex].toLowerCase()}.mp3">
            ${huruf[currentIndex]}
        </div>
    `;
}

// Event listener untuk tombol next
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % huruf.length;
    updateHuruf();
});

// Event listener untuk tombol previous
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + huruf.length) % huruf.length;
    updateHuruf();
});

// Fungsi untuk memutar suara menggunakan Web Speech API
function playTextToSpeech(text, isAngka = false) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = 'id-ID'; // Bahasa Indonesia
    utterance.rate = 0.8; // Kecepatan bicara (0.1 to 10)
    utterance.pitch = 1; // Nada suara (0 to 2)
    
    // Jika yang diucapkan adalah angka
    if (isAngka) {
        utterance.text = `Angka ${text}`; // Menambahkan kata "Angka" sebelum mengucapkan angkanya
    }
    
    // Memilih suara perempuan jika tersedia
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const indonesianVoice = voices.find(voice => voice.lang === 'id-ID');
        if (indonesianVoice) {
            utterance.voice = indonesianVoice;
        }
    };

    window.speechSynthesis.speak(utterance);
}

// Update event listener untuk tombol putar suara huruf
playBtn.addEventListener('click', () => {
    const currentHuruf = document.querySelector('.huruf');
    playTextToSpeech(currentHuruf.textContent);
});

// Tambahkan event listener untuk klik langsung pada huruf
document.querySelector('.huruf-slide').addEventListener('click', () => {
    const currentHuruf = document.querySelector('.huruf');
    playTextToSpeech(currentHuruf.textContent);
});

// Inisialisasi huruf pertama
updateHuruf();

// Tambahkan kode ini untuk slider angka
const angka = '0123456789'.split('');
let currentAngkaIndex = 0;
const angkaSlide = document.querySelector('.angka-slide');
const prevBtnAngka = document.querySelector('.prev-btn-angka');
const nextBtnAngka = document.querySelector('.next-btn-angka');
const playBtnAngka = document.querySelector('.play-sound-angka');

// Fungsi untuk memperbarui angka yang ditampilkan
function updateAngka() {
    angkaSlide.innerHTML = `
        <div class="angka" data-sound="/sounds/angka${angka[currentAngkaIndex]}.mp3">
            ${angka[currentAngkaIndex]}
        </div>
    `;
}

// Event listener untuk tombol next angka
nextBtnAngka.addEventListener('click', () => {
    currentAngkaIndex = (currentAngkaIndex + 1) % angka.length;
    updateAngka();
});

// Event listener untuk tombol previous angka
prevBtnAngka.addEventListener('click', () => {
    currentAngkaIndex = (currentAngkaIndex - 1 + angka.length) % angka.length;
    updateAngka();
});

// Update event listener untuk tombol putar suara angka
playBtnAngka.addEventListener('click', () => {
    const currentAngka = document.querySelector('.angka');
    playTextToSpeech(currentAngka.textContent, true);
});

// Tambahkan event listener untuk klik langsung pada angka
document.querySelector('.angka-slide').addEventListener('click', () => {
    const currentAngka = document.querySelector('.angka');
    playTextToSpeech(currentAngka.textContent, true);
});

// Inisialisasi angka pertama
updateAngka();

const kataList = ['BOLA', 'MEJA', 'BUKU', 'PENA', 'ROTI'];
let currentKataIndex = 0;

function updateKata() {
    document.querySelector('.kata-display').textContent = kataList[currentKataIndex];
}

document.querySelector('.next-kata').addEventListener('click', () => {
    currentKataIndex = (currentKataIndex + 1) % kataList.length;
    updateKata();
});

document.querySelector('.prev-kata').addEventListener('click', () => {
    currentKataIndex = (currentKataIndex - 1 + kataList.length) % kataList.length;
    updateKata();
});

document.querySelector('.eja-btn').addEventListener('click', () => {
    const kata = kataList[currentKataIndex];
    for(let i = 0; i < kata.length; i++) {
        setTimeout(() => {
            playTextToSpeech(kata[i]);
        }, i * 1000);
    }
});

document.querySelector('.kata-btn').addEventListener('click', () => {
    playTextToSpeech(kataList[currentKataIndex]);
});

// Inisialisasi kata pertama
updateKata();

// Burger menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Tambahkan overlay ke body
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
body.appendChild(overlay);

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
});

// Menutup menu ketika overlay diklik
overlay.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
});

// Menutup menu ketika link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
});

// Konfigurasi Firebase
const firebaseConfig = {
    // Masukkan konfigurasi Firebase Anda di sini
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    // ... konfigurasi lainnya
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Fungsi untuk login dengan Google
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // Handle successful login
            console.log('Login berhasil:', result.user);
            // Tambahkan logika setelah login berhasil
        })
        .catch((error) => {
            // Handle errors
            console.error('Error:', error);
        });
}

// Update event listener untuk tombol login
document.querySelector('.login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle();
});

