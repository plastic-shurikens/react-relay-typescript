import React, {Suspense, useEffect} from "react";

import { graphql } from "relay-runtime";
import { useLazyLoadQuery, usePreloadedQuery, useQueryLoader } from "react-relay";
import type {CountriesCountriesQuery, CountriesCountriesQuery$data} from './__generated__/CountriesCountriesQuery.graphql';

// import graphql from "babel-plugin-relay/macro"; 

const CountriesQuery = graphql`
  query CountriesCountriesQuery {
    continents {
      code
      name
      countries {
        name
      }
    }
    countries {
      name
      languages {
        name
      }
    }
  }
`;

function Countries({ preloadedQuery }) {
  console.log(preloadedQuery, 'pre')
  const data : CountriesCountriesQuery$data = usePreloadedQuery<CountriesCountriesQuery>(CountriesQuery, preloadedQuery);
  console.log(data, 'd')
  return (
    <>
      <ul style={{ padding: 0, listStyle: "none", textIndent: 0, margin: 0 }}>
        {data.countries?.map(c => (
          <li key={c?.name}>
            <p style={{ marginBottom: 0, textDecoration: "underline" }}>
              {c?.name}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function CountriesPreloader() {
  const [queryRef, loadQuery] = useQueryLoader(CountriesQuery);
  console.log(queryRef, 'q')

  useEffect(()=> {
    loadQuery({variables: {}})
  }, [loadQuery])
  return (
    <Suspense fallback='loading ....'>
      {queryRef !== null && (
        <Countries preloadedQuery={queryRef} />
      )}
    </Suspense>
  )
 
}
