import Pusher from 'pusher-js';
import pusherConfig from 'config/pusher';
import config from 'config/notifications';

const pusher = new Pusher(pusherConfig.key, {
  cluster: 'eu',
  forceTLS: true,
});

const subscribe = (name) => {
  return pusher.subscribe(name);
};

export const subscribeToNewReviews = () => {
  return subscribe(config.newReview.channel);
};
