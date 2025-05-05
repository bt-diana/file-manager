import { createInterface } from 'node:readline/promises';
import { HELLO_MESSAGE, FARAWELL_MESSAGE, PRINT_COMMAND_MESSAGE } from './constants.js';
import { getCurrentDirMessage } from './currentDir.js';
import runCommand from './runCommand.js';
import { InvalidInput, OperationFailed } from './errors.js';
import { ReadStream } from 'node:fs';

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

                if (result instanceof ReadStream) {
                    result.on('end', () => {
                        console.log('');
                        rl.resume();
                    });

                    result.on('error', e => {
                        if (e.code === 'ENOENT') {
                            console.error(new InvalidInput().message);
                        } else {
                            console.error(new OperationFailed().message);
                        }
                        rl.resume();
                    }); 
                } else {
                    rl.resume();
                }
            } catch (e) {
                console.error(e.message);
                rl.resume();
            }
        }
    });

    rl.on('resume', () => {
        console.log(getCurrentDirMessage());
        console.log(PRINT_COMMAND_MESSAGE);
    }); 

    rl.on('SIGINT', () => {
        console.log(FARAWELL_MESSAGE);
        rl.close();
    });
};

main();
