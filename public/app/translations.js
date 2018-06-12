var translationsEN = {
    RECIPE: 'Recipe',
    USE_VAPE_READY: 'Use vape-ready nicotine base!',
    AMOUNT: 'Amount',
    DESIRED_STRENGTH: 'Desired strength',
    DESIRED_PG: 'Desired PG',
    DESIRED_VG: 'Desired VG',
    NICOTINE_STRENGTH: 'Nicotine strength',
    PG_CONTENT_OF_NICOTINE: 'PG-content of nicotine',
    VG_CONTENT_OF_NICOTINE: 'vG-content of nicotine',
    DILUENT: 'Diluent',
    SUGGESTED_STEP_TIME: 'Suggested steep time',
    NICOTINE: 'Nicotine',
    PG: 'PG',
    VG: 'VG',
    TOTAL_AMOUNT: 'Total amount',
    TARGET: 'Target',
    BASE: 'Base',
    INGREDIENTS: 'Ingredients',
    NAME: 'Name',
    BUTTON_ADD_FLAVOR: 'Add flavor',
    BUTTON_LANG_RS: 'Serbian',
    BUTTON_LANG_EN: 'English',
    TRANSLATE: 'Translate',
    PERCENTAGE: 'Percentage',
    FLAVOR_TYPE: 'Flavor type',
    LANGUAGE: 'Language',
    ATTENTION: "Attention",
    BAD_RECIPE_MSG: "Something is wrong with your recipe, some values are negative",
    BAD_RECIPE_DIRECTIONS: "Click \"Close\" to continue, or click \"Fix\" to auto-fix recipe",
    CLOSE: "Close",
    FIX: "Fix",

    PASSWORD: "Password:",
    REMEMBER_ME: "Remember me:",
    LOGIN: "Login"

};

var translationsRS= {
    RECIPE: 'Recept',
    USE_VAPE_READY: 'Koristi gotovu aromu!',
    AMOUNT: 'Količina',
    DESIRED_STRENGTH: 'Željena jačina',
    DESIRED_PG: 'Željeni PG',
    DESIRED_VG: 'Željeni VG',
    NICOTINE_STRENGTH: 'Jačina nikotina',
    PG_CONTENT_OF_NICOTINE: 'PG u nikotinu',
    VG_CONTENT_OF_NICOTINE: 'VG u nikotinu',
    DILUENT: 'Rastvarač',
    SUGGESTED_STEP_TIME: 'Predloženo vreme sazrevanja',
    NICOTINE: 'Nikotin',
    PG: 'PG',
    VG: 'VG',
    TOTAL_AMOUNT: 'Ukupna količina',
    TARGET: 'Cilj',
    BASE: 'Baza',
    INGREDIENTS: 'Sastojci',
    NAME: 'Ime',
    BUTTON_ADD_FLAVOR: 'Dodaj aromu',
    BUTTON_LANG_RS: 'Srpski',
    BUTTON_LANG_EN: 'Engleski',
    TRANSLATE: 'Prevod',
    PERCENTAGE: 'Procenat',
    FLAVOR_TYPE: 'Tip arome',
    LANGUAGE: 'Jezik',
    ATTENTION: "Pažnja",
    BAD_RECIPE_MSG: "Nešto nije u redu sa vašim receptom, neke vrednosti su negativne",
    BAD_RECIPE_DIRECTIONS: "Kliknite \"Zatvori\" da nastavite, ili kliknite \"Ispravi\" za automatsko popravljanje recepta",
    CLOSE: "Zatvori",
    FIX: "Ispravi",

    PASSWORD: "Lozinka:",
    REMEMBER_ME: "Zapamti me:",
    LOGIN: "Uloguj se"
};

angular.module('gelApp.home').config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    $translateProvider.useLocalStorage();
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('rs', translationsRS);
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('rs');
}]);