'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import Project from '@/types/Project';
import AddProjectButton from './AddProjectButton';

export default function Todos({
  plainID,
  projectTypeName,
  parsedProjects,
}: any) {
  const [isCardShowing, setIsCardShowing] = useState(false);
  const [cardContents, setCardContents] = useState<Project>({
    projectTitle: '',
    projectDesc: '',
    projectImages: [],
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(parsedProjects);
  }, []);

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
        {projects.map((item: Project) => {
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
        <AddProjectButton
          plainID={plainID}
          projectTypeName={projectTypeName}
          projects={projects}
          setProjects={setProjects}
        />
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
