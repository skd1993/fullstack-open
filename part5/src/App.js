import React, { Fragment, useEffect, useRef } from 'react';

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
} from 'react-router-dom';
import BlogView from './components/BlogView';

import NavBar from './components/chakra/NavBar';
import { Container, Heading, Box } from '@chakra-ui/react';

const App = () => {
  // const [user, setUser] = useState(null);
  // const [notification, setNotification] = useState(null)
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const blogFormToggleRef = useRef(null);

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

  const Home = () => {
    return (
      <Fragment>
        <Box mb={4}>
          <Heading mb={2}>Blogs</Heading>
          <Togglable
            buttonName={'Create new Blog'}
            cancelButtonName={'Cancel'}
            ref={blogFormToggleRef}
          >
            <BlogForm
              blogFormToggleRef={blogFormToggleRef}
              // blogUpdateRef={blogListRef}
            />
          </Togglable>
        </Box>
        <Blog />
      </Fragment>
    );
  };

  const AuthenticatedRoutes = () => {
    const loggedIn = user?.token.length > 0;
    if (loggedIn)
      return (
        <div>
          <NavBar user={user.name} />
          <Container maxW='10xl' mb={4} pt={120}>
            <Notification />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/users' element={<UserList />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/blogs/:id' element={<BlogView />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Container>
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
