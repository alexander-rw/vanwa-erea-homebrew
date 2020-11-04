import { writeFileSync, readFileSync } from "fs";

const parseFile = (path) => JSON.parse(readFileSync(path));
const save = (path, data) => writeFileSync(path, JSON.stringify(data, null, "\t"));

export { parseFile, save };