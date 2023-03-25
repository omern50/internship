import React, { useState } from "react";

const companies = [
  {
    name: "Acme Inc",
    country: "Canada",
  },
  {
    name: "Wayne Corp",
    country: "Bahrain",
    subsidiaries: ["Cave Enterprises", "Bats Unlimited"],
  },
  {
    name: "Cave Enterprises",
    country: "Austria",
  },
  {
    name: "Bats Unlimited",
    country: "Japan",
    subsidiaries: ["Globex Corp"],
  },
  {
    name: "Globex Corp",
    country: "Kuwait",
    subsidiaries: ["lol xd"],
  },
  {
    name: "lol xd",
    country: "Japan",
    subsidiaries: ["Acme Inc"],
  },
];

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <li>
      <span onClick={toggleExpanded} className="caret">
        {node.name} ({node.country})
        {node.subsidiaries && (
          <button>{expanded ? "-" : ">"}</button>
        )}
      </span>
      {node.subsidiaries && expanded && (
        <ul className="nested">
          {node.subsidiaries.map((sub) => (
            <TreeNode key={sub} node={companies.find((c) => c.name === sub)} />
          ))}
        </ul>
      )}
    </li>
  );
};

const CountryNode = ({ country }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <li>
      <span onClick={toggleExpanded} className="caret">
        {country} <button>{expanded ? "-" : ">"}</button>
      </span>
      {expanded && (
        <ul className="nested">
          {companies
            .filter((c) => c.country === country)
            .map((company) => (
              <TreeNode key={company.name} node={company} />
            ))}
        </ul>
      )}
    </li>
  );
};

const CompanyTreeView = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <span onClick={toggleExpanded} className="caret">
        Countries <button>{expanded ? "-" : ">"}</button>
      </span>
      {expanded && (
        <ul className="nested">
          {[...new Set(companies.map((c) => c.country))].map((country) => (
            <CountryNode key={country} country={country} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyTreeView;
