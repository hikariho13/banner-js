const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;
let autoSlideTimer = null;

// ----- 1. 動態建立指示點 -----
slides.forEach((_, index) => {
const dot = document.createElement('div');
dot.classList.add('dot');
if (index === 0) dot.classList.add('active');
dot.addEventListener('click', () => goToSlide(index));
dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// ----- 2. 切換 Slide 核心邏輯 -----
function goToSlide(index) {
slides[currentIndex].classList.remove('active');
dots[currentIndex].classList.remove('active');

currentIndex = index;

slides[currentIndex].classList.add('active');
dots[currentIndex].classList.add('active');

resetAutoSlide();
}

function nextSlide() {
const newIndex = (currentIndex + 1) % slides.length;
goToSlide(newIndex);
}

function prevSlide() {
const newIndex = (currentIndex - 1 + slides.length) % slides.length;
goToSlide(newIndex);
}

// ----- 3. 3 秒自動輪播設定 -----
function startAutoSlide() {
autoSlideTimer = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
clearInterval(autoSlideTimer);
startAutoSlide();
}

startAutoSlide();

// ----- 4. 手勢滑動與滑鼠拖曳邏輯 -----
let startX = 0;
let isDragging = false;
const threshold = 50; // 判定滑動的最小距離 (px)

function getX(e) {
return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
}

function handleStart(e) {
isDragging = true;
startX = getX(e);
}

function handleEnd(e) {
if (!isDragging) return;
isDragging = false;

const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
const diffX = startX - endX;

if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
    nextSlide(); // 向左滑動 ➔ 下一張
    } else {
    prevSlide(); // 向右滑動 ➔ 上一張
    }
}
}

// 綁定觸控事件 (Mobile)
slider.addEventListener('touchstart', handleStart, { passive: true });
slider.addEventListener('touchend', handleEnd);

// 綁定滑鼠拖曳事件 (Desktop)
slider.addEventListener('mousedown', handleStart);
slider.addEventListener('mouseup', handleEnd);
slider.addEventListener('mouseleave', () => { isDragging = false; });