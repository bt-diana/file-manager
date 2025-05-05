const { getCurrentDir, setCurrentDir } = require('../currentDir.js');
const { OperationFailed } = require('../errors.js');
const { resolve, parse } = require('node:path');

const up = () => {
    try {
        let newDir = resolve(getCurrentDir(), '..');
        setCurrentDir(newDir);
    } catch {
        throw new OperationFailed();
    } 
};

module.exports = up;
