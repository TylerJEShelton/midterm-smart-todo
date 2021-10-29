// Client facing scripts here
$(document).ready(function() {

  $("#testing").hover(function() {
      $(this).css("color", "white");
    });

  //listeners for <li> tag in the main.js
    $("li.list-row").on("click", function(e) {
      console.log("item-id", $(this).attr("data-item-id"));
      console.log("category-id", $(this).attr("data-category-id"));
      console.log($(this).html());
      

      $('#popup').show();
      $('#overlay').show();

    //add description
    $('#change-categ-form').prepend(`
      <p id="popup-descr"> Move item <span id="item-to-move">"${$(this).html()}"</span> into a Category: </p> 
    `);

    //add Select drop down:
    const currentCat = $(this).attr("data-cat");
    console.log(currentCat);
    
    if (currentCat != 'films') {
      $('#select-cat').append('<option value="films">Films</option>');
    }
    if (currentCat != 'restaurants') {
      $('#select-cat').append('<option value="restaurants">Restaurants</option>');
    }
    if (currentCat != 'books') {
      $('#select-cat').append('<option value="books">Books</option>');
    }
    if (currentCat != 'products') {
      $('#select-cat').append('<option value="products">Products</option>');
    }
    if (currentCat != 'other') {
      $('#select-cat').append('<option value="other">Other</option>');
    }
  });

  //close popup clicking on X
  $("div.close").on("click", function() {
    $('#popup').hide();
    $('#overlay').hide();
    $('#select-cat').empty();
    $('#popup-descr').remove();
  });

  //validate popup for
  $("#change-categ-form").on("submit", function (e) {
    console.log($('#select-cat option:selected').val());
    
    if ($('#select-cat option:selected').val() == 'select') {
      e.preventDefault();
      $('div.form-error-div').text('You can do better! Please select an option from the Dropdown list.')

      $('#form-error-div').addClass('form-error').html("Please fill out all the fields");
    } 
    // else{
    //   $('#form-error-div').removeClass('form-error');
    //   $("#log-form").submit();
    // }
  });

});//closing doc ready
