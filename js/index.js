import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive(); });


import {
    toggleActive
} from "./module.js";

window.toggleActive = toggleActive;