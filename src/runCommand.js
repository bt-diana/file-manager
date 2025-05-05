const { InvalidInput } = require('./errors.js');
const up = require('./commands/up.js');
const cd = require('./commands/cd.js');
const ls = require('./commands/ls.js');

const runCommand = async (command, options) => {
    if (command === 'up' && options.length === 0) {
        return up();
    }

    if (command === 'cd' && options.length === 1) {
        return cd(options[0]);
    }

    if (command === 'ls' && options.length === 0) {
        return ls();
    }

    throw new InvalidInput();
};

module.exports = runCommand;