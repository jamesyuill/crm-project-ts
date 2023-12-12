'use client';
import React, { useEffect, useState } from 'react';
import SubList from './SubList';
import ProjectProps from '@/types/ProjectProps';
import NewSublistButton from './NewSublistButton';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

type Props = {
  projectTypes: ProjectProps[];
};

export default function ProjectList({ projectTypes }: Props) {
  const [projectTypesControlled, setProjectTypesControlled] =
    useState(projectTypes);

  useEffect(() => {}, [projectTypesControlled]);

  const OnDragEndHandler = (results) => {
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

    // const catSourceIndex = projectTypesControlled.findIndex(
    //   (item) => item._id === source.droppableId
    // );
    // const catDestinationIndex = projectTypesControlled.findIndex(
    //   (item) => item._id === destination.droppableId
    // );
    // const newSourceItems = [...projectTypesControlled[catSourceIndex].projects];
    // const newDestinationItems =
    //   source.droppableId !== destination.droppableId
    //     ? [...projectTypesControlled[catDestinationIndex].projects]
    //     : newSourceItems;
  };

  return (
    <DragDropContext onDragEnd={OnDragEndHandler}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col pb-[120px] sm:flex-row gap-2 m-2 "
          >
            {projectTypesControlled.map(
              ({ _id, projectTypeName, projects }: ProjectProps, index) => {
                return (
                  <Draggable draggableId={_id} key={_id} index={index}>
                    {(provided) => (
                      <SubList
                        provided={provided}
                        key={_id}
                        _id={_id}
                        projectTypeName={projectTypeName}
                        projects={projects}
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
