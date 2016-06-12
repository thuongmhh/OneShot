// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function renderHistory(history) {
        jQuery.ajax({
            url: 'includes/history-items.html',
            success: function (html) {
                var items_template = Handlebars.compile(html);
                jQuery('.history-items').html(items_template({ historyItems: history }));
            },
            async: false
        });

        jQuery('.image').swipebox({
            useCSS: true,
            hideBarsDelay: 3000
        });

        jQuery('.remove-history-item').click(function () {
            var id = jQuery(this).attr('item-id');
            removeItem(id, history);
            saveHistory(history, true);
            var container = jQuery('.history-item[item-id=' + id + ']');
            container.fadeOut('medium');
        });
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var history = loadHistory();
        renderHistory(history);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();