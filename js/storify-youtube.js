var css = $('<link rel="stylesheet" type="text/css">');
css.attr('href', chrome.extension.getURL('css/storify-youtube.css'));
css.appendTo('head');

function addButton() {
  $('#watch-actions').not('.storify-added').each(function(i, container) {
    var $container = $(container)
      , $action = $container.find('#watch-like').clone();

    $container.addClass('storify-added');

    $action
      .attr('id', 'watch-storify')
      .attr('title', 'Storify this video')
      .removeAttr('data-button-toggle')
      .removeAttr('data-button-action')
      .removeClass('start')
      .click(clicked);

    $action.find('.yt-uix-button-content')
      .text('Storify');

    $action.find('.yt-uix-button-icon')
      .removeClass('yt-uix-button-icon-watch-like');

    $container.find('#watch-share').after($action);
  });
}

function clicked(e) {
  sfy.showModal({ permalink: window.location.href });
}

addButton();