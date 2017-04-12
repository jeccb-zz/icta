import { configureChannel } from '../channel';

let socket = configureChannel();
let channel = socket.channel('ideas', {});

export const FETCH_IDEAS_REQUEST = 'FETCH_IDEAS_REQUEST';
export const FETCH_IDEAS_SUCCESS = 'FETCH_IDEAS_SUCCESS';
export const FETCH_IDEAS_FAILURE = 'FETCH_IDEAS_FAILURE';
export const ADD_IDEA_REQUEST = 'ADD_IDEA_REQUEST';
export const ADD_IDEA_SUCCESS = 'ADD_IDEA_SUCCESS';
export const ADD_IDEA_FAILURE = 'ADD_IDEA_FAILURE';
export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';
export const SHOW_IDEA_SUCCESS = 'SHOW_IDEA_SUCCESS';
export const SHOW_IDEA_REQUEST = 'SHOW_IDEA_REQUEST';
export const SHOW_IDEA_FAILURE = 'SHOW_IDEA_FAILURE';

const voteRequest = () => ({ type: VOTE_REQUEST });
const voteSuccess = (idea) => ({ type: VOTE_SUCCESS, idea });
const voteFailure = (error) => ({ type: VOTE_FAILURE, error });

const fetchIdeasRequest = () => ({ type: FETCH_IDEAS_REQUEST });
const fetchIdeasSuccess = ideas => ({ type: FETCH_IDEAS_SUCCESS, ideas });
const fetchIdeasFailure = error => ({ type: FETCH_IDEAS_FAILURE, ideas });

const addIdeaRequest = title => ({ type: ADD_IDEA_REQUEST, title, body });
const addIdeaSuccess = idea => ({ type: ADD_IDEA_SUCCESS, idea });
const addIdeaFailure = (title, error) => ({ type: ADD_IDEA_FAILURE, title, error });

const showIdeaRequest = () => ({ type: SHOW_IDEA_REQUEST });
const showIdeaSuccess = (idea) => ({ type: SHOW_IDEA_SUCCESS, idea });
const showIdeaFailure = (error) => ({ type: SHOW_IDEA_FAILURE, error });

export const vote = (ideaId, vote) => (
  dispatch => {
    dispatch(voteRequest());

    const payload = { idea_id: ideaId, vote }

    channel.push('vote:new', payload)
      .receive('ok', response => {
        console.log('created idea', response);
      })
      .receive('error', error => {
        console.error('idea not created: ', error);
        dispatch(addIdeaFailure(title, error));
      });
  }
);

export const showIdea = (ideaId, history) => (
  dispatch => {
    dispatch(showIdeaRequest());

    const payload = { idea_id: ideaId }

    channel.push('idea:get', payload)
      .receive('ok', response => {
        dispatch(showIdeaSuccess(response.idea));
        history.push(`ideas/show/${ideaId}`);
      })
      .receive('error', error => {
        dispatch(showIdeaFailure(error));
      });
  }
);

export const fetchIdeas = () => (
  dispatch => {
    dispatch(fetchIdeasRequest());

    channel.join()
      .receive('ok', messages => {
        console.log("Channel joined!")
      })
      .receive('error', reason => {
        console.error("Channel not joined :(", reason)
      });

    channel.push('idea:get_all', null)
      .receive('ok', messages => {
        dispatch(fetchIdeasSuccess(messages.ideas));
      })
      .receive('error', reason => {
        dispatch(fetchIdeasFailure(reason));
      });

    channel.on('idea:new', msg => {
      dispatch(addIdeaSuccess(msg));
    });

    channel.on('vote:new', msg => {
      dispatch(voteSuccess(msg));
    });
  }
);

export const addIdea = (title, body, history) => (
  dispatch => {
    dispatch(addIdeaRequest(title, body));

    const payload = { title:title, body: body }

    channel.push('idea:new', payload)
      .receive('ok', response => {
        dispatch(addIdeaSuccess(response));
        history.push('/');
      })
      .receive('error', error => {
        dispatch(addIdeaFailure(title, error));
      });
  }
);
