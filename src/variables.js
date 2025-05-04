const { homedir } = require('node:os');

let currentDirectory = homedir();

module.exports = {
    currentDirectory
};
