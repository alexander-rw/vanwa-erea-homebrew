import { walk } from "https://deno.land/std@0.102.0/fs/walk.ts";
import { parse as parseArgs } from "https://deno.land/std@0.102.0/flags/mod.ts";
const { args } = Deno;

import { meta } from "./meta.ts";

const { fileName, debug, dryRun } = parseArgs(args);

console.log(fileName, debug, dryRun);

const monsters: unknown[] = [];

for await (const { path } of walk("./creatures", { match: [/\.json/] })) {
    const d = await Deno.readTextFile(path);

    try {
        const data = JSON.parse(d);
    
        if (data && Object.keys(data).length > 0) {
            console.log(`Parsing ${path}`);
            monsters.push(data);
        }
    } catch(e) {
        if (debug) {
            console.log(`Path: ${path}`, e);
        } else {
            console.log(`Skipping path: ${path}`);
        }
    }
}

console.log(`${new Date().toISOString()}: Writing file '${fileName}'`);

await Deno.writeTextFile(fileName, JSON.stringify({ ...meta, monster: monsters }, null, 2));