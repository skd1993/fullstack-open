import React from 'react';
// import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdote }) => {
  // const params = useParams();
  // const [anecdote, setAnecdote] = useState();

  // useEffect(() => {
  //   const toSet = anecdotes.filter((a) => a.id === +params.id);
  //   console.log(params.id, toSet);
  //   setAnecdote(...toSet);
  // }, []);

  const toShow = { ...anecdote[0] };

  return toShow ? (
    <div>
      <h1>
        {toShow.content} by {toShow.author}
      </h1>
      <p>has {toShow.votes} votes</p>
      <p>
        for more info see <a href={toShow.info}>{toShow.info}</a>
      </p>
    </div>
  ) : (
    <div>
      <p>Not found!!</p>
    </div>
  );
};

export default Anecdote;
