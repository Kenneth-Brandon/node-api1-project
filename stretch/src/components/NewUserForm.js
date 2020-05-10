import React, { useState } from 'react';
import axios from 'axios';

const NewUserForm = () => {
  const [user, setUser] = useState({
    name: '',
    bio: '',
  });

  const handleChanges = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/users', user)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <div className="Form">
      <h3>Add a New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChanges}
        />
        <br />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={user.bio}
          onChange={handleChanges}
        />
        <br />
        <button>Add New User</button>
      </form>
    </div>
  );
};

export default NewUserFrom;
