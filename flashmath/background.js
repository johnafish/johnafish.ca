chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('game.html', {
    'id': 'test',
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});
