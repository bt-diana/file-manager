class InvalidInput extends Error {
    constructor() {
      super('Invalid input');
    }
}

class OperationFailed extends Error {
    constructor() {
      super('Operation failed');
    }
}

export {
    InvalidInput,
    OperationFailed
};
