import React from 'react';
import { IoMdAdd } from 'react-icons/io';

export default function NewProjectButton() {
  const handleClick = () => {};
  return (
    <div
      onClick={handleClick}
      className="flex shadow-md border-[1px] border-slate-400 rounded p-1 justify-center cursor-pointer"
    >
      <IoMdAdd size={20} />
    </div>
  );
}
