const { homedir } = require('node:os');

let currentDirectory = homedir();
const getCurrentDirectory = () => currentDirectory;
const setCurrentDirectory = (value) => {
    currentDirectory = value;
}
const getCurrentDirectoryMessage = () => `You are currently in ${currentDirectory}`;

module.exports = {
    getCurrentDirectory,
    setCurrentDirectory,
    getCurrentDirectoryMessage
};
