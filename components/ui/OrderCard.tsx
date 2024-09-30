'use client';

import Image from 'next/image';
import pizzaPlate from '@/assets/images/PizzaPlate.png';

const PizzaCard = ({ order, status }) => {
  return (
    <div className="flex flex-col gap-2 w-full sm:min-w-[387px] h-75 bg-white rounded-xl p-7">
      <div className="self-center w-[276px] h-[276px] relative">
        <Image
            src={pizzaPlate}
            alt="pizza"
            layout="responsive"
            width={500}
            height={500}
            className="absolute top-0 bottom-0 right-0 left-0 w-[276px] h-[276px]"
          />
        <Image
          src={order?.pizza?.imageUrl}
          alt={order?.pizza?.name}
          layout="responsive"
          width={500}
          height={500}
          className="object-contain w-[90%] h-[90%]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-left text-2xl">{order?.name}</h2>
        <div className="flex gap-4">
          <p className="text-[15px] font-bold">Toppings: </p>
          <p className="text-[15px] italic">{order?.toppings?.join(', ')}</p>
        </div>
        <div className="flex gap-4">
          <p className="text-[15px] font-bold">Type: </p>
          <p className="text-[15px] italic">{order?.type}</p>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-priceText font-bold text-[45px]">
            {order?.quantity}
          </h2>
          <p className="text-lg">pc{order?.quantity > 1 ? "s" : ""}</p>
        </div>
        <p
          className={`${
            status === 'Delivered' ? 'text-orderConfirmed' : 'text-primary'
          } text-[32px] font-bold`}
        >
          {status === 'Delivered' ? 'Received' : 'Ordered'}
        </p>
      </div>
    </div>
  );
};

export default PizzaCard;
