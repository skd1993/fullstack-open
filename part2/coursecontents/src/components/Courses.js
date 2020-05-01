import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.map((x) => x.exercises).reduce((x, y) => x + y);
  return (
    <p>
      <strong>Number of exercises {sum}</strong>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
    {
      courses.map(c => (
        <div>
          <Header course={c} />
          <Content course={c} />
          <Total course={c} />
        </div>
      ))
    }
    </div>
  );
};

export default Course