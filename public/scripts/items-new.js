$(document).ready(function () {
  $(".add-from-result1").click(function () {
    let out = { book1: $("#book1").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
  });
  $(".add-from-result2").click(function () {
    let out = { movie1: $("#movie1").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
  });
  $(".add-from-result3").click(function () {
    let out = { restaurant1: $("#restaurant1").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
  });
});
