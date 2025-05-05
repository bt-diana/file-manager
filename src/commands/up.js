const { getCurrentDir, setCurrentDir } = require('../currentDir.js');
const { resolve, parse } = require('node:path');

const up = () => {
    let newDir = resolve(getCurrentDir(), '..');
    if (getCurrentDir() === newDir) {
        newDir = parse(getCurrentDir()).root;
    }
    setCurrentDir(newDir);
};

module.exports = up;
