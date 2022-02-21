import React, { useEffect, useState } from 'react';
import userService from '../services/users';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserList = () => {
  const id = useParams().id;
  const [user, setUser] = useState();

  const blogList = useSelector((state) => state.blogs);

  const fetchUser = async () => {
    const res = await userService.getUserInfo(id);
    console.log(res);
    setUser(res);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogList
          .filter((b) => b.user.id === id)
          .map((x) => (
            <li>{x.title}</li>
          ))}
      </ul>
    </div>
  ) : (
    <p>Not found</p>
  );
};

export default UserList;
