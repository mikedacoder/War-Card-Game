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

// Function to remove event listeners.
function removeEvent(object, evName, fnName, cap) {
	if (object.detachEvent)
		object.detachEvent("on" + evName, fnName);
	else if (object.removeEventListener)
		object.removeEventListener(evName, fnName, cap);
}

// Load the javascript information after the web page has finished loading.
addEvent(window, "load", playGame, false);

// Global variables.
var cpuDeck = new Array();
var playerDeck = new Array();
var cpuCounter = 0;
var playerCounter = 0;
var cpuTemp = new Array();
var playerTemp = new Array();
var playerName = retrieveName();
var cpuWar1 = document.createElement("div");
var cpuWar2 = document.createElement("div");
var cpuWar3 = document.createElement("div");
var playerWar1 = document.createElement("div");
var playerWar2 = document.createElement("div");
var playerWar3 = document.createElement("div");
var cpuWarCard = document.createElement("div");
var playerWarCard = document.createElement("div");

// Stes up the game and gets it started.
function playGame() {
	//console.log("playGame working");
	addInfo();
	document.getElementById("playerName").innerHTML = playerName;	
	var fullDeck = new Array();	
	
	for (var i = 2; i <= 14; i++) {				
		fullDeck.push([i] + "c.png");	
	}
	
	for (var i = 2; i <= 14; i++) {			
		fullDeck.push([i] + "d.png");	
	}
	
	for (var i = 2; i <= 14; i++) {				
		fullDeck.push([i] + "h.png");	
	}
	
	for (var i = 2; i <= 14; i++) {			
		fullDeck.push([i] + "s.png");	
	}
	shuffleDeck(fullDeck);
	document.getElementById("message").innerHTML = "Shuffling...";		
	
	setTimeout(function() {
		splitDeck(fullDeck); 
		document.getElementById("message").innerHTML = "Dealing..."; 
		setTimeout(function() {
			document.getElementById('message').innerHTML = "Click on your deck to begin playing." }, 750);
			document.getElementById("cpuDeckSize").innerHTML = "CPU deck size = " + cpuDeck.length;		
			document.getElementById("playerDeckSize").innerHTML = "Player deck size = " + playerDeck.length;
			document.getElementById("playerDeck").style.cursor = "pointer";
			addEvent(document.getElementById("playerDeck"), "click", nextCard, false); 	}, 750);	
}

// Adds information to the cookie.
function addInfo() {
	//console.log("addInfo working");
	var startTime = new Date();
	startTime = writeDateString(startTime);
	var gameCounter = retrieveMCookie("playerInfo", "gameCounter");
	if (gameCounter == null) {
		gameCounter = 0;	
	}
	gameCounter++;
	writeMCookie("playerInfo", "startTime", startTime);
	writeMCookie("playerInfo", "gameCounter", gameCounter);	
}

// Retirieve the player's name from the cookie.
function retrieveName() {
	//console.log("retrieveInfo working");
	var playerName = retrieveMCookie("playerInfo", "name");	
	return playerName		
}

// 'Shuffles' the cards.
function shuffleDeck(deck) {
	//console.log("shuffleDeck working");	 
	deck.sort(randOrder);	   	
   	return deck;
}

// Randomizes the order of the cards in the deck.
function randOrder(){
   return 0.5 - Math.random();
}

// 'Deals' half of the shuffled cards each to the CPU and the player.
function splitDeck(deck) {
	//console.log("splitDeck working");	
	cpuDeck = deck;	
	playerDeck = deck.splice(0, (deck.length/2));
	document.getElementById("cpuDeck").innerHTML = "<img src='cardstack.png' width='84' height='104' alt=''/>";
	document.getElementById("cpuDeck").style.width = "84px";
	document.getElementById("cpuDeck").style.height = "104px";
	//document.getElementById("cpuDeck").style.width = "84px";
	//document.getElementById("cpuDeck").style.height = "104px";
	document.getElementById("playerDeck").innerHTML = "<img src='cardstack.png' width='84' height='104' alt=''/>";
	document.getElementById("playerDeck").style.width = "84px";
	document.getElementById("playerDeck").style.height = "104px";	
}

// Plays the next card in each of the decks.
function nextCard() {
	//console.log("nextCard working");
	if (cpuCounter > cpuDeck.length) cpuCounter = 0;
	if (playerCounter > cpuDeck.length) playerCounter = 0;
	var cpuCard = cpuDeck[0];
	var playerCard = playerDeck[0];		
	document.getElementById("cpuCard").innerHTML = "<img src='" + cpuCard + "'/>";
	document.getElementById("playerCard").innerHTML = "<img src='" + playerCard + "'/>";
	compare(cpuCard, playerCard);
	cpuCounter++;
	playerCounter++;		
	document.getElementById("cpuDeckSize").innerHTML = "CPU deck size = " + cpuDeck.length;
	document.getElementById("playerDeckSize").innerHTML = "Player deck size = " + playerDeck.length;			
}

// Compares the two cards and determines the winner placing
// both cards back in the winners deck.
function compare(cpuCard, playerCard) {
	cpuCardValue = parseInt(cpuCard);
	playerCardValue = parseInt(playerCard);
	
	// cpu has the greater valued card.
	if (cpuCardValue > playerCardValue) {
		cpuDeck.push(cpuDeck.shift());
		cpuDeck.push(playerCard)
		playerDeck.shift();
		cpuDeck = cpuDeck.concat(cpuTemp);
		cpuDeck = cpuDeck.concat(playerTemp);		
		cpuTemp.length = 0;
		playerTemp.length = 0;
		document.getElementById('message').innerHTML = "This round goes to CPU.";		
	} 
	// player has the greater valued card
	else if (playerCardValue > cpuCardValue) {
		playerDeck.push(playerDeck.shift());
		playerDeck.push(cpuCard);
		cpuDeck.shift();
		playerDeck = playerDeck.concat(playerTemp);
		playerDeck = playerDeck.concat(cpuTemp);		
		playerTemp.length = 0;
		cpuTemp.length = 0;
		document.getElementById('message').innerHTML = "This round goes to " + playerName + ".";		
	} 
	// cards are equal in value which start a 'war'.
	else if (cpuCardValue == playerCardValue) {
		document.getElementById('message').innerHTML = "WAR!!!";		
		addEvent(document.getElementById("playerDeck"), "click", war, false);
	}	
	
	// Change the image to the single card image when their is only one card left in the deck.
	if (cpuDeck.length == 1) {
		document.getElementById("cpuDeck").innerHTML = "<img src='cardback.png' width='71' height='96' alt=''/>";
		document.getElementById("cpuDeck").style.width = "71px";
		document.getElementById("cpuDeck").style.height = "96px";
	}
	if (playerDeck.length == 1) {
		document.getElementById("playerDeck").innerHTML = "<img src='cardback.png' width='71' height='96' alt=''/>";
		document.getElementById("playerDeck").style.width = "71px";
		document.getElementById("playerDeck").style.height = "96px";
	}	
	
	// Never got the test for a draw working correctly. 
	// Can't figure out exactly what I should be testing for.
	/* if ((cpuCard == playerCard && cpuDeck.length == 1) ||
	    (cpuCard == playerCard && playerDeck.length == 1)) {
		var draws = retrieveMCookie("playerInfo", "draws");
		if (draws == null) {
			draws = 0;	
		}
		draws++;
		writeMCookie("playerInfo", "draws", draws);		
		document.getElementById('message').innerHTML = "It's a draw!";
		displayButtons();
		removeEvent(document.getElementById("playerDeck"), "click", nextCard, false);
		document.getElementById("playerDeck").style.cursor = "auto";			
	} */
	
	// Player wins the game.
	if (cpuDeck.length == 0) {
		var wins = retrieveMCookie("playerInfo", "wins");
		if (wins == null) {
			wins = 0;	
		}
		wins++;
		writeMCookie("playerInfo", "wins", wins);		
		document.getElementById("cpuDeckSize").innerHTML = "CPU deck size = " + cpuDeck.length;
		document.getElementById("playerDeckSize").innerHTML = "Player deck size = " + playerDeck.length;
		document.getElementById("cpuDeck").innerHTML = "";
		document.getElementById("cpuDeck").style.width = "71px";
		document.getElementById("cpuDeck").style.height = "96px";
		document.getElementById('message').innerHTML = playerName + " wins the Game!!!";
		displayButtons();
		removeEvent(document.getElementById("playerDeck"), "click", nextCard, false);
		document.getElementById("playerDeck").style.cursor = "auto";
	}
	
	// CPU wins the game.
	if (playerDeck.length == 0) {
		var losses = retrieveMCookie("playerInfo", "losses");
		if (losses == null) {
			losses = 0;	
		}
		losses++;
		writeMCookie("playerInfo", "losses", losses);		
		document.getElementById("cpuDeckSize").innerHTML = "CPU deck size = " + cpuDeck.length;
		document.getElementById("playerDeckSize").innerHTML = "Player deck size = " + playerDeck.length;
		document.getElementById("playerDeck").innerHTML = "";
		document.getElementById("playerDeck").style.width = "71px";
		document.getElementById("playerDeck").style.height = "96px";
		document.getElementById('message').innerHTML = "Sorry, you lost the game.";
		displayButtons();
		removeEvent(document.getElementById("playerDeck"), "click", nextCard, false);
		document.getElementById("playerDeck").style.cursor = "auto";
	}	
}

// Function to handle "wars" when both cards have equal values. - Not quite working right yet, but close.
function war() {	
	if (cpuTemp.length == 0 && playerTemp.length == 0) {
		removeEvent(document.getElementById("playerDeck"), "click", war, false);	
	}
	// CPU lays down next three cards.	
	if (cpuTemp.length == 0) {
		if (cpuDeck.length < 5 && cpuDeck.length > 1) {
			cpuTemp = cpuDeck.splice(0, cpuDeck.length - 1);
		} else if (cpuDeck.length >= 5) {
			cpuTemp = cpuDeck.splice(0, 4);	
		}		
	} else {
		if (cpuDeck.length < 5 && cpuDeck.length > 1) {
			cpuTemp = cpuTemp.concat(cpuDeck.splice(0, cpuDeck.length - 1));
		} else if (cpuDeck.length >= 5) {
			cpuTemp = cpuTemp.concat(cpuDeck.splice(0, 4));
		}
	}
	
	if(cpuTemp.length > 1) {
		//var cpuWar1 = document.createElement("div");				
		cpuWar1.className = "warArea";
		cpuWar1.innerHTML = "<img src='cardback.png' />";		
		document.getElementById("cpuSide").appendChild(cpuWar1);
		if (cpuTemp.length > 2) {	
			//var cpuWar2 = document.createElement("div");				
			cpuWar2.className = "warArea";
			cpuWar2.innerHTML = "<img src='cardback.png' />";			
			document.getElementById("cpuSide").appendChild(cpuWar2);
			if (cpuTemp.length > 3) {
				//var cpuWar3 = document.createElement("div");					
				cpuWar3.className = "warArea";
				cpuWar3.innerHTML = "<img src='cardback.png' />";
				document.getElementById("cpuSide").appendChild(cpuWar3);
			}
		}
	}
	
	// Player lays down next three cards.	
	if (playerTemp.length == 0) {
		if (playerDeck.length < 5 && playerDeck.length > 1) {
			playerTemp = playerDeck.splice(0, playerDeck.length - 1);
		} else if (playerDeck.length >= 5) {
			playerTemp = playerDeck.splice(0, 4);
		}
	} else {
		if (playerDeck.length < 5 && playerDeck.length > 1) {
			playerTemp = playerTemp.concat(playerDeck.splice(0, playerDeck.length - 1));
		} else if (playerDeck.length >= 5) {
			playerTemp = playerTemp.concat(playerDeck.splice(0, 4));
		}
	}
	
	if (playerTemp.length > 1) {
		//var playerWar1 = document.createElement("div");				
		playerWar1.className = "warArea";
		playerWar1.innerHTML = "<img src='cardback.png' />";		
		document.getElementById("playerSide").insertBefore(playerWar1, document.getElementById("playerDeck"));
		if (playerTemp.length > 2) {
			//var playerWar2 = document.createElement("div");					
			playerWar2.className = "warArea";
			playerWar2.innerHTML = "<img src='cardback.png' />";			
			document.getElementById("playerSide").insertBefore(playerWar2, document.getElementById("playerDeck"));
			if (playerTemp.length > 3) {
				//var playerWar3 = document.createElement("div");				
				playerWar3.className = "warArea";
				playerWar3.innerHTML = "<img src='cardback.png' />";				
				document.getElementById("playerSide").insertBefore(playerWar3, document.getElementById("playerDeck"));
			}
		}
	}
	
	// Cards to determine the 'war' winner are played.
	var cpuCard = cpuDeck[0];
	var playerCard = playerDeck[0];
	//var cpuWarCard = document.createElement("div");			
	cpuWarCard.className = "warArea";
	cpuWarCard.innerHTML = "<img src='" + cpuCard + "'/>";
	document.getElementById("cpuSide").appendChild(cpuWarCard);
	if (cpuWarCard.innerHTML === document.getElementById("cpuCard").innerHTML) { // If it's their last card.
		cpuWarCard.style.display = "none";
	}
	
	//var playerWarCard = document.createElement("div");		
	playerWarCard.className = "warArea";
	playerWarCard.innerHTML = "<img src='" + playerCard + "'/>";
	document.getElementById("playerSide").insertBefore(playerWarCard, document.getElementById("playerDeck"));	
	
	// Compare the top cards of the 'war'.
	compare(cpuCard, playerCard);		
	
	// If there are no wars left, clear the board.
	if (cpuTemp.length == 0 && playerTemp.length == 0) {
		addEvent(document.getElementById("playerDeck"), "click", removeWarCards, false);
	}
}

// Clears the board of the 'war' area when the war is over.
function removeWarCards() {
	if (cpuWar1 != null) document.getElementById("cpuSide").removeChild(cpuWar1);
	if (cpuWar2 != null) document.getElementById("cpuSide").removeChild(cpuWar2);
	if (cpuWar3 != null) document.getElementById("cpuSide").removeChild(cpuWar3);
	if (cpuWarCard != null) document.getElementById("cpuSide").removeChild(cpuWarCard);
	if (playerWar1 != null) document.getElementById("playerSide").removeChild(playerWar1);
	if (playerWar2 != null) document.getElementById("playerSide").removeChild(playerWar2);
	if (playerWar3 != null) document.getElementById("playerSide").removeChild(playerWar3);
	if (playerWarCard != null) document.getElementById("playerSide").removeChild(playerWarCard);
	
	removeEvent(document.getElementById("playerDeck"), "click", removeWarCards, false);	
}

// After the game is over displays buttons offering choices of playing again or seeing the stats.
function displayButtons() {
	var playAgainBtn = document.createElement("input");
	playAgainBtn.type = "button";
	playAgainBtn.name = "play";
	playAgainBtn.className = "displayBtns";
	playAgainBtn.value = "Play Again";
	playAgainBtn.title = "Press to play again";
	playAgainBtn.style.display = "inline";
	playAgainBtn.style.cursor = "pointer";	
	playAgainBtn.onclick = pageReload;
	document.getElementById("playAgain").appendChild(playAgainBtn);	
	
	var statsBtn = document.createElement("input");
	statsBtn.type = "button";
	statsBtn.name = "stats";
	statsBtn.className = "displayBtns";
	statsBtn.value = "See Stats";
	statsBtn.title = "Press to see stats";
	statsBtn.style.clear = "left";
	statsBtn.style.cursor = "pointer";		
	statsBtn.onclick = statsPage;
	document.getElementById("playAgain").appendChild(statsBtn);
	
	// Run the timeEnd function when the page is exited to go to
	// the stats page recording the time finsihed when playing.
	addEvent(statsBtn, "click", timeEnd, false);
}

// Reloads the game.html page when called.
function pageReload() {
	document.location.href = "game.html";	
}

// Loads the stats.html page when called.
function statsPage() {
	document.location.href = "stats.html";	
}

// Adds the time finished playing to the cookie when the page is exited.
function timeEnd() {
	var endTime = new Date();
	endTime = writeDateString(endTime);
	writeMCookie("playerInfo", "endTime", endTime);	
}
