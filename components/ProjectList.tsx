'use client';
import React, { useState } from 'react';
import SubList from './SubList';
import ProjectProps from '@/types/ProjectProps';
import NewSublistButton from './NewSublistButton';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';

type Props = {
  projectTypes: ProjectProps[];
};

export default function ProjectList({ projectTypes }: Props) {
  const [projectTypesControlled, setProjectTypesControlled] =
    useState(projectTypes);

  const OnDragEndHandler = (results: DropResult) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'group') {
      const reorderedCats = [...projectTypesControlled];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedCat] = reorderedCats.splice(sourceIndex, 1);

      reorderedCats.splice(destinationIndex, 0, removedCat);

      return setProjectTypesControlled(reorderedCats);
    }

    // optimistically render if project is within the same cat/sublist
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    if (sourceId === destinationId) {
      const reordered = [...projectTypesControlled];
      const pTypeIndex = reordered.findIndex(
        (pType) => pType._id === destinationId
      );
      const projectsToReorder = reordered[pTypeIndex].projects;
      const [removedProject] = projectsToReorder?.splice(sourceIndex, 1);

      projectsToReorder?.splice(destinationIndex, 0, removedProject);
      return setProjectTypesControlled(reordered);
    }

    // optimistically render if project is NOT in the same cat/sublist

    if (sourceId !== destinationId) {
      const reordered = [...projectTypesControlled];
      //find the index of the source pType
      const pTypeSourceIndex = reordered.findIndex(
        (pType) => pType._id === sourceId
      );
      //remove the project from it's original array
      const projectsToReorder = reordered[pTypeSourceIndex].projects;
      const [removedProject] = projectsToReorder?.splice(sourceIndex, 1);
      //find the index of the destination pType
      const pTypeDestIndex = reordered.findIndex(
        (pType) => pType._id === destinationId
      );
      const projectsToInsertInto = reordered[pTypeDestIndex].projects;
      projectsToInsertInto?.splice(destinationIndex, 0, removedProject);
      //insert project into the correct position
      return setProjectTypesControlled(reordered);
    }
  };

  return (
    <DragDropContext onDragEnd={OnDragEndHandler}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col pb-[120px] sm:flex-row gap-4 m-2 flex-wrap"
          >
            {projectTypesControlled.map(
              ({ _id, projectTypeName, projects }: ProjectProps, index) => {
                // const stringify = JSON.stringify(projects);
                // const parsedProjects = JSON.parse(stringify);
                return (
                  <Draggable draggableId={_id} key={_id} index={index}>
                    {(provided) => (
                      <SubList
                        provided={provided}
                        key={_id}
                        _id={_id}
                        projectTypeName={projectTypeName}
                        projects={projects}
                        setProjectTypesControlled={setProjectTypesControlled}
                      />
                    )}
                  </Draggable>
                );
              }
            )}
            {provided.placeholder}
            <NewSublistButton
              setProjectTypesControlled={setProjectTypesControlled}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
