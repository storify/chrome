var tweetTemplate = $('#tweetTemplate')
  , $iframe = null
  , loading = false;

var css = $('<link rel="stylesheet" type="text/css">');
css.attr('href', chrome.extension.getURL('css/storify-twitter.css'));
css.appendTo('head');

function addButtons() {
  $('.tweet').not('.storify-added').each(function(i, tweet) {
    var $tweet = $(tweet)
      , $actions = $tweet.find('.tweet-actions')
      , $action = $actions.find('.action-reply-container').clone();

    $tweet.addClass('storify-added');

    $action.removeClass().addClass('action-storify-container');

    $action.find('.js-action-reply')
      .removeClass('js-action-reply')
      .addClass('js-action-storify')
      .removeAttr('data-modal')
      .attr('title', 'Storify')

    $action.find('i')
      .removeClass()
      .addClass('sm-embed sm-storify');

    $action.find('b').text('Storify');

    $action.click(clicked);

    $actions.find('.action-fav-container').after($action);
  });
}

function clicked(e) {
  if (loading) return;

  loading = true;
  $('body').spin({
      className: 'storify-spinner'
    , length: 30
    , width: 5
    , radius: 30
    , hwaccel: true
  });


  var $target = $(e.target)
    , $details = $target.parents('.content').find('.details')
    , permalink = 'http://twitter.com' + $details.attr('href');

  $iframe = $('<iframe>');
  $iframe
    .attr('src', 'http://localhost.storify.com:3000/import?url=' + permalink)
    .attr('id', 'storify_overlay')
    .attr('allowtransparency', true)
    // .attr('scrolling', 'no')
    .css({ visibility: 'hidden' })
    .appendTo('body');

  $iframe.load(function(e) {
    $iframe.css({ visibility: 'visible' });
    loading = false;
    $('body').spin(false);
  });
}

function closeFrame() {
  if ($iframe) {
    $iframe.remove();
  }
}

$.receiveMessage(function(message) {
  console.log('chrome', message);
  try {
    var data = JSON.parse(message.data);
  } catch(e) { return; }

  console.log('chrome', data);
  switch (data.method) {
    case 'close': return closeFrame();
  }
});

setInterval(function() {
  addButtons();
}, 500);