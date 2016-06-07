// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // Open search result in Google
        jQuery('.search-google').click(function () {
            var id = jQuery.urlParam('id');
            var url = 'https://www.google.com.vn/searchbyimage?image_url=' + STORAGE_URL + '/image-requests/' + id + '.jpg';
            window.open(url);
            return false;
        });

        // Back to the previous page
        jQuery('.error-button').click(function () {
            window.history.back();
            return false;
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();