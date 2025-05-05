import { getCurrentDir } from '../currentDir.js';
import { isAbsolute, resolve } from 'node:path';

const getAbsolutePath = (path) => {
    return isAbsolute(path) ? path : resolve(getCurrentDir(), path);
};

export default getAbsolutePath;
