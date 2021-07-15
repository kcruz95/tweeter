$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let characters = $(this).val();
    console.log('characters', characters);
    $('.counter').val(140 - characters.length);

    // sets the colour
    if (characters.length < 141) {
    $(".counter").html(`${140 - characters.length}`);
    } else {
      $(".counter").html(`<a class="negativeValues">${140 - chars.length}</a>`);
    }
  });
});