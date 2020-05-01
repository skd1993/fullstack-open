import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return <button onClick={props.onClick}>{props.title}</button>;
};

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.points} votes</p>
    </div>
  );
};

const App = (props) => {
  const p = Array.apply(null, new Array(props.anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(p);

  const genRandom = (len) => {
    return Math.floor(Math.random() * 10) % len;
  };

  const getAnecdote = (len) => () => {
    setSelected(genRandom(len));
  };

  const voteFor = (selected) => () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  function getMax(arr) {
    let p = arr[0];
    let i = arr.length;

    while (i--) {
      if (arr[i] > p) {
        p = arr[i];
      }
    }
    return p;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={props.anecdotes[selected]}
        points={points[selected]}
      />
      <Button title='vote' onClick={voteFor(selected)} />
      <Button
        title='next anecdote'
        onClick={getAnecdote(props.anecdotes.length)}
      />
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote
          anecdote={props.anecdotes[points.indexOf(getMax(points))]}
          points={getMax(points)}
        />
      </div>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
