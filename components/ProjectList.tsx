import React from 'react';
import getProjects from '@/utils/getProjects';
import SubList from './SubList';
import ProjectProps from '@/types/ProjectProps';

export default async function ProjectList() {
  const data = await getProjects();

  return (
    <div>
      {data?.map(({ projects, _id, projectTypeName }: ProjectProps) => {
        return (
          <SubList
            projects={projects}
            _id={_id}
            projectTypeName={projectTypeName}
          />
        );
      })}
    </div>
  );
}
