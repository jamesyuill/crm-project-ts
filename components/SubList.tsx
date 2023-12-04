import ProjectProps from '@/types/ProjectProps';
import React from 'react';
import ProjectCard from './ProjectCard';

export default function SubList({
  projects,
  _id,
  projectTypeName,
}: ProjectProps) {
  return (
    <section className="border-2 border-slate-800 p-3 w-[30%]">
      <h1 className="font-semibold">{projectTypeName}</h1>
      <div className="flex flex-col gap-2 bg-red-300"></div>
    </section>
  );
}
