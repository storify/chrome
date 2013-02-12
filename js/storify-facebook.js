sfy.fn['facebook'] = function() {

  sfy.loadCSS('css/storify-facebook.css');

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

    $('.UFICommentActions').not('.storify-added').each(function(i, container) {
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
      , $container = $target.parents('.storyContent, .fbTimelineUnit, .fbPhotoSnowlift, #fbPhotoPageContainer').first()
      , $inner = $container.find('.uiStreamSubstory').first();

    $container = $inner.length ? $inner.first() : $container;

    var $actorName = $container.find('.actorName a, .passiveName, .primaryActor, .unitHeader a:first, .-cx-PRIVATE-fbTimelineUnitActor__header a:first, .fbPhotoContributorName a').first()
      , $timestamp = $container.find('.timestamp, .uiLinkSubtle abbr').first()
      , $image = $container.find('.uiPhotoThumb img, .uiScaledImageContainer img, .stage .spotlight, #fbPhotoImage').first()
      , $message = $container.find('.messageBody, .tlTxFe, .pbm, .hasCaption, .userMessage, .-cx-PRIVATE-fbTimelineText__featured, .userContent').first()
      , $link = $container.find('.shareText, .shareMediaLink .-cx-PRIVATE-fbTimelineExternalShareUnit__root[target="_blank"]').first()
      , message = $message.html();

    if ($link.length) {
      var link = $link.attr('href');
      if (message.indexOf(link) > -1) {
        if (message) {
          message += ' ' + link;
        } else {
          message = link;
        }
      }
    }

    if (message) {
      message = message.replace('<br>', '');
    }

    var permalink = $timestamp.parent().attr('href');
    if (permalink && !permalink.match('www.facebook.com')) {
      permalink = facebookSource.href + permalink;
    }

    if (!permalink &&
      (window.location.href.match('photo.php') ||
       window.location.href.match('posts'))
    ) {
      permalink = window.location.href;
    }

    var element = {
        type: 'quote'
      , data: {
            quote: { text: message }
        }
      , permalink: permalink
      , source: facebookSource
      , attribution: {
            name: $actorName.text()
          , href: $actorName.attr('href')
          , thumbnail: $container.find('.uiProfilePhoto, .profilePic, .-cx-PRIVATE-uiSquareImage__root').first().attr('src')
        }
      , posted_at: new Date($timestamp.attr('data-utime') * 1000)
    };

    // Image in feed
    if ($image.length) {
      element.type = 'image';
      element.data.image = {
          src: $image.attr('src').replace('/s480x480', '')
        , caption: message
      };
    }

    if (!element.permalink || (!element.data.quote.text && !element.data.image)) {
      return;
    }
    
    sfy.showModal(element);
  }

  function commentClicked(e) {
    e.preventDefault();
    
    var $target = $(e.target)
      , $container = $target.parents('.UFIComment')
      , $timestamp = $container.find('.uiLinkSubtle')
      , $message = $container.find('.UFICommentBody')
      , $actorName = $container.find('.UFICommentActorName')
      , permalink = $timestamp.attr('href');

    if (permalink && !permalink.match('www.facebook.com')) {
      permalink = facebookSource.href + permalink;
    }

    var element = {
        type: 'quote'
      , data: {
            quote: { text: $message.text() }
        }
      , permalink: permalink
      , source: facebookSource
      , attribution: {
            name: $actorName.text()
          , href: $actorName.attr('href')
          , thumbnail: $container.find('.UFIActorImage').attr('src')
        }
      , posted_at: new Date($timestamp.find('abbr').attr('data-utime') * 1000)
    };

    if (!element.permalink || !element.data.quote.text) {
      return;
    }

    sfy.showModal(element);
  }

  // [ryan:2-12-13] removing the storify buttons from the facebook page, because they are whiners
  // addButtons();
  // setInterval(function() {
  //   addButtons();
  // }, 500);

};
