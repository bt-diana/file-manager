import { OperationFailed } from '../errors.js';
import getAbsolutePath from '../utils/getAbsolutePath.js';
import { unlink } from 'node:fs/promises';

const rm = async (filePath) => {
    try {
        const absoluteFilePath = getAbsolutePath(filePath);
        await unlink(absoluteFilePath);
        console.log(`Deleted ${absoluteFilePath} file`);
    } catch {
        throw new OperationFailed();
    }
};

export default rm;
