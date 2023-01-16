import Swiper, {Navigation, Pagination} from 'swiper';
Swiper.use([Navigation, Pagination]);

const sliderCertificatesList = document.querySelector('.swiper');
const activeSlides = document.getElementsByClassName('swiper-slide-active');

if (sliderCertificatesList) {
  const mySwiper = new Swiper(sliderCertificatesList, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  mySwiper.slideTo(1);
}

function setSliderAttribute() {
  if (activeSlides.length >= 1) {
    for (let el of activeSlides) {
      el.id = 'id-active-swiper-slide';
    }
    const activeSlide = document.getElementById('id-active-swiper-slide');
    const activeLink = activeSlide.children;

    for (let el of activeLink) {
      el.setAttribute('tabindex', '0');
    }
  }
}

export {setSliderAttribute};
