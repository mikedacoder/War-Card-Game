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

function writeDateString(dateObj) {
	var monthName = new Array("Jan", "Feb", "Mar",
  		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
  		"Oct", "Nov", "Dec");
		
	var thisSecond = dateObj.getSeconds();
	var thisMinute = dateObj.getMinutes();	
	var thisHour = dateObj.getHours();
   	var thisMonth = dateObj.getMonth();
   	var thisYear = dateObj.getFullYear();
	
	// change thisHour from 24-hour time to 12-hour time by:
	// 1) if thisHour < 12 the set ampm to " a.m." otherwise set
	// it to " p.m."
	var ampm = (thisHour < 12) ? " a.m." : " p.m.";
	
	// 2) subtract 12 from the thisHour variable
	thisHour = (thisHour > 12) ? thisHour - 12 : thisHour;

	// 3) if thisHour equals 0, change it to 12
	thisHour = (thisHour == 0) ? 12 : thisHour;
	
	// add leading zeros to minutes and seconds less than 10
	thisMinute = thisMinute < 10 ? "0" + thisMinute : thisMinute;
	thisSecond = thisSecond < 10 ? "0" + thisSecond : thisSecond;

   	return thisHour + ":" + thisMinute + ":" + thisSecond + " " 
		+ ampm + " on " + monthName[thisMonth] + " "
		+ dateObj.getDate() + ", " + thisYear + ", ";
	}

// Write the cookie to use for the stats page.
function writeMCookie(cName, fName, fValue, expDate, cPath, cDomain, cSecure) {	

	if (cName && fName && fValue != "") {
	
		// Create the subkey.
		var subkey = fName + "=" + escape(fValue);
		
		// Retrieve the current cookie value.
		var cValue = null;
		var cookiesArray = document.cookie.split("; ");
		for (var i = 0; i < cookiesArray.length; i++) {
			if (cookiesArray[i].split("=")[0] == cName) {
				var valueIndex = cookiesArray[i].indexOf("=") + 1;
				cValue = cookiesArray[i].slice(valueIndex);
				break;
			}
		}
	
		if (cValue) {
			var fieldExists = false;
			var cValueArray = cValue.split("&");
			for (var i = 0; i < cValueArray.length; i ++) {
				if (cValueArray[i].split("=")[0] == fName) {
					fieldExists = true;
					cValueArray[i] = subkey;
					break;
				}
			}
			
			if (fieldExists) cValue = cValueArray.join("&");
			else cValue += "&" + subkey;
		} else {
			cValue = subkey;
		}
		
		var cString = cName + "=" + cValue;
		
		if (expDate) cString += ";expires=" + expDate.toGMTString();
		if (cPath) cString += ";path=" + cPath;
		if (cDomain) cString += ";domain=" + cDomain;
		if (cSecure) cString += ";secure";
		
		document.cookie = cString;
	}
}

// Retrieve the cookie for the stats page.
function retrieveMCookie(cName, fName) {
	
	if (document.cookie) {
		
		// Retrieve the cookie value.
		var cValue = null;
		var cookiesArray = document.cookie.split("; ");
		for (var i = 0; i < cookiesArray.length; i++) {
			if (cookiesArray[i].split("=")[0] == cName) {
				var valueIndex = cookiesArray[i].indexOf("=") + 1;
				cValue = cookiesArray[i].slice(valueIndex);
				break;
			}
		}
		
		// Retrieve the field value within the cookie.
		if (cValue) {
			var cValueArray = cValue.split("&");
			for (var i = 0; i < cValueArray.length; i++) {
				
				if (cValueArray[i].split("=")[0] == fName)
					return unescape(cValueArray[i].split("=")[1]);
			}
		}	
	}
}

// Function to delet a cookie.
function deleteCookie(cName) {
	if (document.cookie) {
		
		var cookiesArray = document.cookie.split("; ");
		for (var i = 0; i < cookiesArray.length; i ++) {
			if (cookiesArray[i].split("=")[0] == cName) {
				document.cookie = cName + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
			}
		}
	}
}


// Test if cookies are enabled in the browser.
function cookiesEnabled() {

	var cookiesTest = false;
	
	writeCookie("tempCookie", "temp");
	if (retrieveCookie("tempCookie")) {
		cookiesTest = true;
		deleteCookie("tempCookie");
	}
	return cookiesTest;
}
//console.log(document.cookie);