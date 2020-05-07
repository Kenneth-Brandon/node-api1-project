const express = require('express');
const shortId = require('shortId');
const cors = require('cors');

const server = express();
const PORT = 5000;

server.use(express.json());
server.use(cors());

let userList = [
  {
    id: shortId.generate(),
    name: 'Jane Doe',
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: shortId.generate(),
    name: 'John Doe',
    bio: 'Not another missing person.',
  },
];
//---------------------------------------------//
// Testing Postman
//---------------------------------------------//
server.get('/', (response) => {
  response.json({ message: 'Up and running!' });
});

server.get('/api/users', (response) => {
  if (userList) {
    response.status(200).json(userList);
  } else {
    response
      .status(500)
      .json({ errorMessage: 'The users information could not be retrieved' });
  }
});

//---------------------------------------------//
// Create
//---------------------------------------------//
server.post('/api/users', (request, response) => {
  if (!request.body.name || !request.body.bio) {
    response
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user' });
  }
  if (request.body.name && request.body.bio) {
    userList.push({
      id: shortId.generate(),
      name: request.body.name,
      bio: request.body.bio,
    });
    shortId.generate();
    response.status(201).json(request.body);
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

  const user = userList[id - 1];
  if (!user) {
    response
      .status(404)
      .json({ errorMessage: 'The user with the specified ID does not exist' });
  } else if (user) {
    response.status(200).json(user);
  } else {
    response
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved' });
  }
});

//---------------------------------------------//
// Update - Patch
//---------------------------------------------//
server.patch('/api/users/:id', (request, response) => {
  const id = request.params.id;

  const user = userList[id - 1];
  if (!user) {
    response
      .status(404)
      .json({ errorMessage: 'The user with the specified ID does not exist' });
  } else if (user) {
    if (!request.body.name && request.body.bio) {
      userList[id - 1].bio = request.body.bio;
      response.status(200).json(userList);
    } else if (request.body.name && !request.body.bio) {
      userList[id - 1].name = request.body.name;
      response.status(200).json(userList);
    } else if (request.body.name && request.body.bio) {
      userList[id - 1].name = request.body.name;
      userList[id - 1].bio = request.body.bio;
      response.status(200).json(userList);
    } else {
      response
        .status(400)
        .json({ errorMessage: 'Please provide an update to the user' });
    }
  } else {
    response
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved' });
  }
});

//---------------------------------------------//
// Update - Put
//---------------------------------------------//
server.put('/api/users/:id', (request, response) => {
  const id = request.params.id;

  const user = userList[id - 1];
  if (!user) {
    response
      .status(404)
      .json({ errorMessage: 'The user with the specified ID does not exist' });
  } else if (user) {
    if (!request.body.name || !request.body.bio) {
      response
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user' });
    } else if (request.body.name && request.body.bio) {
      userList[id - 1].name = request.body.name;
      userList[id - 1].bio = request.body.bio;
      response.status(200).json(userList);
    }
  } else {
    response
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved' });
  }
});

//---------------------------------------------//
// Delete
//---------------------------------------------//
server.delete('/api/users/:id', (request, response) => {
  const id = request.params.id;
  if (userList[id - 1]) {
    userList = userList.filter((user) => user.id != id);
    response.status(200).json(userList);
  } else if (!userList[id - 1]) {
    response
      .status(404)
      .json({ errorMessage: 'The user with the specified ID does not exist' });
  } else {
    response
      .status(500)
      .json({ errorMessage: 'The user could not be removed' });
  }
});

//---------------------------------------------//

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
