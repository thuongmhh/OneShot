Countly = {};
Countly.serverUrl = "";
Countly.appKey = "";
Countly.ready = false;
Countly.messagingMode = { "TEST": 1, "PRODUCTION": 0 };

// Countly initialization
Countly.init = function (serverUrl, appKey) {
    Countly.serverUrl = serverUrl;
    Countly.appKey = appKey;
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "init", [serverUrl, appKey]);
}

Countly.initMessaging = function (options) {
    Countly.projectId = options.projectId;
    Countly.messageMode = options.messageMode;
    Countly.Push.onRegisterPushNotification();
}

// Countly sending various types of events
Countly.sendEvent = function (options) {
    var args = [];
    var eventType = "event"; //event, eventWithSum, eventWithSegment, eventWithSumSegment
    var segments = {};

    if (options.eventSum)
        eventType = "eventWithSum";
    if (options.segments)
        eventType = "eventWithSegment";
    if (options.segments && options.eventSum)
        eventType = "eventWithSumSegment";

    args.push(eventType);

    if (options.eventName)
        args.push(options.eventName.toString());
    if (options.eventCount)
        args.push(options.eventCount.toString());
    if (options.eventSum)
        args.push(options.eventSum.toString());

    if (options.segments)
        segments = options.segments;
    for (var event in segments) {
        args.push(event);
        args.push(segments[event]);
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "event", args);
}

// Countly enable logger
Countly.setLoggingEnabled = function (boolean) {
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setloggingenabled", []);
}

// Countly sending user data
Countly.setUserData = function (options) {
    var args = [];
    args.push(options.name || "");
    args.push(options.username || "");
    args.push(options.email || "");
    args.push(options.org || "");
    args.push(options.phone || "");
    args.push(options.picture || "");
    args.push(options.picturePath || "");
    args.push(options.gender || "");
    args.push(options.byear || 0);

    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setuserdata", args);
}

Countly.onRegistrationId = function (registrationId) {
    var args = [];
    args.push(registrationId || "");
    args.push(Countly.messageMode || "0");
    args.push(Countly.projectId || "");
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "onregistrationid", args);
}

// Countly start for android
Countly.start = function () {
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "start", []);
}

// Countly stop for android
Countly.stop = function () {
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "stop", []);
}

// Countly deviceready for testing purpose
Countly.deviceready = function () {
    Countly.ready = true;
    //testing
}

// Countly dummy success and error event
Countly.onSuccess = function (result) {
}

Countly.onError = function (error) {
    console.error(error);
}

/////////////////////////
////// PUSH CODE ////////
/////////////////////////

var push = {};
Countly.Push = push;
push.onRegisterPushNotification = function () {
    var pushNotification = window.plugins.pushNotification;
    if (!window.device) {
        console.error("dependency required org.apache.cordova.device to know android or ios device.");
        return;
    }
    if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
        pushNotification.register(push.onPushSucess, push.onPushError, { "senderID": Countly.projectId, "ecb": "Countly.Push.onNotificationGCM" });
    }
    else {
        pushNotification.register(push.onPushSucess, push.onPushError, { "badge": "true", "sound": "true", "alert": "true", "ecb": "Countly.Push.onNotificationAPN" });
    }
}

push.onPushSucess = function (result) {
    push.onPushId(result)
}

push.onPushError = function (error) {
    console.error(error);
}

push.onPushId = function (pushId) {
    if (pushId == "OK" || pushId == "ok")
        return
    push.pushId = pushId;
    Countly.onRegistrationId(push.pushId);
}

push.onNotificationGCM = function (e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                console.log("Regid " + e.regid);
                push.onPushId(e.regid);
            }
            break;

        case 'message':

            break;

        case 'error':

            break;

        default:
            console.error('An unknown GCM event has occurred');
            break;
    }
}

push.onNotificationAPN = function (event) {
    var pushNotification = window.plugins.pushNotification;
    if (event.alert) {
        console.log(event.alert);
    }
    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(push.onPushSucess, push.onPushError, event.badge);
    }
    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }
}

/////////////////////////
////// PUSH CODE ////////
/////////////////////////

window.Countly = Countly;
document.addEventListener("deviceready", Countly.deviceready, false);