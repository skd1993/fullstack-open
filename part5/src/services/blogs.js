import axios from 'axios';

const baseUrl = '/api/blogs';

let token = '';

const setToken = (userToken) => {
  token = `bearer ${userToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlogInfo = async (id) => {
  const response = await axios.get(baseUrl + '/' + id);
  return response.data;
};

const submitBlog = async (blogObj) => {
  const config = {
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedInUser')).token
      }`,
    },
  };
  const response = await axios.post(baseUrl, blogObj, config);
  return response.data;
};

const incrementLikes = async (blogId, likesObj) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, likesObj);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedInUser')).token
      }`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const addComment = async (blogId, commentObj) => {
  const response = await axios.put(`${baseUrl}/comment/${blogId}`, commentObj);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getBlogInfo,
  setToken,
  submitBlog,
  incrementLikes,
  deleteBlog,
  addComment,
};
