import { votes } from './reducers';

const applyConfig = (config) => {
  config.addonReducers.votes = votes;

  return config;
};

export default applyConfig;
