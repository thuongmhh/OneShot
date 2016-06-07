// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function renderMessages(messages) {
        jQuery.ajax({
            url: 'includes/messages.html',
            success: function (html) {
                var messages_template = Handlebars.compile(html);
                jQuery('.messages').html(messages_template({ messages: messages }));
            },
            async: false
        });
    }

    function loadMessages() {
        setInfo('Đang kiểm tra tin tức mới. Vui lòng giữ kết nối mạng...');
        jQuery.ajax({
            type: 'GET',
            url: SERVER_URL + '/App/GetMessages',
            success: function (messages) {
                closeNotification();
                renderMessages(messages);
            },
            error: function (xhr, textStatus, error) {
                if (xhr.readyState == 0)
                    setWarning(CONNECTION_PROBLEM);
                else
                    setError(xhr.statusText);
            }
        });
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        loadMessages();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();