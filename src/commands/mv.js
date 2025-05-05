import { OperationFailed } from '../errors.js';
import getAbsolutePath from '../utils/getAbsolutePath.js';
import getAbsoluteFilePath from '../utils/getAbsoluteFilePath.js';
import { basename, dirname } from 'node:path';
import { unlink } from 'node:fs/promises';
import cp from './cp.js';

const mv = async (filePath, dirPath) => {
    try {
        const absoluteFilePath = getAbsolutePath(filePath);
        const absoluteNewFilePath = getAbsoluteFilePath(dirPath, basename(absoluteFilePath));
        const { readable, writable } = await cp(filePath, dirPath);
        
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
