import React, {useState} from 'react';
import styles from './ActiveStory.module.scss';
import Points from "../Points/Points";

const CANT_DECIDE = 9999;

function ActiveStory({name, setVoterPoints}) {
  const [currentPoint, setCurrentPoint] = useState(0);
  const points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, CANT_DECIDE];

  if (!name) {
    return <div>Currently there is no active story!</div>
  }

  const setPoint = point => {
    setCurrentPoint(point);
    setVoterPoints(point)
  };

  return (
    <div className={styles.activeStory}>
      <div className={styles.activeStoryName}>{name}</div>
      <div className={styles.pointsContainer}>
        {renderButtons(points, currentPoint, setPoint)}
      </div>
      {renderMessage(currentPoint)}
    </div>
  );
}

export default ActiveStory;

function renderButtons(points, currentPoint, setCurrentPoint) {
  return points.map(point => {
    return (
      <button key={point}
              onClick={() => setCurrentPoint(point)}
              className={`${styles.pointButton} ${currentPoint === point ? styles.selected : ''}`}>
        <Points value={point}/>
      </button>
    );
  })
}

function renderMessage(currentPoint) {
  if (currentPoint > 0) {
    return (
      <div className={styles.message}>
        <Points value={currentPoint}/> Voted
      </div>
    );
  } else {
    return (
      <div className={styles.message}>
        Please Vote!
      </div>
    );
  }
}
