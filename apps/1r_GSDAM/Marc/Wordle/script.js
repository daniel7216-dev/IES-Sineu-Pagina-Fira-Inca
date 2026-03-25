const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');

// Obrir en clicar qualsevol imatge del carrusel
document.querySelectorAll('.screenshot img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
    });
});

// Tancar
closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('open');
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
});