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
    PRIVACY: "Privacy",
    PRIVATE_RECIPE: "Private recipe",
    GRAMS: "grams",
    FLAVOR_NAME: "Flavor name",
    FLAVOR: "Flavor",
    PRINT_LABEL: "Print label",
    DELETE_RECIPE: "Delete recipe",
    PRINT: "Print",
    NETWORKS: "Networks",

    PASSWORD: "Password:",
    REPASSWORD: "Re enter password:",
    REMEMBER_ME: "Remember me:",
    LOGIN: "Login",
    LOGOUT: "Log out",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again",
    BAD_CREDENTIALS: "Email or/and password you entered doesn't match with anything we have in the database. Please try again",
    REGISTER: "Signup",
    USERNAME: "Username",
    FIRST_NAME: "First name",
    LAST_NAME: "Last name",
    NEWSLETTER: "Keep me updated",

    LOGIN_WARNING: "You have to be logged in to save recipe.",
    WARNING: "Warning",

    NEW_RECIPE: "New recipe",
    MY_RECIPES: "My recipes",
    SEARCH: "Search",
    SAVE: "Save",
    CLONE: "Clone",

    RECIPE_TITLE: "Recipe title",
    COMMENT: "Comment",
    RATING: "Rating",
    CREATED_BY: "Created by",
    LOAD_MORE: "Load more",
    EDIT: "Edit",

    BUG_REPORT: "Bug Report",
    DESCRIBE_BUG: "Describe bug",
    NOT_MANDATORY: "not mandatory",

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
    PRIVACY: "Privatnost",
    PRIVATE_RECIPE: "Privatni recept",
    GRAMS: "grami",
    FLAVOR_NAME: "Ime arome",
    FLAVOR: "Aroma",
    PRINT_LABEL: "Štampaj nalepnicu",
    DELETE_RECIPE: "Obriši recept",
    PRINT: "Štampaj",
    NETWORKS: "Mreže",

    PASSWORD: "Lozinka:",
    REPASSWORD: "Ponovite lozinku:",
    REMEMBER_ME: "Zapamti me:",
    LOGIN: "Uloguj se",
    LOGOUT: "Izloguj se",
    SOMETHING_WENT_WRONG: "Nešto nije u redu. Molim vas, pokušajte ponovo",
    BAD_CREDENTIALS: "Email i / ili lozinka koju ste uneli ne odgovara ni čemu što imamo u bazi podataka. Molim vas, pokušajte ponovo",
    REGISTER: "Prijavi se",
    USERNAME: "Korisnicko ime",
    FIRST_NAME: "Ime",
    LAST_NAME: "Prezime",
    NEWSLETTER: "Obaveštavaj me",

    LOGIN_WARNING: "Morate biti ulogovani da bi ste sačuvali recept.",
    WARNING: "Obaveštenje",

    NEW_RECIPE: "Novi recept",
    MY_RECIPES: "Moji recepti",
    SEARCH: "Pretraga",
    SAVE: "Sačuvaj",
    CLONE: "Kloniraj",

    RECIPE_TITLE: "Naziv recepta",
    COMMENT: "Komentar",
    RATING: "Rejting",
    CREATED_BY: "Kreator",
    LOAD_MORE: "Učitaj još",
    EDIT: "Uredi",

    BUG_REPORT: "Prijavi Grešku",
    DESCRIBE_BUG: "Opiši grešku",
    NOT_MANDATORY: "nije obavezno",
};

angular.module('gelApp.newRecipe').config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    $translateProvider.useLocalStorage();
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('rs', translationsRS);
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('rs');
    $translateProvider.useSanitizeValueStrategy('sce');
}]);