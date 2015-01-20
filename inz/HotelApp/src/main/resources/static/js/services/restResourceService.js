app.service('restResourceService', function () {
    return {
        getObjectIdFromUrl: function (url) {
            return url.split('/').pop();
        }
    };
});