import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  const name_of_course = props.name
  const num_of_exercises = props.exercises

  return <p>{name_of_course} {num_of_exercises}</p>
}

const Content = (props) => {

  const content = props.content
  return (
    <div>
      <Part name={content.part1.name} exercises={content.part1.num}/>
      <Part name={content.part2.name} exercises={content.part2.num}/>
      <Part name={content.part3.name} exercises={content.part3.num}/>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const content = {
    'part1' : {
      'name': part1,
      'num' : exercises1
    },
    'part2' : {
      'name': part2,
      'num' : exercises2
    },
    'part3' : {
      'name': part3,
      'num' : exercises3
    }
  }

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
