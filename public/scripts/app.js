// Client facing scripts here
$(document).ready(function() {

  $("#testing").hover(function() {
      $(this).css("color", "white");
    });

  //listeners for <li> in main.js and console log value of data-id
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

  //close popup clicking on X
/*   $(document).on('click',function(e){
    if(!(($(e.target).closest("#popup").length > 0 ) || ($(e.target).closest(".close").length > 0))){
      $('#popup').hide();
      $('#overlay').hide();
     }
  });
 */

});//closing doc ready
