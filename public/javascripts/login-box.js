$(document).ready(function(){
    $('#login-trigger').on('click', function() {
        $(this).next('#login-content').slideToggle(100);
        $(this).toggleClass('active');                    
        
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
            else $(this).find('span').html('&#x25BC;')
        })
});