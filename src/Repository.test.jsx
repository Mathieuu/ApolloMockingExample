import React from "react";
import Repository from "./Repository";
import { render } from "./mocking/ApolloMockingProvider";

const zenhubRepo = {
  Repository: () => ({
    name: 'ZenHubHQ'
  })
};

const threeIssues = {
  Repository: () => ({
    issues: [{ number: 1, title: "Issue 1" }, { number:2, title: "Issue 2" }, { number:3, title: "Issue 3" }]
  }),
};

describe("<Repository />", () => {
  test("renders repository name", async () => {
    const { findByText } = render(<Repository ghId={1} />, zenhubRepo);

    await findByText("ZenHubHQ");
  });

  test("renders a list of issues", async () => {
    const { findByText } = render(<Repository ghId={1} />, threeIssues);

    await findByText("Issue 1");
    await findByText("Issue 2");
    await findByText("Issue 3");
  });
});
