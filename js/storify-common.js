// var head = $('head');

var css = $('<link rel="stylesheet" type="text/css">');
css.attr('href', chrome.extension.getURL('css/storify-common.css'));
css.prependTo('html');

var sfy = {
  modal: null,
  loading: false,

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
    
    if ($.spin) {
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
      .attr('src', 'http://localhost.storify.com:3000/import?element=' + encodeURIComponent(JSON.stringify(element)))
      .attr('id', 'storify_overlay')
      .attr('allowtransparency', true)
      // .attr('scrolling', 'no')
      .css({ visibility: 'hidden' })
      .appendTo('body');

    sfy.modal.load(function(e) {
      sfy.modal.css({ visibility: 'visible' });
      sfy.loading = false;
      if ($.spin) {
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