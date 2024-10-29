import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        modules: [Autoplay],
        spaceBetween: 24,
        slidesPerView: 10,
        loop: true,
        speed: 4000,
        // allowTouchMove: false, --> empecher l'utilisateur de scroll avec son pointeur de souris
        autoplay: {
            delay: 0,
            disableOnInteraction: false, 
        },
    });
});
