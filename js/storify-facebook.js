sfy.fn['facebook'] = {

  addButtons: function() {
    var self = this;
    $('#content').on('click','a[aria-haspopup="true"]', function() {
      setTimeout(function() {
        $('._54nc').not('.storify-added').each(function() {
          $(this).addClass('storify-added');

          var postUrl = $(this).attr('ajaxify') && $(this).attr('ajaxify').match(/url=([^&]*)/);
          if (postUrl && postUrl.length > 0) {
            var permalink = decodeURIComponent(postUrl[1]);
            if (!permalink.match(/^https:\/\/www\.facebook\.com/)) {
              permalink = 'https://www.facebook.com' + permalink;
            }
          } else {
            return;
          }

          var li = $(this).parent('li');
          var clone = $(li).clone();
          $(clone)
            .hover(function() { $(this).addClass("_54ne selected") }, function() { $(this).removeClass("_54ne selected") })
            .find('a').removeAttr('ajaxify').click(function() { sfy.showModal({permalink: permalink}); })
            .find('span').text('Storify');

          $(li).after(clone);
        });
      }, 100);
    });
  },

  storifyComment: function() {
    var $target = $(sfy.lastElementClicked.target);
    if ($target.closest('.UFIComment').length > 0) {
      return this.commentClicked($target);
    }
  },

  commentClicked: function ($target) {
    //AM: watch out for these classes names
    var $container = $target.parents('.UFIComment')
      , $timestamp = $container.find('.uiLinkSubtle')
      , $message = $container.find('.UFICommentBody').children()
      , $actorName = $container.find('.UFICommentActorName')
      , $image = $container.find('.uiMediaThumb img').first()
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
          src: $image.attr('src').replace('/p160x160', '')
        , caption: message
      };
    }

    if (!element.permalink || !element.data.quote.text) {
      return;
    }

    sfy.showModal(element);
  }};

setTimeout(function() {
  sfy.fn['facebook'].addButtons();
}, 1000);
  
