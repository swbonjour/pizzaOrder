"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmptyVariables = void 0;
function checkEmptyVariables(payload) {
    for (let [key, value] of Object.entries(payload)) {
        if (value == '' || value == null || value == undefined || value == 'undefined') {
            return false;
        }
    }
    return true;
}
exports.checkEmptyVariables = checkEmptyVariables;
