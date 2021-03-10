const makeTree = (args) => {
  if (args.length === 1) {
    return { content: args[0], children: [] };
  }

  const allArgsSharePrefix = (index) => {
    const prefix = args[0].slice(0, index);
    return args.every((a) => a.slice(0, index) === prefix);
  };

  let prefixIndex = 0;
  while (allArgsSharePrefix(prefixIndex + 1)) {
    prefixIndex += 1;
  }

  // We have found a shared-prefix
  if (prefixIndex !== 0) {
    return {
      content: args[0].slice(0, prefixIndex),
      children: [makeTree(args.map((a) => a.slice(prefixIndex)))],
    };
  }

  // else we group the args by first letter and try again
  const firstLetters = new Set(args.map((a) => a.slice(0, 1)));

  return {
    content: "",
    children: [...firstLetters.values()].map((l) => ({
      content: l,
      children: [
        makeTree(
          args.filter((a) => a.slice(0, 1) === l).map((a) => a.slice(1))
        ),
      ],
    })),
  };
};

const serialize = (tree) => {
    const children = tree.children.map(c => serialize(c));
    const childrenExpression = children.length === 0 ? "": children.length === 1 ?
    children[0] : `{${children.join(",")}}`;
    const result = `${tree.content}${childrenExpression}`;
return result

}

exports.compressArgs = (args) => {
  if (typeof args !== "object") {
    throw new Error(
      `CompressArgs expects one argument of type object but got an arg of type "${typeof args}"`
    );
  }

  if (!Array.isArray(args)) {
    throw new Error(
      "CompressArgs expects an array as argument but got an object which is not an array"
    );
  }

  if (args.length === 0) {
    throw new Error(
      "ComressArgs expects a non-empty array as argument, but was called with one."
    );
  }

  args.forEach((e) => {
    if (typeof e !== "string") {
      throw new Error(
        "CompressArgs expects a string[] as argument, but got an array with other types in it."
      );
    }
  });

  if (args.length === 1) {
    return args[0];
  }

  const tree = makeTree(args);
  const result = serialize(tree);
  return result
};
