var css = $('<link rel="stylesheet" type="text/css">');
css.attr('href', chrome.extension.getURL('css/storify-facebook.css'));
css.appendTo('head');

var facebookSource = {
    name: 'facebook'
  , href: 'http://www.facebook.com'
};

function addButtons() {
  $('.UIActionLinks').not('.storify-added').each(function(i, container) {
    var $container = $(container)
      , $action = $('<a>');

    $container.addClass('storify-added');
    $action
      .attr('href', '#')
      .text('Storify')
      // .prepend('<i class="storify-icon">')
      .click(streamElementClicked);

    $container
      .append($action);

    if ($container.parents('.uiStreamFooter').length) {
      $action.after(' · ');
    } else {
      $action.before(' · ');
    }
  });

  $('.bottomButtonsBar').not('.storify-added').each(function(i, container) {
    var $container = $(container)
      , $action = $('<a>');

    $container.addClass('storify-added');
    $action
      .attr('href', '#')
      .addClass('buttonLink')
      .text('Storify')
      // .prepend('<i class="storify-icon">')
      .click(streamElementClicked);

    $container
      .append($action);
  });

  $('.commentActions').not('.storify-added').each(function(i, container) {
    var $container = $(container)
      , $action = $('<a>');

    $container.addClass('storify-added');
    $action
      .attr('href', '#')
      .text('Storify')
      .click(commentClicked);

    $container
      .append(' · ', $action);
  });
}

function streamElementClicked(e) {
  e.preventDefault();

  var $target = $(e.target)
    , $container = $target.parents('.storyContent, .fbTimelineUnit, .fbPhotoSnowlift')
    , $actorName = $container.find('.actorName a, .passiveName, .primaryActor, .unitHeader a:first, .fbPhotoContributorName a')
    , $timestamp = $container.find('.timestamp, .uiStreamSource, .timelineTimestamp')
    , $image = $container.find('.uiPhotoThumb img, .uiScaledImageContainer img, .stage .spotlight')
    , $message = $container.find('.messageBody, .tlTxFe, .pbm, .hasCaption');

  var permalink = $timestamp.find('a').attr('href');
  if (permalink && !permalink.match('www.facebook.com')) {
    permalink = 'http://www.facebook.com' + permalink;
  } else if (!permalink) {
    permalink = window.location.href;
  }

  var element = {
      type: 'quote'
    , data: {
          quote: { text: $message.html() }
      }
    , permalink: permalink
    , source: facebookSource
    , attribution: {
          name: $actorName.text()
        , href: $actorName.attr('href')
        , thumbnail: $container.find('.uiProfilePhoto').attr('src')
      }
    , posted_at: new Date($timestamp.find('abbr').attr('data-utime') * 1000)
  };

  // Image in feed
  if ($image.length) {
    element.type = 'image';
    element.data.image = {
        src: $image.attr('src').replace('/s480x480', '')
      , caption: $message.html()
    };
  }

  if (!element.data.quote.text && !element.data.image) return;
  
  sfy.showModal(element);
}

function commentClicked(e) {
  e.preventDefault();
  
  var $target = $(e.target)
    , $container = $target.parents('.uiUfiComment')
    , $timestamp = $container.find('.uiLinkSubtle')
    , $message = $container.find('.commentBody')
    , $actorName = $container.find('.actorName');

  var element = {
      type: 'quote'
    , data: {
          quote: { text: $message.text() }
      }
    , permalink: $timestamp.attr('href')
    , source: facebookSource
    , attribution: {
          name: $actorName.text()
        , href: $actorName.attr('href')
        , thumbnail: $container.find('.actorPic img').attr('src')
      }
    , posted_at: new Date($timestamp.find('abbr').attr('data-utime') * 1000)
  };

  sfy.showModal(element);
}

addButtons();
setInterval(function() {
  addButtons();
}, 500);