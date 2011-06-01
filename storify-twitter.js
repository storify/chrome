// Stay in the Storify namespace (SFY).
var SFY = SFY || {};

// We use a newer version of jQuery than Twitter does.
$.noConflict();

jQuery(document).ready(function($) {
  var baseUrl = SFY.baseUrl
    , appname = SFY.appname
    , strictEncodeURIComponent = SFY.strictEncodeURIComponent;

  function setTarget(permalink) {
    return baseUrl+'/import?appname='+appname+'&permalink='+strictEncodeURIComponent(permalink)+'&text=&title=';
  }

  // Storify #newtwitter .tweet(s)
  $('#page-container').delegate('.tweet', 'mouseover', function() {
    var elem = $(this)
      , permalinkAttr = 'data-storify-permalink';

    if ( elem.find('.storify-action').length === 0 || !elem.attr(permalinkAttr) ) {
      var permalink = 'http://twitter.com/' + elem.attr('data-screen-name')
                    + '/status/' + elem.attr('data-tweet-id');
      elem.attr(permalinkAttr, permalink);
      var target = setTarget(permalink);
      var storifyAction = $('<a/>', {
          href: target,
          class: 'storify-action',
          html: '<span><i></i><b>Storify</b></span>',
          click: function(e) {
            e.preventDefault();
            var windowSettings
              , w = 460
              , h = 580
              , sh = screen.height
              , sw = screen.width
              , top = 0
              , left = Math.round((sw/2)-(w/2));
            if (sh > h) top = Math.round((sh/2)-(h/2));
            windowSettings = 'left='+left+',top='+top+',width='+w+',height='+h+',personalbar=0,toolbar=0,scrollbars=1,resizable=1';
            window.open(target, 'storify_this', windowSettings);
          }
        });
      elem.find('.tweet-actions').append(storifyAction);
    }
  });
});
