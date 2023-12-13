'use client';

import React, { useEffect, useState } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';
import Todos from './Todos';
import { useRouter } from 'next/navigation';
import Project from '@/types/Project';
import { DraggableProvided } from '@hello-pangea/dnd';
import ProjectProps from '@/types/ProjectProps';

type Props = {
  projects: Project;
  _id: string;
  projectTypeName: string;
  provided: DraggableProvided;
};

export default function SubList({
  projects,
  _id,
  projectTypeName,
  provided,
}: Props) {
  const router = useRouter();
  const plainID = JSON.parse(JSON.stringify(_id));
  // const stringify = JSON.stringify(projects);
  // const parsedProjects = JSON.parse(stringify);
  const [projectsCont, setProjectsCont] = useState(projects);

  const handleDelete = async () => {
    try {
      const res = await fetch('api/deleteSublist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plainID }),
      });

      if (res.ok) router.refresh();
    } catch (error) {
      console.log('An error occured deleting a category', error);
    }
  };

  return (
    <section
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className="border-2 border-blue-300 rounded p-3  w-[300px] h-fit"
    >
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold">{projectTypeName}</h1>
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
