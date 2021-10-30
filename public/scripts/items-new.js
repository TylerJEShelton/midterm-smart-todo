$(document).ready(function () {
  $(".add-from-result1").click(function () {
    let out = { book: $("#book1").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result2").click(function () {
    let out = { movie: $("#movie1").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result3").click(function () {
    let out = { restaurant: $("#restaurant1").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
});
