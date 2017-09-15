import { Socket } from 'phoenix';

export const configureSocket = () => {
  const socket = new Socket('/socket', {
    params: { token: window.userToken },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }, // eslint-disable-line no-console
  });

  socket.connect();

  return socket;
};

export const joinChannel = (socket, channelName, onSuccess, onError) => {
  const channel = socket.channel(channelName, {});
  channel.join()
    .receive('ok', (message) => {
      if (typeof onSuccess !== 'undefined') {
        onSuccess(message);
      }
    })
    .receive('error', (reason) => {
      if (typeof onError !== 'undefined') {
        onError(reason);
      }
    });

  return channel;
};
