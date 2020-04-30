import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.title}</h1>;

const Button = (props) => {
  return <button onClick={props.onClick}>{props.title}</button>;
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const addFeedback = (which) => () => {
    setFeedback({
      ...feedback,
      [which]: feedback[which] + 1,
    });
  };

  const Stats = () => {
    const { good, neutral, bad } = feedback;
    const all = good + neutral + bad;
    const average = all / 3;
    const positive = (good / all) * 100 || 0;

    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    );
  };

  return (
    <div>
      <Header title='give feedback' />
      <Button title='good' onClick={addFeedback('good')} />
      <Button title='neutral' onClick={addFeedback('neutral')} />
      <Button title='bad' onClick={addFeedback('bad')} />
      <Header title='statistics' />
      <Stats />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
