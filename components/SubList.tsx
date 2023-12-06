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
  const plainID = JSON.parse(JSON.stringify(_id));
  return (
    <section className="border-2 border-slate-300 min-w-[250px] p-3  h-fit">
      <h1 className="font-semibold">{projectTypeName}</h1>

      {projects && (
        <Todos
          plainID={plainID}
          projectTypeName={projectTypeName}
          parsedProjects={parsedProjects}
        />
      )}
    </section>
  );
}
