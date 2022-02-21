import React, { useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions';

const App = () => {
  // const [user, setUser] = useState(null);
  // const [notification, setNotification] = useState(null)
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const blogFormToggleRef = useRef(null);
  const blogListRef = useRef(null);

  useEffect(() => {
    try {
      const userLocalData = window.localStorage.getItem('loggedInUser');
      if (userLocalData) {
        const u = JSON.parse(userLocalData);
        if (u !== null) dispatch(setUser(u));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div>
      <Notification />
      {user?.token.length > 0 ? (
        <div>
          <h1>Blogs</h1>
          <div>
            <p>{user.name} logged in</p>
            <Logout />
          </div>
          <br />
          <Togglable
            buttonName={'Create new Blog'}
            cancelButtonName={'Cancel'}
            ref={blogFormToggleRef}
          >
            <BlogForm
              blogFormToggleRef={blogFormToggleRef}
              blogUpdateRef={blogListRef}
            />
          </Togglable>
          <br />
          <Blog ref={blogListRef} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
