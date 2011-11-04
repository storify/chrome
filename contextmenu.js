/**
 * Storify Chrome context menu
 * 
 * @param {Object} info
 * @param {Object} tab
 */
function storifyThis(info, tab) {
  var baseUrl = SFY.baseUrl || 'http://storify.com'
    , appname = SFY.appname || 'storifyextension'
    , strictEncodeURIComponent = SFY.strictEncodeURIComponent
    , permalink = info.linkUrl || info.srcUrl || info.pageUrl
    , text      = info.selectionText || ''
    , title     = tab.title || ''
    , favicon   = tab.favIconUrl || '';

  if (text != '') {
    text = text.toString().substr(0,500).replace(/\n|\r/g,' ');
  }

  chrome.tabs.executeScript(null,
                             {code:"document.getElementsByTagName('body')[0].setAttribute('storify_importPermalink','"+permalink+"');"});

  chrome.tabs.executeScript(null,
                             {code:"(function() { _my_script=document.createElement('SCRIPT'); _my_script.type='text/javascript'; _my_script.src='"+baseUrl+"/public/js/storifythispage.js'; document.getElementsByTagName('head')[0].appendChild(_my_script);})()"});
}

var storifyImage = chrome.contextMenus.create({
  'title':    'Storify This... Image',
  'contexts': ['image'],
  'onclick':  storifyThis
});

var storifyLink = chrome.contextMenus.create({
  'title':    'Storify This... Link',
  'contexts': ['link'],
  'onclick':  storifyThis
});

var storifyPage = chrome.contextMenus.create({
  'title':    'Storify This... Page',
  'contexts': ['page'],
  'onclick':  storifyThis
});

var storifySelection = chrome.contextMenus.create({
  'title':    'Storify This... Selection',
  'contexts': ['selection'],
  'onclick':  storifyThis
});
