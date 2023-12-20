'use client';
import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import NewSublistModal from './NewSublistModal';

type Props = {
  setProjectTypesControlled: Function;
};

export default function NewSublistButton({ setProjectTypesControlled }: Props) {
  const [isAddNewSublistShowing, setIsAddNewSublistShowing] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsAddNewSublistShowing(true);
  };

  return (
    <>
      <section className="border-2 border-blue-300 border-dashed p-3 min-w-[280px] h-fit cursor-pointer hover:bg-blue-200/70 rounded sm:w-[280px] bg-blue-100/30 shadow-lg">
        <div onClick={handleClick} className="flex justify-center">
          <IoMdAdd size={20} />
        </div>
      </section>

      {isAddNewSublistShowing && (
        <NewSublistModal
          setProjectTypesControlled={setProjectTypesControlled}
          setIsAddNewSublistShowing={setIsAddNewSublistShowing}
        />
      )}
    </>
  );
}
