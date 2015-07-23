var sfy = {
  modal: null,
  loading: false,
  storifyUrl: (window.location.protocol.match(/^http/)) ? window.location.protocol + '//storify.com' : 'http://storify.com',
  fn: [],
  getURL: chrome.extension.getURL,
  lastElementClicked: null,

  showModal: function(element, options) {
    if (sfy.loading || sfy.modal) return;
    sfy.loading = true;

    options = options || {};
    options.utm_medium = 'chrome';
    options.utm_source = options.utm_source || window.location.hostname || 'unknown';
    options.utm_content = options.utm_content || element.type || 'unknown';

    var overlay = $('<div>');
    overlay
      .css({
          position: 'fixed'
        , top: 0
        , left: 0
        , 'z-index': 2000000000
        , width: '100%'
        , height: '100%'
        , background: 'rgba(0,0,0,0.8)'
      })
      .appendTo('body');
    
    if ($.fn.spin) {
      $('body').spin({
          className: 'storify-spinner'
        , length: 10
        , width: 5
        , radius: 20
        , hwaccel: true
        , color: 'white'
      });
    }
    
    var url = sfy.storifyUrl + '/import?' +
      'utm_source=' + options.utm_source +
      '&utm_medium=' + options.utm_medium +
      '&utm_content=' + options.utm_content +
      '&utm_campaign=storify-action' +
      '&element=' + encodeURIComponent(JSON.stringify(element));

    /*
     * Because of this chrome bug: https://code.google.com/p/chromium/issues/detail?id=408932
     * we cannot load Storify's import page directly on pages with a strict Content Security
     * Policy (e.g. Twitter, Facebook). So we work around it by loading a local iframe, which
     * loads another iframe inside (inception!).
     */
    sfy.modal = $('<iframe>');
    sfy.modal
      .attr('src', sfy.getURL('iframe.html'))
      .attr('id', 'storify_overlay')
      .attr('allowtransparency', true)
      .css({ visibility: 'hidden' })
      .appendTo('body');
          
    sfy.modal.load(function(e) {
      var win = sfy.modal[0].contentWindow;
      var doc = win.document;
            
      var iframe = doc.createElement('iframe');
      iframe.setAttribute('src', url);
      iframe.setAttribute('allowtransparency', true);
      iframe.setAttribute('id', 'storify_overlay');
      doc.body.appendChild(iframe);
      
      win.onmessage = function(message) {
        try {
          var data = JSON.parse(message.data);
        } catch(e) { return; }
        
        switch (data.method) {
          case 'close':
            sfy.closeModal();
            break;
            
          case 'load':
            sfy.modal.css({ visibility: 'visible' });
            sfy.loading = false;
            if ($.fn.spin) {
              $('body').spin(false);
            }
            overlay.remove();
            break;
        }
      };
    });

    return sfy.modal;
  },

  closeModal: function() {
    if (sfy.modal) {
      sfy.modal.remove();
      sfy.modal = null;
    }
  },

  loadCSS: function(path) {
    var css = $('<link rel="stylesheet" type="text/css">');
    css.attr('href', sfy.getURL(path));
    css.prependTo('html');
  },

  loadScript: function(path) {
    var script = $('<script>');
    script.attr('src', sfy.getURL(path));
    script.prependTo('html');
  }

};

var downHandler = function(e) {
  sfy.lastElementClicked = e;
};

$(document).mousedown( downHandler );
