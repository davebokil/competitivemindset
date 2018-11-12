"use strict";
$(document).ready(function() {
    $('.preloader').delay(1500).fadeOut('slow');
    /*----------- mobile navigation ----------------*/
    function hideNav() {
        $('#icon-burger-menu').removeClass('open');
    }
    $('#icon-burger-menu').on('click', function() {
        $(this).toggleClass('open');
        $('.navigation').toggleClass('show-menu');
    });

    // ----------- events pjax(send,complete) -----------
    document.addEventListener('pjax:send', function() {
        NProgress.start();
        deleteNavStyle();
        hideNav();
    });



    // calls functions for pjax
    document.addEventListener('pjax:complete', function() {
        scrollPageEvent();
        NProgress.done();
        SwiperSlider();
        scroll();
        aninationText();
        tiltJs();
        // shuffleLayout();
        skillBar();
        PhotoSwipe();
        form();
        instagram();
        window.Sharer.init();
    });



    function aninationText() {
        $('.header-page-content').addClass("animated fadeInDown");
        $('.animation-content').addClass("animated fadeInUp");
    }
    aninationText();



    // -- scrollbar function -----------------------------
    function scroll() {
        var container = document.querySelector('.p_scroll');
        var ps = new PerfectScrollbar(container, {
            wheelSpeed: 2,
            minScrollbarLength: 20,
            suppressScrollX: true,
        });
    }
    scroll();

    // --- init Pjax.js -----------------------------
    var pjax = new Pjax({

        debug: false,
        analytics: true,
        cacheBust: false,
        elements: ".content-link", // default is "a[href], form[action]"
        selectors: [".bg-main", "title", ".name-page", "#pjax-container", ".navigation"],
        switches: {
            "#pjax-container": Pjax.switches.sideBySide
        },

        switchesOptions: {
            "#pjax-container": {
                classNames: {
                    // class added on the element that will be removed
                    remove: "animated time-anime fadeOut",
                    // class added on the element that will be added
                    add: "animated time-anime slideInDown"
                }
            }
        }

    });

    // Swiper Slider
    function SwiperSlider() {
        // Clients Slider
        var swiper = new Swiper('.client-slide', {
            setWrapperSize: true,
            slidesPerView: 4,
            slidesOffsetBefore: -20,
            spaceBetween: 10,
            loop: true,
            grabCursor: true,
            breakpoints: {
                768: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                376: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
            }
        });
        // Portfolio Slider
        var swiper = new Swiper('.portfolio-slider', {
            setWrapperSize: true,
            slidesPerView: 3,
            spaceBetween: 0,
            allowTouchMove: false,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: false,
                snapOnRelease: true,
                dragSize: 24,
                dragClass: 'swiper-scrollbar-drag',
            },
            breakpoints: {
                376: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: -10
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 20
                }
            }
        });
    }
    SwiperSlider();

    // // -- PhotoSwipe -----------------------------
    // function PhotoSwipe() {
    //     // Init empty gallery array
    //     var container = [];

    //     // Loop over gallery items and push it to the array
    //     $('#gallery').find('figure').each(function() {
    //         var $link = $(this).find('a'),
    //             item = {
    //                 src: $link.attr('href'),
    //                 w: $link.data('width'),
    //                 h: $link.data('height'),
    //                 title: $link.data('caption')
    //             };
    //         container.push(item);
    //     });

    //     // Define click event on gallery item
    //     $('a.link-big-img').on('click', function(event) {

    //         // Prevent location change
    //         event.preventDefault();

    //         // Define object and gallery options
    //         var $pswp = $('.pswp')[0],
    //             options = {
    //                 index: $(this).parents('figure').index(),
    //                 bgOpacity: 0.85,
    //                 showHideOpacity: true,
    //                 history: false
    //             };

    //         // Initialize PhotoSwipe
    //         var gallery = new window.PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    //         gallery.init();
    //     });
    // }

    // PhotoSwipe();

    // // -- Masonry Layout -----------------------------
    // function shuffleLayout() {
    //     var $grid = $('.js-grid');
    //     $grid.imagesLoaded(function() {
    //         // images have loaded
    //         $grid.shuffle({
    //             itemSelector: '.js-item'
    //         });
    //     });
    // }
    // shuffleLayout();

    //-- Scroll Event ----------------------------
    function scrollPageEvent() {
        var element = $(".navigation");
        var animatedTitle = $('.header-page-content');
        animatedTitle.removeClass('fadeOutDown');
        element.removeClass("navBgColor");
        $(".page-content ").scroll(function() {

            if (($(this).scrollTop()) >= 100) {
                element.addClass("navBgColor");
                animatedTitle.addClass('fadeOutDown');
            } else {
                element.removeClass("navBgColor");
                animatedTitle.removeClass('fadeOutDown');
            }
        });
    }
    scrollPageEvent();

    function deleteNavStyle() {
        var element = $(".navigation");
        element.removeClass("navBgColor");


    }

    // ------------ NProgress settings ----------
    NProgress.configure({
        showSpinner: false

    });

    // -- Tilt Function(lightweight parallax hover tilt effect) 
    function tiltJs() {
        $('.tilt-item>a').on('click', function(event){
            event.preventDefault();
            var link = $(this).attr("href");
            location.href = link;
            console.log(link);
        });
        var tilt = $('.tilt-item').tilt({
            maxTilt: 20,
            perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
            easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
            scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
            speed: 300, // Speed of the enter/exit transition.
            transition: true, // Set a transition on enter/exit.
            disableAxis: null, // What axis should be disabled. Can be X or Y.
            reset: true, // If the tilt effect has to be reset on exit.
            glare: false, // Enables glare effect
            maxGlare: 1
        });
    }
    tiltJs();

    // -- skillbar function ------------------------------
    function skillBar() {
        $('.circle').circleProgress({
            size: 143,
            thickness: 14,
            emptyFill: "#fafafa20",
            fill: {
                color: "#fafafa"
            }
        });

    }
    skillBar();

        /* Instagram
    * ------------------------------------------------------ */

        function instagram() {
                    // var accessToken = '26559007.7cf16f7.2f18b739a27446cdaa9de1ea63cfe203';
        var accessToken = '8460580465.1677ed0.15c2b860272942c08558cd41a34283ba';
        
              $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&callback=?',function (insta) {
                $.each(insta.data,function (photos,src) {
                    if ( photos === 8 ) { return false; }
                    $('<figure class="js-item column-3">' + '<div class="aspect aspect--9x80">' + '<div class="aspect__inner">' + '<a href="'+src.link+'" target="_blank">' + '<img src="' +src.images.standard_resolution.url+'"alt="" />' + '</a>').appendTo('#gallery');
                    });
              });

        }


        instagram();      
});