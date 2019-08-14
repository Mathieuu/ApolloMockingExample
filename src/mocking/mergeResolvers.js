/* Simplified version of https://raw.githubusercontent.com/ardatan/graphql-toolkit/master/src/epoxy/resolvers-mergers/merge-resolvers.ts, the package doesn't work with webpack (missing fs) */

import * as deepMerge from "deepmerge";
import { GraphQLScalarType } from "graphql";

const isMergeableObject = target => {
  if (!target) {
    return false;
  }
  if (typeof target !== "object") {
    return false;
  }
  const stringValue = Object.prototype.toString.call(target);
  if (stringValue === "[object RegExp]") {
    return false;
  }
  if (stringValue === "[object Date]") {
    return false;
  }
  if (target instanceof GraphQLScalarType) {
    return false;
  }
  return true;
};

// IMPORTANT: When converting object to function, always return a copy of the resolver instead of the resolver:
// mergeObjects mutates the resolver which would result in strange behaviours

// (addMockFunctionsToSchema -> mergeMocks -> mergeObjects)
function convertObjectTypesToFunctions(resolvers) {
  return Object.keys(resolvers).reduce((acc, key) => {
    if (typeof resolvers[key] === "function") {
      acc[key] = resolvers[key];
      return acc;
    } else if (typeof resolvers[key] === "object") {
      acc[key] = () => ({ ...resolvers[key] }); // See top function comment
      return acc;
    } else {
      throw new Error("Mock entry must be object or function");
    }
  }, {});
}

// TODO PR Explain the magic
function mergeResolvers(resolversDefinitions) {
  if (!resolversDefinitions || resolversDefinitions.length === 0) {
    return {};
  }
  if (resolversDefinitions.length === 1) {
    return resolversDefinitions[0];
  }
  const resolvers = deepMerge.all(resolversDefinitions, { isMergeableObject });

  return convertObjectTypesToFunctions(resolvers);
}

export default mergeResolvers;
