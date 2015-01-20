app.service('modalService', function ($modal) {
    return {
        open: function (size, modalHeader, modalType, hrefs, specificController) {
            return modalInstance = $modal.open({
                templateUrl: './views/modals/modal.html',
                controller: 'modalController',
                size: size,
                resolve: {
                    modalHeader: function () {
                        return modalHeader;
                    },
                    modalType: function(){
                        return modalType;
                    },
                    hrefs: function(){
                        return hrefs;
                    },
                    specificController: function(){
                        return specificController;
                    }
                }
            });
        },
        ok: function(modalInstance){
            return function () {
                modalInstance.dismiss();
            };
        },
        no: function(modalInstance){
            return function () {
                modalInstance.dismiss();
            };
        }
    };
});