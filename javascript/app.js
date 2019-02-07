var config = {
    apiKey: "AIzaSyCxW03dHlGnHo8OWzWEgrFxOLIoU9Q8cho",
    authDomain: "mondayjanuary28.firebaseapp.com",
    databaseURL: "https://mondayjanuary28.firebaseio.com",
    projectId: "mondayjanuary28",
    storageBucket: "mondayjanuary28.appspot.com",
    messagingSenderId: "521316767112"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

//  grabs the value from input sources
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    
// creating an opject inside of the firebase
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFrequency
    }

        database.ref().push(newTrain); 
// clears the rows once values are captured
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");


});



// function that gets ongoing data from firebase database

  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

    //   gets the data from the database in active time

      var trainName = childSnapshot.val().name
      var trainDest = childSnapshot.val().dest
      var trainTime = childSnapshot.val().time
      var trainFrequency = childSnapshot.val().freq

    //   changes first time to the past with the subtract(1, "years")
      var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
      var currentTime = moment();
    //   gives the time difference in minutes
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //   minutes residue
      var tRemainder = diffTime % trainFrequency;
    //   
      var tMinutesTillTrain = trainFrequency - tRemainder;
    //   displays time in AM/Pm format hh:mm is for normal time as opposed to HH:mm
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('hh:mm a');

// wrapping table contents to a row
      var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
      );
// appending to the main table
       
      $("#train-table > tbody").prepend(newRow);
       
  });




//   to do, prepend a button to the table row or a selector that takes two clicks to delete the row use the example with the row numbres to make it work