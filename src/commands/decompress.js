import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import getAbsolutePath from '../utils/getAbsolutePath.js';
import { OperationFailed } from '../errors.js';

const decompress = async (filePath, destinationPath) => {
    try {
        const absoluteFilePath = getAbsolutePath(filePath);
        const absoluteDestinationPath = getAbsolutePath(destinationPath);

        const compresser = createBrotliDecompress();
        const source = createReadStream(absoluteFilePath);
        const destination = createWriteStream(absoluteDestinationPath);
    
        await pipeline(source, compresser, destination);
        console.log(`Decompressed ${absoluteFilePath} archive into ${absoluteDestinationPath} file`);
    } catch {
        throw new OperationFailed();
    }

};

export default decompress;
