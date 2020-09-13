import React, {useContext, useState} from 'react';
import SessionContext from "../../context/SessionContext";
import {useHistory} from "react-router";
import styles from "./AddStoryListPage.module.scss";
import {PATH_VIEW_AS_SCRUM_MASTER} from "../../constants/paths";
import {saveSession} from "../../services/Session";
import {STORY_STATUS_ACTIVE, STORY_STATUS_NOT_VOTED} from "../../constants/story-status";

function AddStoryListPage() {
  const sessionContext = useContext(SessionContext);
  const {sessionName, setSessionName, votersCount, setVotersCount} = sessionContext;
  const [storyListBox, setStoryListBox] = useState('');
  const history = useHistory();

  return (
    <form className={styles.addStoryListPage}
          onSubmit={e => startSession(e, sessionContext, storyListBox, history)}
          name="sessionForm">
      <div className={styles.topRow}>
        <div className={styles.formElement}>
          <label htmlFor="session-name">
            Session Name
          </label>
          <input id="session-name"
                 type="text"
                 name="session name"
                 onChange={e => setSessionName(e.target.value)}
                 value={sessionName}
                 maxLength="200"
                 required/>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="voter-count">
            Number of voters
          </label>
          <input id="voter-count"
                 type="number"
                 name="voter count"
                 onChange={e => setVotersCount(e.target.value)}
                 value={votersCount}
                 min={1}
                 required/>
        </div>
      </div>
      <div className={`${styles.storyList} ${styles.formElement}`}>
        <label htmlFor="story-list">
          Paste your story list (Each line will be converted as a story)
        </label>
        <textarea id="story-list"
                  name="story list"
                  onChange={e => setStoryListBox(e.target.value)}
                  value={storyListBox}
                  required>
        </textarea>
      </div>
      <button type="submit"
              className={styles.submitButton}>
        Start Session
      </button>
    </form>
  );
}

export default AddStoryListPage;

function startSession(event, sessionContext, storyListText, history) {
  event.preventDefault();

  const {sessionName, setVoters, setStories, votersCount} = sessionContext;

  // TODO: we should check if there are any valid stories and warn user if there are not.
  const stories = parseStoryList(storyListText);
  const voters = createVoters(votersCount);
  voters.push({
    id: voters.length + 1,
    name: 'Scrum Master',
    current: true
  });

  saveSession({
    name: sessionName,
    stories,
    voters
  })
    .then(() => {
      setVoters(voters);
      setStories(stories);
      history.push(PATH_VIEW_AS_SCRUM_MASTER);
    }).catch(err => console.log(err));


}

function parseStoryList(storyListText) {
  return storyListText
    .split('\n')
    .filter(story => story !== '')
    .map((story, index) => {
      return {
        id: index + 1,
        name: story,
        status: index === 0 ? STORY_STATUS_ACTIVE : STORY_STATUS_NOT_VOTED,
        points: null
      };
    });
}

function createVoters(count) {
  const voters = [];
  for (let i = 1; i <= count; i++) {
    voters.push({
      id: i + 1,
      name: `Voter ${i}`
    });
  }

  return voters;
}
