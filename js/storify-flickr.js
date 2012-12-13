sfy.fn['flickr'] = function() {

  sfy.loadCSS('css/storify-flickr.css');

  function addButtons() {
    $('#button-bar').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $action = $container.children().first().clone()
        // , $divider = $container.find('.divider:first').clone();

      $action
        .removeAttr('id')
        .removeClass()
        .addClass('storify-button first last')
        .click(clicked);

      $action.find('a')
        .removeAttr('id')
        .removeAttr('onclick')
        .attr('title', 'Storify this')
        .removeClass('fave-button visible-if-can-fave')
        .html('<i></i> Storify');

      $container
        .addClass('storify-added')
        .append($action)
        // .find('.divider:first')
        // .after($divider)
        // .after($action);
    });
  }

  function clicked(e) {
    e.preventDefault();
    sfy.showModal({ permalink: window.location.href });
  }

  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);

};