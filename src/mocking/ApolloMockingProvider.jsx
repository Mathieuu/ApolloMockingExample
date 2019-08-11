import React from "react";
import PropTypes from "prop-types";
import * as ReactTestingLibrary from "@testing-library/react";

import { loader } from "graphql.macro";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { SchemaLink } from "apollo-link-schema";

import defaultMocks from "./defaultMocks";
import mergeResolvers from "./mergeResolvers";

const ApplicationSchema = loader("./schema.graphql");

// For queries with no variables
const schema = makeExecutableSchema({ typeDefs: ApplicationSchema });

export const getClient = customResolvers => {
  const mocks = mergeResolvers([defaultMocks, customResolvers]);

  addMockFunctionsToSchema({ schema, mocks });

  return new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });
};

const ApolloMockingProvider = ({ children, customResolvers }) => {
  const client = getClient(customResolvers);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

ApolloMockingProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  customResolvers: PropTypes.shape({})
};

ApolloMockingProvider.defaultProps = {
  customResolvers: null
};

const render = (comp, customResolvers, options) => {
  return ReactTestingLibrary.render(
    <ApolloMockingProvider customResolvers={customResolvers || {}}>
      {comp}
    </ApolloMockingProvider>,
    options
  );
};

export default ApolloMockingProvider;
export { render };
