"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../../utils/template");
const generator = {
    generate: async (options) => {
        return (0, template_1.renderTemplate)(options.templates.html, options);
    }
};
exports.default = generator;
//# sourceMappingURL=html.js.map