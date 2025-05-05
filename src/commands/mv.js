import { getCurrentDir } from '../currentDir.js';
import { OperationFailed } from '../errors.js';
import { resolve, isAbsolute, basename, dirname } from 'node:path';
import { unlink } from 'node:fs/promises';

import cp from './cp.js';

const mv = async (filePath, dirPath) => {
    try {
        const { readable, writable } = await cp(filePath, dirPath);
        const absoluteFilePath = isAbsolute(filePath) ? filePath : resolve(getCurrentDir(), filePath);
        const absoluteNewFilePath = isAbsolute(dirPath) ? resolve(dirPath, basename(absoluteFilePath)) : resolve(getCurrentDir(), dirPath, basename(absoluteFilePath));
        readable.removeAllListeners('end');
        readable.on('end', () => {
            try {
                unlink(absoluteFilePath);
                console.log(`Moved ${absoluteFilePath} file to ${dirname(absoluteNewFilePath)}`);
            } catch {
                console.error(new OperationFailed().message);
            }
        });
        return { readable, writable };
    } catch {
        throw new OperationFailed();
    }
};

export default mv;
