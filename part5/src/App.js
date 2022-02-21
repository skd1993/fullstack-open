import React, { useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import UserList from './components/UserList';
import User from './components/User';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom';
import BlogView from './components/BlogView';

const App = () => {
  // const [user, setUser] = useState(null);
  // const [notification, setNotification] = useState(null)
  const user = useSelector((state) => state.user);
  console.log('Current user', user);

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

  const Nav = () => {
    return (
      <nav>
        <ul>
          <Link to='/'>blogs</Link>
          <Link to='/users'>users</Link>
          <Link to='#'>
            {user.name} logged in <Logout />
          </Link>
        </ul>
      </nav>
    );
  };

  const Home = () => {
    return (
      <div>
        <h1>Blogs</h1>
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
    );
  };

  const AuthenticatedRoutes = () => {
    const loggedIn = user?.token.length > 0;
    if (loggedIn)
      return (
        <div>
          <Nav />
          <Notification />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<BlogView />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      );
    else
      return (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      );
  };

  return (
    <Router>
      <AuthenticatedRoutes />
    </Router>
  );
};

export default App;
