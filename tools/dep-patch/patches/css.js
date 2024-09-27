"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../../types/misc");
const template_1 = require("../../utils/template");
const css_1 = require("../../utils/css");

function removeParenthesis(str) {
    return str.replace(/[()]/g, '')
}
function kebabCase(str) {
    return removeParenthesis(str).replaceAll(' ', '-').toLowerCase()
}

const generator = {
    dependsOn: misc_1.FontAssetType.SVG,
    generate: (options, svg) => {
        let newOptions = {};
        for (const item of Object.keys(options.codepoints)) {
            const newKey = kebabCase(item)
            newOptions[newKey] = options.codepoints[item];
        }
        (0, template_1.renderTemplate)(options.templates.css, {
            newOptions,
            fontSrc: (0, css_1.renderSrcAttribute)(options, svg)
        })
    }
};
exports.default = generator;
//# sourceMappingURL=css.js.map