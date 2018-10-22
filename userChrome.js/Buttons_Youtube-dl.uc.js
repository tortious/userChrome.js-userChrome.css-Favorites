// ==UserScript==
// @name                 youtube-dl button
// @version              1.0
// @description          A toolbar button that sends the current link to youtube-dl.
// @author               https://www.reddit.com/user/Luke-Baker/
// @license              https://creativecommons.org/licenses/by-sa/4.0/
// @credits1             Based on Sporif's restart button https://gist.github.com/Sporif/ad6e917d87787491538bac80d3c8918c
// @credits2             Icon by Zlatko Najdenovski https://www.iconfinder.com/icons/317714/video_youtube_icon
// @compatibility        Created 2018-01-15. Tested on Firefox 59.
// ==/UserScript==

(function() {
	if(location != 'chrome://browser/content/browser.xul')
    return;

  const exe = "C:\\Program Files (x86)\\youtube-dl\\youtube-dl.exe";
  const txt = "youtube-dl";
  // Icon by Zlatko Najdenovski https://www.iconfinder.com/icons/317714/video_youtube_icon
  const ico = "list-style-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzEuNyA5LjJjMCAwLTAuMy0yLjQtMS4zLTMuNCAtMS4yLTEuNC0yLjYtMS40LTMuMi0xLjRDMjIuNyA0IDE2IDQgMTYgNGgwYzAgMC02LjcgMC0xMS4yIDAuM0M0LjIgNC40IDIuOCA0LjQgMS42IDUuOCAwLjYgNi44IDAuMyA5LjIgMC4zIDkuMlMwIDExLjkgMCAxNC43djIuNmMwIDIuOCAwLjMgNS41IDAuMyA1LjVzMC4zIDIuNCAxLjMgMy40YzEuMiAxLjQgMi44IDEuMyAzLjUgMS41QzcuNyAyNy45IDE2IDI4IDE2IDI4czYuNyAwIDExLjItMC40YzAuNi0wLjEgMi0wLjEgMy4yLTEuNCAxLTEgMS4zLTMuNCAxLjMtMy40czAuMy0yLjggMC4zLTUuNXYtMi42QzMyIDExLjkgMzEuNyA5LjIgMzEuNyA5LjJ6IiBmaWxsPSIjRTAyRjJGIi8+PHBvbHlnb24gcG9pbnRzPSIxMiAxMCAxMiAyMiAyMiAxNiAiIGZpbGw9IiNGRkYiLz48L3N2Zz4=')";  

  try {
    CustomizableUI.createWidget({
      id: 'youtubedl-button',
      type: 'custom',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
        toolbaritem.onclick = event => launchApplication(event);
        var props = {
          id: 'youtubedl-button',
          class: 'toolbarbutton-1 chromeclass-toolbar-additional',
          label: txt,
          tooltiptext: txt,
          style: ico
        };
        for(var p in props)
          toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
  } catch(e) {};
  
  function launchApplication(event) {

    if(event.button !== 0)
      return;
    var app = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
    app.initWithPath(exe);
    if (!app.exists()) {
      console.error("[youtube-dl button userChrome script] Couldn't locate executable.");
      return;
    }
    Cc["@mozilla.org/browser/shell-service;1"]
    .getService(Ci.nsIShellService_MOZILLA_1_8_BRANCH || Ci.nsIShellService)
    .openApplicationWithURI(app, gBrowser.currentURI.spec);

  }

})();
