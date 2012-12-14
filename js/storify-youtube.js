sfy.fn['youtube'] = function() {

  sfy.loadCSS('css/storify-youtube.css');

  function addButton() {
    $('#watch7-secondary-actions').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $action = $container.find('> span:first-child').clone();

      $container.addClass('storify-added');

      $action.find('button')
        .attr('title', 'Storify this video')
        .removeAttr('data-button-toggle')
        .removeAttr('data-trigger-for')
        .removeClass('yt-uix-button-toggled')
        .click(clicked);

      $action.find('.yt-uix-button-content')
        .text('Storify ');

      $container.prepend($action);
    });
  }

  function clicked(e) {
    e.preventDefault();
    sfy.showModal({ permalink: window.location.href });
  }

  addButton();

};