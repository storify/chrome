//AM: module for livefyre (livefyre.com) embed on Mashable, CBS and other (BravoTV is not supported because they change class names)
//AM: wrap into closure to prevent leacks
(function(){

  sfy.fn['fyre'] = function() {

    sfy.loadCSS('css/storify-fyre.css');

    //AM: all are CSS/jQuery selectors, i.e., classes and ids
    var mapping = { 
      //main service element
      "container": ".fyre-widget",
      //after what element we inject storify the whole thing link
      "containerAfter": ".fyre-post-button-new",
      'content': '.fyre-stream-content',
      //single item, e.g., comment
      "item": ".fyre-comment-article",
      //after what element we inject storify comment link
      "itemAfter": ".fyre-comment-reply",
      'itemText': '.fyre-comment p',
      'itemAuthorName': '.fyre-comment-username',
      'itemAuthorAvatar': '.fyre-user-avatar'

    };
    var elements = {
      "container": '<div class="goog-inline-block fyre-button-right fyre-post-button fyre-post-to-storify" title="" role="button" id=":s" style="-webkit-user-select: none;">' +
                      '<div class="goog-inline-block fyre-button-right-outer-box" style="-webkit-user-select: none;">'+
                      '<div class="goog-inline-block fyre-button-right-inner-box" style="-webkit-user-select: none;">Storify</div></div></div>',
      'selector': '.fyre-post-to-storify',
      'item':'&nbsp;<a class="fyre-comment-storify fyre-comment-action-button">Storify</a>',
      'itemSelector': '.fyre-comment-storify'
    };

//new MutationObserver(function(m) {console.log('!');}).observe($('.fyre-widget').find('iframe').get(0),{ attributes: true, childList: true, characterData: true })

    //AM: this function takes care of injecting links, will call it in as the return of this module
    var injectStorifyLinks = function (map, el) {
      //AM: wait for the page to load
      $(document).ready(function(){      
        var config = { attributes: true, childList: true, characterData: true }
        var injectIntoComments = function(mapContainer) {
          //AM: this is abstracted outside to inject storify link into new live updated comments
          //AM: inject links into each of the comment areas to storify individual elements
          mapContainer.find(map.itemAfter).not('.storify-added').each(function(index, element){
            var $element = $(element);
             // console.log('Storify added to comments')
            $element.addClass('storify-added');
            $element.after(el.item);
            $element.next().click(storifyComment);  
          }); 
        };
        //AM: limit scope to the container to speed up the search
        var injectIntoEditor = function(mapContainer){
            mapContainer.addClass('storify-added');
            mapContainer.find(map.containerAfter).after(el.container);
            mapContainer.find(el.selector).click(storifyContainer);
        };
        //AM: this will listen to DOM mutation on body element
        var observer = new MutationObserver(function(mutations){
          //AM: inject button into editor area (page import)
          //AM: lookup container once and then use the stored value
          var $mapContainer = $(map.container);          
          if ($mapContainer.not('.storify-added').length>0) {
            injectIntoEditor($mapContainer);
            injectIntoComments($mapContainer);
            var content = $mapContainer.find(map.content).get(0);
            var liveObserver = new MutationObserver(function(m){
              injectIntoComments($(content));
            });
            liveObserver.observe(content,config);
          }       
        });
        observer.observe(document.body,config);
      })
    } 

    var storifyContainer = function (e) {
      e.preventDefault();
      sfy.showModal({
        permalink: window.location.href
      });
    };

    var storifyComment = function (e) {
      e.preventDefault();
      var item = $(e.srcElement).parents(mapping.item);
      var message = item.find(mapping.itemText).text();
      var id = item.attr('id').match(/fyre\-message\-([0-9]+)/)[1];

      var permalink = window.location.href + '#lf_comment=' + id;
      var authorName = item.find(mapping.itemAuthorName).text();
      var authorHref = item.find(mapping.itemAuthorName).attr('href');
      //AM: there is no timestamp, only relative human format, e.g. 2 hours
      // var timestamp = item.find(mapping.itemAuthorName).text();
      var thumbnail = item.find(mapping.itemAuthorAvatar).attr('src');
      var sourceName = window.location.hostname;
      //AM: cannot access page's global scope because Chrome Extension runs in it's own environment, possible with injection of a script tag and posting a message do window (while listeing to a message here)
      // var sourceName = window.fyre.conv.config.network;
      var element = {
        type: 'quote',
        data: {
          quote: {
            text: message
          }
        },
        permalink: permalink,
        source: {
          name: sourceName,
          href: 'http://' + sourceName
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
    };

    return injectStorifyLinks(mapping, elements);
  };

}())