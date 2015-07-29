sfy.fn['facebook'] = function() {
  
  sfy.loadCSS('css/storifycons.css');
  sfy.loadCSS('css/storify-facebook.css');

  function addButtons() {
    var self = this;
    
    // Main feed items
    $('.userContentWrapper:not(.storify-added)').each(function() {
      // userContentWrappers can be nested, so we check if we already added a storify button
      var buttons = $(this).find('.comment_link').closest('div');
      if (buttons.hasClass('storify-added'))
        return;
      
      $(this).addClass('storify-added');
      buttons.addClass('storify-added');
      
      var permalink = $(this).find('a abbr[data-utime]').parent().attr('href');
      if (permalink && permalink.length > 0) {
        if (!/^https?:\/\/(www\.)?facebook\.com/.test(permalink)) {
          permalink = 'https://www.facebook.com' + permalink;
        }
      } else {
        return;
      }
      
      var span = $('<span>');
      span.html('<a href="#"><i class="storifycon-logo"></i><span>Storify</span></a>');
      span.find('a').click(function() {
        sfy.showModal({ permalink: permalink });
      });
      
      buttons.append(' &nbsp; ');
      buttons.append(span);
    });
    
    // Item detail popup or photo page
    $('.UIActionLinks:not(.storify-added)').each(function() {
      $(this).addClass('storify-added');
      
      var permalink = $(this).parents('form').find('a abbr[data-utime]').parent().attr('href');
      if (permalink && permalink.length > 0) {
        if (!permalink.match(/^https:\/\/www\.facebook\.com/)) {
          permalink = 'https://www.facebook.com' + permalink;
        }
      } else {
        return;
      }
      
      var a = $('<a>')
        .attr('href', '#')
        .text('Storify')
        .click(function() {
          sfy.showModal({ permalink: permalink });
        });
        
      var lastButton = $(this).children(':not(#fbPhotoPageTimestamp)').last();
      
      lastButton.after(a);
      lastButton.after(' · ');
    });
    
    // Comments
    $('.UFICommentActions:not(.storify-added)').each(function() {
      $(this).addClass('storify-added');
      
      var a = $('<a>')
        .attr('href', '#')
        .text('Storify')
        .click(function() {
          commentClicked($(this));
        });
        
      var lastButton = $(this).children('.UFIReplyLink');
        
      lastButton.after(a);
      lastButton.after(' · ');
    });
  }

  sfy.fn['facebook'].storifyComment = function() {
    var $target = $(sfy.lastElementClicked.target);
    if ($target.closest('.UFIComment').length > 0) {
      return commentClicked($target);
    }
  };

  function commentClicked($target) {
    var $container = $target.closest('.UFIComment')
      , $timestamp = $container.find('.uiLinkSubtle')
      , $message = $container.find('.UFICommentBody').children()
      , $actorName = $container.find('.UFICommentActorName')
      , $image = $container.find('.UFICommentContent img').first()
      , permalink = $timestamp.attr('href')
      , message = $message.text();

    if (permalink && !permalink.match('www.facebook.com')) {
      permalink = 'http://www.facebook.com' + permalink;
    }

    var element = {
        type: 'quote'
      , data: {
            quote: { text: message }
        }
      , permalink: permalink
      , source: 'facebook.com'
      , attribution: {
            name: $actorName.text()
          , href: $actorName.attr('href')
          , thumbnail: $container.find('.UFIActorImage').attr('src')
        }
      , posted_at: new Date($timestamp.find('abbr').attr('data-utime') * 1000)
    };
    
    // Image in comment
    if ($image.length) {
      element.type = 'image';
      element.data.image = {
          src: $image.attr('src')
        , caption: message
      };
    }

    if (!element.permalink || (!element.data.quote.text && !element.data.image)) {
      return;
    }

    sfy.showModal(element);
  }
  
  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);
  
};
