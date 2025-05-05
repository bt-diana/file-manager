import { createInterface } from 'node:readline/promises';
import { HELLO_MESSAGE, FARAWELL_MESSAGE, PRINT_COMMAND_MESSAGE } from './constants.js';
import { getCurrentDirMessage } from './currentDir.js';
import runCommand from './runCommand.js';
import { OperationFailed } from './errors.js';
import { ReadStream, WriteStream } from 'node:fs';

const main = () => {
    const rl = createInterface(process.stdin, process.stdout);

    console.log(HELLO_MESSAGE);
    console.log(getCurrentDirMessage());
    console.log(PRINT_COMMAND_MESSAGE);

    rl.on('line', async (input) => {
        rl.pause();
        if (input === '.exit') {
            rl.emit('SIGINT');
        } else {
            try {
                const [command, ...options] = input.split(' ');
                const result = await runCommand(command, options);
                const readable = result?.readable;
                const writable = result?.writable;
                const processReadable = readable instanceof ReadStream;
                const processWritable = writable instanceof WriteStream;
                const resume = !processReadable && !processWritable;

                if (resume) {
                    rl.resume();
                }

                if (processReadable) {
                    readable.on('end', () => {
                        rl.resume();
                    });

                    readable.on('error', () => {
                        rl.resume();
                    });
                } 
                
                if (processWritable) {
                    writable.on('end', () => {
                        rl.resume();
                    });

                    writable.on('error', () => {
                        rl.resume();
                    });
                }
                
            } catch (e) {
                console.error(e.message);
                rl.resume();
            }
        }
    });

    rl.on('resume', () => {
        console.log('');
        console.log(getCurrentDirMessage());
        console.log(PRINT_COMMAND_MESSAGE);
    }); 

    rl.on('SIGINT', () => {
        console.log(FARAWELL_MESSAGE);
        rl.close();
    });
};

main();
