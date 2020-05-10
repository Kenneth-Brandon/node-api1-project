import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import UserList from './components/UserList';
import NewUserForm from './components/NewUserForm';
import EditUserForm from './components/EditUserForm';

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users')
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="Title">
        <h1>These are the Users</h1>
      </div>
      <div className="FormWrapper">
        <NewUserForm />
        <EditUserForm />
      </div>
      {console.log(userList)}
      <UserList users={userList} />
    </div>
  );
}

export default App;
