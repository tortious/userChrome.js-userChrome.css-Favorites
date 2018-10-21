// "One Click" Bookmark Sidebar button script for Firefox 60+ 
// 
// based on 'Quit' button code by 2002Andreas
// and 'Restart' script for Firefox 60+ by Aris-t2
// modified by Pizzapops with code from mortalis13

(function() {

try {
  Components.utils.import("resource:///modules/CustomizableUI.jsm");
  var {Services} = Components.utils.import("resource://gre/modules/Services.jsm", {});
  var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
  
  CustomizableUI.createWidget({
	id: "bookmarks-sidebar-button", // button id
	defaultArea: CustomizableUI.AREA_NAVBAR,
	removable: true,
	label: "Bookmarks Sidebar", // button title
	tooltiptext: "Bookmarks Sidebar", // tooltip title
onCommand : function(aEvent) {
       var aWindow = aEvent.target.ownerDocument.defaultView; // edited as mentioned by author
       aWindow.SidebarUI.toggle('viewBookmarksSidebar');
    },
    
    onCreated: function(aNode){
      aNode.setAttribute('type', 'checkbox')
      aNode.setAttribute('group', 'sidebar')
      aNode.setAttribute('observes', 'viewBookmarksSidebar')
      // aNode.setAttribute('observes', 'viewHistorySidebar')
    
	},
  });
  
  // style button icon
  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	  #bookmarks-sidebar-button .toolbarbutton-icon {\
		list-style-image: url("chrome://browser/skin/bookmark-star-on-tray.svg"); /* icon / path to icon */ \
		transform: scaleX(-1); /* icon mirroring */\
		fill: black; /* icon color name/code */\
	  }\
	\
  '), null, null);
  
  sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
  
} catch (e) {
	Components.utils.reportError(e);
};

})();
