import {
  ELASTICSEARCH_INDEXES,
  // ELASTICSEARCH_INDEX_DEFINITION,
} from '../constants';

export function getIndexes(host) {
  const path = `${host}/_all?pretty`;
  return {
    type: ELASTICSEARCH_INDEXES,
    host,
    request: {
      op: 'get',
      path,
    },
  };
}

// export function getIndexDefinition(host, indexName) {
//   const path = `${host}/indexName`;
//   return {
//     type: ELASTICSEARCH_INDEX_DEFINITION,
//     host,
//     request: {
//       op: 'get',
//       path,
//     },
//   };
// }
