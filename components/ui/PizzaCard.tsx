'use client';

import Image from 'next/image';
import Link from 'next/link';
import reviewImage from '@/assets/images/Review.png';
import spinner from '@/assets/icons/spinner.svg';
import pizzaPlate from '@/assets/images/PizzaPlate.png';

const PizzaCard = ({ pizza, status, type =""}:any) => {
  if (!pizza) {
    return (
      <div className="flex justify-center items-center w-12 h-12">
        <Image
          src={spinner}
          width={50}
          height={50}
          alt="loading"
          className="object-contain w-full h-full"
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${type === "fasting" ? "max-w-[300px] sm:max-w-full" : ""} sm:w-[387px] min-w-[387px] h-75 bg-white rounded-xl p-7`}>
      <div className="flex justify-center items-center mx-auto max-w-[276px] max-h-[276px] relative">
        <Image
          src={pizzaPlate}
          alt="pizza"
          layout="responsive"
          width={500}
          height={500}
          className="object-contain w-full h-full"
        />
        <Image
          alt={pizza?.name || 'pizza'}
          layout="responsive"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          loading="lazy"
          src={pizza?.imageUrl}
          width={200}
          height={200}
          className="absolute top-0 bottom-0 right-0 left-0 w-[465px] h-[465px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2
          className={`font-bold ${
            status === 'related'
              ? 'text-center text-[25px]'
              : 'text-left text-2xl'
          }`}
        >
          {pizza?.name}
        </h2>
        <p
          className={`${
            status === 'related'
              ? 'text-[15px] text-center'
              : 'text-xs text-left'
          }`}
        >
          {pizza?.description}
        </p>
      </div>
      {status ? (
        <p
          className={`${
            status?.received ? 'text-orderConfirmed' : 'text-primary'
          } text-[32px] font-bold`}
        >
          {status}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-2">
              <h2 className="text-priceText font-bold text-[45px]">
                {pizza?.price}
              </h2>
              <p className="text-xs pt-4">Birr</p>
            </div>
            <Link
              href={`/pizza/${pizza?._id}`}
              className="px-5 py-[10px] bg-primary rounded-xl text-2xl text-center w-[188px] text-white font-bold"
            >
              Order
            </Link>
          </div>
          <>
            <hr className="h-1 bg-gray-100" />
            <div className="flex justify-between px-4 items-center gap-4 mt-4">
              <div className="flex w-[65px] sm:w-12 h-[65px] sm:h-12 rounded-full">
                <Image
                  src={reviewImage}
                  width={65}
                  height={65}
                  quality={100}
                  alt="review"
                  className="object-contain w-full h-full"
                />
              </div>
              <h2 className="text-xl font-bold">Azmera Pizza</h2>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default PizzaCard;
