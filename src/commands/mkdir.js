import { getCurrentDir } from '../currentDir.js';
import { InvalidInput, OperationFailed } from '../errors.js';
import { resolve } from 'node:path';
import { mkdir as fsMkdir } from 'node:fs/promises';

const mkdir = async (dirName) => {
    const dirPath = resolve(getCurrentDir(), dirName);

    try {
        await fsMkdir(dirPath);
        console.log(`Created a new directory ${dirPath}`)
    } catch (e) {
        if (e.code === 'EEXIST') {
            throw new InvalidInput();
        }
        throw new OperationFailed();
    }
};

export default mkdir;
