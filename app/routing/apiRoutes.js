// Route getting info for all friends - provides JSON
app.get("/api/friends", function(req, res) {
  res.json(friends);
});

// Create new survey/friend for app - takes in JSON input
app.post("/api/new", function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend;

  friends.push(newFriend);

  res.json(newFriend);
});