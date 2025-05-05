import { OperationFailed } from '../errors.js';
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto';
import getAbsoluteFilePath from '../utils/getAbsoluteFilePath.js';

const hash = async (filePath) => {
    try {
        const absoluteFilePath = getAbsoluteFilePath(filePath);
        const fileContent = await readFile(absoluteFilePath);
        const hash = createHash('sha256').update(fileContent.toString()).digest('hex');
        console.log(hash);
    } catch {
        throw new OperationFailed();
    }
};

export default hash;
