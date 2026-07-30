/* Loads the Desmos API once and creates a calculator from a saved JSON state,
 * so pages don't repeat this boilerplate. The API key and version live here.
 *
 *   loadDesmosCalculator("calculator", "desmos-state.json");                 // 2D
 *   loadDesmosCalculator("calculator", "desmos-state.json", { type: "3d" }); // 3D
 *   loadDesmosCalculator("calculator", "desmos-state.json", { type: "geometry" });
 *
 * Extra options are merged over the defaults, e.g. { settingsMenu: false }.
 */
(function (global) {
    "use strict";

    // The API key and version live only here.
    var DESMOS_API_VERSION = "v1.13"; // exposes 2D, 3D, and Geometry
    var DESMOS_API_KEY = "c8a09e8f7af44edcaa08fdf5892c43b4";
    var DESMOS_SRC =
        "https://www.desmos.com/api/" + DESMOS_API_VERSION +
        "/calculator.js?apiKey=" + DESMOS_API_KEY;

    var DEFAULT_OPTIONS = {
        expressions:  true,
        settingsMenu: true,
        zoomButtons:  true
    };

    var CONSTRUCTORS = {
        "2d":       "GraphingCalculator",
        "3d":       "Calculator3D",
        "geometry": "Geometry"
    };

    // Inject the Desmos script once; every call shares the same load.
    var scriptPromise;
    function loadDesmosScript() {
        if (!scriptPromise) {
            scriptPromise = new Promise(function (resolve) {
                var script = document.createElement("script");
                script.src = DESMOS_SRC;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }
        return scriptPromise;
    }

    // Create a calculator in `elementId` and load a saved state file.
    // `options.type` picks the calculator ("2d" default, "3d", or "geometry");
    // any other option is merged over DEFAULT_OPTIONS.
    function loadDesmosCalculator(elementId, stateFile, options) {
        options = options || {};
        var constructorName = CONSTRUCTORS[options.type || "2d"];

        var desmosOptions = Object.assign({}, DEFAULT_OPTIONS, options);
        delete desmosOptions.type;

        return loadDesmosScript().then(function () {
            var element = document.getElementById(elementId);
            var calculator = Desmos[constructorName](element, desmosOptions);

            fetch(stateFile)
                .then(function  (response) { return response.json(); })
                .then(function  (state)    { calculator.setState(state); })
                .catch(function (error)    { console.error("Error loading Desmos state:", error); });

            return calculator;
        });
    }

    global.loadDesmosCalculator = loadDesmosCalculator;
})(window);