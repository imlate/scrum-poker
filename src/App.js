import React, {useState} from 'react';
import './App.css';
import {Redirect} from "react-router";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddStoryListPage from "./pages/AddStoryListPage/AddStoryListPage";
import ViewAsScrumMasterPage from "./pages/ViewAsScrumMasterPage/ViewAsScrumMasterPage";
import SessionContext from "./context/SessionContext";
import Logo from "./components/Logo/Logo";
import {PATH_ADD_STORY_LIST, PATH_VIEW_AS_DEVELOPER, PATH_VIEW_AS_SCRUM_MASTER} from "./constants/paths";
import ViewAsDeveloperPage from "./pages/ViewAsDeveloperPage/ViewAsDeveloper";
import {STORY_STATUS_ACTIVE, STORY_STATUS_VOTED} from "./constants/story-status";

function App() {
  const [sessionName, setSessionName] = useState('');
  const [voters, setVoters] = useState([]);
  const [stories, setStories] = useState([]);
  const [votersCount, setVotersCount] = useState();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const setPointsForActiveStory = points => {
    const nextStoryIndex = activeStoryIndex + 1;

    const updatedStories = stories.map((story, index) => {
      if (story.status === STORY_STATUS_ACTIVE) {
        return {...story, points, status: STORY_STATUS_VOTED};
      } else if (index === nextStoryIndex) {
        return {...story, status: STORY_STATUS_ACTIVE};
      } else {
        return {...story};
      }
    });

    setStories(updatedStories);
    setActiveStoryIndex(nextStoryIndex);
  };

  const setVoterPoints = points => {
    const updatedVoters = voters.map(voter => {
      if (voter.current) {
        return {...voter, points};
      } else {
        return {...voter};
      }
    });

    setVoters(updatedVoters);
  };

  const addVoter = voter => setVoters([...voters, voter]);

  let activeStory = {};
  if (stories && stories.length) {
    activeStory = stories[activeStoryIndex] || {};
  }

  return (
    <div className="App">
      <Logo/>
      <BrowserRouter>
        <SessionContext.Provider value={
          {
            sessionName,
            setSessionName,
            voters,
            setVoters,
            votersCount,
            setVotersCount,
            stories,
            setStories,
            activeStory,
            setPointsForActiveStory,
            addVoter,
            setVoterPoints
          }
        }>
          <Switch>
            <Route exact path="/">
              <Redirect to={PATH_ADD_STORY_LIST}/>
            </Route>
            <Route exact path={PATH_ADD_STORY_LIST}>
              <AddStoryListPage/>
            </Route>
            <Route exact path={PATH_VIEW_AS_SCRUM_MASTER}>
              <ViewAsScrumMasterPage/>
            </Route>
            <Route exact path={PATH_VIEW_AS_DEVELOPER}>
              <ViewAsDeveloperPage/>
            </Route>
          </Switch>
        </SessionContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
