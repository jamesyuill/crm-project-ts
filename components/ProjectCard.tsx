import React from 'react';

type Project = {
  projects: {
    projectTitle: string;
    projectDesc: string;
    projectImages?: string[];
  };
};

export default function ProjectCard({ projects }: Project) {
  return (
    <div>
      <h2>{projects.projectTitle}</h2>
    </div>
  );
}
