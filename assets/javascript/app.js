var config = {
  apiKey: "AIzaSyBxyt5kyJMXc23a4jzykZSP7Iqu5biNwd8",
  authDomain: "train-scheduler-43cec.firebaseapp.com",
  databaseURL: "https://train-scheduler-43cec.firebaseio.com",
  projectId: "train-scheduler-43cec",
  storageBucket: "train-scheduler-43cec.appspot.com",
  messagingSenderId: "679996230160"
};

firebase.initializeApp(config);

let database = firebase.database();
let trainName = ""
let destination = ""
let firstTrain = 0
let frequency = 0

// 2. Button for adding trains
$("#submit").on("click", function () {
  event.preventDefault();

  // Grabs user input
  trainName = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Uploads train data to the database
  database.ref().push({
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency

  });
 
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  let newTrainName = childSnapshot.val().name;
  let newDestination = childSnapshot.val().dest;
  let newFirstTrain = childSnapshot.val().first;
  let newFrequency = childSnapshot.val().freq;

  $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + nxtArr + "</td><td>" + minAway + "</td></tr>");
}), function(objectError){
  console.log('Failed ' + objectError)
}


    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));