/* Copy pasted (without typescript) from https://raw.githubusercontent.com/ardatan/graphql-toolkit/master/src/epoxy/resolvers-mergers/merge-resolvers.ts, the package doesn't work with webpack (missing fs) */

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

function mergeResolvers(resolversDefinitions, options) {
  if (!resolversDefinitions || resolversDefinitions.length === 0) {
    return {};
  }
  if (resolversDefinitions.length === 1) {
    return resolversDefinitions[0];
  }
  const resolversFactories = [];
  const resolvers = [];
  for (const resolversDefinition of resolversDefinitions) {
    if (typeof resolversDefinition === "function") {
      resolversFactories.push(resolversDefinition);
    } else if (typeof resolversDefinition === "object") {
      resolvers.push(resolversDefinition);
    }
  }
  let result = {};
  if (resolversFactories.length) {
    result = (...args) => {
      const resultsOfFactories = resolversFactories.map(factory => factory(...args));
      return deepMerge.all([...resolvers, ...resultsOfFactories], { isMergeableObject });
    };
  } else {
    result = deepMerge.all(resolvers, { isMergeableObject });
  }
  if (options && options.exclusions) {
    for (const exclusion of options.exclusions) {
      const [typeName, fieldName] = exclusion.split(".");
      if (!fieldName || fieldName === "*") {
        delete result[typeName];
      } else if (result[typeName]) {
        delete result[typeName][fieldName];
      }
    }
  }
  return result;
}

export default mergeResolvers;
