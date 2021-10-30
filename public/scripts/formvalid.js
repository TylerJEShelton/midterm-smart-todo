$(document).ready(function () {
  //check if error comes from backend and style it
   if ($(".form-error-div").text().trim() == 0) {
    $('.form-error-div').removeClass('form-error');
    console.log("div empty");
  } else {
    $('.form-error-div').addClass('form-error');
    console.log("div Not empty");
  }
 
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

//clear errors on form focus
  $(".log-reg-form input").on("focus", function (e) {
    $(".form-error-div").empty().removeClass('form-error');
  });

});