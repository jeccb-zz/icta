import Notifications from 'react-notification-system-redux';
import { I18n } from 'react-redux-i18n';
import { configureSocket, joinChannel } from '../channel';

let socket = configureSocket();
let userChannel = joinChannel(socket, 'user');

export const ALL_USERS_RECEIVED = 'ALL_USERS_RECEIVED';
export const CHANGE_FILTER_TEXT = 'CHANGE_USER_FILTER_TEXT';
export const USER_UPDATE_RECEIVED = 'USER_UPDATE_RECEIVED';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

const allUsersReceived = (users) => ({ type: ALL_USERS_RECEIVED, users });
const userUpdateReceived = (user) => ({ type: USER_UPDATE_RECEIVED, user });

const userInfoRequest = () => ({ type: USER_INFO_REQUEST });
const userInfoSuccess = (user) => ({ type: USER_INFO_SUCCESS, user });
const userInfoFailure = (error) => ({ type: USER_INFO_FAILURE, error });

const userUpdateRequest = (user) => ({ type: USER_UPDATE_REQUEST });
const userUpdateSuccess = (user) => ({ type: USER_UPDATE_SUCCESS });
const userUpdateFailure = (user) => ({
  type: USER_UPDATE_FAILURE,
  id: user.id,
  kind: user.kind,
});

export const changeFilterText = (filter) => ({ type: CHANGE_FILTER_TEXT, filter });

export const getAllUsers = () => {
  return dispatch => {
    userChannel.push('get_all', {})
      .receive('ok', response => {
        dispatch(allUsersReceived(response.users));
      })

    userChannel.on('updated', msg => {
      dispatch(userUpdateReceived(msg));
    });
  }
};

export const getUser = () => (
  dispatch => {
    dispatch(userInfoRequest());

    userChannel.push('get', {})
      .receive('ok', response => {
        dispatch(userInfoSuccess(response.user));
      })
      .receive('error', error => {
        dispatch(userInfoFailure(error));
      });
  }
);

export const setUserKind = (user, kind) => (
  dispatch => {
    dispatch(userUpdateRequest());

    userChannel.push('set_kind', {
      user_id: user.id,
      kind: kind,
    })
      .receive('ok', response => {
        dispatch(userUpdateSuccess());
        dispatch(Notifications.success({
          title: I18n.t(`notifications.user_kind_success.title`.replace(':','_')),
          message: I18n.t(`notifications.user_kind_success.message`.replace(':','_')),
        }));
      })
      .receive('error', error => {
        dispatch(userUpdateFailure(user));
      });

  }
)
