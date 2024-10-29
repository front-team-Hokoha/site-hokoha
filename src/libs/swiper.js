import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
    const swiperContainer = document.querySelector('.swiper');
    const logoContainers = document.querySelectorAll('.logo-container');

    // Initialiser le Swiper
    const swiper = new Swiper(swiperContainer, {
        modules: [Autoplay],
        spaceBetween: 24,
        slidesPerView: 4,
        loop: true,
        speed: 4000,
        grabCursor: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            enabled: false,
        },
        breakpoints: {
            768: { slidesPerView: 5 },
            1280: { slidesPerView: 10 },
        },
    });

    // Fonction pour charger l'image
    const loadImage = (container) => {
        const logoPath = container.getAttribute('data-logo-path');
        const altText = container.getAttribute('data-alt-text');
        const img = new Image();
        img.src = logoPath; // charger l'image
        img.alt = altText;
        container.appendChild(img); // ajouter l'image au conteneur
    };

    // Observer pour charger les images lorsque le conteneur est visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    // Observer chaque conteneur de logo
    logoContainers.forEach(container => observer.observe(container));

    // Observer le conteneur swiper pour gérer l'autoplay
    const swiperObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.isIntersecting ? swiper.autoplay.start() : swiper.autoplay.stop();
        });
    });

    swiperObserver.observe(swiperContainer);
});
