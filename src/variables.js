const { homedir } = require('node:os');

let currentDirectory = homedir();
let currentDirectoryMessage = `You are currently in ${currentDirectory}`;

module.exports = {
    currentDirectory,
    currentDirectoryMessage
};
