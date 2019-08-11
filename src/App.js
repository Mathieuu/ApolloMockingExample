import React from "react";
import "./App.css";
import Repository from "./Repository";
import ApolloMockingProvider from "./mocking/ApolloMockingProvider";

function App() {
  return (
    <div className="App">
      <ApolloMockingProvider customResolvers={{}}>
        <Repository ghId={111} />
      </ApolloMockingProvider>
    </div>
  );
}

export default App;
