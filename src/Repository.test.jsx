import React from "react";
import Repository, { gqlQuery } from "./Repository";
import Repository2, { gqlQuery2 } from "./Repository2";
import { getMockedClient, render } from "./mocking/ApolloMockingProvider";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const zenhubRepo = {
  Repository: () => ({
    name: "ZenHubHQ"
  })
};

const threeIssues = {
  Repository: () => ({
    issues: [
      { number: 1, title: "Issue 1" },
      { number: 2, title: "Issue 2" },
      { number: 3, title: "Issue 3" }
    ]
  })
};

describe("<Repository />", () => {
  test("renders repository name", async () => {
    const { findByText } = render(<Repository ghId={1} />, zenhubRepo);

    await findByText("ZenHubHQ");
  });

  test("renders a list of issues", async () => {
    const { findByText } = render(<Repository ghId={1} />, threeIssues);

    await findByText("Issue 1");
  });

  test("renders a list of issues 2", async () => {
    const { findByText } = render(<Repository ghId={1} />, threeIssues);

    await findByText("Issue 1");
  });

  test("renders with react testing", async () => {
    console.log("--------BEGIN  testing---------");
    console.time("total test time");
    console.time("client");
    const client = getMockedClient(threeIssues);
    console.timeEnd("client");

    console.time("executeQuery");
    const { data } = await client.query({ query: gqlQuery2(1) });
    console.timeEnd("executeQuery");

    console.time("renderDom");
    const { findByText } = render(<Repository2 data={data} />, threeIssues);

    await findByText("Issue 1");
    console.timeEnd("renderDom");
    console.timeEnd("total test time");
    console.log("--------END react dom testing start---------");
  });

  test("renders with react testing 2", async () => {
    console.log("--------BEGIN  testing---------");
    console.time("total test time");
    console.time("client");
    const client = getMockedClient(threeIssues);
    console.timeEnd("client");

    console.time("executeQuery");
    const { data } = await client.query({ query: gqlQuery2(1) });
    console.timeEnd("executeQuery");

    console.time("renderDom");
    const { findByText } = render(<Repository2 data={data} />, threeIssues);

    await findByText("Issue 1");
    console.timeEnd("renderDom");
    console.timeEnd("total test time");
    console.log("--------END react dom testing start---------");
  });

  test("renders with enzyme", async () => {
    console.log("--------BEGIN enzyme testing---------");
    console.time("total test time");
    console.time("client");
    const client = getMockedClient(threeIssues);
    console.timeEnd("client");

    console.time("executeQuery");
    const { data } = await client.query({ query: gqlQuery2(1) });
    console.timeEnd("executeQuery");

    console.time("renderDom");
    const wrap = Enzyme.mount(<Repository2 data={data} />, threeIssues);

    expect(wrap.containsMatchingElement(<div>Issue 1</div>)).toBeTruthy();
    console.timeEnd("renderDom");
    console.timeEnd("total test time");
    console.log("--------END enzyme testing start---------");
  });

  test("renders with enzyme 2", async () => {
    console.log("--------BEGIN enzyme testing---------");
    console.time("total test time");
    console.time("client");
    const client = getMockedClient(threeIssues);
    console.timeEnd("client");

    console.time("executeQuery");
    const { data } = await client.query({ query: gqlQuery2(1) });
    console.timeEnd("executeQuery");

    console.time("renderDom");
    const wrap = Enzyme.mount(<Repository2 data={data} />, threeIssues);

    expect(wrap.containsMatchingElement(<div>Issue 1</div>)).toBeTruthy();
    console.timeEnd("renderDom");
    console.timeEnd("total test time");
    console.log("--------END enzyme testing start---------");
  });
});
