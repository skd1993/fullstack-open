import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  // const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  // const [info, setInfo] = useState('');

  const name = useField('text');
  const author = useField('text');
  const url = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const toAdd = {
      content: name.attr.value,
      author: author.attr.value,
      info: url.attr.value,
    };
    props.addNew({
      ...toAdd,
      votes: 0,
    });
    navigate('/');
  };

  const resetInputs = (e) => {
    e.preventDefault();
    name.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...name.attr} />
        </div>
        <div>
          author
          <input {...author.attr} />
        </div>
        <div>
          url for more info
          <input {...url.attr} />
        </div>
        <button>create</button>
        <button onClick={resetInputs}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
