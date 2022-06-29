import React, {Suspense, useEffect} from "react";

import { graphql } from "relay-runtime";
import { useLazyLoadQuery, usePaginationFragment, usePreloadedQuery, useQueryLoader } from "react-relay";

// Define a query
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


//   handling the failure case here.
function Countries({ preloadedQuery }) {
  console.log(preloadedQuery, 'pre')
  const data = usePreloadedQuery(CountriesQuery, preloadedQuery);
  console.log(data, 'd')
  return (
    <>
      <ul style={{ padding: 0, listStyle: "none", textIndent: 0, margin: 0 }}>
        {data.countries?.map(c => (
          <li key={c.name}>
            <p style={{ marginBottom: 0, textDecoration: "underline" }}>
              {c.name}
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
    loadQuery()
  }, [loadQuery])
return (
    <Suspense fallback='loading ....'>
      {queryRef !== null && (
        <Countries preloadedQuery={queryRef} />
      )}
    </Suspense>
  )
 
}

// export default CountriesPreloader;