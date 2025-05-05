import { getCurrentDir } from '../currentDir.js';
import { OperationFailed } from '../errors.js';
import { resolve } from 'node:path';
import { open } from 'node:fs/promises';

const add = async (fileName) => {
    const filePath = resolve(getCurrentDir(), fileName);

    let file;
    try {
        file = await open(filePath, 'wx');
        console.log(`Created a new empty file ${filePath}`);
    } catch (e) {
        throw new OperationFailed();
    } finally {
        await file?.close();
    }
};

export default add;
