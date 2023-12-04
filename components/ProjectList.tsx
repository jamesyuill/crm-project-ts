import React from 'react';
import getProjectTypes from '@/utils/getProjectTypes';
import SubList from './SubList';
import ProjectProps from '@/types/ProjectProps';

export default async function ProjectList() {
  const projectTypes = await getProjectTypes();

  return (
    <div className="flex gap-2 ml-2">
      {projectTypes?.map(({ _id, projectTypeName, projects }: ProjectProps) => {
        return (
          <SubList
            key={_id}
            _id={_id}
            projectTypeName={projectTypeName}
            projects={projects}
          />
        );
      })}
    </div>
  );
}
