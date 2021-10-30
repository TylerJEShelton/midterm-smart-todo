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
  $(".add-from-result4").click(function () {
    let out = { book: $("#book2").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result5").click(function () {
    let out = { movie: $("#movie2").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result6").click(function () {
    let out = { restaurant: $("#restaurant2").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result7").click(function () {
    let out = { book: $("#book3").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result8").click(function () {
    let out = { movie: $("#movie3").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result9").click(function () {
    let out = { restaurant: $("#restaurant3").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result10").click(function () {
    let out = { book: $("#book4").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result11").click(function () {
    let out = { movie: $("#movie4").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
  $(".add-from-result12").click(function () {
    let out = { restaurant: $("#restaurant4").text() };
    $.post({
      url: "/items/add",
      data: out,
      dataType: "Object",
    });
    window.location.replace("/");
  });
});
