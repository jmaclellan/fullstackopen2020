import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <div>
      {parts.map(part =>
        <Part
          name={part.name}
          exercises={part.exercises}
          key={part.id} />
      )}
      <h3>total of {total} exercises</h3>
    </div>
  )
}

const Course = ({ courses }) => (
  <>
    {courses.map((course, id) =>
      <>

        <Header course={course} key={id} />
        <Content parts={course.parts} key={id} />
      </>
    )}
  </>
)

const Part = ({ name, exercises }) => <div>{name} {exercises}</div>



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
