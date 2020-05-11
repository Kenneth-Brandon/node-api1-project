import React from 'react';
import UserCard from './UserCard';

const UserList = (props) => {
  return (
    <div className="UserList">
      {props.users.map((user) => {
        return (
          <UserCard
            key={user.id}
            name={user.name}
            bio={user.bio}
            id={user.id}
          />
        );
      })}
    </div>
  );
};

export default UserList;
