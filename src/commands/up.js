const { getCurrentDirectory, setCurrentDirectory } = require('../currentDirectory.js');
const { resolve, parse } = require('node:path');

const up = () => {
    let newDirectory = resolve(getCurrentDirectory(), '..');
    if (getCurrentDirectory() === newDirectory) {
        newDirectory = parse(getCurrentDirectory()).root;
    }
    setCurrentDirectory(newDirectory);
};

module.exports = up;
