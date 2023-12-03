import ProjectProps from '@/types/ProjectProps';
import React from 'react';

export default function SubList({
  projects,
  _id,
  projectTypeName,
}: ProjectProps) {
  return (
    <div>
      <h1>{projectTypeName}</h1>
    </div>
  );
}
