const { getCurrentDir, setCurrentDir } = require('../currentDir.js');
const { InvalidInput, OperationFailed } = require('../errors.js');
const { stat } = require('node:fs/promises');
const { resolve, isAbsolute } = require('node:path');

const cd = async (path) => {
    try {
        const newCurrentDir = isAbsolute(path) ? path : resolve(getCurrentDir(), path);
        if ((await stat(newCurrentDir)).isDirectory()) {
            setCurrentDir(newCurrentDir);
        } else {
            throw new InvalidInput();
        }
    } catch(e) {
        if (e.code === 'ENOENT' || e instanceof InvalidInput) {
            throw new InvalidInput();
        }

        throw new OperationFailed();
    }
};

module.exports = cd;
