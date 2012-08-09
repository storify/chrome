var sfy = {
  modal: null,
  loading: false,
  storifyUrl: '//storify.com',

  getURL: chrome.extension.getURL,

  showModal: function(element) {
    if (sfy.loading || sfy.modal) return;
    sfy.loading = true;

    var overlay = $('<div>');
    overlay
      .css({
          position: 'fixed'
        , top: 0
        , left: 0
        , 'z-index': 999999
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
        , color: '#fff'
      });
    }

    sfy.modal = $('<iframe>');
    sfy.modal
      .attr('src', sfy.storifyUrl + '/import?element=' + encodeURIComponent(JSON.stringify(element)))
      .attr('id', 'storify_overlay')
      .attr('allowtransparency', true)
      // .attr('scrolling', 'no')
      .css({ visibility: 'hidden' })
      .appendTo('body');

    sfy.modal.load(function(e) {
      sfy.modal.css({ visibility: 'visible' });
      sfy.loading = false;
      if ($.fn.spin) {
        $('body').spin(false);
      }
      overlay.remove();
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
    script.attr('src', path);
    script.prependTo('html');
  }

};

$.receiveMessage(function(message) {
  try {
    var data = JSON.parse(message.data);
  } catch(e) { return; }

  switch (data.method) {
    case 'close': return sfy.closeModal();
  }
});
