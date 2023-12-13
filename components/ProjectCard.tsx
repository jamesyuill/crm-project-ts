import React from 'react';
import Project from '@/types/Project';
import { IoMdClose } from 'react-icons/io';
import MiniImageDisplay from './MiniImageDisplay';

interface Props {
  plainID: string;
  setProjects: Function;
  projectTypeName: string;
  cardContents: Project;
  setIsCardShowing: Function;
  setCardContents: Function;
}

export default function ProjectCard({
  plainID,
  setProjects,
  projectTypeName,
  setIsCardShowing,
  cardContents,
  setCardContents,
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

  const changeContents = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProjects((curr: []) => {
      let amended = curr.map((project: Project) => {
        if (project._id === cardContents._id) {
          project[field] = e.target.value;
          return project;
        }
        return project;
      });
      return amended;
    });
    setCardContents((curr: Project) => {
      let newObj = {
        ...curr,
        [field]: e.target.value,
      };
      return newObj;
    });
  };

  const sendChanges = async () => {
    try {
      const res = await fetch('api/updateProject', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plainID, cardContents }),
      });

      if (!res.ok) {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.log('There was an error updating the project', error);
    }
  };
  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/60"
    >
      <div className="w-[90%] bg-blue-100 flex flex-col gap-2  p-3 shadow-md border-[1px] border-slate-400 rounded sm:w-[400px] h-[500px]">
        <div
          id="box-lining"
          className=" p-1 border-[1px] border-zinc-200 h-[100%] rounded bg-white"
        >
          <div className="flex justify-between">
            <h2 className="p-1">Category: {projectTypeName}</h2>
            <div
              onClick={() => setIsCardShowing(false)}
              className="p-1 cursor-pointer hover:drop-shadow-lg"
            >
              <IoMdClose size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2 h-[87%]">
            <div className="flex flex-row gap-2 p-1">
              <h2>Project title: </h2>
              <input
                value={cardContents.projectTitle}
                onChange={(e) => changeContents(e, 'projectTitle')}
                onBlur={sendChanges}
              />
            </div>
            <h2 className="p-1">More info:</h2>
            <div className=" border-y-[1px] border-zinc-300 p-3 flex-grow">
              <textarea
                value={cardContents.projectDesc}
                onChange={(e: React.ChangeEvent<{ value: string }>) =>
                  changeContents(e, 'projectDesc')
                }
                onBlur={sendChanges}
                className="text-sm"
              />
            </div>

            <div id="images">
              <h2>Images:</h2>

              <MiniImageDisplay cardContents={cardContents} />
            </div>
            <button
              onClick={deleteProject}
              className="border-solid bg-red-400 mt-3 p-1 text-white hover:bg-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
