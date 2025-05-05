const USERNAME = process.env.npm_config_username ?? 'Anonymous';
const HELLO_MESSAGE = `Welcome to the File Manager, ${USERNAME}!`;
const FARAWELL_MESSAGE = `Thank you for using File Manager, ${USERNAME}, goodbye!`;
const PRINT_COMMAND_MESSAGE = 'Please, enter your command:';

export {
    USERNAME,
    HELLO_MESSAGE,
    FARAWELL_MESSAGE,
    PRINT_COMMAND_MESSAGE
};
