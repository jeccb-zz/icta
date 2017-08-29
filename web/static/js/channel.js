import { Socket } from 'phoenix';

export const configureSocket = () => {
  let socket = new Socket('/socket', {
    params: {token: window.userToken},
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
  });

  socket.connect();

  return socket;
}

export const joinChannel = (socket, channelName, onSuccess, onError) => {
  let channel = socket.channel(channelName, {});
  channel.join()
    .receive('ok', messages => {

      if (typeof(onSuccess)==='undefined') {
        console.log("Channel joined!")
      } else {
        onSuccess();
      }
    })
    .receive('error', reason => {
      if (typeof(onError)==='undefined') {
        console.error("Channel not joined :(", reason)
      } else {
        onError();
      }
    });

  return channel;
}
