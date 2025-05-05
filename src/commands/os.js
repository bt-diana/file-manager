import { homedir, EOL, cpus, userInfo } from 'node:os';
import { InvalidInput } from '../errors.js';

const os = (option) => {
    switch (option) {
        case '--EOL':
            console.log(JSON.stringify(EOL));
            break;
        case '--cpus':
            const cpuInfo = cpus();

            console.log(`Overall amount of CPUS: ${cpuInfo.length}`);
            cpuInfo.forEach((cpu, index) => {
                const { model, speed } = cpu;
                const clockGHz = (speed / 1000).toFixed(2);
                console.log(`CPU ${index + 1}:`);
                console.log(`Model: ${model}`);
                console.log(`Clock Speed: ${clockGHz} GHz\n`);
            });
            break;
        case '--homedir':
            console.log(homedir());
            break;
        case '--username':
            console.log(userInfo().username);
            break;
        case '--architecture':
            console.log(process.arch);
            break;
        default:
            throw new InvalidInput();
    }
};

export default os;
