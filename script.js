$(document).ready(function() {
  // "scroll back to top" link
  window.onscroll = function() {
    scrollFunction();
  };
  function scrollFunction() {
    if ($('body').scrollTop > 200 || document.documentElement.scrollTop > 200) {
      $('#topLink').css('display', 'block');
    } else {
      $('#topLink').css('display', 'none');
    }
  }

  // hide navbar/show navbar
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      $('header').css('top', '0');
    } else {
      $('header').css('top', '-50px');
    }
    prevScrollpos = currentScrollPos;
  };

  // smooth scrolling
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  var formMessages = $('#form-messages');
  var form = $('form');
  $(form).submit(function(event) {
    event.preventDefault();
    var formData = $(form).serialize();
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
      .done(function(response) {
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');
        $(formMessages).text(response);
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occurred and your message could not be sent.');
        }
      });
  });
});
