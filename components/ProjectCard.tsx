import React from 'react';
import Project from '@/types/Project';
import { IoMdClose } from 'react-icons/io';

interface Props {
  cardContents: Project;
  setIsCardShowing: Function;
}

export default function ProjectCard({ setIsCardShowing, cardContents }: Props) {
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
        <h2 className="font-medium">{cardContents.projectTitle}</h2>
        <p>{cardContents.projectDesc}</p>
      </div>
    </div>
  );
}
