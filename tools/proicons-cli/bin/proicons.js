#! /usr/bin/env node
import { Command, program } from "commander";
import { rename } from "./rename.js";
import { resolve } from "path";
import { auditDeprecated, deprecate } from "./deprecate.js";

program.command('rename')
    .description('Rename an icon')
    .argument('iconName', "In friendly case")
    .argument('newName', "In friendly case")
    .option('-a, --no-alias', 'Do not create aliases')
    .action(rename)

program.command('deprecate')
    .description('Deprecate an icon')
    .argument('iconName', 'The icon name to deprecate')
    .argument('[alternative]')
    .action(deprecate)

program.command('audit-deprecated')
    .description('Checks all deprecated icons')
    .action(auditDeprecated)

program.parse();