#! /usr/bin/env node
import { readFileSync } from "fs";
import { exec } from "./tools.js";
import { resolve } from "path";

export function rename() {
    const iconsPath = resolve('icons')
    const imgDirs = ['svg', 'png']
    const lockFilePath = resolve(iconsPath, 'icons.lock.json')

    /**
     * @type {import('../../../icons/icons.lock.json')}
     */
    const lockfile = JSON.parse(readFileSync(lockFilePath))

    console.log(lockfile.icons.length);

    process.exit(0)
}