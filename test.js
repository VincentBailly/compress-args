const { compressArgs } = require(".");

const throws = (func) => {
  let threw = false;
  try {
    func();
  } catch {
    threw = true;
  }
  if (!threw) {
    throw new Error("Test failed.");
  }
};

try {
    
  console.log("- compressArgs is a function");
  if (typeof compressArgs !== "function") {
    throw new Error("");
  }

  /**
   * Input validation
   */
  console.log("- It should fail when called without arg.");
  throws(() => compressArgs());

  console.log("- It should fail when called with a number.");
  throws(() => compressArgs(42));

  console.log("- It should fail when called with a boolean.");
  throws(() => compressArgs(true));

  console.log("- It should fail when called with a bigInt.");
  throws(() => compressArgs(42n));

  console.log("- It should fail when called with a string.");
  throws(() => compressArgs("a string"));

  console.log("- It should fail when called with a function.");
  throws(() => compressArgs(compressArgs));

  console.log("- It should fail when called with a symbol.");
  throws(() => compressArgs(new Symbol("foo")));

  console.log("- It should fail when called with a non-array object.");
  throws(() => compressArgs({ an: "object" }));

  console.log("- It should fail when called with an empty array.");
  throws(() => compressArgs([]));

  console.log(
    "- It should fail when called with an array array having something else than strings."
  );
  throws(() => compressArgs(["hello", { world: "!" }]));
} catch {
  console.error("Test failed.");
  process.exit(1);
}
