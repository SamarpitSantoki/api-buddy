import mixpanel, { Dict, Query } from 'mixpanel-browser';

const isProd = process.env.NODE_ENV === 'production';
const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

console.log('token', token);


mixpanel.init(token!);

export const Mixpanel = {

  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
  track_links: (query: Query, name: string) => {
    mixpanel.track_links(query, name, {
      referrer: document.referrer,
    });
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    },
  },
};
