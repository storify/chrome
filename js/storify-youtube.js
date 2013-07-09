sfy.fn['youtube'] = function() {

  sfy.loadCSS('css/storify-youtube.css');

  function addButton() {
    $('#watch7-secondary-actions').not('.storify-added').each(function(i, container) {
      var $container = $(container),
        $action = $container.find('> span:first-child').clone();

      $container.addClass('storify-added');

      $action.find('button')
        .attr('title', 'Storify this video')
        .removeAttr('data-button-toggle')
        .removeAttr('data-trigger-for')
        .removeClass('yt-uix-button-toggled')
        .click(clicked);

      $action.find('.yt-uix-button-content')
        .text('Storify ');

      $container.prepend($action);
    });
  }

  //AM: this function iterates thru YouTube comments and appends link/button 'Storify' after 'Reply' button
  //Main actors: .comment, .comment-actions, button

  function addCommentStorifyButton() {
    var $storifyButton = '<button class="comment-action yt-uix-button yt-uix-button-link" type="button" role="button" data-action="storify">' +
      '<span class="yt-uix-button-content">Storify</span>' +
      '</button>';
    $('#watch7-container .comment-actions').not('.storify-added').each(function(index, element) {
      $(element).find('button[data-action=reply], button[data-upsell=comment]').after($storifyButton);
      $(element).find('button[data-action=storify]').click(commentClicked);
    }).addClass('storify-added');

  }

  function clicked(e) {
    e.preventDefault();
    sfy.showModal({
      permalink: window.location.href
    });
  }

  var commentClicked = sfy.fn["youtube"].storifyComment = function (e) {
    if (!e) e = sfy.lastElementClicked;
    // console.log(sfy);
    e.preventDefault();
    
    var commentElement = $(e.target).parents('li');
    // console.log(commentElement);
    var permalink = commentElement.find('span.time a').attr('href');
    var message = commentElement.find('.comment-text p').text();
    var authorName = commentElement.find('span.author a').html();
    var authorHref = 'http://youtube.com' + commentElement.find('span.author a').attr('href');
    var thumbnail = commentElement.find('span.video-thumb').find('img').attr('src');
    var element = {
      type: 'quote',
      data: {
        quote: {
          text: message
        }
      },
      permalink: permalink,
      source: {
        name: 'youtube',
        href: 'http://www.youtube.com'
      },
      attribution: {
        name: authorName,
        href: authorHref,
        thumbnail: thumbnail
      }
      // ,
      // posted_at: new Date($timestamp.attr('data-utime') * 1000)
    };
    // console.log(element);
    sfy.showModal(element);
  }
  

  addButton();
  addCommentStorifyButton();

};