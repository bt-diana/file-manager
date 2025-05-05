const { getCurrentDir } = require('../currentDir.js');
const { OperationFailed } = require('../errors.js');
const { readdir, stat } = require('node:fs/promises');
const { resolve } = require('node:path');

class DirContent {
    constructor(name, isDirectory) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.type = isDirectory ? 'directory' : 'file';
    }
}

const ls = async () => {
    try {
        const currentDir = getCurrentDir();
        const dirContentsName = await readdir(currentDir);
        const dirContents = await Promise.all(dirContentsName.map(async (name) => {
            const isDirectory = (await stat(resolve(currentDir, name))).isDirectory();
            return new DirContent(name, isDirectory);
        }));
        const dirContentsSorted = dirContents.sort((a, b) => (b.isDirectory - a.isDirectory));

        console.table(dirContentsSorted, ['name', 'type']);
    } catch {
        throw new OperationFailed();
    }
};

module.exports = ls;
