Handlebars.registerHelper("formatRating", function (rating) {
    var html = '';
    for (var j = 0; j < Math.floor(rating) ; j++)
        html += '<i class="fa fa-star"></i>';
    for (var j = 0; j < 5 - Math.ceil(rating) ; j++)
        html += '<i class="fa fa-star-o"></i>';
    if (rating > Math.floor(rating) && rating < Math.ceil(rating))
        html += '<i class="fa fa-star-half-o"></i>';
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper("serverUrl", function () {
    return SERVER_URL;
});

Handlebars.registerHelper("storageUrl", function () {
    return STORAGE_URL;
});

Handlebars.registerHelper("formatJsonDate", function (jsonDate) {
    return new Date(parseInt(jsonDate.substr(6))).toLocaleDateString('vi-VN');
});

Handlebars.registerHelper("formatDate", function (dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN');
});

Handlebars.registerHelper("formatTime", function (dateString) {
    return new Date(dateString).toLocaleTimeString('vi-VN');
});

Handlebars.registerHelper("formatDateTime", function (dateString) {
    var date = new Date(dateString)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
});

Handlebars.registerHelper("formatNumber", function (number) {
    return number.toLocaleString('vi-VN');
});

Handlebars.registerHelper("length", function (array) {
    return array.length;
});

Handlebars.registerHelper("trunc", function (text, maxLength) {
    return (text.length > maxLength) ? text.substr(0, maxLength - 1) + '...' : text;
});