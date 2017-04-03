import { configureChannel } from '../channel';

let socket = configureChannel();
let channel = socket.channel('ideas', {});

export const FETCH_IDEAS_REQUEST = 'FETCH_IDEAS_REQUEST';
export const FETCH_IDEAS_SUCCESS = 'FETCH_IDEAS_SUCCESS';
export const FETCH_IDEAS_FAILURE = 'FETCH_IDEAS_FAILURE';
export const ADD_IDEA_REQUEST = 'ADD_IDEA_REQUEST';
export const ADD_IDEA_SUCCESS = 'ADD_IDEA_SUCCESS';
export const ADD_IDEA_FAILURE = 'ADD_IDEA_FAILURE';

const fetchIdeasRequest = () => ({ type: FETCH_IDEAS_REQUEST });
const fetchIdeasSuccess = ideas => ({ type: FETCH_IDEAS_SUCCESS, ideas });
const fetchIdeasFailure = error => ({ type: FETCH_IDEAS_FAILURE, ideas });

const addIdeaRequest = title => ({ type: ADD_IDEA_REQUEST, title });
const addIdeaSuccess = idea => ({ type: ADD_IDEA_SUCCESS, idea });
const addIdeaFailure = (title, error) => ({ type: ADD_IDEA_FAILURE, title, error });

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
      dispatch(addIdeaSuccess(msg));
    });
  }
);

export const addIdea = (title) => (
  dispatch => {
    dispatch(addIdeaRequest(title));

    const payload = { title, body: 'Shine' }

    channel.push('new:idea', payload)
      .receive('ok', response => {
        console.log('created idea', response);
      })
      .receive('error', error => {
        console.error('idea not created: ', error);
        dispatch(addIdeaFailure(title, error));
      });
  }
);
