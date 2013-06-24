//AM: module for livefyre (livefyre.com) embed on Mashable, CBS and other (BravoTV is not supported because they change class names)
//AM: wrap into closure to prevent leacks
(function(){
  // console.log(sfy)
  sfy.fn['disqus'] = function() {

    // sfy.loadCSS('css/storify-fyre.css');

    //AM: all are CSS/jQuery selectors, i.e., classes and ids
    var mapping = { 
      //main service element
      "container": "#disqus_thread",
      //after what element we inject storify the whole thing link
      "containerAfter": "#thread-share-menu",
      'content': '#post-list',
      //single item, e.g., comment
      "item": ".post",
      //after what element we inject storify comment link
      "itemAfter": ".share",
      'itemText': '.post-message p',
      'itemAuthorName': '.publisher-anchor-color a',
      'itemAuthorAvatar': 'a.user img'

    };
    var elements = {
      "container": '<li><a href="#" data-nav="storify" class="publisher-nav-color" id="storify-tab">Storify</a></li>',
      'selector': '#storify-tab',
      'item': '<li class="comment-storify"><a href="#" data-action="storify">Storify</a></li>',
      'itemSelector': '.comment-storify'
    };

//new MutationObserver(function(m) {console.log('!');}).observe($('.fyre-widget').find('iframe').get(0),{ attributes: true, childList: true, characterData: true })

    //AM: this function takes care of injecting links, will call it in as the return of this module
    var injectStorifyLinks = function (map, el) {
      //AM: wait for the page to load
      $(document).ready(function(){      
        var config = { attributes: true, childList: true, characterData: true }
        //AM: limit scope to the container to speed up the search
        var injectIntoEditor = function(mapContainer){
            mapContainer.addClass('storify-added');
            console.log(mapContainer.find(map.containerAfter))
            mapContainer.find(map.containerAfter).after(el.container);
            mapContainer.find(el.selector).click(storifyContainer);
        };
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

        //AM: this will listen to DOM mutation on body element
        var observer = new MutationObserver(function(mutations){
          console.log(mutations);
          //AM: inject button into editor area (page import)
          //AM: lookup container once and then use the stored value
          var $mapContainer = $(map.container); 
          console.log($mapContainer)         
          if ($mapContainer.not('.storify-added').length>0) {
            injectIntoEditor($mapContainer);
            injectIntoComments($mapContainer);
            var content = $mapContainer.find(map.content).get(0);

            console.log(content);
            var liveObserver = new MutationObserver(function(m){
              injectIntoComments($(content));
            });
            liveObserver.observe(content,config);
          }       
        });
        console.log("***")

        // observer.observe($('#dsq3').get(0),config);
        observer.observe(document.body,config);

        //AM if already in the DOM
        var $mapContainer = $(map.container);
        console.log($mapContainer)   
        $('#dsq3').ready(function() {
          // console.log(doc);
          console.log($(map.containerAfter));
          var doc = $(map.container, frames['dsq3'].document);
          injectIntoEditor(doc);
          injectIntoComments(doc);          
        })       


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

}());