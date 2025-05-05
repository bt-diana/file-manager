import { getCurrentDir } from '../currentDir.js';
import { isAbsolute, resolve } from 'node:path';

const getAbsoluteFilePath = (filePath, fileName) => {
    return isAbsolute(filePath) ? resolve(filePath, fileName) : resolve(getCurrentDir(), filePath, fileName);
    
};

export default getAbsoluteFilePath;
