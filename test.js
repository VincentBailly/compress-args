const { compressArgs } = require(".");

const throws = (func, message) => {
    let threw = false;
    try {
        func();
    } catch {
        threw = true;
    }
    if (!threw) {
        throw new Error(message);
    }
}

// Throws if args are empty
throws(() => compressArgs(), "It should fail when called without arg");