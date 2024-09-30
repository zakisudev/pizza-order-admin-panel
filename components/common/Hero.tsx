"use client";

import MainSearch from '@/components/ui/MainSearch';
import Image from 'next/image';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { fetchPizzas } from '@/redux/actions/pizza';
import heroPizza from '@/assets/images/heroPizza.png';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full sm:py-6 sm:h-screen bg-gradient-to-b from-white from-0% via-[#FFC993] to-bodyBg">
      <div className="flex sm:gap-5 sm:justify-between">
        <section className="flex flex-col gap-2 sm:gap-12 sm:max-w-[766px] w-full sm:w-[85%] pl-[15px] sm:pl-[8%] pt-[50px] sm:pt-[7%]">
          <h1 className="text-responsiveHeader w-full inline-block font-bold bg-gradient-to-r from-gradDark to-gradLight text-transparent bg-clip-text">
            Order us
          </h1>

          <p className="text-textPrimary text-responsiveParagraph">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without.
          </p>
          <div className="flex w-full">
            <MainSearch />
          </div>
        </section>
        <div className="flex w-[60%] sm:w-[40%]">
          <div className="flex max-w-[589px] max-h-[794px] ml-auto mt-[26px] relative">
            <Image
              src={heroPizza}
              alt="pizza"
              width={794}
              height={806}
              className="object-right object-contain w-full h-full z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
