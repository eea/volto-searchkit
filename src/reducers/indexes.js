import { SET_ELASTICSEARCH_INDEXES } from '../constants';

export default function indexes(state = {}, action) {
  switch (action.type) {
    case SET_ELASTICSEARCH_INDEXES:
      return {
        ...state,
        [action.host]: {
          ...state?.[action.host],
          ...action.result.items,
        },
      };
    default:
      break;
  }
  return state;
}
