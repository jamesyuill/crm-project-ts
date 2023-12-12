'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import Project from '@/types/Project';
import AddProjectButton from './AddProjectButton';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function Todos({
  plainID,
  projectTypeName,
  parsedProjects,
}: any) {
  const [isCardShowing, setIsCardShowing] = useState(false);
  const [cardContents, setCardContents] = useState<Project>({
    _id: '',
    projectTitle: '',
    projectDesc: '',
    projectImages: [],
  });
  const [projects, setProjects] = useState(parsedProjects);

  useEffect(() => {}, [projects]);

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
      <Droppable droppableId={plainID}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-3 mt-4"
          >
            {projects.map((item: Project, index) => (
              <Draggable draggableId={item._id} index={index} key={item._id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    onClick={() => handleClick(item)}
                    className=" shadow-md border-[1px] border-blue-400 rounded p-1 cursor-pointer hover:bg-blue-100/70"
                    key={item.projectTitle}
                  >
                    {item.projectTitle}
                  </div>
                )}
              </Draggable>
            ))}
            <AddProjectButton
              plainID={plainID}
              projectTypeName={projectTypeName}
              setProjects={setProjects}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isCardShowing && (
        <ProjectCard
          plainID={plainID}
          setProjects={setProjects}
          projectTypeName={projectTypeName}
          setIsCardShowing={setIsCardShowing}
          cardContents={cardContents}
          setCardContents={setCardContents}
        />
      )}
    </>
  );
}
