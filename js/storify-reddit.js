sfy.fn['reddit'] = function() {

  var redditSource = {
      name: 'reddit'
    , href: 'http://www.reddit.com'
  };

  function addButtons() {
    $('.link:not(.promoted) .buttons').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $li = $('<li>')
        , $action = $('<a>');

      $action
        .addClass('storify-button')
        .attr('href', '#')
        .text('storify')
        .click(clicked)
        .appendTo($li);

      $container
        .addClass('storify-added')
        .find('.share').after($li);
    });

    $('.comment').not('.storify-added').each(function(i, container) {
      var $container = $(container)
        , $li = $('<li>')
        , $action = $('<a>');

      $action
        .addClass('storify-button-comment')
        .attr('href', '#')
        .text('storify')
        .click(commentClicked)
        .appendTo($li);

      $container
        .addClass('storify-added')
        // .find('.first:first').after($li);
        .find('.buttons:first').append($li);
    });
  }

  function clicked(e) {
    e.preventDefault();

    var $target = $(e.target)
      , $container = $target.parents('.link:first')
      , permalink = $container.find('a.title').attr('href');

    sfy.showModal({ permalink: permalink });
  }

  function commentClicked(e) {
    e.preventDefault();

    var $target = $(e.target)
      , $container = $target.parents('.comment:first')
      , $timestamp = $container.find('time:first')
      , $message = $container.find('.md:first p')
      , $actorName = $container.find('.author:first')
      , permalink = $container.find('.bylink').attr('href');

    var element = {
        type: 'quote'
      , data: {
            quote: { text: $message.html() }
        }
      , permalink: permalink
      , source: redditSource
      , attribution: {
            name: $actorName.text()
          , href: $actorName.attr('href')
        }
      , posted_at: new Date($timestamp.attr('datetime'))
    };

    sfy.showModal(element);
  }

  addButtons();

};