'use client';

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import Project from '@/types/Project';
import AddProjectButton from './AddProjectButton';

export default function Todos({ projectTypeName, parsedProjects }: any) {
  const [isCardShowing, setIsCardShowing] = useState(false);
  const [cardContents, setCardContents] = useState<Project>({
    projectTitle: '',
    projectDesc: '',
    projectImages: [],
  });

  const handleClick = (item: Project) => {
    setIsCardShowing(true);
    setCardContents((curr) => {
      let obj = {
        ...curr,
        ...item,
      };
      return obj;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-4">
        {parsedProjects.map((item: Project) => {
          return (
            <div
              onClick={() => handleClick(item)}
              className=" shadow-md border-[1px] border-slate-400 rounded p-1 cursor-pointer"
              key={item.projectTitle}
            >
              {item.projectTitle}
            </div>
          );
        })}
        <AddProjectButton projectTypeName={projectTypeName} />
      </div>

      {isCardShowing && (
        <ProjectCard
          projectTypeName={projectTypeName}
          setIsCardShowing={setIsCardShowing}
          cardContents={cardContents}
        />
      )}
    </>
  );
}
