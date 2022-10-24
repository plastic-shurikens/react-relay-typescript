import React, {Suspense, useEffect} from "react";

import { graphql } from "relay-runtime";
import { useLazyLoadQuery, usePreloadedQuery, useQueryLoader } from "react-relay";
import type {CountriesCountriesQuery, CountriesCountriesQuery$data} from './__generated__/CountriesCountriesQuery.graphql';


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
  const data : CountriesCountriesQuery$data = usePreloadedQuery<CountriesCountriesQuery>(CountriesQuery, preloadedQuery);

  return (
    <>
      <ul style={{ padding: 0, listStyle: "none", textIndent: 0, margin: 0 }}>
        {data.continents?.map(c => (
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

  useEffect(()=> {
    loadQuery({variables: {}})
  }, [])

  return (
    <Suspense fallback='loading ....'>
      {queryRef !== null && (
        <Countries preloadedQuery={queryRef} />
      )}
    </Suspense>
  )
 
}
