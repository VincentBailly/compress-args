const { compressArgs } = require(".");

const assertEqual = (a1, a2) => {
  if (a1 !== a2) {
      throw new Error("Test failed.");
  }
}

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

  console.log("- It returns the input when only one arg is passed");
  assertEqual(compressArgs(["catfish"]), "catfish");

  console.log("- It correctly compress two unrelated args");
  assertEqual(compressArgs(["cat", "fish"]), "{cat,fish}");

  console.log("- It correctly compress two strings with the same prefix");
  assertEqual(compressArgs(["foo-bar", "foo-baz"]), "foo-ba{r,z}");

  console.log("- It correctly compress two strings with one being a substring of the other");
  assertEqual(compressArgs(["foo-ba", "foo-baz"]), "foo-ba{,z}");

  console.log("- It correctly compress the strings with two being similar and a third being different");
  assertEqual(compressArgs(["foo-bar", "foo-baz", "cat"]), "{foo-ba{r,z},cat}");

} catch (e) {
  throw e
  console.error("Test failed.");
  process.exit(1);
}
