sfy.fn['pinterest'] = function() {

  sfy.loadCSS('css/storify-pinterest.css');

  var pinterestSource = {
      name: 'pinterest'
    , href: 'http://www.pinterest.com'
  };

  function addButtons() {
    $('#ColumnContainer .pin').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $actions = $container.find('.actions')
        , $action = $actions.find('.repin_link').clone();

      $action
        .removeClass('repin_link')
        .addClass('storify-button')
        .attr('href', '#')
        .html('<em></em>Storify')
        .click(clicked)
        .appendTo($actions);

      $container.addClass('storify-added');
    });

    $('#zoom, .WhiteContainer').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $actions = $container.find('#PinActionButtons')
        , $action = $actions.find('.ZoomLikeButton, .like_pin').clone();

      // console.log($container, $actions, $action);
      if (!$actions.length || !$action.length) return;

      $action
        .removeClass('ZoomLikeButton')
        .addClass('storify-button-big')
        .removeAttr('data-text-like')
        .removeAttr('data-text-unlike')
        .html('<em></em>Storify')
        .click(clicked);

      if ($action.hasClass('like_pin')) {
        var $actionLI = $('<li>');
        $actionLI.append($action);
        $actions.find('ul').append($actionLI);
      } else {
        $action.appendTo($actions);
      }
      
      $container.addClass('storify-added');
    });
  }

  function clicked(e) {
    e.preventDefault();
    // e.stopPropogation();

    var $target = $(e.target)
      , $container = $target.parents('.PinHolder')
      , permalink;

    if (window.location.href.indexOf('/pin/') > -1) {
      permalink = window.location.href;
    } else {
      permalink = pinterestSource.href + $container.find('.ImgLink').attr('href');
    }

    sfy.showModal({ permalink: permalink });
  }

  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);

};