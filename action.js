$(document).ready(function(){

  $('.form').on('submit', function(e){
    // to prevent default form submit action
    e.preventDefault();
    // get input value and trim white spaces to left and right if any
    var inputValue = $('#word').val().trim();
    // check if inputValue is not empty
    if(inputValue){
      chunk(inputValue);
    }else{
      alert("Enter A Word");
    }
  });

});

function chunk(word) {
  //empty the buttons of letters of previous word
  $('.js-phonemes').empty();
  //convert the word into lowercase
  word = word.toLowerCase();
  $(".js-word").text(word);

  //show loading text
  $('.js-phonemes').text('Loading Please Wait!...');

  //parse the sampledb.json file
  $.getJSON("sampledb.json", function(db){
    // remove loading text
    $('.js-phonemes').text('');
    //for each phoneme in the word
    //check if word is in our db if not throw error
    if (typeof db[word] != "undefined") {
      for (var item in db[word].chunks) {
        //create a button. pass each item in chunks and phones as argument
        createButton(db[word].chunks[item],db[word].phones[item]);
      }
    }
    else {
      alert ("Enter a valid word");
    }
  });
}

function createButton(phoneme, sound) {
  //create a button with text, className: 'phoneme' and click handler
  var button = $('<button>').text(phoneme).addClass('phoneme').on('click',function(){alert(sound)});
  //append the button to the phonemes
  $('.js-phonemes').append(button);
}
