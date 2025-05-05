const { homedir } = require('node:os');

let currentDir = homedir();
const getCurrentDir = () => currentDir;
const setCurrentDir = (value) => {
    currentDir = value;
}
const getCurrentDirMessage = () => `You are currently in ${currentDir}`;

module.exports = {
    getCurrentDir,
    setCurrentDir,
    getCurrentDirMessage
};
