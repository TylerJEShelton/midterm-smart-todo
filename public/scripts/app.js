// Client facing scripts here
$(document).ready(function() {

  $(".add-from-result1").click(function() {
    let out = {book1: $("#book1").text()}
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object"
    });
  });
  $(".add-from-result2").click(function() {
    let out = {movie1: $("#movie1").text()}
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object"
    });
  });
  $(".add-from-result3").click(function() {
    let out = {restaurant1: $("#restaurant1").text()}
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object"
    });
  });
  
  //Changing item Category ---------------------
  //listeners for <li> tag in the main.js
    $("#mainejs li.list-row").on("click", function(e) {
    // console.log("item-id", $(this).attr("data-item-id"));
      // console.log("user-id", $(this).attr("data-user-id"));
  
      $('#popup').fadeIn(200);
      $('#overlay').show();
  
    //add description to a form
    let itemString = $(this).find(">:first-child").html();
    
    $('#change-categ-form').prepend(`
      <p id="popup-update-descr"> Move item <span class="highlight-text">"${itemString}"</span> into a Category: </p> 
    `);
    //add hidden field to the form
    $('#change-categ-form').append(`
      <input type="hidden" name="userid" value="${$(this).attr("data-user-id")}">       
      <input type="hidden" name="itemid" value="${$(this).attr("data-item-id")}">       
    `);
  
    //add Select drop down:
    const currentCat = $(this).attr("data-cat");
    // console.log(currentCat);
    $('#select-cat').append('<option value="select">Select</option>');
    
    if (currentCat != 'films') {
      $('#select-cat').append('<option value="1">Films</option>');
    }
    if (currentCat != 'restaurants') {
      $('#select-cat').append('<option value="2">Restaurants</option>');
    }
    if (currentCat != 'books') {
      $('#select-cat').append('<option value="3">Books</option>');
    }
    if (currentCat != 'products') {
      $('#select-cat').append('<option value="4">Products</option>');
    }
    if (currentCat != 'other') {
      $('#select-cat').append('<option value="5">Other</option>');
    }

  //delete Item form -------------
    //add hidden field to the form
    $('#delete-item-form').prepend(`
    <p id="popup-delete-descr"> Delete item <span class="highlight-text">"${itemString}".</span> Cannot be undone.  </p> 
  `);

    $('#delete-item-form').append(`
    <input type="hidden" name="userid" value="${$(this).attr("data-user-id")}">       
    <input type="hidden" name="itemid" value="${$(this).attr("data-item-id")}">       
  `);
    //double check to delete
    $("#delete-item-form").on("submit", function (e) { 
      if (!confirm("Ok to delete an Item?")) { return false;}
    });


  }); // closing <li> onclick listener fucntion
  
  //close popup clicking on X, remove some form elements
  $("div.close").on("click", function() {
    $('#popup').hide();
    $('#overlay').hide();
    $('#select-cat').empty();
    $("input[type|='hidden']").remove();
    $('#popup-update-descr').remove();
    $('#popup-delete-descr').remove();
  });
  
  //validate popup for
  $("#change-categ-form").on("submit", function (e) {
    
    if ($('#select-cat option:selected').val() == 'select') {
      e.preventDefault();
      $('div.form-error-div').empty().addClass('form-error').append(`
        <span>You can do better &#128512; 
        <span> Please select an option from the Dropdown list above."</span>
      ` );
    } 
  });
  
  //remove error while selecting category
  $("#select-cat").on("change", function (e) {
    if ($('#select-cat option:selected').val() != 'select') {
      $('div.form-error-div').empty().removeClass('form-error');
    }
  });


  
  });//closing doc ready