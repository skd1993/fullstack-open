/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const postAnecdote = async (data) => {
  const res = await axios.post(baseUrl, { content: data, votes: 0 });
  return res.data;
};

const postVote = async (to) => {
  const res = await axios.put(`${baseUrl}/${to.id}`, {
    content: to.content,
    votes: to.votes + 1,
  });
  return res.data;
};

export default { getAnecdotes, postAnecdote, postVote };
