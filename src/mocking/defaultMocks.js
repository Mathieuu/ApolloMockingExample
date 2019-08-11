import faker from "faker";

// Random data are bad to debug flaky tests
faker.seed(12345);

let idIncrement = 0;

function getNextId() {
  idIncrement += 1;
  return idIncrement;
}

const formatRepoName = str => {
  return (
    str
      // Replace all weird chars by -
      .replace(/-|,|_|\s/g, "-")
      // Replace a serie of - by a single one
      .replace(/--+/g, "-")
  );
};

const jan2019 = new Date(1546510000000);

const resolvers = {
  ISO8601DateTime: () => jan2019,
  Repository: () => ({
    ghId: getNextId,
    name: formatRepoName(faker.commerce.productName()),
    description: faker.company.catchPhrase()
  }),
  Issue: () => ({
    number: getNextId,
    title: () => faker.hacker.phrase(),
    state: () => (Math.random() > 0.5 ? "open" : "closed")
  })
};

export default resolvers;
