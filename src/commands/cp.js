import { getCurrentDir } from '../currentDir.js';
import { InvalidInput, OperationFailed } from '../errors.js';
import { resolve, isAbsolute, basename, dirname } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';

const cp = async (filePath, dirPath) => {
    let absoluteFilePath;
    let absoluteNewFilePath;
    let stats;

    try {
        absoluteFilePath = isAbsolute(filePath) ? filePath : resolve(getCurrentDir(), filePath);
        absoluteNewFilePath = isAbsolute(dirPath) ? dirPath : resolve(getCurrentDir(), dirPath, basename(absoluteFilePath));
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new InvalidInput();
        }
        throw new OperationFailed();
    }
    
    try {
        stats = await stat(absoluteNewFilePath);
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw new OperationFailed();
        }
    }

    if (stats) {
        throw new InvalidInput();
    }

    try {
        const readStream = createReadStream(absoluteFilePath);
        const writeStream = createWriteStream(absoluteNewFilePath);

        readStream.on('end', () => {
            console.log(`Copied ${absoluteFilePath} file to ${dirname(absoluteNewFilePath)}`);
        });
        readStream.pipe(writeStream);
        return readStream;
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new InvalidInput();
        }
        throw new OperationFailed();
    }
};

export default cp;
