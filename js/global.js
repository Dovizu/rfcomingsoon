// preloader
$(window).load(function () {
    'use strict';

    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");

    // home animations
    $('.site-logo').transition({ opacity: 1, y: '40px', delay: 800, duration: 500 });
    $('.home-h1').transition({ opacity: 1, y: '-70px', delay: 1500, duration: 500 });
    $('.home-h2').transition({ opacity: 1, y: '-70px', delay: 2000, duration: 500 });
    $('.subscribe-text').transition({ scale: 0 });
    $('.subscribe-text').transition({ opacity: 1, scale: 1, delay: 2500, duration: 500 });
});

$(function () {
     "use strict";

    // call background image plugin
    $.supersized({
        slides: [{ image: 'images/background.jpg' }]
    });
    
    // Show/hide page content on click
    $('.main-content').each(function () {
        $(this).find('section:lt(1)').show()
    })

    $('.tabs a').click(function () {
        var index = $('.tabs a').index(this);
        $('.main-content').children().hide().eq(index).fadeIn(500);

    });

    $('.subscribe-text').click(function () {
        $('.subscribe-text').hide();
        $('.subscribe-form').addClass('show');
        $('.subscribe-form').transition({ perspective: '100px', rotateX: '360deg', opacity: 1, duration: 500 });
        $('#subscribe-email').focus();
    });

    // about animations
    $('.social-media a').hover(function () {
        $(this).find('.fa').stop().transition({ rotateY: '360deg' });
    }, function () {
        $(this).find('.fa').stop().transition({ rotateY: '720deg' });
    });

    // disable home page animations for mobile
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('.subscribe-text, .site-logo, .home-h1, .home-h2').addClass('notransition');
       
        $('.subscribe-text').click(function () {
            $('.subscribe-text').hide();
            $('.subscribe-form').addClass('opacity-full');
            $('.subscribe-form').addClass('show');
        });
    }

    $('.tabs a').hover(function () {
        $(this).find('span').stop().transition({ opacity: 1, y: '-40px', duration: 500 });
    }, function () {
        $(this).find('span').stop().transition({ opacity: 0, y: '40px', duration: 500 });
    });


    // logo click
    $('.site-logo').on('click', function () {
        $('.tab-b-content').hide();
        $('.tab-c-content').hide();
        $('.tab-a-content').fadeIn();
         $('.container-full').removeClass('tab-b-background');
    });

    // tab a click
    $('.tabs .a').on('click', function () {
       $('.container-full').removeClass('tab-b-background');
       $('.site-logo').show()
    });

    // tab b click
    $('.tabs .b').on('click', function () {
        $('#st-accordion').accordion({
            oneOpenedItem: true
        });
       $('.container-full').addClass('tab-b-background');
       $('.site-logo').hide()
    });

    // tab c click
    $('.tabs .c, .show-tab-c').on('click', function () {
         $('#google-map').css('height', $('.wrap').height());
       $('.tab-a-content').hide();
        $('.tab-b-content').hide();
        $('.tab-c-content').fadeIn();
        $('.container-full').removeClass('tab-b-background');
        $('.site-logo').hide()
    });


   // Subscribe
    $('#subscribe-submit').click(function () {
        $('.subscribe-error-field').hide();
        $('.subscribe-message').hide();

        var emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var emailVal = $('#subscribe-email').val();

        if (emailVal == "" || emailVal == "Email Address *") {
            $('.subscribe-error-field').html('<i class="fa fa-times"></i>Your email address is required.').fadeIn();
            return false;

        } else if (!emailReg.test(emailVal)) {
            $('.subscribe-error-field').html('<i class="fa fa-times"></i>Invalid email address.').fadeIn();
            return false;
        }

        var data_string = $('.subscribe-form').serialize();


        $.ajax({
            type: "POST",
            url: "subscribe.php",
            data: data_string,

            //success
            success: function (data) {
                $('.subscribe-message').html('<i class="fa fa-check contact-success"></i>Thank you! You have been subscribed.').fadeIn();
            },
            error: function (data) {
                $('.subscribe-message').html('<i class="fa fa-times contact-error"></i>Something went wrong, please try again later.').fadeIn();
            }

        }) //end ajax call
        return false;
    });

    // Contact
    $('#contact-submit').click(function () {
        $('.contact-error-field').hide();

        var nameVal = $('input[name=name]').val();
        var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        var emailVal = $('#contact-email').val();
        var messageVal = $('textarea[name=message]').val();

        //validate

        if (nameVal == '' || nameVal == 'Name *') {
            $('.contact-error-field').html('<i class="fa fa-times"></i>Your name is required.').fadeIn();
            return false;
        }
        if (emailVal == "" || emailVal == "Email Address *") {

            $('.contact-error-field').html('<i class="fa fa-times"></i>Your email address is required.').fadeIn();
            return false;

        } else if (!emailReg.test(emailVal)) {

            $('.contact-error-field').html('<i class="fa fa-times"></i>Invalid email address.').fadeIn();
            return false;
        }
        if (messageVal == '' || messageVal == 'Message *') {
            $('.contact-error-field').html('<i class="fa fa-times"></i>Please provide a message.').fadeIn();
            return false;
        }

        var data_string = $('.contact-form').serialize();

        $('.contact-error-field').fadeOut();

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: data_string,

            //success
            success: function (data) {
                $('.contact-message').html('<i class="fa fa-check contact-success"></i>Your message has been sent.').fadeIn();
            },
            error: function (data) {
                $('.contact-message').html('<i class="fa fa-times contact-error"></i>Something went wrong, please try again later.').fadeIn();
            }

        }) //end ajax call
        return false;
    });



});

 // google map
function initialize() {
    'use strict';

     $('.tabs .c, .show-tab-c').bind('click', function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
     });

    var myLatLng = new google.maps.LatLng(27.86336, -101.130738);

    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);

    new google.maps.Marker({
        map: map,
        icon: {
            path: fontawesome.markers.MAP_MARKER,
            scale: 0.5,
            strokeWeight: 0,
            strokeColor: 'transparent',
            strokeOpacity: 0,
            fillColor: '#b57dcd',
            fillOpacity: 1,
        },
        clickable: false,
        position: myLatLng

    });
}
google.maps.event.addDomListener(window, "load", initialize);