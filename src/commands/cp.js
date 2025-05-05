import { OperationFailed } from '../errors.js';
import getAbsoluteFilePath from '../utils/getAbsoluteFilePath.js';
import { basename, dirname } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';

const cp = async (filePath, dirPath) => {
    let absoluteFilePath;
    let absoluteNewFilePath;
    let stats;

    try {
        absoluteFilePath = getAbsoluteFilePath(filePath);
        absoluteNewFilePath = getAbsoluteFilePath(dirPath, basename(absoluteFilePath));
    } catch {
        console.log(1)
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
        throw new OperationFailed();
    }

    try {
        const readStream = createReadStream(absoluteFilePath);
        const writeStream = createWriteStream(absoluteNewFilePath);

        writeStream.on('error', () => {
            console.error(new OperationFailed().message);
        });
        readStream.on('error', () => {
            console.error(new OperationFailed().message);
        }); 
        readStream.on('end', () => {
            console.log(`Copied ${absoluteFilePath} file to ${dirname(absoluteNewFilePath)}`);
        }); 
        readStream.pipe(writeStream);
        return { readable: readStream, writable: writeStream };
    } catch {
        throw new OperationFailed();
    }
};

export default cp;
