'use client';
import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import NewSublistModal from './NewSublistModal';

export default function NewSublistButton() {
  const [isAddNewSublistShowing, setIsAddNewSublistShowing] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsAddNewSublistShowing(true);
    //need state to show modal
    //optimistically render new sublist
    //need a new route for creating a new sublist
  };

  return (
    <>
      <section className="border-2 border-slate-300 p-3 min-w-[250px] h-fit cursor-pointer">
        <div onClick={handleClick} className="flex justify-center">
          <IoMdAdd size={20} />
        </div>
      </section>

      {isAddNewSublistShowing && (
        <NewSublistModal
          setIsAddNewSublistShowing={setIsAddNewSublistShowing}
        />
      )}
    </>
  );
}
