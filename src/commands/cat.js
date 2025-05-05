import { OperationFailed } from '../errors.js';
import { createReadStream } from 'node:fs';
import getAbsolutePath from '../utils/getAbsolutePath.js';

const cat = (path) => {
    try {
        const absolutePath = getAbsolutePath(path);
        const readStream = createReadStream(absolutePath);

        readStream.on('error', () => {
            console.error(new OperationFailed().message);
        }); 
        readStream.on('end', () => {
            console.log('');
        });
        readStream.pipe(process.stdout);
        return { readable: readStream };
    } catch {
        throw new OperationFailed();
    }
};

export default cat;