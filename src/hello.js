const { USERNAME } = require('./constants.js');

const hello = () => {
    console.log(`Welcome to the File Manager, ${USERNAME}!`);
};

module.exports = hello;
