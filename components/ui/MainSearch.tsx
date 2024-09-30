"use client";

import { useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/assets/icons/Search.png';

const MainSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = ()=> {};

  return (
    <div className="w-full h-[57px] sm:h-[118px] flex relative justify-between bg-white items-center rounded-full px-[6px] py-[6px]">
      <input
        type="text"
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
        name="searchTerm"
        className="h-full w-full rounded-l-full placeholder:text-textGray text-responsiveTag focus:outline-none ml-2 sm:ml-9 pr-3"
        placeholder="Search"
      />
      <button
        className="flex justify-center items-center min-w-[48px] min-h-[48px] max-w-[106px] max-h-[106px] w-fit sm:w-full h-full bg-primary rounded-full p-4 sm:p-6"
        onClick={handleSearch}>
        <Image
          src={searchIcon}
          alt="search"
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  )
}

export default MainSearch