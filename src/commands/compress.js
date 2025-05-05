import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import getAbsolutePath from '../utils/getAbsolutePath.js';
import { OperationFailed } from '../errors.js';

const compress = async (filePath, destinationPath) => {
    try {
        const absoluteFilePath = getAbsolutePath(filePath);
        const absoluteDestinationPath = getAbsolutePath(destinationPath);

        const compresser = createBrotliCompress();
        const source = createReadStream(absoluteFilePath);
        const destination = createWriteStream(absoluteDestinationPath);
    
        await pipeline(source, compresser, destination);
        console.log(`Compressed ${absoluteFilePath} file into ${absoluteDestinationPath} archive`);
    } catch {
        throw new OperationFailed();
    }

};

export default compress;
