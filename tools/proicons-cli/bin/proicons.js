#! /usr/bin/env node
import { program } from 'commander'
import { changeCategory } from './change-category.js'
import { auditDeprecated, deprecate } from './deprecate.js'
import { rename } from './rename.js'
import { listCategories } from './list-categories.js'

program
    .command('rename')
    .description('Rename an icon')
    .argument('icon-name', 'In friendly case')
    .argument('new-name', 'In friendly case')
    .option('-a, --no-alias', 'Do not create aliases')
    .action(rename)

program
    .command('deprecate')
    .description('Deprecate an icon')
    .alias('dep')
    .argument('icon-name', 'The icon name to deprecate (friendly case)')
    .argument('[alternative]')
    .action(deprecate)

program
    .command('audit-deprecated')
    .description('Checks all deprecated icons')
    .action(auditDeprecated)

program
    .command('change-category')
    .description('Change the category of an icon')
    .argument('icon-name', 'The icon name to change (friendly case)')
    .argument('new-category', 'The new category to assign')
    .alias('update-category')
    .alias('category')
    .action(changeCategory)

program
    .command('list-categories')
    .description('List all icon categories')
    .alias('ls-categories')
    .action(listCategories)

program.parse()
