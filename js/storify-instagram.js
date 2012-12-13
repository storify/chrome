sfy.fn['instagram'] = function() {

  sfy.loadCSS('css/storify-instagram.css');

  function addButtons() {
    $('.contents').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $action = $container.find('h3:first').clone();

      var $img = $action.find('img').clone();
      $img.attr('src', chrome.extension.getURL('img/storify-instagram-11.png'));

      $action
        .text('Storify')
        .prepend($img)
        .addClass('storify-button')
        .attr('title', 'Storify this')
        .click(clicked);

      $container
        .addClass('storify-added')
        .find('.promo')
        .after($action);
    });
  }

  function clicked(e) {
    e.preventDefault();
    sfy.showModal({ permalink: window.location.href });
  }

  addButtons();

};