const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.json());
app.use(express.urlencoded());
const port = 3001;


const sessions = {};

app.post('/sessions', (req, res) => {
  console.log(req.body);
  sessions[req.body.name] = req.body;
  console.log(sessions);
  res.sendStatus(201);
});

app.get('/sessions/:name/stories', (req, res) => {
  console.log(req.params);
  console.log(sessions);
  const stories = sessions[req.params.name].stories;
  res.send(stories);
});

app.patch('/sessions/:name/stories/:storyId', (req, res) => {
  const points = req.body.points;
  let session = sessions[req.params.name];
  let activeStoryIndex;
  session.stories = session.stories.map((story, index) => {
    if (story.id === req.params.storyId) {
      activeStoryIndex = index;
      return {...story, points, status: 'Voted'};
    }
    if (index === activeStoryIndex) {
      return {...story, status: 'Active'};
    }

    return story;
  });
  res.sendStatus(200)
});

app.patch('/sessions/:name/voters/:voterId', (req, res) => {
  let session = sessions[req.params.name];
  const voter = session.voters.find(voter => voter.id === req.params.voterId);
  voter.points = req.body.points;
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Fake Backend Service listening at http://localhost:${port}`);
});
