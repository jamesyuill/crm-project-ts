'use client';

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

type Props = {
  setIsAddNewSublistShowing: Function;
};

export default function NewSublistModal({ setIsAddNewSublistShowing }: Props) {
  const [newProjectType, setNewProjectType] = useState('');

  const handleSubmit = () => {
    setIsAddNewSublistShowing(false);
  };

  const handleClick = () => {
    setIsAddNewSublistShowing(false);
  };

  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/60"
    >
      <div className="bg-white flex flex-col gap-2 w-[50%] h-[50%] p-3 shadow-md border-[1px] border-slate-400 rounded">
        <div
          onClick={handleClick}
          className="flex justify-end w-[100%] p-1 cursor-pointer"
        >
          <IoMdClose size={20} />
        </div>

        <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
          <label htmlFor="new-project-type">Add New Category: </label>
          <input
            value={newProjectType}
            onChange={(e) => setNewProjectType(e.target.value)}
            className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
            autoFocus
            type="text"
            name="new-project-type"
            id="new-project-type"
          />

          <button type="submit" className="border-solid bg-green-400 mt-3 p-1">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
