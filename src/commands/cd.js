import { getCurrentDir, setCurrentDir } from '../currentDir.js';
import { OperationFailed } from '../errors.js';
import { stat } from 'node:fs/promises';
import getAbsolutePath from '../utils/getAbsolutePath.js';

const cd = async (path) => {
    try {
        const newCurrentDir = getAbsolutePath(path);
        if ((await stat(newCurrentDir)).isDirectory()) {
            setCurrentDir(newCurrentDir);
        } else {
            throw new Error();
        }
    } catch {
        throw new OperationFailed();
    }
};

export default cd;
