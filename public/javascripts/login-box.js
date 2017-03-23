$(document).ready(function(){
    $('#login-trigger').on('click', function() {
        $(this).next('#login-content').slideToggle(100);
        $(this).toggleClass('active');                    
        
        if ($(this).hasClass('active')) $(this).find('span').css('fa-angle-right')
            else $(this).find('span').css('fa-angle-down')
        })
});