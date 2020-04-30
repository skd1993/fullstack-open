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

  const Statistic = (props) => {
    if (props.text === 'positive') {
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      );
    }
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  };

  const Statistics = () => {
    const { good, neutral, bad } = feedback;
    const all = good + neutral + bad;
    const average = all / 3;
    const positive = (good / all) * 100 || 0;

    if (all === 0) {
      return <Statistic text='No feedback given' />
    }
    return (
      <div>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive} />
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
      <Statistics />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
