'use client';

import React, { useState } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';
import Todos from './Todos';
import Project from '@/types/Project';
import { DraggableProvided } from '@hello-pangea/dnd';
import ProjectProps from '@/types/ProjectProps';

type Props = {
  projects: Project;
  _id: string;
  projectTypeName: string;
  provided: DraggableProvided;
  setProjectTypesControlled: Function;
};

export default function SubList({
  projects,
  _id,
  projectTypeName,
  provided,
  setProjectTypesControlled,
}: Props) {
  const plainID = JSON.parse(JSON.stringify(_id));

  const [projectsCont, setProjectsCont] = useState(projects);

  const handleDelete = async () => {
    try {
      const res = await fetch('api/deleteSublist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plainID }),
      });

      if (res.ok) {
        setProjectTypesControlled((curr: ProjectProps[]) => {
          return curr.filter((item: ProjectProps) => item._id !== plainID);
        });
      }
    } catch (error) {
      console.log('An error occured deleting a category', error);
    }
  };

  return (
    <section
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className="border-2 border-blue-300 rounded p-3  min-w-[280px] h-fit bg-blue-100/30 shadow-lg"
    >
      <div className="flex justify-between">
        <div>
          <h1 className="font-fredoka font-medium text-lg">
            {projectTypeName}
          </h1>
        </div>
        <div
          id="delete-sublist"
          onClick={handleDelete}
          className="cursor-pointer"
        >
          <IoTrashBinSharp size={20} color={'#f87171'} />
        </div>
      </div>

      {projectsCont && (
        <Todos
          plainID={plainID}
          projectTypeName={projectTypeName}
          projectsCont={projectsCont}
        />
      )}
    </section>
  );
}
