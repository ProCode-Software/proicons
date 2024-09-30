import { Command, program } from "commander";
import { rename } from "./rename.js";
import { resolve } from "path";

program.command('rename <iconName> <newName>')
    .description('Rename an icon')
    .action(rename)

program.parse(process.argv);