export const saveSession = newSession => {
  console.log(newSession);
  return fetch(`/sessions`,
    {
      method: 'post',
      body: JSON.stringify(newSession),
      headers: {
        'Content-Type': 'application/json'
      }
    });
};

export const getStories = sessionName => {
  return fetch(`/sessions/${sessionName}/stories`)
    .then(res => res.json());
};

export const saveStories = (sessionName, stories) => {
  return fetch(`/sessions/${sessionName}/stories`,
    {
      method: 'post',
      body: JSON.stringify(stories),
      headers: {
        'Content-Type': 'application/json'
      }
    });
};

export const saveStoryPoints = (sessionName, storyId, points) => {
  return fetch(`/sessions/${sessionName}/stories/${storyId}`,
    {
      method: 'patch',
      body: JSON.stringify({points: points}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
};

export const saveVoterPoints = (sessionName, voterId, points) => {
  return fetch(`/sessions/${sessionName}/voters/${voterId}`,
    {
      method: 'patch',
      body: JSON.stringify({points: points}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
};

