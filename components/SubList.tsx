import ProjectProps from '@/types/ProjectProps';
import React from 'react';

import Todos from './Todos';

export default function SubList({
  projects,
  _id,
  projectTypeName,
}: ProjectProps) {
  const stringify = JSON.stringify(projects);
  const parsedProjects = JSON.parse(stringify);

  return (
    <section className="border-2 border-slate-300 p-3 w-[30%]">
      <h1 className="font-semibold">{projectTypeName}</h1>

      {projects && <Todos parsedProjects={parsedProjects} />}
    </section>
  );
}
