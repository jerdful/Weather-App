 $(document).ready(function() {

var apiKey = "62e932515831cb016c2725a9077e6fef";

  function townName(data) {
    var city = `<h2>${data.name}</h2>`;
    var weather = `<p>Current Weather condition: ${data.weather[0].main}</p>`
    var humidity = `<p> Humidity: ${data.main.humidity}%</p>` //can add classes to these to style them in css
    var pressure = `<p> Pressure: ${data.main.pressure} hPa</p>`
    var wind = `<p> Wind Speed: ${data.wind.speed} knots</p>`
    var temp = `<p> Temp: ${data.main.temp} degrees</p>`
    var icon = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`

    $(".results").html(`<div class=''>${city} ${weather} ${humidity} ${pressure} ${temp} ${wind} ${icon}</div>`)
  }
function ifError() {
  $(".results").html(`<div class=''><h2>No results found</h2></div>`) //if there is an error then display No results found
}



  $('form').submit(function() {
    event.preventDefault()
  })


  $('button').click(function() { //this slides the search field out of the way
  $('form').slideUp(1000)
  $('.results').show(500)
  })


  $('h1').hover(function() { //this changes the h1 test to gray when the mouse hovers over it
    $('h1').css("color", "gray")
  })
  $('h1').mouseleave(function() { //this changes it back to blue when you move the mouse away
    $('h1').css("color", "blue")
  })


  $('input').focus(function() { //makes the border of the text input field red when clicked
  $(this).css("border-color", "red")
  })


  //target search searchForm
  $('.searchForm').submit(function(event){
    event.preventDefault(); //prevents page refresh
    var input = $('.names').val() //val is the info you are typing into "names" field
    $('.names').val("") //replaces the test in the field with blank - clears your search
    console.log(input)  //this is how you save the data that is typed in the field
    $.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input}&appid=${apiKey}`).done(function(data){ //go to weather site and look up doc for api to get params you can use (eg imperial instead of metric units)
      townName(data)
    }).fail(function(){ //if townName function fails
      ifError()  //then calls the ifError on line 13
    })


 $('.searchagain').click(function(){ //this brings the input field and button back down when you click Search Again
   $('form').slideDown(500)
   $('.results').hide(500)

 })
})
});
