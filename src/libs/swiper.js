import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
    const swiperContainer = document.querySelector('.swiper');

    // Sélectionne le div que tu veux observer
    const targetDiv = document.querySelector('.swiper');

    // Déclare la variable swiper en dehors de l'observer
    let swiper = null;

    // Crée une instance de Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Le div est dans le viewport
                // Vérifie si swiper n'est pas déjà initialisé
                if (!swiper) {
                    // Initialiser le Swiper
                    console.log('init swiper')
                    swiper = new Swiper(swiperContainer, {
                        modules: [Autoplay],
                        spaceBetween: 24,
                        slidesPerView: 4,
                        loop: true,
                        speed: 4000,
                        grabCursor: true,
                        autoplay: {
                            delay: 0,
                            disableOnInteraction: false,
                            enabled: true,
                        },
                        breakpoints: {
                            768: { slidesPerView: 5 },
                            1280: { slidesPerView: 10 },
                        },
                    });

                }
                swiper.autoplay.start();
                console.log('autoplay start');

            } else {
                // Le div n'est plus visible
                
                // Vérifie si swiper est défini avant d'essayer d'arrêter l'autoplay
                if (swiper) {
                    console.log('autoplay stop');
                    swiper.autoplay.stop();
                }
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Ajuste le margin si nécessaire
    });

    // Commence à observer le div
    observer.observe(targetDiv);
});
