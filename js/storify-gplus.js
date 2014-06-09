sfy.fn['gplus'] = function() {

  var gplusSource = {
      name: 'gplus'
    , href: 'http://plus.google.com'
  };

  function addButtons() {
    $('body').on('click','.xw', function() {
      setTimeout(function() {
        $('.YH').not('.storify-added').each(function(i, container) {

          var $container = $(container)
            , $action = $container.find('.Qba')
            , $storify = $action.clone();

          $container.addClass('storify-added');

          $storify
            .removeClass('Qba')
            .addClass('storify-button')
            .attr('id', ':t')
            .hover(function() {
              $(this).addClass('d-A-yb');
            }, function() {
              $(this).removeClass('d-A-yb');
            })
            .click(clicked);

          $storify.find('div').text('Storify post');

          $action.after($storify);
        });
      }, 100);
    });
  }

  function clicked(e) {
    e.preventDefault();

    var $target = $(e.target)
      , $container = $target.parents('.Yp')
      , $actorName = $container.find('.Hf:first')
      , $timestamp = $container.find('a.Rg')
      , $link = $container.find('.wI .ot-anchor:first')
      , $image = $container.find('img.ar')
      , $message = $container.find('.Ct:first');

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
          , thumbnail: $container.find('.Uk').attr('src')
        }
      , posted_at: new Date($timestamp.attr('title'))
    };

    if ($link.length) {
      element.type = 'link';
      element.data.link = {
          title: $link.text()
        , description: $message.html()
        , thumbnail: $image.attr('src')
      };
    } else if ($image.length) {
      element.type = 'image';
      element.data.image = {
          src: $image.attr('src')
        , caption: $message.html()
      };
    }

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

};