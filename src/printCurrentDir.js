const { currentDirectory } = require('./variables.js');

const printCurrentDir = () => {
    console.log(`You are currently in ${currentDirectory}`);
};

module.exports = printCurrentDir;
