"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = exports.TEMPLATE_HELPERS = void 0;
const promises_1 = require("fs/promises");
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = require("path");
const codepoints_1 = require("./codepoints");
exports.TEMPLATE_HELPERS = {
    codepoint: codepoints_1.getHexCodepoint
};
const renderTemplate = async (templatePath, context, options = {}) => {
    const absoluteTemplatePath = (0, path_1.isAbsolute)(templatePath)
        ? templatePath
        : (0, path_1.resolve)(process.cwd(), templatePath);
    const template = await (0, promises_1.readFile)(absoluteTemplatePath, 'utf8');
    return handlebars_1.default.compile(template)(context, {
        ...options,
        helpers: { ...exports.TEMPLATE_HELPERS, ...(options.helpers || {}) }
    });
};
exports.renderTemplate = renderTemplate;
//# sourceMappingURL=template.js.map