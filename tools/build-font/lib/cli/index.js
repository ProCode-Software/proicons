"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const misc_1 = require("../types/misc");
const config_loader_1 = require("./config-loader");
const constants_1 = require("../constants");
const runner_1 = require("../core/runner");
const validation_1 = require("../utils/validation");
const logger_1 = require("./logger");
const { bin, name: packageName, version } = require('../../package.json');
const getCommandName = () => (bin && Object.keys(bin)[0]) || packageName;
const cli = async () => {
    config();
    const input = commander_1.default.program.parse(process.argv);
    const { debug, silent, config: configPath } = input.opts();
    const logger = (0, logger_1.getLogger)(debug, silent);
    try {
        const { loadedConfig, loadedConfigPath } = await (0, config_loader_1.loadConfig)(configPath);
        logger.start(loadedConfigPath);
        const results = await run(await buildOptions(input, loadedConfig));
        logger.results(results);
    }
    catch (error) {
        logger.error(error);
        process.exitCode = 1;
    }
};
const printList = (available, defaults) => ` (default: ${defaults.join(', ')}, available: ${Object.values(available).join(', ')})`;
const printDefaultValue = (value) => {
    let printVal = String(value);
    if (typeof value === 'undefined') {
        return '';
    }
    return ` (default: ${printVal})`;
};
const printDefaultOption = (key) => printDefaultValue(constants_1.DEFAULT_OPTIONS[key]);
const printConfigPaths = () => config_loader_1.DEFAULT_FILEPATHS.join(' | ');
const config = () => {
    commander_1.default.program
        .storeOptionsAsProperties(false)
        .name(getCommandName())
        .version(version)
        .arguments('[input-dir]')
        .option('-c, --config <value>', `custom config path (default: ${printConfigPaths()})`)
        .option('-o, --output <value>', 'specify output directory')
        .option('-n, --name <value>', 'base name of the font set used both as default asset name' +
        printDefaultOption('name'))
        .option('-t, --font-types <value...>', `specify font formats to generate` +
        printList(misc_1.FontAssetType, constants_1.DEFAULT_OPTIONS.fontTypes))
        .option('-g --asset-types <value...>', `specify other asset types to generate` +
        printList(misc_1.OtherAssetType, constants_1.DEFAULT_OPTIONS.assetTypes))
        .option('-h, --font-height <value>', 'the output font height (icons will be scaled so the highest has this height)' +
        printDefaultOption('fontHeight'))
        .option('--descent <value>', 'the font descent' + printDefaultOption('descent'))
        .option('--normalize [bool]', 'normalize icons by scaling them to the height of the highest icon' +
        printDefaultOption('normalize'))
        .option('-r, --round [bool]', 'setup the SVG path rounding [10e12]')
        .option('--selector <value>', "use a CSS selector instead of 'tag + prefix'" +
        printDefaultOption('selector'))
        .option('-p, --prefix <value>', 'CSS class prefix' + printDefaultOption('prefix'))
        .option('--tag <value>', 'CSS base tag for icons' + printDefaultOption('tag'))
        .option('-u, --fonts-url <value>', 'public URL to the fonts directory (used in the generated CSS)')
        .option('--debug', 'display errors stack trace' + printDefaultValue(false))
        .option('--silent', 'run with no logs' + printDefaultValue(false));
};
const buildOptions = async (cmd, loadedConfig = {}) => {
    const [inputDir] = cmd.args;
    const opts = cmd.opts();
    return {
        ...loadedConfig,
        ...(0, validation_1.removeUndefined)({
            inputDir,
            outputDir: opts.output,
            name: opts.name,
            fontTypes: opts.fontTypes,
            assetTypes: opts.assetTypes,
            fontHeight: opts.fontHeight,
            descent: opts.descent,
            normalize: opts.normalize,
            round: opts.round,
            selector: opts.selector,
            tag: opts.tag,
            prefix: opts.prefix,
            fontsUrl: opts.fontsUrl
        })
    };
};
const run = async (options) => await (0, runner_1.generateFonts)(options, true);
cli();
//# sourceMappingURL=index.js.map