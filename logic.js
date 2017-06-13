// 1. Initialize Firebase
  

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOS00qvgW75_c2Jg5815ensf8SxKl1ulE",
    authDomain: "train-schedule-7dc7f.firebaseapp.com",
    databaseURL: "https://train-schedule-7dc7f.firebaseio.com",
    projectId: "train-schedule-7dc7f",
    storageBucket: "train-schedule-7dc7f.appspot.com",
    messagingSenderId: "555942465528"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = 0;

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  trainName = $("#train-name-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
  trainFrequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency
    });
  });


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);

  $("#train-name-input").html(childSnapshot.val().trainName);
  $("#destination-input").html(childSnapshot.val().trainDestination);
  $("#first-train-input").html(childSnapshot.val().firstTrain);
  $("#frequency-input").html(childSnapshot.val().trainFrequency);

  
  // Time Calculations
  var differenceTimes = moment().diff(moment.unix(firstTrain), "minutes");
  var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % trainFrequency;
  var minutesAway = trainFrequency - timeRemainder;

  // To calculate the arrival time
  var nextArrival = moment().add(minutesAway, "m").format("hh:mm");      

  // Update Table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
},

// 4. Create Error Handling
function(errorObject){
console.log("Errors handled: " + errorObject.code)
});