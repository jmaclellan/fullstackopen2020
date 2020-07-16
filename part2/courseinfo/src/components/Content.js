import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <div>
      <ul>
        {parts.map(part =>
          <Part
            name={part.name}
            exercises={part.exercises}
            key={part.name} />
        )}
      </ul>
      <h3>total of {total} exercises</h3>
    </div>
  );
};

export default Content
