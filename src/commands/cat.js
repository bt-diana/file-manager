import { getCurrentDir } from '../currentDir.js';
import { InvalidInput, OperationFailed } from '../errors.js';
import { createReadStream } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';

const cat = (path) => {
    try {
        const absolutePath = isAbsolute(path) ? path : resolve(getCurrentDir(), path);
        const readStream = createReadStream(absolutePath);

        readStream.pipe(process.stdout);
        return readStream;
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new InvalidInput();
        }
        throw new OperationFailed();
    }
};

export default cat;