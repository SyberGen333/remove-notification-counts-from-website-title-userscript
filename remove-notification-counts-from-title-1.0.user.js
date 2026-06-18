// ==UserScript==
// @name         Remove Notification Counts From Title
// @namespace    https://github.com/SyberGen333/remove-notification-counts-from-website-title-userscript
// @author       SyberGen
// @version      1.0
// @description  Removes (1), (99+), etc. from tab titles and keeps checking for dynamic updates
// @match        *://*/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Matches notification prefixes
    // (1) Title
    // (25) Title
    // (99+) Title
    const notifRegex = /^\(\d+\+?\)\s*/;
    // Keeps track of the last cleaned title to avoid unnecessary work.
    let lastTitle = document.title;
    // Stores the current MutationObserver so it can be replaced if needed.
    let titleObserver;

    // Removes the notification count from the page title.
    function cleanTitle() {
        if (!document || !document.title) return;

        if (notifRegex.test(document.title)) {
            document.title = document.title.replace(notifRegex, '');
            lastTitle = document.title;
        }
    }

    // Watches the <title> element for changes.
    // Many websites update the title dynamically when notifications arrive.
    function observeTitle() {
        const titleEl = document.querySelector('title');
        if (!titleEl) return;

        // Prevent multiple observers from running simultaneously.
        if (titleObserver) titleObserver.disconnect();

        titleObserver = new MutationObserver(() => {
            // Only clean the title when it changes and begins with a notification count.
            if (document.title !== lastTitle && notifRegex.test(document.title)) {
                cleanTitle();
            }
        });

        titleObserver.observe(titleEl, { childList: true });
    }

    // Initial setup
    // Clean the current title immediately.
    cleanTitle();
    // Start watching for future title changes.
    observeTitle();

    // Some websites recreate the <title> element instead of updating it.
    // Periodically clean the title and reattach the observer if necessary.
    setInterval(() => {
        cleanTitle();
        observeTitle();
    }, 1000);
})();