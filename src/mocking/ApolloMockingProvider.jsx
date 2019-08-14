import React from "react";
import PropTypes from "prop-types";
import * as ReactTestingLibrary from "@testing-library/react";

import { loader } from "graphql.macro";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { SchemaLink } from "apollo-link-schema";

import generalMocks from "./generalMocks";
import mergeResolvers from "./mergeResolvers";

const ApplicationSchema = loader("./schema.graphql");

// For queries with no variables
const schema = makeExecutableSchema({ typeDefs: ApplicationSchema });

const ApolloMockingProvider = ({ children, customResolvers }) => {
  const mocks = mergeResolvers([generalMocks, customResolvers]);

  addMockFunctionsToSchema({ schema, mocks });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const getMockedClient = resolvers => {
  const mocks = mergeResolvers([generalMocks, resolvers]);

  addMockFunctionsToSchema({ schema, mocks });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  return client;
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
