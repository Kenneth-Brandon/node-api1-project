import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    bio: '',
  });

  const handleChanges = (event) => {
    if (event.target.name === 'id') {
      setUser({
        ...user,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.id) {
      if (user.name && user.bio) {
        axios
          .put(`http://localhost:8000/api/users/${user.id}`, user)
          .then((response) => {
            console.log(response);
            window.location.reload(false);
          })
          .catch((error) => console.log({ error }));
      } else {
        axios
          .patch(`http://localhost:8000/api/users/${user.id}`, user)
          .then((response) => {
            console.log(response);
            window.location.reload(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <div className="Form">
      <h3>Edit an Existing User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="User ID"
          value={user.id}
          onChange={handleChanges}
        />
        <br />
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
        <button>Edit User</button>
      </form>
    </div>
  );
};

export default EditUserForm;
