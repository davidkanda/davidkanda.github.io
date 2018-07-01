$(document).ready(function () {
    $(window).on('load scroll', function () {
        var scrolled = $(this).scrollTop();
        $('#title').css({
            'transform': 'translate3d(0, ' + -(scrolled * 0.2) + 'px, 0)', // parallax (20% scroll rate)
            'opacity': 1 - scrolled / 400 // fade out at 400px from top
        });
        $('#hero-vid').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
    });

// $(document).ready(function () {
// $('.js--nav-icon').click(function() {
//         var nav = $('.js--navbar');
//         var icon = $('.js--nav-icon i');
        
//         nav.slideToggle(200);
        
//         if (icon.hasClass('ion-navicon-round')) {
//             icon.addClass('ion-close-round');
//             icon.removeClass('ion-navicon-round');
//         } else {
//             icon.addClass('ion-navicon-round');
//             icon.removeClass('ion-close-round');
//         }        
//     });