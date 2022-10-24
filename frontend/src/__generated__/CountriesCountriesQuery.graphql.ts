/**
 * @generated SignedSource<<569545c75603c6ecd0bea368dc90c4f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CountriesCountriesQuery$variables = {};
export type CountriesCountriesQuery$data = {
  readonly continents: ReadonlyArray<{
    readonly code: string | null;
    readonly countries: ReadonlyArray<{
      readonly name: string | null;
    } | null> | null;
    readonly name: string | null;
  } | null> | null;
  readonly countries: ReadonlyArray<{
    readonly languages: ReadonlyArray<{
      readonly name: string | null;
    } | null> | null;
    readonly name: string | null;
  } | null> | null;
};
export type CountriesCountriesQuery = {
  response: CountriesCountriesQuery$data;
  variables: CountriesCountriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Continent",
    "kind": "LinkedField",
    "name": "continents",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "code",
        "storageKey": null
      },
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Country",
        "kind": "LinkedField",
        "name": "countries",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "countries",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Language",
        "kind": "LinkedField",
        "name": "languages",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CountriesCountriesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CountriesCountriesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "797abb5c09e54688d3b4e3c161e96bf1",
    "id": null,
    "metadata": {},
    "name": "CountriesCountriesQuery",
    "operationKind": "query",
    "text": "query CountriesCountriesQuery {\n  continents {\n    code\n    name\n    countries {\n      name\n    }\n  }\n  countries {\n    name\n    languages {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fc5dab9d64fed091645ce7b7e5d4ad15";

export default node;
