! function($) {

	"use strict";

	/* ---------------------------------------------- /*
    * Contact Form
    /* ---------------------------------------------- */
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    function valEl(el) {
      el.validate({
          rules: {
              email: {
                required: true,
                email: true
              },
          },
          messages: {
              email: {
                email: 'Invalid E-mail format'
              }
          },

          submitHandler: function(form) {
              $('#preloader').fadeIn();
              var $form = $(form);
              var $formId = $(form).attr('id');
              switch ($formId) {
                  case 'popupResult':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function(response) {
                              setTimeout(function() {
                                  $('#preloader').fadeOut();
                              }, 800);
                              setTimeout(function() {
                                  $('#form-overlay').fadeIn();
                                  $form.trigger('reset');
                              }, 1100);
                              $('#form-overlay').on('click', function(e) {
                                  $(this).fadeOut();
                              });

                          });
                      break;
              }
              return false;
          }
      })
    }

    $('.contact__form').each(function() {
      valEl($(this));
    });
  
}(window.jQuery);

/* ---------------------------------------------- 
 * Rewmove menu mobile
/* ---------------------------------------------- */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ---------------------------------------------- 
 * Show menu
/* ---------------------------------------------- */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Menu show
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

// Menu hidden
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* ---------------------------------------------- 
 * Scroll sections active link
/* ---------------------------------------------- */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* ---------------------------------------------- 
 * Change background header
/* ---------------------------------------------- */
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* ---------------------------------------------- 
 * Show scroll up
/* ---------------------------------------------- */
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* ---------------------------------------------- 
 * Scroll reveal animation
/* ---------------------------------------------- */
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal('.home__header, h2', {delay: 600})
sr.reveal('.home__footer', {delay: 700})
sr.reveal('.home__img', {delay: 900, origin: 'top'})

sr.reveal('.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy', {origin: 'top', interval: 100})
sr.reveal('.specs__data, .discount__animate', {origin: 'left', interval: 100})
sr.reveal('.specs__img, .discount__img', {origin: 'right'})
sr.reveal('.info__img', {origin: 'top'})
sr.reveal('.info__data')