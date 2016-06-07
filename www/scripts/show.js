// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function loadResult() {
        var item;
        var history = loadHistory();
        var id = jQuery.urlParam('id');
        if (id) {
            for (var i = 0; i < history.length; i++)
                if (history[i].Id == id) {
                    item = history[i];
                    break;
                }
        } else if (history.length > 0) {
            item = history[0];
        }

        if (item) {
            // Load item content
            jQuery('body').data('id', item.Id);
            if (item.Domain == 'Book') {
                loadBook(item);
            }
        } else {
            window.location = 'index.html';
        }
    }

    function loadBook(item) {
        jQuery.ajax({
            url: 'includes/book.html',
            success: function (html) {
                var book_template = Handlebars.compile(html);
                jQuery('#content').html(book_template(item.Data));
                jQuery('.book-desc').shorten({
                    showChars: 400,
                    moreText: 'xem thêm',
                    lessText: 'thu gọn'
                });
                jQuery('.author-desc').shorten({
                    showChars: 300,
                    moreText: 'xem thêm',
                    lessText: 'thu gọn'
                });
                jQuery('.book-comment').shorten({
                    showChars: 500,
                    moreText: 'xem thêm',
                    lessText: 'thu gọn'
                });
            },
            async: false
        });

        jQuery('.show-share-bottom').unbind('click').click(function () {
            window.plugins.socialsharing.share(
                item.Data.Desc + ' #oneshot #book',
                item.Data.Title,
                [],
                SERVER_URL + '/Book/Show/' + item.Data.Id
            );
            return false;
        });
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // Show the result to user
        loadResult();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();