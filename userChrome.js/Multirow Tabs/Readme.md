Multi-line tab

There are 4 different scripts available.

    Script 1: Multi-line tab bar as (CSS Code) Unlimited number of lines, drag and drop tabs, and necessary toolbar icon customization

    Script 2: Multi-line tab bar as (CSS Code) Limited number of lines, drag and drop tabs, and necessary toolbar icon customization

    Script 3: Multi-line tab bar as (CSS Code) Limited number of lines, drag and drop tabs, sort collation toolbar and toolbar icon customization

    Script 4: Multi-line tab bar as (CSS Code) Limited number of lines, drag and drop tabs, sorting toolbars and toolbar icon customization, adjusting the vertical width of the toolbar.

Small CSS code for userChrome.css:

/*AGENT_SHEET*/ @charset "UTF-8";
@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
#tabbrowser-tabs .tabbrowser-arrowscrollbox {
    -moz-binding: url("chrome://global/content/bindings/scrollbox.xml#arrowscrollbox") !important;
}
