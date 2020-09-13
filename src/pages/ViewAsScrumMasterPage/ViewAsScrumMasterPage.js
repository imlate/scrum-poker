import React, {useContext} from 'react';
import StoryList from "../../components/StoryList/StoryList";
import SessionContext from "../../context/SessionContext";
import ActiveStory from "../../components/ActiveStory/ActiveStory";
import styles from "./ViewAsScrumMasterPage.module.scss";
import ScrumMasterPanel from "../../components/ScrumMasterPanel/ScrumMasterPanel";
import LinkShare from "../../components/LinkShare/LinkShare";

function ViewAsScrumMasterPage() {
  const {activeStory, setVoterPoints, sessionName} = useContext(SessionContext);

  return (
    <div className={styles.scrumMasterView}>
      <LinkShare sessionName={sessionName}/>
      <StoryList>
      </StoryList>
      <ActiveStory name={activeStory.name}
                   setVoterPoints={setVoterPoints}>
      </ActiveStory>
      <ScrumMasterPanel>
      </ScrumMasterPanel>
    </div>
  );
}

export default ViewAsScrumMasterPage;
