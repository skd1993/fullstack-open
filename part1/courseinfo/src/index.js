import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  const name_of_course = props.name;
  const num_of_exercises = props.exercises;

  return (
    <p>
      {name_of_course} {num_of_exercises}
    </p>
  );
};

const Total = (props) => {
  const parts = props.parts;
  return <p>Number of exercises {parts.part1.exercises + parts.part2.exercises + parts.part3.exercises}</p>
}

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      <Part name={parts.part1.name} exercises={parts.part1.exercises} />
      <Part name={parts.part2.name} exercises={parts.part2.exercises} />
      <Part name={parts.part3.name} exercises={parts.part3.exercises} />
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  const parts = {
    part1,
    part2,
    part3,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
