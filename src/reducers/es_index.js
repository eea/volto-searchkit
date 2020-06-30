import { ELASTICSEARCH_INDEX_DEFINITION } from '../constants';

export default function es_server(state = {}, action) {
  switch (action.type) {
    case `${ELASTICSEARCH_INDEX_DEFINITION}_PENDING`:
      return {
        ...state,
        [action.host]: {
          ...state[action.host],
          indexes: {
            ...state[action.host]?.[action.indexName],
            [action.indexName]: {
              definition: null,
              loading: true,
              loaded: false,
              error: null,
            },
          },
        },
      };
    case `${ELASTICSEARCH_INDEX_DEFINITION}_SUCCESS`:
      const { result = {} } = action;
      console.log('result', result);
      // let indexes = [];
      // for (let k in result) {
      //   indexes.push(k);
      //   const sub = result[k];
      //   const { aliases = {} } = sub;
      //   indexes = indexes.concat(Object.keys(aliases));
      // }
      return {
        ...state,
        indexes: {
          ...state[action.host]?.[action.indexName],
          [action.indexName]: {
            definition: result,
            loading: false,
            loaded: true,
            error: null,
          },
        },
      };
    case `${ELASTICSEARCH_INDEX_DEFINITION}_FAIL`:
      return {
        ...state,
        [action.host]: {
          ...state[action.host],
          indexes: {
            ...state[action.host]?.[action.indexName],
            [action.indexName]: {
              definition: null,
              loading: false,
              loaded: false,
              error: action.error,
            },
          },
        },
      };
    default:
      break;
  }
  return state;
}
