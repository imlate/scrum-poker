import {createContext} from 'react';

export const initialSessionContext = {
  sessionName: '',
  voters: [],
  stories: [],
  activeStory: {},
  votersCount: 0
};

const SessionContext = createContext(initialSessionContext);

export default SessionContext;
