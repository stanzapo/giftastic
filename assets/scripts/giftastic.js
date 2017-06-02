// Animal array

var animals = ["beaver", "lion", "tiger", "pangolin"];
var animal = "";

// Loop through the array and create animal buttons
      function renderButtons() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)

        $("#animalButtons").empty();


        // Loop through the array of animals, then generate buttons for each animal in the array

        for (i = 0; i < animals.length; i++) {
          var $input = $('<input type="button" class="animalButton" data-playon="click" value="'+animals[i]+'"data-name="'+animals[i]+'" />');
          $input.appendTo($("#animalButtons"));
        }
      }

// Take input from textbox and add animal to the array on when submit is clicked
      // This function handles events where the add animal button is clicked
      $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
        $("#animal-input").val('');
      });

renderButtons();

// Start or stop Gif animation when a picture is clicked


// Clear and subsequently populate div with Gifs on animal button click
// Trigger AJAX on animal button click

      // This .on("click") function will trigger the AJAX Call
      $(document).on("click", ".animalButton", function(event) {

        $("#animals").empty();
        console.log( $(this).val() );
        // Here we construct our URL
        var APIKey = "dc6zaTOxFJmzC";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).val() + "&api_key=" + APIKey;

        $.ajax({
        url: queryURL,
        crossDomain: true,
        dataType: "JSON",
        jsonpCallback: "callback",
        method: "GET"
         }).done(function(response) {
            // console.log(response);
            for (i = 0; i < 10; i++) {
            console.log(response.data[i].rating);
            // $( "<p>'"response.data[i].rating.stringify()"'</p>" ).insertBefore( $("#animals") );
            $("#animals").append('<img src="' + response.data[i].images.fixed_height.url + '" />');
            $("#animals").append("<p>Rating: " + response.data[i].rating);
          }
          })
        });