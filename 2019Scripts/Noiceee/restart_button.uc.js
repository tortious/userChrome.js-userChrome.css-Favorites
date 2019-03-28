// ==UserScript==
// @name                 Restart button and menu entries
// @version              1.0
// @description          A toolbar button and menu entries that restart Firefox.
// @author               https://www.reddit.com/user/Luke-Baker/
// @license              https://creativecommons.org/licenses/by-sa/4.0/
// @credits              This is Sporif's restart button + menu entries + different icon | https://gist.github.com/Sporif/ad6e917d87787491538bac80d3c8918c
// @compatibility        Created 2018-01-15. Tested on Firefox 59.
// ==/UserScript==

(function() {
	if(location != 'chrome://browser/content/browser.xul')
    return;

  const text = "Restart";
  const icon = "list-style-image: url(chrome://browser/skin/sync.svg)";

  try {
    CustomizableUI.createWidget({
      id: 'restart-button',
      type: 'custom',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
        toolbaritem.onclick = event => restartNow(event);
        var props = {
          id: 'restart-button',
          class: 'toolbarbutton-1 chromeclass-toolbar-additional',
          label: text,
          tooltiptext: text,
          style: icon
        };
        for(var p in props)
          toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
  } catch(e) {};
  
  function restartNow(event) {
    if(event.button == 1)
      Services.appinfo.invalidateCachesOnRestart();
    else if(event.button == 2) 
      return;

    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
    Services.obs.notifyObservers(cancelQuit, "quit-application-requested", "restart");
    if(!cancelQuit.data) 
      Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);
  }

  // Hamburger menu entry
  var menupanelexit = document.getElementById("appMenu-quit-button");
  var menupanelrestart = document.createElement("toolbarbutton");
  menupanelrestart.setAttribute("id","appMenu-restart-button");
  menupanelrestart.setAttribute("class","subviewbutton subviewbutton-iconic");
  menupanelrestart.setAttribute("label",text);
  menupanelrestart.setAttribute("style",icon);
  menupanelrestart.onclick = event => restartNow(event);
  menupanelexit.parentNode.insertBefore(menupanelrestart, menupanelexit);

  // File menu entry
  var menufileexit = document.getElementById("menu_FileQuitItem");
  var menufilerestart = document.createElement("menuitem");
  menufilerestart.setAttribute("id","menu_FileRestartItem");
  menufilerestart.setAttribute("label",text);
  menufilerestart.setAttribute("accesskey","R");
  menufilerestart.addEventListener("command", restartNow, false);
  menufileexit.parentNode.insertBefore(menufilerestart, menufileexit);

})();
