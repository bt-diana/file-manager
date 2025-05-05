const { createInterface } = require('node:readline/promises');
const { USERNAME } = require('./constants.js');
const { currentDirectory } = require('./variables.js');

const main = () => {
    const rl = createInterface(process.stdin, process.stdout);

    console.log(`Welcome to the File Manager, ${USERNAME}!`);
    console.log(`You are currently in ${currentDirectory}`);
    console.log('Please, enter your command:');

    rl.on('line', (input) => {
        if (input === 'exit' || input === '.exit') {
            rl.emit('SIGINT');
        } else {
            rl.pause();
            // TO-DO: process command
            rl.resume();
        }
    });

    rl.on('resume', () => {
        console.log(`You are currently in ${currentDirectory}`);
        console.log('Please, enter your command:');
    }); 

    rl.on('SIGINT', () => {
        console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
        rl.close();
    });
};

main();
