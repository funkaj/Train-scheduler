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

    let newTrainName = childSnapshot.val().name;
    let newDestination = childSnapshot.val().dest;
    let newFirstTrain = childSnapshot.val().first;
    let newFrequency = childSnapshot.val().freq;

    var firstTimeConverted = moment(newFirstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % newFrequency;
    console.log(tRemainder);

    var minAway = newFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    var nxtArr = moment().add(minAway, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nxtArr).format("HH:mm"));

    $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + nxtArr + "</td><td>" + minAway + "</td></tr>");
    
  }),
  function (objectError) {
    console.log('Failed ' + objectError)
  }
  