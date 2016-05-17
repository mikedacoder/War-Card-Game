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

addEvent(window, "load", addStats, false);

// Retrieves all of the information from the cookie
// and displays it so the user can see how they did.
function addStats() {
	var player = retrieveMCookie("playerInfo", "name");
	var start = retrieveMCookie("playerInfo", "startTime");
	var end = retrieveMCookie("playerInfo", "endTime");	
	var wins = retrieveMCookie("playerInfo", "wins");
	if (wins == null) {
		wins = 0;
	}
	var losses = retrieveMCookie("playerInfo", "losses");
	if (losses == null) {
		losses = 0;
	}
	var games = retrieveMCookie("playerInfo", "gameCounter");
	
	var playerName = document.createElement("h1");
	playerName.innerHTML = player;
	playerName.style.fontFamily = "'Black Ops One', 'Times New Roman', serif";
	document.getElementById("info").appendChild(playerName);
	
	var startTime = document.createElement("p");
	startTime.innerHTML = "Started playing at: " +start;
	document.getElementById("info").appendChild(startTime);
	
	var endTime = document.createElement("p");
	endTime.innerHTML = "Stopped playing at: " + end;
	document.getElementById("info").appendChild(endTime);
	
	var numberGames = document.createElement("p");
	numberGames.innerHTML = "Has played " + games + " games.";
	document.getElementById("info").appendChild(numberGames);
	
	var numberWins = document.createElement("p");
	numberWins.innerHTML = "Won " + wins + " times.";
	document.getElementById("info").appendChild(numberWins);
	
	var numberLosses = document.createElement("p");
	numberLosses.innerHTML = "Lost " + losses + " times.";
	document.getElementById("info").appendChild(numberLosses);
	
	var percent = ((wins / games) * 100).toFixed(2);
	
	var percentWin = document.createElement("p");
	percentWin.innerHTML = "Percent of wins = " + percent + "%.";
	document.getElementById("info").appendChild(percentWin);
}