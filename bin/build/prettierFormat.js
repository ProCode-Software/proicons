import { resolveConfig, format } from 'prettier';

/** @param {import('prettier').BuiltInParserName} [parser='json']  */
export async function prettierFormat(data, parser = 'json') {
    const options = await resolveConfig('.prettierrc');
    options.parser = parser;
    const formatted = await format(parser == 'json' ? JSON.stringify(data) : data, options);

    return formatted
}