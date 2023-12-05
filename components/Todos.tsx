'use client';

import React from 'react';

type Project = {
  projectTitle: string;
  projectDesc: string;
  projectImages?: string[];
};

export default function Todos({ projects }: any) {
  const stringify = JSON.stringify(projects);
  const parsed = JSON.parse(stringify);

  return (
    <div className="flex flex-col gap-3 mt-4">
      {parsed.map((item: Project) => {
        return (
          <div
            className=" shadow-md border-[1px] border-slate-400 rounded p-1"
            key={item.projectTitle}
          >
            {item.projectTitle}
          </div>
        );
      })}
    </div>
  );
}
