import { getCurrentDir } from '../currentDir.js';
import { OperationFailed } from '../errors.js';
import { resolve } from 'node:path';
import { mkdir as fsMkdir } from 'node:fs/promises';

const mkdir = async (dirName) => {
    const dirPath = resolve(getCurrentDir(), dirName);

    try {
        await fsMkdir(dirPath);
        console.log(`Created a new directory ${dirPath}`);
    } catch {
        throw new OperationFailed();
    }
};

export default mkdir;
