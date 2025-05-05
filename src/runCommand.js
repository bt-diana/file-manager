import { InvalidInput } from './errors.js';
import up from './commands/up.js';
import cd from './commands/cd.js';
import ls from './commands/ls.js';

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

export default runCommand;
