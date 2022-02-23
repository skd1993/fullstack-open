import * as ACTIONS from './actionTypes';
import { loginService } from '../../services/login';
import blogService from '../../services/blogs';

let notificationTimer;

export const notificationHandler = (msg) => {
  return (dispatch) => {
    clearTimeout(notificationTimer);
    dispatch(showNotification(msg));
    notificationTimer = setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };
};

export const login = (username, password, setPassword, setUsername) => {
  return async (dispatch) => {
    if (username.length === 0 || password.length === 0) {
      dispatch(notificationHandler('Please fill in the fields to continue'));
    } else {
      try {
        const response = await loginService({ username, password });
        // console.log('Logged in', response);
        dispatch(setUser(response));
        dispatch(notificationHandler('Logged in successfully'));
        window.localStorage.setItem('loggedInUser', JSON.stringify(response));
        setPassword('');
        setUsername('');
      } catch (error) {
        dispatch(notificationHandler(error.response.data.error));
      }
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    try {
      window.localStorage.setItem('loggedInUser', null);
      dispatch(removeUser());
      dispatch(unloadBlogs());
      dispatch(notificationHandler('Logged out user successfully'));
    } catch (error) {
      dispatch(notificationHandler('Some error occurred'));
      console.log('Log out error', error);
    }
  };
};

export const showBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    // console.log(blogs);
  };
};

export const createBlog = (
  title,
  url,
  setUrl,
  setTitle,
  blogFormToggleRef
) => {
  return async (dispatch) => {
    try {
      const res = await blogService.submitBlog({ title, url });
      dispatch(newBlog(res));
      dispatch(notificationHandler(`Blog added successfully: ${res.title}`));
      setUrl('');
      setTitle('');
      blogFormToggleRef.current.visibilityHandler();
    } catch (e) {
      console.log('Blog cannot be added', e);
      dispatch(notificationHandler(e.response.data.error));
    }
  };
};

export const like = (blogId, likes) => {
  return async (dispatch) => {
    try {
      const response = await blogService.incrementLikes(blogId, {
        likes: likes + 1,
      });
      dispatch(notificationHandler(response));
      dispatch(showBlogs());
      dispatch(likeBlog());
    } catch (e) {
      console.log(e);
      dispatch(notificationHandler(e.response.data));
    }
  };
};

export const comment = (blogId, commentStr) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addComment(blogId, {
        comment: commentStr,
      });
      dispatch(notificationHandler(response));
      dispatch(showBlogs());
      dispatch(addComment());
    } catch (e) {
      console.log(e);
      dispatch(notificationHandler(e.response.data));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        const response = await blogService.deleteBlog(blog.id);
        dispatch(notificationHandler(response));
        dispatch(showBlogs());
        dispatch(removeBlog());
      }
    } catch (e) {
      dispatch(notificationHandler(e.response?.data.error));
      console.log(e);
    }
  };
};

const removeBlog = () => {
  return {
    type: ACTIONS.DELETE_BLOG,
  };
};

const newBlog = (blog) => {
  return {
    type: ACTIONS.NEW_BLOG,
    payload: blog,
  };
};

const likeBlog = () => {
  return {
    type: ACTIONS.LIKE_BLOG,
  };
};

const addComment = () => {
  return {
    type: ACTIONS.COMMENT,
  };
};

const setBlogs = (blogs) => {
  return {
    type: ACTIONS.SET_BLOGS,
    payload: blogs,
  };
};

const unloadBlogs = () => {
  return {
    type: ACTIONS.UNLOAD_BLOGS,
  };
};

export const setUser = ({ name, username, token }) => {
  return {
    type: ACTIONS.LOGIN,
    payload: {
      name,
      username,
      token,
    },
  };
};

export const removeUser = () => {
  return {
    type: ACTIONS.LOGOUT,
  };
};

const showNotification = (msg) => {
  return {
    type: ACTIONS.SHOW_NOTIFICATION,
    payload: msg,
  };
};

const hideNotification = () => {
  return {
    type: ACTIONS.HIDE_NOTIFICATION,
  };
};
