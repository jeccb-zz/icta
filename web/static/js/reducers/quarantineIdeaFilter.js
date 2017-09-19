import { CHANGE_QUARANTINE_FILTER_TEXT, CHANGE_QUARANTINE_FILTER_STATUS } from '../actions/ideas';

const quarantineIdeaFilter = (state = { text: '', status: ['under_review'] }, action) => {
  switch (action.type) {
    case CHANGE_QUARANTINE_FILTER_TEXT:
      return { ...state, text: action.filter };
    case CHANGE_QUARANTINE_FILTER_STATUS:
      if (state.status.includes(action.status)) {
        const idx = state.status.indexOf(action.status);
        const statuses = state.status.slice(0, idx).concat(state.status.slice(idx + 1));
        return { ...state, status: statuses };
      }
      return { ...state, status: [...state.status, action.status] };
    default:
      return state;
  }
};

export default quarantineIdeaFilter;
