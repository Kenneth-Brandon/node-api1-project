const express = require('express');
const shortId = require('shortId');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const PORT = 5000;

let users = [
  {
    id: shortId.generate(),
    name: 'Jane Doe',
    bio: "Not Tarzan's Wife, author Jane",
  },
];
//---------------------------------------------//
// Testing Postman with Get response of 200 and
// web browers is getting message when viewed
// with json extension
//---------------------------------------------//
server.get('/', (request, response) => {
  response.json({ message: 'api running' });
});

server.get('/api/users', (request, response) => {
  response.json(200).json(users);
});

//---------------------------------------------//
// Create
//---------------------------------------------//
server.post('/api/users', (request, response) => {
  const post = request.body;
  post.id = shortId.generate();

  if (!post.name && !post.bio) {
    response.status(400).json({
      errorMessage: 'Please provide name and bio for the user.',
    });
  } else if (post.name && post.bio) {
    users.push(post);
    response.status(201).json(users);
  } else {
    response.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  }
});

//---------------------------------------------//
// Read
//---------------------------------------------//
server.get('/api/users/:id', (request, response) => {
  const id = request.params.id;
  const user = users.find((user) => user.id === id);

  if (user) {
    response.status(200).json(user);
  } else {
    response.status(404).json({
      errorMessage: 'The user with the specified ID does not exist.',
    });
  }
});

//---------------------------------------------//
// Update - Patch
//---------------------------------------------//
server.patch('/api/hubs/:id', (request, response) => {
  const { id } = request.params;
  const changes = request.body;

  const found = hubs.find((hub) => hub.id === id);

  if (found) {
    Object.assign(found, changes);
    response.status(200).json(found);
  } else {
    response.status(404).json({ message: 'Hub not found!' });
  }
});

//---------------------------------------------//
// Update - Patch
//---------------------------------------------//
server.put('/api/hubs/:id', (request, response) => {
  const { id } = request.params;
  const changes = request.body;

  const index = hubs.findIndex((hub) => hub.id === id);

  if (index !== -1) {
    changes.id = id;
    hubs[index] = changes;
    response.status(200).json(hubs[index]);
  } else {
    response.status(404).json({ message: 'Hub not found!' });
  }
});

//---------------------------------------------//
// Delete
//---------------------------------------------//
server.delete('/api/hubs/:id', (request, response) => {
  const { id } = request.params;

  const found = hubs.find((hub) => hub.id === id);

  if (found) {
    hubs = hubs.filter((hub) => hub.id !== id);
    response.status(200).json(found);
  } else {
    response.status(404).json({ message: 'hub not found' });
  }
});

//---------------------------------------------//

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
