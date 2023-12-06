'use client';

import Project from '@/types/Project';
import addProject from '@/utils/addProject';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

type Props = {
  plainID: string;
  projectTypeName: string;
  setIsAddNewShowing: Function;

  setProjects: Function;
};

export default function NewProjectModal({
  plainID,

  projectTypeName,
  setIsAddNewShowing,
  setProjects,
}: Props) {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newObj = {
      projectTitle: projectTitle,
      projectDesc: projectDesc,
    };

    //Optimistic rendering of new project
    setProjects((curr: any) => {
      let newArr = [...curr, newObj];

      return newArr;
    });

    setIsAddNewShowing(false);

    //Sends the new project off to DB
    try {
      const res = await fetch('api/addProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plainID, newObj }),
      });
    } catch (error) {}
  };

  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/60"
    >
      <div className="bg-white flex flex-col gap-2 w-[50%] h-[50%] p-3 shadow-md border-[1px] border-slate-400 rounded">
        <div
          onClick={() => setIsAddNewShowing(false)}
          className="flex justify-end w-[100%] p-1 cursor-pointer"
        >
          <IoMdClose size={20} />
        </div>
        <h2 className="font-medium">{projectTypeName}</h2>
        <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
          <label htmlFor="project-title">Title: </label>
          <input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
            autoFocus
            type="text"
            name="project-title"
            id="project-title"
          />
          <label htmlFor="project-description">Description: </label>
          <input
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
            type="text"
            name="project-description"
            id="project-description"
          />
          <button type="submit" className="border-solid bg-green-400 mt-3 p-1">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
