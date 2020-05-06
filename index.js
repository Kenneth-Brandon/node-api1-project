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
server.post('/api/hubs', (request, response) => {
  const hubInfo = request.body;
  hubInfo.id = shortid.generate();
  hubs.push(hubInfo);
  response.status(201).json(hubInfo);
});

//---------------------------------------------//
// Read
//---------------------------------------------//
server.get('/api/hubs', (request, response) => {
  response.status(200).json(hubs);
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
