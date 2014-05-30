sfy.fn['twitter'] = function() {

  sfy.loadCSS('css/storifycons.css');

  function addButtons() {

    $('.js-actionable-tweet').not('.storify-added').each(function(i, tweet) {
      var $tweet = $(tweet)
        , $actions = $tweet.find('.js-actions')
        , $action = $actions.children().first().clone();

      $tweet.addClass('storify-added');

      $action.removeClass('action-reply-container ProfileTweet-action--reply')
        .addClass('action-storify-container');

      $action.find('.js-action-reply, .js-actionReply')
        .removeClass('js-action-reply js-actionReply')
        .addClass('js-action-storify')
        .removeAttr('data-modal')
        .attr('title', 'Storify');

      $action.find('.Icon--reply')
        .removeClass('Icon--reply')
        .addClass('storifycon-logo')
        .css({'position': 'relative', 'top': '2px'});

      $action.find('b').text('Storify');

      $action.click(clicked);
      $actions.find('.action-fav-container').after($action);
      $actions.find('.ProfileTweet-action--favorite').after($action);
    });
  }

  function clicked(e) {
    e.preventDefault();
    
    var $target = $(e.target)
      , $tweet = $target.parents('.js-actionable-tweet')
      , permalink = 'http://twitter.com/' + $tweet.attr('data-screen-name') +
                    '/status/' + $tweet.attr('data-item-id');

    sfy.showModal({ permalink: permalink });
  }

  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);

};
