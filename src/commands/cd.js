import { getCurrentDir, setCurrentDir } from '../currentDir.js';
import { InvalidInput, OperationFailed } from '../errors.js';
import { stat } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';

const cd = async (path) => {
    try {
        const newCurrentDir = isAbsolute(path) ? path : resolve(getCurrentDir(), path);
        if ((await stat(newCurrentDir)).isDirectory()) {
            setCurrentDir(newCurrentDir);
        } else {
            throw new InvalidInput();
        }
    } catch(e) {
        if (e.code === 'ENOENT' || e instanceof InvalidInput) {
            throw new InvalidInput();
        }

        throw new OperationFailed();
    }
};

export default cd;
