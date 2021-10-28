// Client facing scripts here
$(document).ready(function() {

  $("#testing").hover(function() {
      $(this).css("color", "white");
    });

  //listeners for <li> in main.js and console log value of data-id
    $(".list-table").on("click", "li", function() {
      console.log($(this).attr("data-id"));
  });





});//closing doc ready
