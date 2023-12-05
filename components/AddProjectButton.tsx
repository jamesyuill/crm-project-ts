import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import NewProjectModal from './NewProjectModal';

type Props = {
  projectTypeName: string;
};

export default function NewProjectButton({ projectTypeName }: Props) {
  const [isAddNewShowing, setIsAddNewShowing] = useState(false);

  const handleClick = () => {
    setIsAddNewShowing(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex shadow-md border-[1px] border-slate-400 rounded p-1 justify-center cursor-pointer"
      >
        <IoMdAdd size={20} />
      </div>

      {isAddNewShowing && (
        <NewProjectModal
          projectTypeName={projectTypeName}
          setIsAddNewShowing={setIsAddNewShowing}
        />
      )}
    </>
  );
}
