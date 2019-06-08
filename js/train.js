var config = {
    apiKey: "AIzaSyDFlLmgQM6jk4C8nVWLc7AWSIMNQL5Hr_g",
    databaseUrl: "https://train-firebase-aeb4f.firebaseio.com/",
    storageBucket: "gs://train-firebase-aeb4f.appspot.com"

}
firebase.initializeApp(config)

var trainData = firebase.database();

$("#addTrainBtn"),on("click",function(){
    var trainName = $("#trainNameInput").val().trim()
    var destination = $("#destinationInput").val().trim()
    var frequency = $("#frequencyInput").val().trim()
    var firstTrain = moment($("#firstTrainInput").val().trim("HH:mm").subtract)(10,"years").format("x");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
    trainData.ref().push(newTrain)

    alert ("There Was a Train ADDED!!!!!!!!!!!!!")

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");

    return false;
})
trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder
    var arrival = moment().add(minutes, "m").format("hh:mm A");

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><td>");
    
    
})