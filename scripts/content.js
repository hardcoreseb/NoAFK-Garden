/**
 * content.js — NoAFK Garden
 * ===================================
 * Good to know:
 * Runs in the page's MAIN world (declared in manifest.json).
 * Chrome injects this at document_start before any game JS,
 * bypassing CSP entirely — no script tag needed.
 */

(function () {
  'use strict';

  // 1. Lock document.hidden = false
  try {
    Object.defineProperty(document, 'hidden', {
      value: false,
      writable: false,
      configurable: false
    });
  } catch (_) {}

  // 2. Lock document.visibilityState = 'visible'
  try {
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible',
      writable: false,
      configurable: false
    });
  } catch (_) {}

  // 3. Lock on the prototype too
  try {
    Object.defineProperty(Document.prototype, 'hidden', {
      get: function () { return false; },
      configurable: false
    });
    Object.defineProperty(Document.prototype, 'visibilityState', {
      get: function () { return 'visible'; },
      configurable: false
    });
  } catch (_) {}

  // 4. Always report focused
  document.hasFocus = function () { return true; };

  // 5. Block visibilitychange / blur / focusout before the game sees them
  function block(e) { e.stopImmediatePropagation(); }
  document.addEventListener('visibilitychange', block, true);
  window.addEventListener('blur',     block, true);
  window.addEventListener('focusout', block, true);
  document.addEventListener('blur',     block, true);
  document.addEventListener('focusout', block, true);

  // 6. Simulate activity with jittered timing (20–45s)
  var EVENTS = ['mousemove', 'mousedown', 'mouseup', 'keydown', 'keyup', 'scroll'];
  function fire() {
    var count = 1 + Math.floor(Math.random() * 3);
    for (var i = 0; i < count; i++) {
      var name = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      var evt = name.startsWith('key')
        ? new KeyboardEvent(name, { bubbles: true, cancelable: true })
        : new Event(name, { bubbles: true, cancelable: true });
      window.dispatchEvent(evt);
    }
    setTimeout(fire, (20 + Math.random() * 25) * 1000);
  }
  setTimeout(fire, (20 + Math.random() * 25) * 1000);

  console.log('[NoAFK Garden] Main-world active \u2713');
})();
