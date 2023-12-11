'use client';

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
  const [projectImage0, setProjectImages0] = useState('');
  const [error, setError] = useState('');
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  useEffect(() => {
    const urlPattern =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    //validate title / desc / image
    if (projectTitle === '' || !urlPattern.test(projectImage0)) {
      setAddButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
    }
  }, [projectTitle, projectImage0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newObj = {
      projectTitle: projectTitle,
      projectDesc: projectDesc,
      projectImages: [projectImage0],
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
      <div className="w-[90%] h-[90%] bg-blue-100 flex flex-col gap-2  p-3 shadow-md border-[1px] border-slate-400 rounded sm:w-[400px] h-[400px]">
        <div
          id="box-lining"
          className=" p-1 border-[1px] border-zinc-200 h-[100%] rounded bg-white"
        >
          <div className="flex">
            <h2 className="font-medium p-1 justify-start">{projectTypeName}</h2>
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
            <div id="add-image-url" className="flex flex-col gap-2">
              <label htmlFor="image-url-input">Add a photo: </label>
              <input
                id="image-url-input-1"
                type="text"
                placeholder="Image url"
                onChange={(e) => setProjectImages0(e.target.value)}
                className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
              />
            </div>
            {error && <p>{error}</p>}
            <button
              type="submit"
              className={
                addButtonDisabled
                  ? 'border-solid bg-zinc-400 mt-3 p-1'
                  : 'border-solid bg-green-400 mt-3 p-1 hover:bg-green-300'
              }
              disabled={addButtonDisabled}
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
