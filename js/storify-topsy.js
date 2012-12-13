sfy.fn['topsy'] = function() {

  sfy.loadCSS('css/storify-topsy.css');

  var redditSource = {
      name: 'topsy'
    , href: 'http://www.topsy.com'
  };

  function addButtons() {
    $('.actions, .info').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $action = $container.find('.favorite-link, .trackback-link').first().clone();

      $action
        .addClass('storify-button')
        .attr('href', '#')
        .text('Storify')
        .click(clicked);

      $container
        .addClass('storify-added')
        .find('.favorite-link, .trackback-link').first().after($action);
    });
  }

  function clicked(e) {
    e.preventDefault();

    var $target = $(e.target)
      , $container = $target.parents('.actions, .info').first()
      , permalink = $container.find('.date-link, .date').first().attr('href');

    sfy.showModal({ permalink: permalink });
  }

  addButtons();

};