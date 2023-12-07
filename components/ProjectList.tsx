'use client';
import React, { useEffect, useState } from 'react';
import SubList from './SubList';
import ProjectProps from '@/types/ProjectProps';
import NewSublistButton from './NewSublistButton';

type Props = {
  projectTypes: ProjectProps[];
};

export default function ProjectList({ projectTypes }: Props) {
  const [projectTypesControlled, setProjectTypesControlled] =
    useState(projectTypes);

  useEffect(() => {}, [projectTypesControlled]);

  return (
    <div className="flex flex-col pb-[120px] sm:flex-row gap-2 m-2 ">
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

      <NewSublistButton setProjectTypesControlled={setProjectTypesControlled} />
    </div>
  );
}
