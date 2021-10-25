$(document).ready(function () {

  // Login Form
  $("#log-form").on("submit", function (e) {
    if (!$('#email').val() || !$('#password').val()) {
      e.preventDefault();
      $('#form-error-div').addClass('form-error').html("Please fill out all the fields");
    } else{
      $('#form-error-div').removeClass('form-error');
      $("#log-form").submit();
    }
  });

  // Register Form
  $("#reg-form").on("submit", function (e) {
    if (!$('#email').val() || !$('#password').val() || !$('#name').val()) {
      e.preventDefault();
      $('#form-error-div').addClass('form-error').html("Please fill out all the fields");
    } else{
      $('#form-error-div').removeClass('form-error');
      $("#reg-form").submit();
    }
  });

  $("#email").on("focus", function (e) {
    $(".form-error").empty().removeClass('form-error');
  });
});