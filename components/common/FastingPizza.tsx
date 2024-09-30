"use client";

import PizzaCard from '@/components/ui/PizzaCard';
import { useSelector } from 'react-redux';

const FastingPizzas = () => {
  const {pizzas} = useSelector((state) => state.pizzas);

  return (
    <div className="flex flex-col gap-6 py-10 pl-[5%] bg-bodyBg">
      <h2 className="text-black/50 font-medium text-responsiveTag">Fasting Pizzas</h2>
      <div className="flex gap-6 overflow-x-scroll">
        {pizzas?.length > 0 && pizzas?.map((piz) => (
          <PizzaCard key={piz._id} pizza={piz} type="fasting" />
        ))}
      </div>
    </div>
  );
};

export default FastingPizzas;
