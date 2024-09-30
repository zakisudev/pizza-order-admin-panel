"use client"

import {useState} from 'react';

const UserStatus = ({ user }:any) => {
 const [isActive, setIsActive] = useState(user?.status === 'active' || false)

  const handleToggleStatus = () => {
    setIsActive(!isActive)
  };

  return (
    <div
      className={`px-3 py-1.5 ${
        isActive ? 'bg-[#008000]/10' : 'bg-[#800000]/10'
      } rounded-full flex items-center justify-between gap-2 w-[102px]`}
    >
      <span className={`text-xs ${isActive ? 'text-[#008000]' : 'text-[#800000]'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
      <button
        className="relative inline-block w-10 h-3"
        onClick={handleToggleStatus}
      >
        <input
          type="checkbox"
          checked={isActive}
          className="opacity-0 w-0 h-0"
          onChange={()=>{}}
        />
        <span
          className={`absolute top-0 left-0 w-[85%] h-full rounded-full transition-colors duration-300 ${
            isActive ? 'bg-[#008000]/20' : 'bg-gray-300'
          }`}
        ></span>
        <span
          className={`absolute top-0 left-0.5 w-3 h-3 ${
            isActive ? 'bg-[#008000]' : 'bg-[#800000]'
          } rounded-full shadow-md transform transition-transform duration-300 ${
            isActive ? 'translate-x-4' : ''
          }`}
        ></span>
      </button>
    </div>
  );
};

export default UserStatus;
