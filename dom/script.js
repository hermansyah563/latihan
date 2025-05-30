

const slider = document.querySelector(".slider__image");
const checks = document.querySelectorAll(".check");
let images = document.querySelectorAll(".slider__image .image");

let index = 1; // mulai dari gambar ke-1 (bukan clone)
let total = images.length;

// Clone first dan last image
const firstClone = images[0].cloneNode();
const lastClone = images[images.length - 1].cloneNode();

slider.insertBefore(lastClone, images[0]);
slider.appendChild(firstClone);

// Perbarui list images setelah cloning
images = document.querySelectorAll(".slider__image .image");

// Set posisi awal
slider.style.transform = `translateX(-${index * 100}%)`;

function updateCheckIcon() {
  let realIndex = index - 1;
  if (realIndex >= checks.length) realIndex = 0;
  if (realIndex < 0) realIndex = checks.length - 1;

  checks.forEach((check, i) => {
    check.classList.toggle("active", i === realIndex);
  });
}

function slideGambar() {
  index++;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateCheckIcon();
}

// Saat transisi selesai, cek dan reset posisi jika perlu
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

// Jalankan otomatis slide setiap 5 detik
let autoSlide = setInterval(slideGambar, 5000);

// --- TAMBAHAN UNTUK SWIPE ---

let startX = 0;      // posisi awal usap (x)
let isDragging = false; // status sedang drag/swipe
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
  // Simpan posisi awal saat jari mulai menyentuh layar
  startX = event.touches[0].clientX;
  isDragging = true;

  // Hentikan transisi otomatis saat user mulai swipe
  clearInterval(autoSlide);

  // Hapus transisi agar geser langsung saat swipe (follow jari)
  slider.style.transition = "none";
}

function touchMove(event) {
  if (!isDragging) return;

  // Posisi jari saat bergerak
  const currentX = event.touches[0].clientX;

  // Hitung jarak geser
  const deltaX = currentX - startX;

  // Hitung translate slider saat geser (dalam px)
  currentTranslate = prevTranslate + deltaX;

  // Update posisi slider sesuai gerakan jari
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
  isDragging = false;

  // Hitung jarak geser akhir
  const movedBy = currentTranslate - prevTranslate;

  // Jika geser lebih dari 50px ke kiri, lanjut ke gambar selanjutnya
  if (movedBy < -50) {
    index++;
  }
  // Jika geser lebih dari 50px ke kanan, kembali ke gambar sebelumnya
  else if (movedBy > 50) {
    index--;
  }

  // Reset posisi translate ke gambar sesuai index sekarang
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;

  // Update posisi translate untuk swipe berikutnya
  prevTranslate = -index * slider.clientWidth;

  // Update icon checkbox
  updateCheckIcon();

  // Mulai lagi slide otomatis setelah swipe
  autoSlide = setInterval(slideGambar, 5000);
}
