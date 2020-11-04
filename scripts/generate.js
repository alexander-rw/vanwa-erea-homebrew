import { EOL } from "os";
import { parseFile, save } from "./functions.js";
import { meta } from "./meta.js";

const monsters = [
    "kharid/mactar.json",
    "kharid/astar.json",
].map(x => parseFile(`${__dirname}/../creatures/${x}`));

const data = {
    meta,
    monsters,
};

const location = `${__dirname}/../vanwa-erea-meta.json`;

save(location, data);

console.log(`${EOL}${new Date().toISOString()}: Wrote '${location}'${EOL}`);