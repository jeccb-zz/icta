import { CHANGE_FILTER } from '../actions/ideas';

const ideaFilter = (state = { text: '', status: ['new', 'planned', 'in_progress', 'done'] }, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER_TEXT':
      return { ...state, text: action.filter };
    case 'CHANGE_FILTER_STATUS':
      if (state.status.includes(action.status)) {
        const idx = state.status.indexOf(action.status);
        const statuses = state.status.slice(0, idx).concat(state.status.slice(idx + 1));
        return { ...state, status: statuses };
      } else {
        return { ...state, status: [...state.status, action.status] };
      }
    default:
      return state;
  }
}

export default ideaFilter;
