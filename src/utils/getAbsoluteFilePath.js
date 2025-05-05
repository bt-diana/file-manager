import { getCurrentDir } from '../currentDir.js';
import { isAbsolute, resolve } from 'node:path';

const getAbsoluteFilePath = (filePath, fileName) => {
    if (fileName) {
        return isAbsolute(filePath) ? resolve(filePath, fileName) : resolve(getCurrentDir(), filePath, fileName);
    }
    return isAbsolute(filePath) ? filePath : resolve(getCurrentDir(), filePath);
};

export default getAbsoluteFilePath;
