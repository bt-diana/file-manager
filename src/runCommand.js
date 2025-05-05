import { InvalidInput } from './errors.js';
import up from './commands/up.js';
import cd from './commands/cd.js';
import ls from './commands/ls.js';
import cat from './commands/cat.js';
import add from './commands/add.js';
import mkdir from './commands/mkdir.js';
import rn from './commands/rn.js';
import cp from './commands/cp.js';
import mv from './commands/mv.js';
import rm from './commands/rm.js';
import hash from './commands/hash.js';

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

    if (command === 'cat' && options.length === 1) {
        return cat(options[0]);
    }

    if (command === 'add' && options.length === 1) {
        return add(options[0]);
    }

    if (command === 'mkdir' && options.length === 1) {
        return mkdir(options[0]);
    }

    if (command === 'rn' && options.length === 2) {
        return rn(options[0], options[1]);
    }

    if (command === 'cp' && options.length === 2) {
        return cp(options[0], options[1]);
    }

    if (command === 'mv' && options.length === 2) {
        return mv(options[0], options[1]);
    }

    if (command === 'rm' && options.length === 1) {
        return rm(options[0]);
    }

    if (command === 'hash' && options.length === 1) {
        return hash(options[0]);
    }

    throw new InvalidInput();
};

export default runCommand;
