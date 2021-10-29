$(document).ready(function () {

// Check for empty input fields in form
$(".log-reg-form").on("submit", function (e) {
  let isAllInput = true;
  $('.log-reg-form input').each(function(){
    if (!$(this).val()) {
      isAllInput = false;
      return;
    }
  });

  if (!isAllInput) {
    e.preventDefault();
    $('.form-error-div').addClass('form-error').html("Please fill out all the fields");
  } else {
    $('.form-error-div').removeClass('form-error');
  }
});

  $(".log-reg-form input").on("focus", function (e) {
    $(".form-error").empty().removeClass('form-error');
  });
});