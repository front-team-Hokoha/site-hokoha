import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        modules: [Autoplay],
        spaceBetween: 24,
        slidesPerView: 4, // Nombre de slides par défaut à afficher lorsqu'aucune règle le précise (breakpoints)
        loop: true,
        speed: 4000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false, 
        },
        breakpoints: {
            // Lorsque la largeur de la fenêtre est >= 768px
            768: {
                slidesPerView: 5,
            },
            // Lorsque la largeur de la fenêtre est >= 1280px
            1280: {
                slidesPerView: 10,
            },
        },
    });
});
