var css = $('<link rel="stylesheet" type="text/css">');
css.attr('href', chrome.extension.getURL('css/storify-gplus.css'));
css.appendTo('head');

var gplusSource = {
    name: 'gplus'
  , href: 'http://plus.google.com'
};

function addButtons() {
  $('.BE').not('.storify-added').each(function(i, container) {
    var $container = $(container)
      , $action = $container.find('.Tj:first').clone();

    $action
      .addClass('storify-button')
      .removeClass('pk')
      .attr('data-tooltip', 'Storify this post')
      .removeAttr('aria-label')
      .click(clicked);

    $action.find('.iq')
      .removeClass('OG');

    $container
      .addClass('storify-added')
      .find('.Kp').after($action);
  });

  $('.le').not('.storify-added').each(function(i, container) {
    var $container = $(container)
      , $sibling = $container.find('.Gj:first')
      , $action = $sibling.clone()
      , $button = $action.children();

    $container
      .addClass('storify-added')
      .hover(function() {
        $action.show();
      }, function() {
        $action.hide();
      });

    $button
      .addClass('storify-button-small')
      .removeClass('eswd')
      .removeAttr('id')
      .removeAttr('g:entity')
      .removeAttr('g:token')
      .attr('title', 'Storify this comment')
      .click(commentClicked);

    $sibling.after($action);
  });
}

function clicked(e) {
  e.preventDefault();
  
  var $target = $(e.target)
    , $container = $target.parents('.Cg')
    , $actorName = $container.find('.md')
    , $timestamp = $container.find('.Mq')
    , $link = $container.find('.ZE')
    , $image = $container.find('.Ws')
    , $message = $container.find('.jn');

  var permalink = gplusSource.href + '/' + $timestamp.attr('href');

  var element = {
      type: 'quote'
    , data: {
          quote: { text: $message.html() }
      }
    , permalink: permalink
    , source: gplusSource
    , attribution: {
          name: $actorName.text()
        , href: $actorName.attr('href')
        , thumbnail: $container.find('.Xl').attr('src')
      }
    , posted_at: new Date($timestamp.attr('title'))
  };

  if ($link.length) {
    var title = $link.text();
    element.type = 'link';
    element.data.link = {
        title: title.substr(0, title.length - 2)
      , description: $container.find('.Xf').text()
      , thumbnail: $image.attr('src')
    };
  } else if ($image.length) {
    element.type = 'image';
    element.data.image = {
        src: $image.attr('src')
      , caption: $message.html()
    };
  }

  if (!element.data.quote.text && !element.data.image) return;
  
  sfy.showModal(element);
}

function commentClicked(e) {
  e.preventDefault();

  var $target = $(e.target)
    , $container = $target.parents('.lp')
    , $actorName = $container.find('.gi')
    , $timestamp = $container.find('.Gg')
    , $message = $container.find('.Si');

  var permalink = gplusSource.href + '/' + $container.parents('.Cg').find('.Mq').attr('href');
  permalink += '/' + $container.attr('id').replace('#', '');

  var element = {
      type: 'quote'
    , data: {
          quote: { text: $message.html() }
      }
    , permalink: permalink
    , source: gplusSource
    , attribution: {
          name: $actorName.text()
        , href: $actorName.attr('href')
        , thumbnail: $container.find('.Xl').attr('src')
      }
    , posted_at: new Date($timestamp.attr('title'))
  };

  sfy.showModal(element);
}

addButtons();
setInterval(function() {
  addButtons();
}, 500);

