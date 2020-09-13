import React, {useContext, useState} from 'react';
import styles from './ScrumMasterPanel.module.scss';
import Points from "../Points/Points";
import {saveStoryPoints} from "../../services/Session";
import SessionContext from "../../context/SessionContext";


function ScrumMasterPanel() {
  const [finalScore, setFinalScore] = useState();
  const {voters, activeStory, sessionName, setPointsForActiveStory} = useContext(SessionContext);

  if (!activeStory) {
    return <div>Currently there is no active story!</div>
  }

  const saveStoryAndGoToNextStory = () => {
    saveStoryPoints(sessionName, activeStory.id, finalScore)
      .then(() => {
        setPointsForActiveStory(finalScore);
      });
  };

  return (
    <div className={styles.scrumMasterPanel}>
      <div className={styles.panelName}>
        Scrum Master Panel
      </div>
      <div className={styles.activeStoryMessage}>
        {activeStory.name} is active
      </div>
      <div className={styles.votersContainer}>
        {renderVoters(voters)}
      </div>
      {renderTeamHasDifferentVotes()}
      <form onSubmit={endVoting}>
        <label htmlFor="final-score">
          Final Score
        </label>
        <input id="final-score"
               value={finalScore}
               onChange={e => setFinalScore(e.target.value)}
               type="number"
               required/>
        <button type="submit"
                className={styles.endVotingButton}
                disabled={!isEverybodyVoted(voters)}
                onClick={saveStoryAndGoToNextStory}>
          End Voting For {activeStory.name}
        </button>
        {renderCanNotEndVoteMessage(voters)}
      </form>
    </div>
  );
}

export default ScrumMasterPanel;

function renderVoters(voters) {
  if (!voters) {
    return;
  }

  return voters.map(voter => {
    return (
      <div key={voter.name}>
        {voter.name}: <Points value={voter.points}/>
      </div>
    );
  });
}

function renderTeamHasDifferentVotes(voters) {
  if (doesTeamHasDifferentVotes(voters)) {
    return (
      <div>
        Seems team has different votes<br/>
        Please discuss and finalize the score below textbox
      </div>
    );
  }
}

function endVoting() {
  console.log('voting ended');
}

function renderCanNotEndVoteMessage(voters) {
  if (isEverybodyVoted(voters)) {
    return;
  }

  return <div>You can not end voting until each teammate voted</div>;
}

function isEverybodyVoted(voters) {
  return voters.every(voter => voter.points > 0);
}

function doesTeamHasDifferentVotes(voters) {
  let hasDifferentVotes = false;

  if (!voters || !voters.length) {
    return false;
  }

  for (let i = 0; i < voters.length - 1; i++) {
    if (voters[i].points !== voters[i + 1].points) {
      hasDifferentVotes = true;
    }
  }

  return hasDifferentVotes;
}
