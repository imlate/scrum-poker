import React from 'react';
import {PATH_START_VIEW_AS_DEVELOPER} from "../../constants/paths";
import styles from "./LinkShare.module.scss";


function LinkShare({sessionName}) {
  return (
    <div className={styles.linkShare}>
      please share link of developers panel to the teammates: {createShareForDevelopersUrl(sessionName)}
    </div>
  );
}

export default LinkShare;

function createShareForDevelopersUrl(sessionName) {
  const domainUrl = 'http://localhost:3000';
  return `${domainUrl}${PATH_START_VIEW_AS_DEVELOPER}/${encodeURI(sessionName)}`;
}
