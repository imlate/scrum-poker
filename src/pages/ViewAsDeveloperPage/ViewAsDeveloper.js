import React, {useContext} from 'react';
import StoryList from "../../components/StoryList/StoryList";
import SessionContext from "../../context/SessionContext";
import ActiveStory from "../../components/ActiveStory/ActiveStory";
import styles from "./ViewAsScrumDeveloperPage.module.scss";

function ViewAsDeveloperPage() {
  const {activeStory, stories, setVoterPoints} = useContext(SessionContext);

  return (
    <div className={styles.scrumMasterView}>
      <StoryList stories={stories}>
      </StoryList>
      <ActiveStory name={activeStory.name}
                   setVoterPoints={setVoterPoints}>
      </ActiveStory>
    </div>
  );
}

export default ViewAsDeveloperPage;
