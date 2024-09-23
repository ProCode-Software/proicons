"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHexCodepoint = exports.getCodepoints = void 0;
const constants_1 = require("../constants");
const getCodepoints = (assets, predefined = {}, start = constants_1.DEFAULT_START_CODEPOINT) => {
    const out = {};
    const used = Object.values(predefined);
    let current = start;
    const getNextCodepoint = () => {
        while (used.includes(current)) {
            current++;
        }
        const res = current;
        current++;
        return res;
    };
    for (const id of Object.keys(assets)) {
        if (!predefined[id]) {
            out[id] = getNextCodepoint();
        }
    }
    return { ...predefined, ...out };
};
exports.getCodepoints = getCodepoints;
const getHexCodepoint = (decimalCodepoint) => decimalCodepoint.toString(16);
exports.getHexCodepoint = getHexCodepoint;
//# sourceMappingURL=codepoints.js.map