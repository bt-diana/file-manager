const up = require('./commands/up.js');

const runCommand = (command, options) => {
    switch (command) {
        case 'up':
            return up();
    }
};

module.exports = runCommand;