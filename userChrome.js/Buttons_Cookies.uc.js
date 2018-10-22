// ==UserScript==
// @name                 Cookies button
// @version              1.1
// @description          Left-click toggles accepting first-party cookies and rejecting all.
// @author               https://www.reddit.com/user/Luke-Baker/
// @license              https://creativecommons.org/licenses/by-sa/4.0/
// @credits1             https://gist.github.com/Sporif/ad6e917d87787491538bac80d3c8918c
// @credits2             https://www.gozer.org/mozilla/userChrome.js/scripts/toogleCookies_menuitem
// @credits3             https://www.svgrepo.com/svg/47801/cookie
// @compatibility        Updated 2018-06-28. Tested on Firefox 63.
// ==/UserScript==

(function() {
	if (location != 'chrome://browser/content/browser.xul') 
    return;

  // Fetch the cookie preference      
  var pref = Components.classes['@mozilla.org/preferences-service;1']
             .getService(Components.interfaces.nsIPrefService)
             .getBranch('network.cookie.');
  function cookieStatus() {
    var pval = pref.getIntPref('cookieBehavior');
    return pval; // 0 = on +third-party; 1 = on -third-party; 2 = off
  }

  // Define label, tooltip, and image for the button
  var labl = (cookieStatus() !== 2) ? "Cookies on" : "Cookies off";
  var ttip = (cookieStatus() !== 2) ? "Disable cookies" : "Enable cookies";
  // Image source: https://www.svgrepo.com/svg/47801/cookie
  const cookiesvg = "list-style-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxzdHlsZT4uYXtmaWxsOiM1MzE4MEY7fS5ie2ZpbGw6I0M2NjUwMDt9PC9zdHlsZT48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI0OC40IiBmaWxsPSIjRjZBMjMwIi8+PHBhdGggZD0iTTI1NiA1MTJjLTY4LjQgMC0xMzIuNy0yNi42LTE4MS03NUMyNi42IDM4OC43IDAgMzI0LjQgMCAyNTZTMjYuNiAxMjMuMyA3NSA3NUMxMjMuMyAyNi42IDE4Ny42IDAgMjU2IDBzMTMyLjcgMjYuNiAxODEgNzVDNDg1LjQgMTIzLjMgNTEyIDE4Ny42IDUxMiAyNTZzLTI2LjYgMTMyLjctNzUgMTgxUzMyNC40IDUxMiAyNTYgNTEyek0yNTYgMTUuMmMtNjQuMyAwLTEyNC44IDI1LTE3MC4zIDcwLjVDNDAuMyAxMzEuMiAxNS4yIDE5MS43IDE1LjIgMjU2czI1IDEyNC44IDcwLjUgMTcwLjNjNDUuNSA0NS41IDEwNS45IDcwLjUgMTcwLjMgNzAuNXMxMjQuOC0yNSAxNzAuMy03MC41YzQ1LjUtNDUuNSA3MC41LTEwNS45IDcwLjUtMTcwLjNzLTI1LTEyNC44LTcwLjUtMTcwLjNDMzgwLjggNDAuMyAzMjAuMyAxNS4yIDI1NiAxNS4yeiIgY2xhc3M9ImEiLz48cGF0aCBkPSJNNDExLjkgNDExLjlsLTEwLjgtMTAuOGMyMy4yLTIzLjIgNDAtNTAuNyA1MC4xLTgxLjhsMTQuNSA0LjdDNDU0LjkgMzU3LjUgNDM2LjggMzg3IDQxMS45IDQxMS45eiIgY2xhc3M9ImEiLz48cGF0aCBkPSJNNDcxLjIgMzA0bC0xNC44LTMuM2MxNS4zLTY5LjEtNS4zLTE0MC01NS4yLTE4OS44bDEwLjgtMTAuOGMyNi42IDI2LjYgNDYuMSA1OS44IDU2LjIgOTZDNDc4IDIzMS4xIDQ3OSAyNjguNCA0NzEuMiAzMDR6IiBjbGFzcz0iYSIvPjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMTYuMyIgY2xhc3M9ImIiLz48cGF0aCBkPSJNMjU2IDI3OS45Yy0xMy4yIDAtMjMuOS0xMC43LTIzLjktMjMuOSAwLTEzLjIgMTAuNy0yMy45IDIzLjktMjMuOSAxMy4yIDAgMjMuOSAxMC43IDIzLjkgMjMuOUMyNzkuOSAyNjkuMiAyNjkuMiAyNzkuOSAyNTYgMjc5Ljl6TTI1NiAyNDcuM2MtNC44IDAtOC43IDMuOS04LjcgOC43czMuOSA4LjcgOC43IDguNyA4LjctMy45IDguNy04LjdTMjYwLjggMjQ3LjMgMjU2IDI0Ny4zeiIgY2xhc3M9ImEiLz48Y2lyY2xlIGN4PSIxMjYuNCIgY3k9IjI1NiIgcj0iMTYuMyIgY2xhc3M9ImIiLz48cGF0aCBkPSJNMTI2LjQgMjc5LjljLTEzLjIgMC0yMy45LTEwLjctMjMuOS0yMy45IDAtMTMuMiAxMC43LTIzLjkgMjMuOS0yMy45czIzLjkgMTAuNyAyMy45IDIzLjlDMTUwLjMgMjY5LjIgMTM5LjYgMjc5LjkgMTI2LjQgMjc5Ljl6TTEyNi40IDI0Ny4zYy00LjggMC04LjcgMy45LTguNyA4LjdzMy45IDguNyA4LjcgOC43YzQuOCAwIDguNy0zLjkgOC43LTguN1MxMzEuMiAyNDcuMyAxMjYuNCAyNDcuM3oiIGNsYXNzPSJhIi8+PGNpcmNsZSBjeD0iMzIwLjgiIGN5PSIxMjYuNCIgcj0iMTYuMyIgY2xhc3M9ImIiLz48cGF0aCBkPSJNMzIwLjggMTUwLjNjLTEzLjIgMC0yMy45LTEwLjctMjMuOS0yMy45czEwLjctMjMuOSAyMy45LTIzLjljMTMuMiAwIDIzLjkgMTAuNyAyMy45IDIzLjlTMzM0IDE1MC4zIDMyMC44IDE1MC4zek0zMjAuOCAxMTcuN2MtNC44IDAtOC43IDMuOS04LjcgOC43IDAgNC44IDMuOSA4LjcgOC43IDguNyA0LjggMCA4LjctMy45IDguNy04LjdDMzI5LjUgMTIxLjYgMzI1LjYgMTE3LjcgMzIwLjggMTE3Ljd6IiBjbGFzcz0iYSIvPjxjaXJjbGUgY3g9IjM4NS42IiBjeT0iMjU2IiByPSIxNi4zIiBjbGFzcz0iYiIvPjxwYXRoIGQ9Ik0zODUuNiAyNzkuOWMtMTMuMiAwLTIzLjktMTAuNy0yMy45LTIzLjkgMC0xMy4yIDEwLjctMjMuOSAyMy45LTIzLjkgMTMuMiAwIDIzLjkgMTAuNyAyMy45IDIzLjlDNDA5LjUgMjY5LjIgMzk4LjggMjc5LjkgMzg1LjYgMjc5Ljl6TTM4NS42IDI0Ny4zYy00LjggMC04LjcgMy45LTguNyA4LjdzMy45IDguNyA4LjcgOC43YzQuOCAwIDguNy0zLjkgOC43LTguN1MzOTAuNCAyNDcuMyAzODUuNiAyNDcuM3oiIGNsYXNzPSJhIi8+PGNpcmNsZSBjeD0iMTkxLjIiIGN5PSIxMjYuNCIgcj0iMTYuMyIgY2xhc3M9ImIiLz48cGF0aCBkPSJNMTkxLjIgMTUwLjNjLTEzLjIgMC0yMy45LTEwLjctMjMuOS0yMy45czEwLjctMjMuOSAyMy45LTIzLjkgMjMuOSAxMC43IDIzLjkgMjMuOVMyMDQuNCAxNTAuMyAxOTEuMiAxNTAuM3pNMTkxLjIgMTE3LjdjLTQuOCAwLTguNyAzLjktOC43IDguNyAwIDQuOCAzLjkgOC43IDguNyA4LjdzOC43LTMuOSA4LjctOC43QzE5OS45IDEyMS42IDE5NiAxMTcuNyAxOTEuMiAxMTcuN3oiIGNsYXNzPSJhIi8+PGNpcmNsZSBjeD0iMzIwLjgiIGN5PSIzODUuNiIgcj0iMTYuMyIgY2xhc3M9ImIiLz48cGF0aCBkPSJNMzIwLjggNDA5LjVjLTEzLjIgMC0yMy45LTEwLjctMjMuOS0yMy45IDAtMTMuMiAxMC43LTIzLjkgMjMuOS0yMy45IDEzLjIgMCAyMy45IDEwLjcgMjMuOSAyMy45QzM0NC43IDM5OC44IDMzNCA0MDkuNSAzMjAuOCA0MDkuNXpNMzIwLjggMzc2LjljLTQuOCAwLTguNyAzLjktOC43IDguNyAwIDQuOCAzLjkgOC43IDguNyA4LjcgNC44IDAgOC43LTMuOSA4LjctOC43QzMyOS41IDM4MC44IDMyNS42IDM3Ni45IDMyMC44IDM3Ni45eiIgY2xhc3M9ImEiLz48Y2lyY2xlIGN4PSIxOTEuMiIgY3k9IjM4NS42IiByPSIxNi4zIiBjbGFzcz0iYiIvPjxwYXRoIGQ9Ik0xOTEuMiA0MDkuNWMtMTMuMiAwLTIzLjktMTAuNy0yMy45LTIzLjkgMC0xMy4yIDEwLjctMjMuOSAyMy45LTIzLjlzMjMuOSAxMC43IDIzLjkgMjMuOUMyMTUuMSAzOTguOCAyMDQuNCA0MDkuNSAxOTEuMiA0MDkuNXpNMTkxLjIgMzc2LjljLTQuOCAwLTguNyAzLjktOC43IDguNyAwIDQuOCAzLjkgOC43IDguNyA4LjdzOC43LTMuOSA4LjctOC43QzE5OS45IDM4MC44IDE5NiAzNzYuOSAxOTEuMiAzNzYuOXoiIGNsYXNzPSJhIi8+PC9zdmc+')";
  // Create the button
	try {
		CustomizableUI.createWidget({
			id: 'cookie-toggle-button',
			type: 'custom',
			defaultArea: CustomizableUI.AREA_NAVBAR,
			onBuild: function(aDocument) {			
				var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
          toolbaritem.onclick = event => onClick(event);
				var props = {
					id: 'cookie-toggle-button',
					class: 'toolbarbutton-1 chromeclass-toolbar-additional',
          // Label, tooltip, and image at startup
					label: labl,
					tooltiptext: ttip,
					style: cookiesvg
        };		
				for(var p in props)
					toolbaritem.setAttribute(p, props[p]);
        // Image filter at startup
        toolbaritem.style.filter = (cookieStatus() !== 2 ? "grayscale(0%)" : "grayscale(100%)");
				return toolbaritem;
			}
		});
	} catch(e) {};		
    
  // What happens when you click the button
  function onClick(event) {

    var butt = document.getElementById("cookie-toggle-button");
    // Left-click: toggle cookies
    if (event.button == 0) {
      // Toggle between reject all cookies and accept first-party only
      pref.setIntPref('cookieBehavior', (cookieStatus() !== 2) ? 2 : 1);
      // Update button label, tooltip, and image filter
      butt.setAttribute('label', (cookieStatus() !== 2) ? "Cookies on" : "Cookies off");
      butt.setAttribute('tooltiptext', (cookieStatus() !== 2) ? "Disable cookies" : "Enable cookies");
      butt.style.filter = (cookieStatus() !== 2 ? "grayscale(0%)" : "grayscale(100%)");
    }
    /*
    // Obsolete since the old cookie manager was removed. If you know how to open the new one, please let me know.
    // Middle-click: open cookie window
    else if (event.button == 1) {
      window.open("chrome://browser/content/preferences/cookies.xul","cookiemanager", "chrome,resizable");
    }
    */
    // Any other button: default action
    else return;

  }

})();
