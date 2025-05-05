import { homedir } from 'node:os';

let currentDir = homedir();
const getCurrentDir = () => currentDir;
const setCurrentDir = (value) => {
    currentDir = value;
}
const getCurrentDirMessage = () => `You are currently in ${currentDir}`;

export {
    getCurrentDir,
    setCurrentDir,
    getCurrentDirMessage
};
