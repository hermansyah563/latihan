const slider = document.querySelector(".slider__image");
const checks = document.querySelectorAll(".check");
let images = document.querySelectorAll(".slider__image .image");

let index = 1; // Mulai dari gambar ke-1 (bukan clone)
let total = images.length;

// Clone gambar pertama dan terakhir
const firstClone = images[0].cloneNode();
const lastClone = images[images.length - 1].cloneNode();

slider.insertBefore(lastClone, images[0]);
slider.appendChild(firstClone);

// Perbarui daftar images setelah cloning
images = document.querySelectorAll(".slider__image .image");

// Set posisi awal ke gambar ke-1
slider.style.transform = `translateX(-${index * 100}%)`;

// ✅ Fungsi update status icon aktif
function updateCheckIcon() {
  let realIndex = index - 1;
  if (realIndex >= checks.length) realIndex = 0;
  if (realIndex < 0) realIndex = checks.length - 1;

  checks.forEach((check, i) => {
    check.classList.toggle("active", i === realIndex);
  });
}

// ✅ Fungsi untuk pindah ke gambar selanjutnya
function slideGambar() {
  index++;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateCheckIcon();
}

// ✅ Event: reset posisi jika menyentuh clone pertama atau terakhir
slider.addEventListener("transitionend", () => {
  if (images[index].src === firstClone.src) {
    slider.style.transition = "none";
    index = 1;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  if (images[index].src === lastClone.src) {
    slider.style.transition = "none";
    index = images.length - 2;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
});

// ✅ Jalankan slide otomatis setiap 5 detik
let autoSlide = setInterval(slideGambar, 5000);

// ✅ Fungsi swipe: sentuh dan geser gambar
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
  startX = event.touches[0].clientX;
  isDragging = true;
  clearInterval(autoSlide); // Hentikan auto slide saat swipe
  slider.style.transition = "none"; // Nonaktifkan animasi saat swipe
}

function touchMove(event) {
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50) {
    index++;
  } else if (movedBy > 50) {
    index--;
  }

  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
  prevTranslate = -index * slider.clientWidth;
  updateCheckIcon();
  autoSlide = setInterval(slideGambar, 5000); // Lanjutkan auto slide
}

// ✅ Fitur tambahan: klik icon check untuk pindah ke gambar sesuai index
checks.forEach((check, i) => {
  check.addEventListener("click", () => {
    index = i + 1; // Tambah 1 karena ada clone di awal
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${index * 100}%)`;
    prevTranslate = -index * slider.clientWidth;
    updateCheckIcon();

    // Reset interval agar tidak langsung auto slide setelah klik
    clearInterval(autoSlide);
    autoSlide = setInterval(slideGambar, 5000);
  });
});

// ✅ Jalankan pertama kali untuk aktifkan icon
updateCheckIcon();

// gambar 2

const gambarAuto = document.querySelector(".hero__box--image");
let gambarGerak = document.querySelectorAll(".hero__box--image .gambar");

let gerak = 1;
let gerakSemua = gambarGerak.length;

const cloneUtama = gambarGerak[0].cloneNode();
const cloneAkhir = gambarGerak[gambarGerak.length - 1].cloneNode();

gambarAuto.insertBefore(cloneAkhir, gambarGerak[0]);
gambarAuto.appendChild(cloneUtama);

gambarGerak = document.querySelectorAll(".hero__box--image .gambar");

gambarAuto.style.transform = `translateX(-${gerak * 100}%)`;

function gambarGanti() {
  gerak++;
  gambarAuto.style.transition = "transform 0.5s ease-in-out";
  gambarAuto.style.transform = `translateX(-${gerak * 100}%)`;
}

gambarAuto.addEventListener("transitionend", () => {
  if (gambarGerak[gerak].src === cloneUtama.src) {
    gambarAuto.style.transition = "none";
    gerak = 1;
    gambarAuto.style.transform = `translateX(-${gerak * 100}%)`;
  }

  if (gambarGerak[gerak].src === cloneAkhir.src) {
    gambarAuto.style.transition = "none";
    gerak = gambarGerak.length - 2;
    gambarAuto.style.transform = `translateX(-${gerak * 100}%)`;
  }
});

let autoSlide2 = setInterval(gambarGanti, 5000); // atau 1000 ms sesuai kebutuhan
