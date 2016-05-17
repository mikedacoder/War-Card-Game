/*
	CWB205
	War Game
    Author: Michael Dryburgh
    Date: 12/08/2014
*/

// Function to add event listeners
function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

// Load the javascript information after the web page has finished loading.
addEvent(window, "load", startForm, false);

// Applies event handlers to the buttons.
function startForm() {	
	document.getElementById("play").onclick = checkForm;	
	document.getElementById("stats").onclick = startStats;
}

// Check to make sure that a name has been entered.
function checkForm(){
	if (document.getElementById("entry").name.value.length == 0) {
		alert("Please enter a name");
		return false;	
	} else {
		var playerName = document.getElementById("name").value;		
		startGame(playerName);
	}
}

// Sends the name to the saveName function for saving
// and loads the game play page.
function startGame(playerName) {
	//console.log("startGame working");
	document.location.href = "game.html";	
	saveName(playerName);	
}

// Loads the stats page.
function startStats() {
	//console.log("startStats working");
	document.location.href = "stats.html";	
}

// Adds the player's name to the cookie. I fthe name does
// not match the pre-existing name it is replaced with the new name.
function saveName(playerName) {
	//console.log("saveName working");	
	var existingName = retrieveMCookie("playerInfo", "name");	
	if (existingName != playerName) {
		deleteCookie("playerInfo");
	} 
	// Set the cookie expiration date one year hence.
	var expire = new Date();
	expire.setFullYear(expire.getFullYear() + 1);
	
	// Loop through all of the elements in the form.
	var allFields = document.entryForm.elements;
	for (var i = 0; i < allFields.length; i++) {
	
		if (allFields[i].type == "text") {
			// Write input box value to a cookie.
			writeMCookie("playerInfo", allFields[i].id, allFields[i].value, expire);
		}
	}
	
}