import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const gqlQuery = ghId => {
  return gql`
    {
      repositoryByGhId(ghId: ${ghId}) {
        ghId
        name
        description
        isPrivate
        updatedAt
        issues {
          number
          title
          state
        }
      }
    }
  `;
};

function Issue({ title, number, state }) {
  return (
    <div className="c-issue">
      <div className={`c-issue-icon c-issue-icon--${state}`} />
      <div>#{number}</div>
      <div>{title}</div>
    </div>
  );
}

function Repository({ ghId }) {
  return (
    <Query query={gqlQuery(ghId)}>
      {({ data, error, loading }) => {
        if (error) {
          console.error("There is an gql error ", error);
        }

        if (loading) {
          return <div>Loading...</div>;
        }

        const { name, description, isPrivate, updatedAt, issues } = data.repositoryByGhId;

        return (
          <div className="c-repository">
            <h1>Repository {ghId}</h1>
            <div className="c-repository__row">
              <strong>Name: </strong>
              {name}
            </div>
            <div className="c-repository__row">
              <strong>Description: </strong>
              {description}
            </div>
            <div className="c-repository__row">
              <strong>Visibility: </strong>
              {isPrivate ? "Private" : "Public"}
            </div>
            <div className="c-repository__row">
              <strong>Last modified: </strong>
              {updatedAt.toLocaleDateString()}{" "}
            </div>
            <div className="c-repository__row">
              <strong>Issues: </strong>
              <ul>
                {issues.map(issue => (
                  <li key={issue.number}>
                    <Issue {...issue} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default Repository;
