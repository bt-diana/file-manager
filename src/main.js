const { USERNAME } = require('./constants.js');
const { currentDirectory } = require('./variables.js');

const main = () => {
    console.log(`Welcome to the File Manager, ${USERNAME}!`);
    console.log(`You are currently in ${currentDirectory}`);
    console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
};

main();
