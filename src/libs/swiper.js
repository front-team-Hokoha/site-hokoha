import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
    const swiperContainer = document.querySelector('.swiper');



    // Sélectionne le div que tu veux observer
    const targetDiv = document.querySelector('.swiper');

    // Crée une instance de Intersection Observer
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        // Le div est dans le viewport
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
                    enabled: true,
                },
                breakpoints: {
                    768: { slidesPerView: 5 },
                    1280: { slidesPerView: 10 },
                },
            });

            // console.log('ici');

        } else {
            // Le div n'est plus visible
            console.log('Le div est hors du viewport');

            if(typeof swiper !== 'undefined' && swiper !== null) {
                swiper.autoplay.stop();
            }

        }
    });
    }, {
        rootMargin: '0px 0px 200px 0px'
    });

    // if (swiper) {
    //     // Observer le conteneur swiper pour gérer l'autoplay
    //     const swiperObserver = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             entry.isIntersecting ? swiper.autoplay.start() : swiper.autoplay.stop();
    //         });
    //     });
    // }

    // Commence à observer le div
    observer.observe(targetDiv);


    // swiperObserver.observe(swiperContainer);
});
