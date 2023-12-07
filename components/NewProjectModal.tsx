'use client';

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
// import { ObjectId } from 'bson';

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

    setIsAddNewShowing(false);

    //Sends the new project off to DB
    try {
      const res = await fetch('api/addProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plainID, newObj }),
      });
      const returnedProject = await res.json();

      setProjects((curr: any) => {
        let newArr = [...curr, returnedProject];

        return newArr;
      });
    } catch (error) {}
  };

  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/60"
    >
      <div className="bg-blue-100 flex flex-col gap-2 w-[40%] h-[50%] p-3 shadow-md border-[1px] border-slate-400 rounded">
        <div
          id="box-lining"
          className=" p-1 border-[1px] border-zinc-200 h-[100%] rounded bg-white"
        >
          <div className="flex justify-between">
            <h2 className="font-medium p-1">{projectTypeName}</h2>
            <div
              onClick={() => setIsAddNewShowing(false)}
              className="flex justify-end w-[100%] p-1 cursor-pointer"
            >
              <IoMdClose size={20} />
            </div>
          </div>
          <form
            className="flex flex-col gap-2 mt-2 p-1 h-[87%] justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
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
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                className="border-solid border-[1px] border-slate-300 p-[0.2rem] "
                name="project-description"
                id="project-description"
              />
            </div>
            <button
              type="submit"
              className="border-solid bg-green-400 mt-3 p-1 hover:bg-green-300"
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
