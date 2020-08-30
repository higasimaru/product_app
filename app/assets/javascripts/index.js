$(document).on('turbolinks:load', () => {

  $('.sub-image:first-child').addClass('active');

  $('.sub-image').on('mouseover', function() {   
    setTime = setTimeout($.proxy(function() {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
    }, this), 500);   
  }).on('mouseleave', function() {
    clearTimeout(setTime);
  });  
});