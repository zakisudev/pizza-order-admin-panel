'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PizzaCard from '@/components/ui/PizzaCard';
import { orderApi } from '@/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas, fetchPizza } from '@/redux/actions/pizza';
import {
  setQuantity,
  addTopping,
  removeTopping,
  setType,
} from '@/redux/reducers/cart';
import back from '@/assets/icons/back.png';
import pizzaPlate from '@/assets/images/PizzaPlate.png';
import meatPizza from '@/assets/images/MeatPizza.png';
import cheesePizza from '@/assets/images/CheesePizza.png';
import cheesePizzaImage from '@/assets/images/cheese.png';
import meatPizzaImage from '@/assets/images/meat.png';
import minusIcon from '@/assets/icons/minus.png';
import plusIcon from '@/assets/icons/plus.png';
import arrowOrderIcon from '@/assets/icons/arrowOrder.png';
import { toast } from 'react-toastify';
import { clearCart } from '@/redux/reducers/cart';
import spinner from '@/assets/icons/spinner.svg';
import OrderConfirmationCard from '@/components/ui/OrderConfirmationCard';
import { RootState } from '@/redux/rootReducer';

const PizzaDetails = ({ params }:any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state : RootState) => state.auth);
  const { pizzas } = useSelector((state : RootState) => state.pizzas);
  const cart = useSelector((state : RootState) => state.cart);
  const currentPath = `/pizza/${params?.id}`;
  const { pizza, type, toppings, quantity } = useSelector((state : any) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false)

  const variants = {
    enter: {
      x: '100%',
      rotate: 180,
      opacity: 1,
    },
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      x: '-100%',
      rotate: -180,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  useEffect(() => {
    setIsLoading(true);
    if (!pizzas || !pizzas?.length) {
      const getPizzas = async () => {
        dispatch(fetchPizzas());
        dispatch(fetchPizza(params?.id));
      };

      getPizzas();
    }

    dispatch(fetchPizza(params?.id));
    setIsLoading(false);
    setHasMounted(true);
  }, [params?.id, pizzas, dispatch]);

  const handleCheesePizza = () => {
    dispatch(setType(pizza?.types[0]));
  };

  const handleMeatPizza = () => {
    dispatch(setType(pizza?.types[1]));
  };

  const handleCheckboxChange = (e:any) => {
    const { name, checked } = e.target;
    if (checked && !toppings?.find((t:string) => t === name)) {
      dispatch(addTopping(name));
    } else {
      dispatch(removeTopping(name));
    }
  };

  const handleOrderMinus = () => {
    if (quantity === 1) {
      return;
    }

    dispatch(setQuantity(quantity - 1));
  };

  const handleOrderPlus = () => {
    dispatch(setQuantity(quantity + 1));
  };

  const handleOrder = async () => {
    if (!user) {
      router.push(`/login?redirect=${currentPath}`);
      return;
    }

    setIsOrdering(true);
    try {
      const res = await orderApi(cart);
      if (!res || res.error) {
        toast.error(res.error);
        return;
      }

      dispatch(clearCart());
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
        router.push('/orders');
        router.refresh();
      }, 1000);
      setIsOrdering(false);
    } catch (error) {
      console.log(error);
      setIsOrdering(false);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-[5%] w-full">
      <button onClick={() => router.back()} className="flex items-center">
        <div className="flex w-7 h-7">
          <Image
            src={back}
            width={20}
            height={20}
            alt="back"
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="text-xl text-textDark font-bold"> Go Back</h3>
      </button>

      {isLoading && (
        <div className="absolute z-50 inset-0 bg-black/60 flex justify-center items-center">
          <Image
            src={spinner}
            width={50}
            height={50}
            alt="spinner"
            className="w-10 h-10 object-contain"
          />
        </div>
      )}

      {isModalVisible && (
        <OrderConfirmationCard title="Your order has been successfully completed." />
      )}

      <div className="flex flex-col sm:flex-row gap-10 items-center">
        <div className="flex gap-10 items-center w-full">
          <div className="w-[251px] sm:w-[500px] sm:h-[500px] h-[251px] overflow-hidden relative">
            {/* Pizza Plate Image */}
            <Image
              src={pizzaPlate}
              alt="pizza"
              layout="responsive"
              width={500}
              height={500}
              className="object-contain w-full h-full"
            />

            {/* AnimatePresence component to handle exit animations */}
            <AnimatePresence mode="wait">
              {pizza?.types && type === pizza?.types[0] ? (
                <motion.div
                  key="cheese"
                  className="flex justify-center items-center absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  initial={hasMounted ? 'enter' : false}
                >
                  <div className="w-[200px] sm:w-[500px] h-[200px] sm:h-[500px]">
                    <Image
                      src={cheesePizza}
                      alt="Cheese Pizza"
                      layout="responsive"
                      width={500}
                      height={500}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="meat"
                  className="flex justify-center items-center absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  initial={hasMounted ? 'enter' : false}
                >
                  <div className="w-[210px] sm:w-[500px] h-[210px] sm:h-[500px]">
                    <Image
                      src={meatPizza}
                      alt="Meat Pizza"
                      layout="responsive"
                      width={500}
                      height={500}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-10">
            <button
              className="flex w-[100px] sm:w-[208px] h-[100px] sm:h-[208px] relative"
              onClick={handleCheesePizza}
            >
              <Image
                src={cheesePizzaImage}
                alt="cheese pizza"
                layout="responsive"
                width={208}
                height={208}
                className="object-contain w-full h-full"
              />
              {pizza?.types && type !== pizza?.types[0] && (
                <div className="absolute bg-black/40 w-full h-full flex items-center rounded-full justify-center"></div>
              )}
            </button>
            <button
              className="flex w-[100px] sm:w-[208px] h-[100px] sm:h-[208px] relative"
              onClick={handleMeatPizza}
            >
              <Image
                src={meatPizzaImage}
                alt="cheese pizza"
                layout="responsive"
                width={208}
                height={208}
                className="object-contain w-full h-full"
              />
              {pizza?.types && type !== pizza?.types[1] && (
                <div className="absolute bg-black/40 w-full h-full flex items-center rounded-full justify-center"></div>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 msm:l-7 max-w-[522px] w-full">
          <h2 className="text-[35px] sm:text-[80px] font-bold">{pizza?.name}</h2>
          {/* Toppings */}
          <ul className="flex items-center gap-6 flex-wrap">
            {pizza?.toppings?.map((topping: string) => (
              <li key={topping} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={topping}
                  name={topping}
                  className="rounded-md h-[18px] w-[18px]"
                  onChange={handleCheckboxChange}
                  checked={toppings?.includes(topping)}
                />
                <label htmlFor={topping}>
                  {topping.charAt(0).toUpperCase() + topping.slice(1)}
                </label>
              </li>
            ))}
          </ul>

          <div className="flex gap-9 items-center">
            <div className="flex items-center gap-5 sm:gap-10">
              <button
                onClick={handleOrderMinus}
                className="flex justify-center items-center rounded-[10px] border border-primary w-[50px] h-[60px] sm:w-[70px] sm:h-[60px]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src={minusIcon}
                    width={60}
                    height={60}
                    quality={100}
                    alt="minus icon"
                    className="object-contain w-full h-full"
                  />
                </div>
              </button>
              <h2 className="text-3xl font-semibold">{quantity}</h2>
              <button
                onClick={handleOrderPlus}
                className="flex justify-center items-center rounded-[10px] border border-primary w-[50px] h-[60px] sm:w-[70px] sm:h-[60px]"
              >
                <div className="w-10 h-10">
                  <Image
                    src={plusIcon}
                    width={60}
                    height={60}
                    quality={100}
                    alt="minus icon"
                    className="object-contain w-full h-full"
                  />
                </div>
              </button>
            </div>
            <div className="flex gap-2">
              <h2 className="text-priceText font-bold text-[45px]">
                {pizza?.price}
              </h2>
              <p className="text-xs pt-4">Birr</p>
            </div>
          </div>
          {isOrdering ? (
            <div className="flex justify-center items-center w-10 h-10">
              <Image
                src={spinner}
                width={40}
                height={40}
                alt="spinner"
                className="w-10 h-10 object-contain"
              />
            </div>
            ) : (
            <button
              onClick={handleOrder}
              disabled={isLoading || isOrdering}
              className={`${
                isLoading || isOrdering ? 'bg-gray-400 text-gray-700' : 'bg-primary text-white'
              } flex gap-4 justify-between px-5 py-[15px] w-full font-bold text-2xl text-center rounded-md items-center`}
            >
              Order
            <div className="w-5 h-5">
              <Image
                src={arrowOrderIcon}
                width={20}
                height={20}
                alt="arrow right"
                className="object-contain w-full h-full"
              />
            </div>
          </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 py-6 bg-gradient-to-b from-bodyBg/50 to-bodyBg">
        <h2 className="text-black/50 font-medium text-5xl">Related</h2>
        <div className="grid grid-cols-3 gap-12 overflow-x-scroll">
          {pizzas?.filter((p:any)=> p._id !== pizza._id)?.map((piz:any) => (
            <PizzaCard key={piz._id} pizza={piz} status="related" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PizzaDetails;
