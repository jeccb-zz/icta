import { configureChannel } from '../channel';
import Notifications from 'react-notification-system-redux';
import { I18n } from 'react-redux-i18n';

let socket = configureChannel();
let channel = socket.channel('icta', {});

export const SHOW_IDEAS_REQUEST = 'SHOW_IDEAS_REQUEST';
export const SHOW_IDEAS_SUCCESS = 'SHOW_IDEAS_SUCCESS';
export const SHOW_IDEAS_FAILURE = 'SHOW_IDEAS_FAILURE';

export const ADD_IDEA_REQUEST = 'ADD_IDEA_REQUEST';
export const ADD_IDEA_SUCCESS = 'ADD_IDEA_SUCCESS';
export const ADD_IDEA_FAILURE = 'ADD_IDEA_FAILURE';

export const EDIT_IDEA_REQUEST = 'EDIT_IDEA_REQUEST';
export const EDIT_IDEA_SUCCESS = 'EDIT_IDEA_SUCCESS';
export const EDIT_IDEA_FAILURE = 'EDIT_IDEA_FAILURE';

export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const FETCH_IDEA_SUCCESS = 'FETCH_IDEA_SUCCESS';
export const FETCH_IDEA_REQUEST = 'FETCH_IDEA_REQUEST';
export const FETCH_IDEA_FAILURE = 'FETCH_IDEA_FAILURE';

export const DELETE_IDEA_SUCCESS = 'DELETE_IDEA_SUCCESS';
export const DELETE_IDEA_REQUEST = 'DELETE_IDEA_REQUEST';
export const DELETE_IDEA_FAILURE = 'DELETE_IDEA_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const NEW_IDEA_RECEIVED = 'NEW_IDEA_RECEIVED';
export const EDIT_IDEA_RECEIVED = 'EDIT_IDEA_RECEIVED';
export const CHANGE_MY_VOTE = 'CHANGE_MY_VOTE';
export const CHANGE_FILTER_TEXT = 'CHANGE_FILTER_TEXT';

export const ALL_USERS_RECEIVED = 'ALL_USERS_RECEIVED';

const userInfoRequest = () => ({ type: USER_INFO_REQUEST });
const userInfoSuccess = (user) => ({ type: USER_INFO_SUCCESS, user });
const userInfoFailure = (error) => ({ type: USER_INFO_FAILURE, error });

const voteRequest = () => ({ type: VOTE_REQUEST });
const voteSuccess = (idea) => ({ type: VOTE_SUCCESS, idea });
const voteFailure = (error) => ({ type: VOTE_FAILURE, error });

const showIdeasRequest = () => ({ type: SHOW_IDEAS_REQUEST });
const showIdeasSuccess = ideas => ({ type: SHOW_IDEAS_SUCCESS, ideas });
const showIdeasFailure = error => ({ type: SHOW_IDEAS_FAILURE, ideas });

const addIdeaRequest = title => ({ type: ADD_IDEA_REQUEST, title, body });
const addIdeaSuccess = idea => ({ type: ADD_IDEA_SUCCESS });
const addIdeaFailure = (title, error) => ({ type: ADD_IDEA_FAILURE, title, error });

const editIdeaRequest = () => ({ type: EDIT_IDEA_REQUEST });
const editIdeaSuccess = () => ({ type: EDIT_IDEA_SUCCESS });
const editIdeaFailure = (error) => ({ type: EDIT_IDEA_FAILURE, error });

const fetchIdeaRequest = () => ({ type: FETCH_IDEA_REQUEST });
const fetchIdeaSuccess = (idea) => ({ type: FETCH_IDEA_SUCCESS, idea });
const fetchIdeaFailure = (error) => ({ type: FETCH_IDEA_FAILURE, error });

const addCommentRequest = () => ({ type: ADD_COMMENT_REQUEST });
const addCommentSuccess = () => ({ type: ADD_COMMENT_SUCCESS });
const addCommentFailure = (error) => ({ type: ADD_COMMENT_FAILURE, error });

const deleteIdeaRequest = () => ({ type: DELETE_IDEA_REQUEST });
const deleteIdeaSuccess = (ideaId) => ({ type: DELETE_IDEA_SUCCESS, ideaId });
const deleteIdeaFailure = (error) => ({ type: DELETE_IDEA_FAILURE, error });

const newIdeaReceived = idea => ({ type: NEW_IDEA_RECEIVED, idea });
const editIdeaReceived = idea => ({ type: EDIT_IDEA_RECEIVED, idea });

const changeMyVote = (ideaId, myVote) => ({ type: CHANGE_MY_VOTE, ideaId, myVote });

const allUsersReceived = (users) => ({ type: ALL_USERS_RECEIVED, users });

export const changeFilterText = (filter) => ({ type: CHANGE_FILTER_TEXT, filter });

export const getAllUsers = () => (
  dispatch => {
    channel.push('user:get_all', {})
      .receive('ok', response => {
        dispatch(allUsersReceived(response.users));
      })
  }
);

export const getUser = () => (
  dispatch => {
    dispatch(userInfoRequest());

    channel.push('user:get', {})
      .receive('ok', response => {
        dispatch(userInfoSuccess(response.user));
      })
      .receive('error', error => {
        dispatch(userInfoFailure(error));
      });
  }
);

export const deleteIdea = (ideaId) => (
  dispatch => {
    dispatch(deleteIdeaRequest());

    const payload = { idea_id: ideaId };

    channel.push('idea:delete', payload)
      .receive('ok', response => {
        dispatch(deleteIdeaSuccess(ideaId));
      })
      .receive('error', error => {
        dispatch(deleteIdeaFailure(error));
      });
  }
);

export const vote = (ideaId, vote) => (
  dispatch => {
    dispatch(voteRequest());

    const payload = { idea_id: ideaId, vote }

    channel.push('vote:new', payload)
      .receive('ok', response => {
        dispatch(changeMyVote(ideaId, vote));
      })
      .receive('error', error => {
        dispatch(addIdeaFailure(title, error));
      });
  }
);

export const addComment = (ideaId, body) => (
  dispatch => {
    dispatch(addCommentRequest());

    const payload = { idea_id: ideaId, body: body };

    channel.push('idea:comment:new', payload)
      .receive('ok', response => {
        dispatch(addCommentSuccess());
        dispatch(fetchIdea(ideaId));
      })
      .receive('error', error => {
        dispatch(addCommentFailure(error));
      })
  }
);

export const fetchIdea = (ideaId) => (
  dispatch => {
    dispatch(fetchIdeaRequest());

    const payload = { idea_id: ideaId }

    channel.push('idea:get', payload)
      .receive('ok', response => {

        const comments = [ ...response.comments ]
        const idea = { ...response.idea, comments };
        dispatch(fetchIdeaSuccess(idea));
      })
      .receive('error', error => {
        dispatch(fetchIdeaFailure(error));
      });
  }
);

export const showIdeas = () => (
  dispatch => {
    dispatch(showIdeasRequest());

    channel.join()
      .receive('ok', messages => {
        console.log("Channel joined!")
      })
      .receive('error', reason => {
        console.error("Channel not joined :(", reason)
      });

    channel.push('idea:get_all', null)
      .receive('ok', messages => {
        dispatch(showIdeasSuccess(messages.ideas));
      })
      .receive('error', reason => {
        dispatch(showIdeasFailure(reason));
      });

    channel.on('idea:new', msg => {
      dispatch(newIdeaReceived(msg));
    });

    channel.on('idea:edit', msg => {
      dispatch(editIdeaReceived(msg));
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
        console.log("dispatching success");
        dispatch(Notifications.success({
          title: I18n.t('notifications.new_idea_success.title'),
          message: I18n.t('notifications.new_idea_success.message'),
        }));

        history.push('/');
      })
      .receive('error', error => {
        dispatch(addIdeaFailure(title, error));
      });
  }
);

export const editIdea = (ideaId, attributes, history) => (
  dispatch => {
    dispatch(editIdeaRequest());

    const payload = { idea_id: ideaId, attributes }

    channel.push('idea:edit', payload)
      .receive('ok', response => {
        dispatch(editIdeaSuccess());

        dispatch(Notifications.success({
          title: I18n.t('notifications.edit_idea_success.title'),
          message: I18n.t('notifications.edit_idea_success.message'),
        }));

        history.push(`/ideas/show/${ideaId}`);
      })

      .receive('error', error => {
        dispatch(editIdeaFailure(error));
      });
  }
);
