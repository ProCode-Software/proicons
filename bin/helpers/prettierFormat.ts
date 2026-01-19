import { resolveConfig, format, type BuiltInParserName, type Options } from 'prettier'

let configPromise: Promise<Options | null> | null = null

export async function prettierFormat(
    data: any,
    parser: BuiltInParserName | 'svelte' = 'json'
): Promise<string> {
    const baseOptions = (await (configPromise ??= resolveConfig('.prettierrc'))) ?? {}
    const options = { ...baseOptions }
    options.parser = parser
    if (parser == 'svelte') {
        ;(options.plugins ??= []).push('prettier-plugin-svelte')
    }
    const formatted = await format(
        parser == 'json' ? JSON.stringify(data) : data,
        options
    )
    return formatted
}