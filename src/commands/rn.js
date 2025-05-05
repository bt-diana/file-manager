import { getCurrentDir } from '../currentDir.js';
import { InvalidInput, OperationFailed } from '../errors.js';
import { resolve, dirname, isAbsolute } from 'node:path';
import { stat, rename } from 'node:fs/promises';

const rn = async (path, newFileName) => {
    let oldAbsolutePath;
    let newAbsolutePath;
    let stats;

    try {
        oldAbsolutePath = isAbsolute(path) ? path : resolve(getCurrentDir(), path);
        newAbsolutePath = resolve(dirname(oldAbsolutePath), newFileName);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new InvalidInput();
        }
        throw new OperationFailed();
    }
    
    try {
        stats = await stat(newAbsolutePath);
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw new OperationFailed();
        }
    }

    if (stats) {
        throw new InvalidInput();
    }

    try {
        await rename(oldAbsolutePath, newAbsolutePath);
        console.log(`Renamed ${oldAbsolutePath} to ${newAbsolutePath}`);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new InvalidInput();
        }
        throw new OperationFailed();
    }
};

export default rn;
