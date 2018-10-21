// ==UserScript==
// @name                 Hamburger menu keyboard shortcut
// @version              1.0
// @description          Alt+m toggles the hamburger button menu.
// @author               https://www.reddit.com/user/Luke-Baker/
// @license              https://creativecommons.org/licenses/by-sa/4.0/
// @compatibility        Created 2018-01-15. Tested on Firefox 59.
// ==/UserScript==

(function() {
	if(location != "chrome://browser/content/browser.xul")
    return;

  window.addEventListener("keypress",
    function(e) {
      if (e.key == "m" && e.getModifierState("Alt") == true) {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("PanelUI-menu-button").click();
      }
    }, false);

})();
