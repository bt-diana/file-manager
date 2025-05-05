import { getCurrentDir, setCurrentDir } from '../currentDir.js';
import { OperationFailed } from '../errors.js';
import { resolve, parse } from 'node:path';

const up = () => {
    try {
        let newDir = resolve(getCurrentDir(), '..');
        setCurrentDir(newDir);
    } catch {
        throw new OperationFailed();
    } 
};

export default up;
