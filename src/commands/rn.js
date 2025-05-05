import { OperationFailed } from '../errors.js';
import getAbsolutePath from '../utils/getAbsolutePath.js';
import getAbsoluteFilePath from '../utils/getAbsoluteFilePath.js';
import { stat, rename } from 'node:fs/promises';

const rn = async (path, newFileName) => {
    let oldAbsolutePath;
    let newAbsolutePath;
    let stats;

    try {
        oldAbsolutePath = getAbsolutePath(path);
        newAbsolutePath = getAbsoluteFilePath(path, newFileName);
    } catch {
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
    } catch {
        throw new OperationFailed();
    }
};

export default rn;
