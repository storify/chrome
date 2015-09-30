// Setup the real iframe on storify.com/import.
// The url to go to was passed in via location.hash.
var iframe = document.createElement('iframe');
iframe.setAttribute('src', window.location.hash.slice(1));
iframe.setAttribute('allowtransparency', true);
iframe.setAttribute('id', 'storify_overlay');
document.body.appendChild(iframe);

// Forward messages to the parent page
window.onmessage = function(message) {
  parent.postMessage(message.data, '*');
};
