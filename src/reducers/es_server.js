import { ELASTICSEARCH_INDEXES } from '../constants';

export default function es_server(state = {}, action) {
  switch (action.type) {
    case `${ELASTICSEARCH_INDEXES}_PENDING`:
      return {
        ...state,
        [action.host]: {
          ...state[action.host],
          items: [],
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${ELASTICSEARCH_INDEXES}_SUCCESS`:
      const { result = {} } = action;
      let indexes = [];
      for (let k in result) {
        indexes.push(k);
        const sub = result[k];
        const { aliases = {} } = sub;
        indexes = indexes.concat(Object.keys(aliases));
      }
      return {
        ...state,
        [action.host]: {
          ...state?.[action.host],
          items: indexes,
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ELASTICSEARCH_INDEXES}_FAIL`:
      return {
        ...state,
        [action.host]: {
          ...state?.[action.host],
          items: [],
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      break;
  }
  return state;
}
