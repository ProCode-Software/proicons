import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { prettierFormat } from "./bin/helpers/prettierFormat.ts";

const lfPath = resolve('./icons/icons.lock.json')

const oldLock = JSON.parse(readFileSync(lfPath, 'utf-8'))

oldLock.deprecated = Object.fromEntries(
    oldLock.deprecated.map(({icon, ...data}) => [icon, data])
);

(async () => {
    writeFileSync(lfPath, await prettierFormat(oldLock))
})()