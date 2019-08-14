import React from "react";
import * as R from "ramda";
import Repository, { gqlQuery } from "./Repository";
import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import { getClient } from "./mocking/ApolloMockingProvider";

describe("<Repository alternative mocking/>", () => {
  test("renders repository with official apollo mocked provider", async () => {
    const mocks = [
      {
        request: {
          query: gqlQuery(1)
        },
        result: {
          data: {
            repositoryByGhId: {
              ghId: 1,
              name: "ZenHubHQ",
              description: "hello world",
              isPrivate: true,
              updatedAt: new Date(),

              issues: []
            }
          }
        }
      }
    ];

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Repository ghId={1} />
      </MockedProvider>
    );

    await findByText("ZenHubHQ");
  });

  test("renders repository with official apollo mocked provider but automatically generated data", async () => {
    const preRes = await getClient().query({ query: gqlQuery(1) });

    const result = R.assocPath(["data", "repositoryByGhId", "name"], "ZenHubHQ", preRes);

    const mocks = [
      {
        request: {
          query: gqlQuery(1)
        },
        result
      }
    ];

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Repository ghId={1} />
      </MockedProvider>
    );

    await findByText("ZenHubHQ");
  });
});
