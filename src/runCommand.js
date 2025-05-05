const { InvalidInput } = require('./errors.js');
const up = require('./commands/up.js');

const runCommand = (command, options) => {
    if (command === 'up' && options.length === 0) {
        return up();
    }

    throw new InvalidInput();
};

module.exports = runCommand;