import { createInterface } from 'node:readline/promises';
import { HELLO_MESSAGE, FARAWELL_MESSAGE, PRINT_COMMAND_MESSAGE } from './constants.js';
import { getCurrentDirMessage } from './currentDir.js';
import runCommand from './runCommand.js';

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
                await runCommand(command, options);
            } catch (e) {
                console.error(e.message);
            }
            rl.resume();
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
