import { configureChannel } from './channel';

let socket = configureChannel();
let channel = socket.channel('ideas', {});

export const FETCH_IDEAS_REQUEST = 'FETCH_IDEAS_REQUEST';
export const FETCH_IDEAS_SUCCESS = 'FETCH_IDEAS_SUCCESS';
export const FETCH_IDEAS_FAILURE = 'FETCH_IDEAS_FAILURE';
export const ADD_IDEA_FAILURE = 'ADD_IDEA_FAILURE';

function fetchIdeasRequest() {
  return { type: FETCH_IDEAS_REQUEST };
}

function fetchIdeasSuccess(ideas) {
  return { type: FETCH_IDEAS_SUCCESS, ideas };
}

function fetchIdeasFailure(error) {
  return { type: FETCH_IDEAS_FAILURE, ideas };
}

function addIdeaSuccess(idea) {
  return { type: ADD_IDEA_SUCCESS, idea };
}

export const fetchIdeas = () => (
  dispatch => {
    dispatch(fetchIdeasRequest());

    channel.join()
      .receive('ok', messages => {
        dispatch(fetchIdeasSuccess(messages.ideas));
      })
      .receive('error', reason => {
        dispatch(fetchIdeasFailure(reason));
      });

    channel.on('new:idea', msg => {
      dispatch(addIdeaSuccess(msg.idea));
    });
  }
)
