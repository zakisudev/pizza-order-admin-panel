"use client";

import PizzaCard from '@/components/ui/PizzaCard';
import { useSelector } from 'react-redux';

const PopularPizzas = () => {
  const {pizzas} = useSelector((state) => state.pizzas);

  return (
    <div
      id="popular-pizzas"
      className="flex flex-col gap-6 p-[5%] bg-gradient-to-b from-bodyBg/50 to-bodyBg"
    >
      <h2 className="text-black/50 font-medium text-responsiveTag">Popular Pizzas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] sm:gap-12">
        {pizzas.length > 0 &&
          pizzas?.map((piz) => <PizzaCard key={piz._id} pizza={piz} />)}
      </div>
    </div>
  );
};

export default PopularPizzas;
