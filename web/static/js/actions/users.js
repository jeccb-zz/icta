import { configureChannel } from '../channel';
import Notifications from 'react-notification-system-redux';
import { I18n } from 'react-redux-i18n';

let socket = configureChannel();
let channel = socket.channel('user', {});
channel.join()
  .receive('ok', messages => {
    console.log("Channel joined!")
  })
  .receive('error', reason => {
    console.error("Channel not joined :(", reason)
  });


export const ALL_USERS_RECEIVED = 'ALL_USERS_RECEIVED';
export const CHANGE_FILTER_TEXT = 'CHANGE_USER_FILTER_TEXT';

const allUsersReceived = (users) => ({ type: ALL_USERS_RECEIVED, users });

export const changeFilterText = (filter) => ({ type: CHANGE_FILTER_TEXT, filter });

export const getAllUsers = () => {
  return dispatch => {
    channel.push('get_all', {})
      .receive('ok', response => {
        dispatch(allUsersReceived(response.users));
      })
  }
};

export const getUser = () => (
  dispatch => {
    dispatch(userInfoRequest());

    channel.push('get', {})
      .receive('ok', response => {
        dispatch(userInfoSuccess(response.user));
      })
      .receive('error', error => {
        dispatch(userInfoFailure(error));
      });
  }
);
