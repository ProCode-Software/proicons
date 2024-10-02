#! /usr/bin/env node
import { Command, program } from "commander";
import { rename } from "./rename.js";
import { resolve } from "path";

program.command('rename <iconName> <newName> --all')
    .description('Rename an icon')
    .action(rename)

program.parse(process.argv);