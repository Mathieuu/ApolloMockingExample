import React from "react";
import "./App.css";
import Repository, { gqlQuery } from "./Repository";
import ApolloMockingProvider, { getClient } from "./mocking/ApolloMockingProvider";

function App() {
  // Demo random data generation (maybe disable defaultMocks?)
  // getClient({})
  //   .query({ query: gqlQuery(1) })
  //   .then(res => console.log("Random data", res.data));

  return (
    <div className="App">
      <ApolloMockingProvider customResolvers={{}}>
        <Repository ghId={111} />
      </ApolloMockingProvider>
    </div>
  );
}

export default App;
