import { walk } from "https://deno.land/std@0.75.0/fs/walk.ts";
import { parse as parseArgs } from "https://deno.land/std/flags/mod.ts";

import meta from "./meta.ts";

const { fileName } = parseArgs(Deno.args);

const monsters: unknown[] = [];

for await (const { path } of walk("./creatures", { match: [/\.json/] })) {
    const d = await Deno.readTextFile(path);
    const data = JSON.parse(d);
    
    if (data && Object.keys(data).length > 0) {
        console.log(`Parsing ${path}`);
        monsters.push(data);
    }
}

console.log(`${new Date().toISOString()}: Writing file '${fileName}'`);

await Deno.writeTextFile(fileName, JSON.stringify({ ...meta, monster: monsters }, null, 2));