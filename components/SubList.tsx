'use client';

import ProjectProps from '@/types/ProjectProps';
import React, { useState } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';
import Todos from './Todos';
import { useRouter } from 'next/navigation';

export default function SubList({
  projects,
  _id,
  projectTypeName,
}: ProjectProps) {
  const router = useRouter();
  const stringify = JSON.stringify(projects);
  const parsedProjects = JSON.parse(stringify);
  const plainID = JSON.parse(JSON.stringify(_id));

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
    <section className="border-2 border-blue-300 rounded p-3  w-[99%] h-fit sm:min-w-[250px]">
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

      {projects && (
        <Todos
          plainID={plainID}
          projectTypeName={projectTypeName}
          parsedProjects={parsedProjects}
        />
      )}
    </section>
  );
}
