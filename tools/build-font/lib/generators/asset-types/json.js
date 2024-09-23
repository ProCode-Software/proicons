"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator = {
    generate: async ({ formatOptions: { json } = {}, codepoints }) => JSON.stringify(codepoints, null, json?.indent)
};
exports.default = generator;
//# sourceMappingURL=json.js.map