"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = exports.nullable = exports.parseDir = exports.parseBoolean = exports.removeUndefined = exports.listMembersParser = exports.parseFunction = exports.parseString = exports.parseNumeric = void 0;
const fs_async_1 = require("./fs-async");
const parseNumeric = (value) => {
    const out = Number(value);
    if ((typeof value !== 'number' && typeof value !== 'string') ||
        Number.isNaN(out)) {
        throw new Error(`${value} is not a valid number`);
    }
    return out;
};
exports.parseNumeric = parseNumeric;
const parseString = (value) => {
    if (typeof value !== 'string') {
        throw new Error(`${value} is not a string`);
    }
    return value;
};
exports.parseString = parseString;
const parseFunction = (value) => {
    if (typeof value !== 'function') {
        throw new Error(`${value} is not a function`);
    }
    return value;
};
exports.parseFunction = parseFunction;
const listMembersParser = (allowedValues) => (values) => {
    for (const value of values) {
        if (!allowedValues.includes(value)) {
            throw new Error([
                `${value} is not valid`,
                `accepted values are: ${allowedValues.join(', ')}`
            ].join(' - '));
        }
    }
    return values;
};
exports.listMembersParser = listMembersParser;
const removeUndefined = (object) => {
    for (const key of Object.keys(object)) {
        if (typeof object[key] === 'undefined') {
            delete object[key];
        }
    }
    return object;
};
exports.removeUndefined = removeUndefined;
const parseBoolean = (val) => {
    if (typeof val === 'string' && ['1', '0', 'true', 'false'].includes(val)) {
        return val === 'true' || val === '1';
    }
    else if (typeof val === 'number' && [0, 1].includes(val)) {
        return val === 1;
    }
    else if (typeof val === 'boolean') {
        return val;
    }
    throw new Error(`must be a boolean value`);
};
exports.parseBoolean = parseBoolean;
const skipIfMatching = (match) => (fn) => (val) => val === match ? match : fn(val);
const parseDir = async (dirname) => {
    const dirExists = await (0, fs_async_1.checkPath)(dirname, 'directory');
    if (!dirExists) {
        throw new Error(`${dirname} is not a directory`);
    }
    return dirname;
};
exports.parseDir = parseDir;
exports.nullable = skipIfMatching(null);
exports.optional = skipIfMatching(undefined);
//# sourceMappingURL=validation.js.map