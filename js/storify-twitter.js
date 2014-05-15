sfy.fn['twitter'] = function() {

  sfy.loadCSS('css/storifycons.css');

  function addButtons() {
    var sel = window.location.href.match('/status/') ? '.permalink-tweet, .simple-tweet' : '.tweet';

    $(sel).not('.storify-added').each(function(i, tweet) {
      var $tweet = $(tweet)
        , $actions = $tweet.find('.tweet-actions')
        , $action = $actions.find('.action-reply-container').first().clone();

      $tweet.addClass('storify-added');

      $action.removeClass().addClass('action-storify-container');

      $action.find('.js-action-reply')
        .removeClass('js-action-reply')
        .addClass('js-action-storify')
        .removeAttr('data-modal')
        .attr('title', 'Storify');

      $action.find('span')
        .removeClass('Icon--reply')
        .addClass('storifycon-logo')
        .css('top', '2px');

      $action.find('b').text('Storify');

      $action.click(clicked);
      $actions.find('.action-fav-container').after($action);
    });
  }

  function clicked(e) {
    e.preventDefault();
    
    var $target = $(e.target)
      , $tweet = $target.parents('.tweet')
      , permalink = 'http://twitter.com/' + $tweet.attr('data-screen-name') +
                    '/status/' + $tweet.attr('data-item-id');

    sfy.showModal({ permalink: permalink });
  }

  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);

};
