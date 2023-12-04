import React from 'react';

type Project = {
  project: {
    projectTitle: string;
    projectDesc: string;
    projectImages?: string[];
  };
};

export default function ProjectCard({ project }: Project) {
  return (
    <div>
      <h2>{project.projectTitle}</h2>
    </div>
  );
}
