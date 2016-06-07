// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function checkForUpdate() {
        cordova.getAppVersion(function (currentVersion) {
            jQuery.get(SERVER_URL + '/App/GetLatestVersion', function (latestVersion) {
                if (currentVersion < latestVersion) {
                    navigator.notification.confirm(
                        'OneShot đã có phiên bản mới ' + latestVersion + '. Bạn có muốn cập nhật bây giờ không?',
                        function (choice) {
                            if (choice == 1) {
                                AppRate.navigateToAppStore();
                            }
                        },
                        'Cập nhật OneShot',
                        ['Có', 'Để sau']
                    );
                }
            });
        });
    }

    function checkForAppRate() {
        // Prepare app rate
        var customLocale = {};
        customLocale.title = "Đánh giá OneShot";
        customLocale.message = "Nếu OneShot giúp ích cho bạn, bạn có vui lòng dành 1 phút để đánh giá app không? Cảm ơn bạn vì đã động viên nhóm!";
        customLocale.cancelButtonLabel = "Không";
        customLocale.laterButtonLabel = "Nhắc lại sau";
        customLocale.rateButtonLabel = "Đánh giá ngay";

        // Ask user to rate the app
        AppRate.preferences.openStoreInApp = true;
        AppRate.preferences.storeAppURL.ios = '1118892523';
        AppRate.preferences.storeAppURL.android = 'market://details?id=mobi.oneshot.app';
        AppRate.preferences.customLocale = customLocale;
        AppRate.preferences.displayAppName = 'OneShot';
        AppRate.preferences.usesUntilPrompt = 3;
        AppRate.preferences.promptAgainForEachNewVersion = false;
        AppRate.promptForRating(false);
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // Setting up Countly push notification
        Countly.initMessaging({
            "messageMode": Countly.messagingMode.PRODUCTION,
            "projectId": "865171494629"
        });

        // Ask user to update their app & rate the app
        checkForUpdate();
        checkForAppRate();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();