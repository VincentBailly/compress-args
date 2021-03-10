exports.compressArgs = (args) => {
    if (typeof args !== "object") {
        throw new Error(`CompressArgs expects one argument of type object but got an arg of type "${typeof args}"`)
    }

    if (!Array.isArray(args)) {
        throw new Error("CompressArgs expects an array as argument but got an object which is not an array");
    }

    if (args.length === 0) {
        throw new Error("ComressArgs expects a non-empty array as argument, but was called with one.")
    }

    args.forEach(e => {
        if (typeof e !== "string") {
            throw new Error("CompressArgs expects a string[] as argument, but got an array with other types in it.")
        }
    })

}