"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const case_1 = require("case");
const generateEnumKeys = (assetKeys) => assetKeys
    .map(name => {
    const enumName = (0, case_1.pascal)(name);
    const prefix = enumName.match(/^\d/) ? 'i' : '';
    return {
        [name]: `${prefix}${enumName}`
    };
})
    .reduce((prev, curr) => Object.assign(prev, curr), {});
const generateEnums = (enumName, enumKeys, quote = '"') => [
    `export enum ${enumName} {`,
    ...Object.entries(enumKeys).map(([enumValue, enumKey]) => `  ${enumKey} = ${quote}${enumValue}${quote},`),
    '}\n'
].join('\n');
const generateConstant = ({ constantName, enumName, literalIdName, literalKeyName, enumKeys, codepoints, quote = '"', kind = {} }) => {
    let varType = ': Record<string, string>';
    if (kind.enum) {
        varType = `: { [key in ${enumName}]: string }`;
    }
    else if (kind.literalId) {
        varType = `: { [key in ${literalIdName}]: string }`;
    }
    else if (kind.literalKey) {
        varType = `: { [key in ${literalKeyName}]: string }`;
    }
    return [
        `export const ${constantName}${varType} = {`,
        Object.entries(enumKeys)
            .map(([enumValue, enumKey]) => {
            const key = kind.enum
                ? `[${enumName}.${enumKey}]`
                : `${quote}${enumValue}${quote}`;
            return `  ${key}: ${quote}${codepoints[enumValue]}${quote},`;
        })
            .join('\n'),
        '};\n'
    ].join('\n');
};
const generateStringLiterals = (typeName, literals, quote = '"') => [
    `export type ${typeName} =`,
    `${literals.map(key => `  | ${quote}${key}${quote}`).join('\n')};\n`
].join('\n');
const generator = {
    generate: async ({ name, codepoints, assets, formatOptions: { ts } = {} }) => {
        const quote = Boolean(ts?.singleQuotes) ? "'" : '"';
        const generateKind = (Boolean(ts?.types?.length)
            ? ts.types
            : ['enum', 'constant', 'literalId', 'literalKey'])
            .map(kind => ({ [kind]: true }))
            .reduce((prev, curr) => Object.assign(prev, curr), {});
        const enumName = ts?.enumName || (0, case_1.pascal)(name);
        const constantName = ts?.constantName || `${(0, case_1.constant)(name)}_CODEPOINTS`;
        const literalIdName = ts?.literalIdName || `${(0, case_1.pascal)(name)}Id`;
        const literalKeyName = ts?.literalKeyName || `${(0, case_1.pascal)(name)}Key`;
        const names = { enumName, constantName, literalIdName, literalKeyName };
        const enumKeys = generateEnumKeys(Object.keys(assets));
        const stringLiteralId = generateKind.literalId
            ? generateStringLiterals(literalIdName, Object.keys(enumKeys), quote)
            : null;
        const stringLiteralKey = generateKind.literalKey
            ? generateStringLiterals(literalKeyName, Object.values(enumKeys), quote)
            : null;
        const enums = generateKind.enum
            ? generateEnums(enumName, enumKeys, quote)
            : null;
        const constant = generateKind.constant
            ? generateConstant({
                ...names,
                enumKeys,
                codepoints,
                quote,
                kind: generateKind
            })
            : null;
        return [stringLiteralId, stringLiteralKey, enums, constant]
            .filter(Boolean)
            .join('\n');
    }
};
exports.default = generator;
//# sourceMappingURL=ts.js.map