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
        className="flex shadow-md border-[1px] border-blue-400 rounded p-1 justify-center cursor-pointer"
      >
        <IoMdAdd size={20} />
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
