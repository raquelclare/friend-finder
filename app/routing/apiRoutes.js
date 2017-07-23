// We need to be able to grab data from friends.js
var friendData = require("../data/friends.js");


// We need to be able to export all of this code since the files are now separated out
module.exports = function(app) {
    // Route getting info for all friends - provides JSON
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    // Create new survey/friend for app - takes in JSON input
    app.post("/api/friends", function(req, res) {

        // Holding each of the incoming answers chosen from the survey
        var answer = req.body;

        // Variable holding all of the answers and creating one new friend object
        var newFriend = {
            name: answer.name,
            photo: answer.photo,
            scores: [ // Using parseInt to get integers right away--- looping would have been an alternative
                parseInt(answer.score[0]),
                parseInt(answer.score[1]),
                parseInt(answer.score[2]),
                parseInt(answer.score[3]),
                parseInt(answer.score[4]),
                parseInt(answer.score[5]),
                parseInt(answer.score[6]),
                parseInt(answer.score[7]),
                parseInt(answer.score[8]),
                parseInt(answer.score[9])
            ]
        };

        // Variables for compatability
        var scoreDifference = 0;
        var totalDifference = 0;
        var minDifference = 0;
        var match = "";

        // Starting the comparison here- looping through existing friendData = friends array
        for(i = 0; i < friendData.length; i++) {

	        // Looping though the scores array within the friend object
	        for (j = 0; j < friendData.scores.length; j++) {

	        	// Getting the absolut value of the difference of scores at that index
	            scoreDifference = Math.abs(newFriend.scores[j] - friendData[i].scores[j]);
	            // Getting a total difference, basically the sum of the differences
	            totalDifference += scoreDifference;
	            // Automatically setting the first total difference we get to minDifference
	            minDifference = totalDifference;
	        }

	        // If a new totalDifference found is less than our established minDifference...
	        if (totalDifference < minDifference) {
	        	// ...then update the new minDifference.
	        	minDifference = totalDifference;

	        	// Friend match is equal to the index in friendData
	        	match = friendData[i];
	        }

	        // Adding newFriend object into the friends array
	        console.log(newFriend);
	        friendData.push(newFriend);
	        res.json(friendData);

	    }    	
	});  	
};
