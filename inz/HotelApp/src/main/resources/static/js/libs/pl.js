(function () {
    angular.module('ui.grid').config(['$provide', function($provide) {
        $provide.decorator('i18nService', ['$delegate', function($delegate) {
            $delegate.add('pl', {
                aggregate: {
                    label: 'items'
                },
                groupPanel: {
                    description: 'Drag a column header here and drop it to group by that column.'
                },
                search: {
                    placeholder: 'Search...',
                    showingItems: 'Showing Items:',
                    selectedItems: 'Selected Items:',
                    totalItems: 'Total Items:',
                    size: 'Page Size:',
                    first: 'First Page',
                    next: 'Next Page',
                    previous: 'Previous Page',
                    last: 'Last Page'
                },
                menu: {
                    text: 'Choose Columns:'
                },
                sort: {
                    ascending: 'Sortuj rosnąco',
                    descending: 'Sortuj malejąco',
                    remove: 'Wyczyść sortowanie'
                },
                column: {
                    hide: 'Ukryj kolumnę'
                },
                aggregation: {
                    count: 'Liczba kolumn: ',
                    sum: 'suma: ',
                    avg: 'średnia: ',
                    min: 'min: ',
                    max: 'max: '
                },
                pinning: {
                    pinLeft: 'Przypnij do lewej',
                    pinRight: 'Przypnij do prawej',
                    unpin: 'Odepnij'
                },
                gridMenu: {
                    columns: 'Kolumny:',
                    importerTitle: 'Importuj plik',
                    exporterAllAsCsv: 'Eksportuj wszystkie dane jako csv',
                    exporterVisibleAsCsv: 'Eksportuj widoczne dane jako csv',
                    exporterSelectedAsCsv: 'Export selected data as csv',
                    exporterAllAsPdf: 'Export all data as pdf',
                    exporterVisibleAsPdf: 'Export visible data as pdf',
                    exporterSelectedAsPdf: 'Export selected data as pdf'
                },
                importer: {
                    noHeaders: 'Column names were unable to be derived, does the file have a header?',
                    noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
                    invalidCsv: 'File was unable to be processed, is it valid CSV?',
                    invalidJson: 'File was unable to be processed, is it valid Json?',
                    jsonNotArray: 'Imported json file must contain an array, aborting.'
                },
                pagination: {
                    sizes: 'items per page',
                    totalItems: 'items'
                }
            });
            return $delegate;
        }]);
    }]);
})();