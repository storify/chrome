sfy.getURL = chrome.extension.getURL;

function storifyThis(info, tab) {
  var info = info || {}
    , element = {
        permalink: info.linkUrl || info.srcUrl || info.pageUrl || tab.url
      };

  if (info.selectionText) {
    element.type = 'quote';
    element.data = {
        quote: { text: info.selectionText }
    };
    element.source = {
        name: tab.title
      , href: tab.url
    };
    element.attribution = {
        name: tab.title
      , href: tab.url
      , thumbnail: tab.favicon
    };
  }

  console.log(info, tab, element);

  chrome.tabs.executeScript(null, {
    code: 'sfy.showModal(' + JSON.stringify(element) + ');'
  });
}

chrome.contextMenus.create({
  'title':    'Storify This Image',
  'contexts': ['image'],
  'onclick':  storifyThis
});

chrome.contextMenus.create({
  'title':    'Storify This Link',
  'contexts': ['link'],
  'onclick':  storifyThis
});

chrome.contextMenus.create({
  'title':    'Storify This Page',
  'contexts': ['page'],
  'onclick':  storifyThis
});

chrome.contextMenus.create({
  'title':    'Storify This Selection',
  'contexts': ['selection'],
  'onclick':  storifyThis
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.connect(tab.id);
  storifyThis(null, tab);
});