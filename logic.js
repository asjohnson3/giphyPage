var beers = ["Heineken", "Corona", "Budlight", "Stella Artois", "Budweiser"];

function displayBeerInfo(){
  // Event listener for all button elements
      $(".beer").on("click", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var type = $(this).attr("data-name");
  
        // Constructing a URL to search Giphy for the name of the type who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          type + "&api_key=UDfxaoVDA3S0b7FY2H7ai9uJgens8ZGp";
  
        // // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < 10; i++) {
  
              // // Only taking action if the photo has an appropriate rating
              // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $('<div>', { 'id': 'item' });
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var beerImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                beerImage.attr("src", results[i].images.fixed_height_still.url);

                beerImage.attr({'data-animate' : results[i].images.fixed_height.url});
                beerImage.attr({'data-state' : "still"});
                beerImage.attr({'data-still' : results[i].images.fixed_height_still.url});
  
                // Appending the paragraph and beerImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(beerImage);
                // console.log(gifDiv);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs").prepend(gifDiv);
              // }
            }
          });
      });
    }
  
    
function renderButtons() {

  $("#buttons").empty();

  for (var i = 0; i < beers.length; i++){
    var brand = beers[i];
    var beerType = $("<button>");
    // Adds beerType class of movie to our button
    beerType.addClass("beer");
    // Added beerType data-attribute
    beerType.attr("data-name", brand);
    // Provided the initial button text
    beerType.text(brand);
    // Added the button to the buttons-view div
    $("#buttons").append(beerType);
  }
}


// $("#item").on("click", function() {
$(document).on('click', 'img', function(){
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr('data-state');

  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});

$("#add-beer").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var newBeer = $("#beer-input").val().trim();

  // The movie from the textbox is then added to our array
  beers.push(newBeer);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".beer", displayBeerInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();



