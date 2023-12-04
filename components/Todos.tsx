import React from 'react';

export default function Todos({ projects }: any) {
  return <div>{projects ? projects.projectTitle : <h2>undefined</h2>}</div>;
}
