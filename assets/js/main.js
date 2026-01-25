(function ($) {
    'use strict';

    /*
    
Js Indexing
 -------------------
01.wow js
02. Scroll top
03.  Mobile Menu
04. Offcanvas
05. Body overlay
06. Mobile Menu
07. Counter up
08. Mouse move
09. Convert All Image to SVG
10. Set Background Image & Mask  
11. Testimonial Slider 
12.  Brand Carousel
13. Testimonial Slider Style 2
14. Back to top 
15. Preloader
    
*/

    /*--------------------------------------------
       01.wow js
  --------------------------------------------*/
    new WOW().init();

    $(document).ready(function () {
        const docHeight = $(document).height();
        const windowHeight = $(window).height();

        const comparableDistance =
            docHeight - (windowHeight + windowHeight / 2);

        function scrollTopAnim() {
            $('html, body').animate(
                {
                    scrollTop: 0,
                },
                800
            );
        }

        /*--------------------------------
        02. Scroll top
    --------------------------------*/
        $(window).scroll(function () {
            if ($(window).scrollTop() > comparableDistance) {
                $('.tz-timeline-right__scroll').text('Scroll Top');
            } else {
                $('.tz-timeline-right__scroll').text('Scroll Down');
            }
        });

        $('.tz-timeline-right__scroll').on('click', function (e) {
            e.preventDefault();
            var target = $(this).attr('href');

            if (!$('#home').length && $(window).scrollTop() < 1000) {
                $('html, body').animate(
                    { scrollTop: $(document).height() },
                    1000
                );
            } else if (!$('#home').length) {
                scrollTopAnim();
            }

            if (target === '#top') {
                scrollTopAnim();
            } else {
                let found = $('body').find('.tz-menu__link.active');
                let nextSection = found
                    .parent('li')
                    .next('li')
                    .children('a')
                    .attr('href');

                if ((nextSection === undefined) & $('#home').length) {
                    scrollTopAnim();
                }
                if (nextSection) {
                    $('html, body').animate(
                        {
                            scrollTop: $(nextSection).offset().top,
                        },
                        800
                    );
                }
            }
        });

        /*--------------------------------------
           03.  Mobile Menu
        -------------------------------------*/
        if ($('.tz-mobile-menu').length) {
            $('.tz-submenu').slideUp();
            let arrow = $('.tz-mobile-menu .has-dropdown > a');

            arrow.each(function () {
                let self = $(this);
                let arrowBtn = document.createElement('BUTTON');
                arrowBtn.classList.add('dropdown-btn');
                arrowBtn.innerHTML = "<i class='ph ph-plus'></i>";

                self.append(function () {
                    return arrowBtn;
                });

                self.find('button').on('click', function (e) {
                    e.preventDefault();
                    let self = $(this);
                    self.toggleClass('dropdown-opened');
                    self.parent().toggleClass('expanded');
                    self.parent()
                        .parent()
                        .addClass('dropdown-opened')
                        .siblings()
                        .removeClass('dropdown-opened');
                    self.parent()
                        .parent()
                        .children('.tz-submenu')
                        .slideToggle();
                });
            });
        }

        /*-----------------------------------
       04. Offcanvas
    -----------------------------------*/
        $('.tz-offcanvas-btn').on('click', function () {
            $(this).children('.ph').toggleClass('ph-list   ph-x');
            $(this).toggleClass('opened');
            $('body').toggleClass('tz-sidebar-open');
            $('.tz-menu-sidebar').toggleClass('opened');
            $('.tz-body-overlay').toggleClass('opened');
        });

        /*--------------------------------------
           05. Body overlay
    --------------------------------------*/
        $('.tz-body-overlay').on('click', function () {
            $('.tz-offcanvas-btn').removeClass('opened');
            $('.tz-offcanvas-btn').children('.ph').removeClass('ph-x');
            $('.tz-offcanvas-btn').children('.ph').addClass('ph-list');
            $(this).removeClass('opened');
            $('body').removeClass('tz-sidebar-open');
            $('.tz-menu-sidebar').removeClass('opened');
        });

        /*--------------------------------------
          06. Mobile Menu
    -------------------------------------*/

        jQuery('.tz-menu__link').onePageNav({
            wrapper: '#tz-onepage-nav',
            speed: 900,
            activeClass: 'active',
            navStop: 100, // stop before top
            navStart: 200,
        });

        /*-----------------------------------
            07. Counter up
    -----------------------------------*/
        function loadCounter() {
            if ($('.tz-cn').length) {
                $('.tz-cn').counterUp({
                    delay: 10,
                    time: 1000,
                });
            }
        }

        loadCounter();

        /*----------------------------------------
       08. Mouse move
    ----------------------------------------*/
        const tzMvParent = document.querySelector('.tz-movable__parent');
        if ($('.tz-movable__parent').length > 0) {
            tzMvParent.addEventListener('mousemove', function (e) {
                var pageX = e.clientX,
                    pageY = e.clientY;

                $.each($('.tz-movable__element'), function (index, value) {
                    this.style.webkitTransform =
                        'translateX(' +
                        pageX / 240 +
                        '%) translateY(' +
                        pageY / 40 +
                        '%)';
                    this.style.transform =
                        'translateX(' +
                        pageX / 240 +
                        '%) translateY(' +
                        pageY / 40 +
                        '%)';
                });
            });
        }

        /*-------------------------------------
       09. Convert All Image to SVG
    -------------------------------------*/
        $('img.svg').each(function () {
            var $img = $(this),
                imgID = $img.attr('id'),
                imgClass = $img.attr('class'),
                imgURL = $img.attr('src');

            $.get(
                imgURL,
                function (data) {
                    var $svg = $(data).find('svg');
                    if (typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass);
                    }
                    $svg = $svg.removeAttr('xmlns:a');
                    $img.replaceWith($svg);
                },
                'xml'
            );
        });
        //

        /*------------------------------------------------
          10. Set Background Image & Mask   
    ------------------------------------------------*/
        if ($('[data-bg-src]').length > 0) {
            $('[data-bg-src]').each(function () {
                var src = $(this).attr('data-bg-src');
                $(this).css('background-image', 'url(' + src + ')');
                $(this).removeAttr('data-bg-src').addClass('background-image');
            });
        }

        if ($('[data-mask-src]').length > 0) {
            $('[data-mask-src]').each(function () {
                var mask = $(this).attr('data-mask-src');
                $(this).css({
                    'mask-image': 'url(' + mask + ')',
                    '-webkit-mask-image': 'url(' + mask + ')',
                });
                $(this).addClass('bg-mask');
                $(this).removeAttr('data-mask-src');
            });
        }
    });

    /*------------------------------------
        11. Testimonial Slider
--------------------------------------*/
    const testimonialSliderStyle1 = $('.tz-testimonial1__slider');
    if (testimonialSliderStyle1.length) {
        new Swiper('.tz-testimonial1__slider', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: true,
            autoplay: {
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.tz-testimonial1__next',
                prevEl: '.tz-testimonial1__prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 1,
                },
                1400: {
                    slidesPerView: 2,
                },
            },
        });
    }

    /*--------------------------------------
       12.  Brand Carousel
  --------------------------------------*/
    const brandCarousel = $('.brand-carousel');
    if (brandCarousel.length) {
        new Swiper('.brand-carousel', {
            speed: 4000,
            spaceBetween: 30,
            observerUpdate: true,
            loop: true,
            autoplay: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 2,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4,
                },
            },
        });
    }

    /*-----------------------------------------
        13. Testimonial Slider Style 2
  -----------------------------------------*/
    const testimonialSliderStyle2 = $('.tz-testimonial2__slider');
    if (testimonialSliderStyle2.length) {
        new Swiper('.tz-testimonial2__slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            // pagination: {
            //     el: '.swiper-pagination',
            //     clickable: true,
            // },
            navigation: {
                nextEl: '.tz-testimonial2__next',
                prevEl: '.tz-testimonial2__prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 1,
                },
                1400: {
                    slidesPerView: 1,
                },
            },
        });
    }

    /*-----------------------------------
         14. Back to top    
      -----------------------------------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $('#back-top').addClass('show');
        } else {
            $('#back-top').removeClass('show');
        }
    });

    $('#back-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    /*-----------------------------------
            15. Preloader
        -----------------------------------*/
    $(window).on('load', function () {
        const preloader = $('.tz-preloader');
        preloader.addClass('loaded');

        setTimeout(() => {
            preloader.fadeOut();
        }, 500);
    });
})(jQuery);



// form validation contact 

const form = document.getElementById('form');
const btn = document.getElementById('button');

function validateField(input, errorMessage, regex = null) {
    const errorElement = document.getElementById(`${input.id}-error`);
    const value = input.value.trim();
    if (value === '') {
        errorElement.textContent = errorMessage;
    } else if (regex && !regex.test(value)) {
        errorElement.textContent = errorMessage;
    } else {
        errorElement.textContent = '';
    }
}

function validateContact(input) {
    const errorElement = document.getElementById('contact-error');
    const value = input.value.trim();
    if (value === '') {
        errorElement.textContent = 'Contact number is required.';
    } else if (!/^\d+$/.test(value)) {
        errorElement.textContent = 'Only numbers are allowed.';
    } else if (/^[1-5]/.test(value)) {
        errorElement.textContent = 'Invalid number! Start with 6 to 9 only.';
    } else if (/^[6-9]/.test(value) && value.length < 10) {
        errorElement.textContent = 'Please enter 10 digits.';
    } else if (/^[6-9]\d{9}$/.test(value)) {
        errorElement.textContent = '';
    } else {
        errorElement.textContent = 'Invalid contact number.';
    }
}

function validateEmail(input) {
    const errorElement = document.getElementById('mail-error');
    const value = input.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (value === '') {
        errorElement.textContent = 'Please enter the mail.';
    } else if (!emailRegex.test(value)) {
        errorElement.textContent = 'Invalid mail! Email must end with @gmail.com.';
    } else {
        errorElement.textContent = '';
    }
}

document.getElementById('name').addEventListener('input', function () {
    validateField(this, 'Name is required.');
});

document.getElementById('mobile').addEventListener('input', function () {
    validateContact(this);
});

document.getElementById('mail').addEventListener('input', function () {
    validateEmail(this);
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let valid = true;

    validateField(document.getElementById('name'), 'Name is required.');
    validateContact(document.getElementById('mobile'));
    validateEmail(document.getElementById('mail'));

    document.querySelectorAll('.error').forEach(error => {
        if (error.textContent !== '') valid = false;
    });

    if (valid) {
        btn.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_ergaxzt';

        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                btn.value = 'Submit';

                // Clear input fields
                document.getElementById('name').value = '';
                document.getElementById('mobile').value = '';
                document.getElementById('mail').value = '';
                document.getElementById('message').value = '';

                // Show toast message
                Toastify({
                    text: "Form Submitted Successfully!",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#4CAF50",
                }).showToast();
            }, (err) => {
                btn.value = 'Submit';
                alert(JSON.stringify(err));
            });
    }
});