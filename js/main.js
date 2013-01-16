function getDomain(urlstr) {
  if(!urlstr) return '';
  var domain = urlstr.replace(/^(https?:\/\/)(www\.)?/i,'');
  return domain.replace(/\/.*/g,'');
}

function storifyThisElement(element) {
  chrome.tabs.executeScript(null, {
    code: 'sfy.showModal(' + JSON.stringify(element) + '); if(window.console) { console.log("sfychrome> ",'+JSON.stringify(element)+'); }'
  });
  return;
}

function buildElement(info, tab) {

  var info = info || {}
    , element = {
        permalink: info.linkUrl || info.srcUrl || info.pageUrl || tab.url
      };

  element.source = {
      name: getDomain(tab.url)
    , href: tab.url
    , favicon: tab.favIconUrl
  };

  element.attribution = {
      name: getDomain(tab.url)
    , href: tab.url
    , thumbnail: tab.favIconUrl
  };

  return element;

}

function storifyThisSelection(info, tab) {

  var element = buildElement(info, tab);

  if (info.selectionText) {
    element.type = 'quote';
    element.data = {
        quote: { text: info.selectionText }
    };
  }

  return storifyThisElement(element);
};

function storifyThis(info, tab) {
  var element = buildElement(info, tab);
  return storifyThisElement(element);
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
  'onclick':  storifyThisSelection
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.connect(tab.id);
  storifyThis(null, tab);
});
