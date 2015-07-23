sfy.fn['instagram'] = function() {

  sfy.loadCSS('css/storifycons.css');
  sfy.loadCSS('css/storify-instagram.css');

  function addButtons() {
    $('article:not(.storify-added)').each(function() {
      $(this).addClass('storify-added');
      
      var permalink = $(this).find('a time').parent().attr('href');
      if (permalink && permalink.length > 0) {
        if (!/^https?:\/\/instagram\.com/.test(permalink)) {
          permalink = 'https://instagram.com' + permalink;
        }
      } else {
        return;
      }
      
      var lastButton = $(this).find('button:last');
      lastButton.clone()
        .text('')
        .removeClass('coreSpriteEllipsis -cx-PRIVATE-Util__hideText')
        .addClass('storifycon-logo')
        .click(function() {
           sfy.showModal({ permalink: permalink });
        })
        .insertBefore(lastButton);
    });
  }

  addButtons();
  setInterval(function() {
    addButtons();
  }, 500);

};