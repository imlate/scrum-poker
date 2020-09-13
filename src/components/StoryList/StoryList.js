import React, {useContext, useEffect, useState} from 'react';
import styles from './StoryList.module.scss';
import Points from "../Points/Points";
import {getStories} from "../../services/Session";
import SessionContext from "../../context/SessionContext";

function StoryList() {
  const {sessionName} = useContext(SessionContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const callStories = () => {
      getStories(sessionName)
        .then(response => {
          setStories(response);
        });
    };

    callStories();
    const interval = setInterval(callStories, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!stories || !stories.length) {
    return <div>There are no stories!</div>;
  }

  return (
    <table>
      <thead>
      <tr>
        <th>
          Story
        </th>
        <th>
          Story Point
        </th>
        <th>
          Status
        </th>
      </tr>
      </thead>
      <tbody>
      {renderRows(stories)}
      </tbody>
    </table>
  );
}

export default StoryList;

function renderRows(stories) {
  return stories.map((story, i) => {
    return (
      <tr key={story.name}
          className={i % 2 === 0 ? styles.colored : ''}>
        <td>
          {story.name}
        </td>
        <td>
          <Points value={story.points}/>
        </td>
        <td>
          {story.status}
        </td>
      </tr>
    )
  });
}
