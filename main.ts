import { walk } from "https://deno.land/std@0.102.0/fs/walk.ts";
import { parse as parseArgs } from "https://deno.land/std@0.102.0/flags/mod.ts";
const { args } = Deno;

import { meta } from "./meta.ts";

const { fileName, debug } = parseArgs(args);

const monsters: unknown[] = [];

const parsed: string[] = [];
const skipped: string[] = [];

console.log("");

for await (const { path } of walk("./creatures", { match: [/\.json/] })) {
    const d = await Deno.readTextFile(path);

    try {
        const data = JSON.parse(d);
        if (data && Object.keys(data).length > 0) {
            parsed.push(`PARSING::: ${path}`);
            monsters.push(data);
        } else {
            skipped.push(`SKIPPED::: ${path}`);
        }
    } catch(e) {
        if (debug) {
            console.log(`Path: ${path}`, e);
        } else {
            console.log(`Skipping path: ${path}`);
        }
    }
}

[...parsed, "", ...skipped].forEach(p => console.log(p));

console.log("");
console.log(`${new Date().toISOString()}: Writing file '${fileName}'`);
console.log("");

await Deno.writeTextFile(fileName, JSON.stringify({ ...meta, monster: monsters }, null, 2));