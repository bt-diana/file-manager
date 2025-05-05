import { getCurrentDir } from '../currentDir.js';
import { OperationFailed } from '../errors.js';
import { createReadStream } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';

const cat = (path) => {
    try {
        const absolutePath = isAbsolute(path) ? path : resolve(getCurrentDir(), path);
        const readStream = createReadStream(absolutePath);

        readStream.on('end', () => {
            console.log('');
        });
        readStream.pipe(process.stdout);
        return readStream;
    } catch {
        throw new OperationFailed();
    }
};

export default cat;