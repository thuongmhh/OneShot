// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function submit() {
        setInfo('Đang gửi tin nhắn của bạn. Vui lòng chờ trong giây lát...');
        jQuery.ajax({
            type: 'POST',
            url: jQuery('#contactForm').attr("action"),
            data: jQuery('#contactForm').serialize(),
            success: function (json) {
                if (json.Success) {
                    jQuery('#contactForm').hide();
                    jQuery('#formSuccessMessageWrap').fadeIn(500);
                    closeNotification();
                } else {
                    setWarning(json.Message);
                }
            },
            error: function (xhr, textStatus, error) {
                if (xhr.readyState == 0)
                    setWarning(CONNECTION_PROBLEM);
                else
                    setError(xhr.statusText);
            }
        });
    }

    function validate() {
        jQuery('.formValidationError').hide();
        jQuery('.fieldHasError').removeClass("fieldHasError");
        jQuery('#contactForm .requiredField').each(function (index) {
            if (jQuery(this).val() == '') {
                jQuery(this).focus();
                jQuery(this).addClass('fieldHasError');
                jQuery("#" + jQuery(this).attr("id") + "Error").fadeIn(300);
                return false;
            }
            if (jQuery(this).hasClass("requiredEmailField")) {
                var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var id = "#" + jQuery(this).attr("id");
                if (!regex.test(jQuery(id).val())) {
                    jQuery(id).focus();
                    jQuery(id).addClass("fieldHasError");
                    jQuery(id + "Error2").fadeIn(300);
                    return false;
                }
            }
            if (index == jQuery("#contactForm .requiredField").length - 1) {
                submit();
            }
        });
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        jQuery('#contactForm').attr('action', SERVER_URL + '/App/Contact');
        jQuery('#contactForm input[name="model"]').val(device.model);
        jQuery('#contactForm input[name="platform"]').val(device.platform);
        jQuery('#contactForm input[name="uuid"]').val(device.uuid);
        jQuery('#contactForm input[name="version"]').val(device.version);

        jQuery('#contactForm').submit(function () {
            validate();
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
