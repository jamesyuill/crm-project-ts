import React from 'react';
import Project from '@/types/Project';
import { IoMdClose } from 'react-icons/io';

interface Props {
  plainID: string;
  setProjects: Function;
  projectTypeName: string;
  cardContents: Project;
  setIsCardShowing: Function;
}

export default function ProjectCard({
  plainID,
  setProjects,
  projectTypeName,
  setIsCardShowing,
  cardContents,
}: Props) {
  const deleteProject = async () => {
    setIsCardShowing(false);

    //optimistically remove from array
    setProjects((curr: []) => {
      return curr.filter(
        (project: Project) => project._id !== cardContents._id
      );
    });

    //send id (plainID), and card contents to DB
    try {
      const res = await fetch('api/deleteProject', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plainID, cardContents }),
      });
    } catch (error) {
      console.log('There was an error deleting the project', error);
    }
  };

  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/60"
    >
      <div className="bg-white flex flex-col gap-2 w-[50%] h-[50%] p-3 shadow-md border-[1px] border-slate-400 rounded">
        <div
          onClick={() => setIsCardShowing(false)}
          className="flex justify-end w-[100%] p-1 cursor-pointer"
        >
          <IoMdClose size={20} />
        </div>
        <h2 className="font-medium">{projectTypeName}</h2>
        <div className="flex flex-col gap-2 mt-2">
          <h2>{cardContents.projectTitle}</h2>
          <p>{cardContents.projectDesc}</p>
          <button
            onClick={deleteProject}
            className="border-solid bg-red-400 mt-3 p-1 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
