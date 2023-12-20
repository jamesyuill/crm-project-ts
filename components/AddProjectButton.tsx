import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import NewProjectModal from './NewProjectModal';
import Project from '@/types/Project';

type Props = {
  plainID: string;

  projectTypeName: string;
  setProjects: Function;
};

export default function NewProjectButton({
  plainID,

  setProjects,
  projectTypeName,
}: Props) {
  const [isAddNewShowing, setIsAddNewShowing] = useState(false);

  const handleClick = () => {
    setIsAddNewShowing(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex gap-1  rounded p-1  cursor-pointer items-center hover:bg-blue-200/70 "
      >
        <IoMdAdd size={20} />
        <p className="text-sm font-fredoka font-{400}">Add a card</p>
      </div>

      {isAddNewShowing && (
        <NewProjectModal
          plainID={plainID}
          setProjects={setProjects}
          projectTypeName={projectTypeName}
          setIsAddNewShowing={setIsAddNewShowing}
        />
      )}
    </>
  );
}
