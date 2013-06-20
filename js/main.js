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

function clog(msg) {
  chrome.tabs.executeScript(null, {
    code: 'if(window.console) { console.log("storify> ","'+msg+'"); }'
  });
}

// [ryan:2-12-13] might need this later, left here for reference
// chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
//   if (request.event) {
//     lastElementClicked = request.event;
//     clog("logged dom element");
//   }
//   clog(request.event);
// });

function storifyThisComment(info,tab){  
  chrome.tabs.executeScript(null,{
    // code: 'sfy.fn["youtube"].test();'
    code: 'sfy.fn["youtube"].storifyComment(sfy.lastElementClicked);'
  });
  return;
};

function storifyThisPost(info, tab) {
  // clog("storifyThisPost ", lastElementClicked);

  chrome.tabs.executeScript(null, {
    code: 'sfy.fn["facebook"].storifyThisPost();'
  });
  return;

  // [ryan:2-12-13] these are all of the values of info, left here for future reference
  // clog("mediaType: "+info.mediaType);
  // clog("linkUrl: "+info.linkUrl);
  // clog("srcUrl: "+info.srcUrl);
  // clog("pageUrl: "+info.pageUrl);
  // clog("frameUrl: "+info.frameUrl);
  // clog("selectionText: "+info.selectionText);
  // clog("editable: "+info.editable);
  // clog("wasChecked: "+info.wasChecked);
  // clog("checked: "+info.checked);
};

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

chrome.contextMenus.create({
  'title':    'Storify This Post',
  'contexts': ['all'],
  'onclick':  storifyThisPost,
  'documentUrlPatterns': ['*://*.facebook.com/*']
});

//AM: YouTube Comments
chrome.contextMenus.create({
  'title':    'Storify This Comment',
  'contexts': ['all'],
  'onclick':  storifyThisComment,
  'documentUrlPatterns': ['*://*.youtube.com/*']
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.connect(tab.id);
  storifyThis(null, tab);
});

// chrome.contextMenus.onClicked