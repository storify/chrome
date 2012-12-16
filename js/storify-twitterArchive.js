sfy.fn['twitterArchive'] = function() {
  sfy.loadCSS('css/storify-twitter.css');

  function addButtons() {
    $('.twt-tweet').not('.storify-added').each(function(i, tweet) {

      var $tweet = $(tweet)
        , $actions = $tweet.find('.footer')
        , $action = $("<a>");

      $tweet.addClass('storify-added');

      $action
          .addClass('action-storify-container js-action-storify view-details')
          .text('Add to Storify')
          .css('margin-right','10px !important')
          .click(clicked);

      $actions.find('.view-details').before($action);
    });
  }

  function clicked(e) {
    e.preventDefault();
    var $target = $(e.target)
      , $tweet = $target.parents('.twt-tweet')
      , permalink = $tweet.find('a.permalink').attr('href');

    sfy.showModal({ permalink: permalink });
  }

  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);
}
