var css = $('<link rel="stylesheet" type="text/css">');
css.attr('href', chrome.extension.getURL('css/storify-common.css'));
css.appendTo('head');

var sfy = {
  modal: null,
  loading: false,

  showModal: function(element) {
    if (sfy.loading) return;
    sfy.loading = true;
    
    $('body').spin({
        className: 'storify-spinner'
      , length: 30
      , width: 5
      , radius: 30
      , hwaccel: true
    });

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
      $('body').spin(false);
    });

    return sfy.modal;
  },

  closeModal: function() {
    if (sfy.modal) {
      sfy.modal.remove();
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