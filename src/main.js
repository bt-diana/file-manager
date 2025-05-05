const { createInterface } = require('node:readline/promises');
const { HELLO_MESSAGE, FARAWELL_MESSAGE, PRINT_COMMAND_MESSAGE } = require('./constants.js');
const { getCurrentDirectoryMessage } = require('./currentDirectory.js');
const runCommand = require('./runCommand.js');

const main = () => {
    const rl = createInterface(process.stdin, process.stdout);

    console.log(HELLO_MESSAGE);
    console.log(getCurrentDirectoryMessage());
    console.log(PRINT_COMMAND_MESSAGE);

    rl.on('line', (input) => {
        if (input === 'exit' || input === '.exit') {
            rl.emit('SIGINT');
        } else {
            const [command, ...options] = input.split(' ');
            rl.pause();
            runCommand(command, options);
            rl.resume();
        }
    });

    rl.on('resume', () => {
        console.log(getCurrentDirectoryMessage());
        console.log(PRINT_COMMAND_MESSAGE);
    }); 

    rl.on('SIGINT', () => {
        console.log(FARAWELL_MESSAGE);
        rl.close();
    });
};

main();
