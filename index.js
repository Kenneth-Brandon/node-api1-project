const express = require('express');

const shortid = require('shortid');

const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

let users = [];

server.get('/', (request, response) => {
  response.json({ message: 'hello world' });
});

server.post('/api/users', (request, response) => {
  const userInfo = request.body;

  if (userInfo.name !== undefined && userInfo.bio !== undefined) {
    userInfo.id = shortid.generate();
    users.push(userInfo);
    response.status(201).json(userInfo); // 201 = created
  } else if (userInfo.name === undefined && userInfo.bio === undefined) {
    response.status(400).json({
      errorMessage: 'Please provide name and bio for the user.', // 400 = bad request
    });
  } else {
    response.status(500).json({
      errorMessage: 'There was an error while saving the user to the database', // 500 = server error
    });
  }
});

server.get('/api/users', (request, response) => {
  if (users.length > 0) {
    response.status(200).json(users);
  } else {
    response.status(500).json({
      errorMessage: 'The users information could not be retrieved.', // 500 = server error
    });
  }
});

server.get('/api/users/:id', (request, response) => {
  const { id } = request.params;

  const found = users.find((user) => user.id === id);

  if (found) {
    specificuser = users.filter((user) => user.id === id);
    response.status(200).json(found);
  } else if (!found) {
    response.status(404).json({
      message: 'The user with the specified ID does not exist.', // 404 = not found
    });
  } else {
    response.status(500).json({
      errorMessage: 'The user information could not be retrieved.', // 500 = server error
    });
  }
});

server.delete('/api/users/:id', (request, response) => {
  const { id } = request.params;

  const found = users.find((user) => user.id === id);

  if (found) {
    users = users.filter((user) => user.id !== id);

    response.status(200).json(found);
  } else if (!found) {
    response.status(404).json({
      message: 'The user with the specified ID does not exist.', // 404 = not found
    });
  } else {
    response
      .status(500)
      .json({ errorMessage: 'The user could not be removed' }); // 500 = server error
  }
});

server.put('/api/users/:id', (request, response) => {
  const { id } = request.params;
  const changes = request.body;

  let index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    if (changes.name === undefined || changes.bio === undefined) {
      response.status(400).json({
        errorMessage: 'Please provide name and bio for the user.', // 400 = bad request
      });
    } else {
      changes.id = id;
      users[index] = changes;
      response.status(200).json(users[index]);
    }
  } else if (index === -1) {
    response.status(404).json({
      message: 'The user with the specified ID does not exist.', // 404 = not found
    });
  } else {
    response.status(500).json({
      errorMessage: 'The user information could not be modified.', // 500 = server error
    });
  }
});

server.patch('/api/users/:id', (request, response) => {
  const { id } = request.params;
  const changes = request.body;

  let found = users.find((user) => user.id === id);

  if (found) {
    if (changes.name === undefined || changes.bio === undefined) {
      response.status(400).json({
        errorMessage: 'Please provide name and bio for the user.',
      });
    } else {
      Object.assign(found, changes);
      response.status(200).json(found);
    }
  } else if (!found) {
    response.status(404).json({
      message: 'The user with the specified ID does not exist.',
    });
  } else {
    response.status(500).json({
      errorMessage: 'The user information could not be modified.',
    });
  }
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
