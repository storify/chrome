$(window).keyup(function(e) {
  switch (e.keyCode) {
    case 27: // esc
      sfy.closeModal();
      break;
  }
}).keypress(function(e) {
  switch(e.keyCode) {
    case 223: // s
      if (e.altKey) {
        sfy.showModal({ permalink: window.location.href });
      }
      break;
  }
});

