/**
 * background.js — NoAFK Garden Service Worker
 * =====================================================
 * Runs persistently in the background as a Manifest V3 service worker.
 * Sets default storage values on first install.
 */

const GARDEN_PATTERN = /^https?:\/\/(www\.)?magicgarden\.gg/;

// On install: initialise storage & inject into open tabs 
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install' || reason === 'update') {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.url && GARDEN_PATTERN.test(tab.url)) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            files: ['content.js'],
            world: 'MAIN'
          });
        } catch (_) {}
      }
    }
  }
});
console.log('[NoAFK Garden] Service worker started ✓');
