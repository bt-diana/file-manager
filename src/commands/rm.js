import { OperationFailed } from '../errors.js';
import getAbsoluteFilePath from '../utils/getAbsoluteFilePath.js';
import { unlink } from 'node:fs/promises';

const rm = async (filePath) => {
    try {
        const absoluteFilePath = getAbsoluteFilePath(filePath);
        await unlink(absoluteFilePath);
        console.log(`Deleted ${absoluteFilePath} file`);
    } catch {
        throw new OperationFailed();
    }
};

export default rm;
