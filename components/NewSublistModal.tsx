'use client';

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';

type Props = {
  setIsAddNewSublistShowing: Function;
  setProjectTypesControlled: Function;
};

export default function NewSublistModal({
  setIsAddNewSublistShowing,
  setProjectTypesControlled,
}: Props) {
  const [newProjectType, setNewProjectType] = useState('');
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = await fetch('api/addSublist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newProjectType }),
      });

      const returnedSublist = await res.json();
      setProjectTypesControlled((curr: []) => {
        return [...curr, returnedSublist];
      });
    } catch (error) {
      console.log('An error occured posting new category', error);
    }
    setIsAddNewSublistShowing(false);
  };

  const handleClose = () => {
    setIsAddNewSublistShowing(false);
  };

  return (
    <div
      id="container-background"
      className="absolute top-0 left-0 w-screen h-screen z-1 flex flex col  justify-center items-center bg-slate-600/60"
    >
      <div className="w-[90%] h-[90%] bg-blue-100 flex flex-col gap-2 p-3 shadow-md border-[1px] border-slate-400 rounded sm:w-[400px] h-[250px] ">
        <div
          id="box-lining"
          className=" p-1 border-[1px] border-zinc-200 h-[100%] rounded bg-white"
        >
          <div
            onClick={handleClose}
            className="flex justify-end w-[100%] p-1 cursor-pointer"
          >
            <IoMdClose size={20} />
          </div>

          <form
            className="flex flex-col gap-2 mt-2 p-1 h-[80%] justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 p-1">
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
            </div>

            <button
              type="submit"
              className="border-solid bg-green-400 mt-3 p-1 hover:bg-green-300"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
