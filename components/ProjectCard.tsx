import React from 'react';
import Project from '@/types/Project';

export default function ProjectCard({
  setIsCardShowing,
  cardContents,
}: Project) {
  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/30"
    >
      <div className="bg-white flex flex-col gap-2 w-[50%] h-[50%] p-3 shadow-md border-[1px] border-slate-400 rounded">
        <div
          onClick={() => setIsCardShowing(false)}
          className="flex justify-end w-[100%] p-1 cursor-pointer"
        >
          X
        </div>
        <h2 className="font-medium">{cardContents.projectTitle}</h2>
        <p>{cardContents.projectDesc}</p>
      </div>
    </div>
  );
}
