sfy.fn['fyre'] = function() {

  sfy.loadCSS('css/storify-fyre.css');

  //all are CSS/jQuery selectors, i.e., classes and ids
  var mapping = { 
    //main service element
    "container": ".fyre-widget",
    //after what element we inject storify the whole thing link
    "containerAfter": ".fyre-post-button-new",
    //single item, e.g., comment
    "item": "",
    //after what element we inject storify comment link
    "itemAfter": ".fyre-comment-reply"
  };
  var elements = {
    "container": '<div class="goog-inline-block fyre-button-right fyre-post-button fyre-post-to-storify" title="" role="button" id=":s" style="-webkit-user-select: none;">' +
                    '<div class="goog-inline-block fyre-button-right-outer-box" style="-webkit-user-select: none;">'+
                    '<div class="goog-inline-block fyre-button-right-inner-box" style="-webkit-user-select: none;">Storify</div></div></div>',
    'selector': '.fyre-post-to-storify',
    'item':'&nbsp;<a class="fyre-comment-storify fyre-comment-action-button">Storify</a>',
    'itemSelector': '.fyre-comment-storify'
  };



  var injectStorifyLinks = function (map, el) {
    //AM: assuming fyre is loaded we use this: https://github.com/Livefyre/livefyre-docs/wiki/JavaScript-API
    $(document).ready(function(){
      // console.log($(map.container))      
      var config = { attributes: true, childList: true, characterData: true }
      var observer = new MutationObserver(function(mutations){
        console.log(mutations);
        if ($(map.container).not('.storify-added').length>0) {
          $(map.container).addClass('storify-added');
          $(map.containerAfter).after(el.container);
          $(el.selector).click(storifyContainer);
          $(map.itemAfter).each(function(index, element){
            $(element).after(el.item);
            $(element).next().click(storifyComment);  
          });        
          // $(map.itemSelector).click(storifyComment);          
        }
      });
      // observer.observe($(map.container).get(0),config);
      observer.observe(document.body,config);
    // if (fyre) {

      // window.fyre.conv.widget.on('load', function () {console.log('loaded')})
      // window.fyre.conv.on('load', function () {console.log('loaded2')})
      // window.fyre.conv.on('load', function () {console.log('loaded')})
    // }
    // window.addEventListener('all', function(e){
      // if (window.hasProperty('fyre')) console.log('YAAAAY');
    })

      // console.log($(map.container));
      // $(map.container).on('load',map.containerAfter, function(e){
        // $(map.containerAfter).after(el.container);
        // $(el.selector).click(storifyContainer);
        // $(map.itemAfter).after(el.item);
        // $(map.itemSelector).click(storifyComment);
        // console.log($(map.containerAfter),$(el.selector))
      // });    
    // });


  } 

  var storifyContainer = function (e) {
    e.preventDefault();
    sfy.showModal({
      permalink: window.location.href
    });
  };

  var storifyComment = function (e) {
    e.preventDefault();
    console.log(e.srcElement);
  };

  return injectStorifyLinks(mapping, elements);
};

