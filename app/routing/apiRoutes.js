// Linking our routes to a series of data sources
// We need to be able to grab data from friends.js
var friendData = require("../data/friends.js");


// We need to be able to export all of this code since the files are now separated out
module.exports = function(app) {
    // Route getting info for all friends - provides JSON
    // API GET Request
    // Code handles when users visit a page
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    // API POST Request
    // Create new survey/friend for app - takes in JSON input
    app.post("/api/friends", function(req, res) {

        // "Best match" for pop up modal
        var match = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // Holding each of the incoming answers chosen from the survey
        var userData = req.body;
        var userScores = userData.scores;

        // Variables for compatability
        // Calculating difference between the user's scores and scores of each user in the database
        var totalDifference = 0;

        // Starting the comparison here- looping through existing friendData = friends array
        for (i = 0; i < friendData.length; i++) {

            console.log(friendData[i].name);
            totalDifference = 0;

            // Looping though the scores array within the friend object
            for (j = 0; j < friendData[i].scores[j]; j++) {

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));

                if (totalDifference <= match.friendDifference) {
                    match.name = friendData[i].name;
                    match.photo = friendData[i].photo;
                    match.friendDifference = totalDifference;
                }
            }

        }

        // Adding newFriend object into the friends array
        friendData.push(userData);
        res.json(match);

    });
}