// Tooltip configuration
// https://github.com/720kb/angular-tooltips
App.config(['tooltipsConfProvider', function configConf(tooltipsConfProvider) {
    tooltipsConfProvider.configure({
        'smart': true,
        'size': 'large',
        'speed': 'fast',
        'tooltipTemplateUrlCache': true
    });
}]);
