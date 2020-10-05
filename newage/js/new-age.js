(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 40)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '#mainNav',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    });
    

    var tops = [];
    
    $('.navbar-nav .page-scroll').each(function(){
        var href = $(this).attr('href');
        
        var _top = Number($(href).position().top)-50;
        
        tops.push(_top+'|'+href);
    });
    
    tops = tops.reverse();
    
    $(document).on('scroll', function (){
        var height = $(document).scrollTop();
        
        var _remove = 'affix-top';
        var _add    = 'affix';
        if (height > 50) {
            $('#mainNav').addClass(_add).removeClass(_remove);
        }
        
        var active = '';
        for (var int = 0; int < tops.length; int++) {
            var _top = tops[int].split(/\|/);
            
            if (_top[0] < height) {
                active = _top[1];
                break;
            } else {
                $('.navbar-nav li:has(a[href="'+_top[1]+'"])').removeClass('active');
            }
        }
        
        if (active != '') {
            $('.navbar-nav li').removeClass('active');
            $('.navbar-nav li:has(a[href="'+active+'"])').addClass('active');
        }
    });

})(jQuery); // End of use strict


