import { CHANGE_FILTER } from '../actions/ideas';

const filter = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER_TEXT':
      return { text: action.filter };
    default:
      return state;
  }
}

export default filter;
