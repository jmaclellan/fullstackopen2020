import React from 'react';
import Content from './Content';
import Header from "./Header";

const Course = ({ courses }) => (
  <>
    {courses.map((course) =>
      <div key={course.name}>
        <Header course={course} />
        <Content parts={course.parts} />
      </div>
    )}
  </>
)

export default Course
