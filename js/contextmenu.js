/**
 * Storify Chrome context menu
 * 
 * @param {Object} info
 * @param {Object} tab
 */
function storifyThis(info, tab) {
  var data = {
    permalink: info.linkUrl || info.srcUrl || info.pageUrl,
    text: info.selectionText,
    title: tab.title,
    favicon: tab.favIconUrl,
    tab: tab
  };

  console.log(data);

  if (data.text) {
    data.text = data.text.toString().substr(0,500).replace(/\n|\r/g,' ');
  }

  chrome.tabs.executeScript(null, {
    code: 'window.s=window.s||{};window.s.info=' + JSON.stringify(data),
  });

  chrome.tabs.executeScript(null, {
    file: 'js/embed.js'
  });
}

var storifyImage = chrome.contextMenus.create({
  'title':    'Storify This Image',
  'contexts': ['image'],
  'onclick':  storifyThis
});

var storifyLink = chrome.contextMenus.create({
  'title':    'Storify This Link',
  'contexts': ['link'],
  'onclick':  storifyThis
});

var storifyPage = chrome.contextMenus.create({
  'title':    'Storify This Page',
  'contexts': ['page'],
  'onclick':  storifyThis
});

var storifySelection = chrome.contextMenus.create({
  'title':    'Storify This Selection',
  'contexts': ['selection'],
  'onclick':  storifyThis
});
