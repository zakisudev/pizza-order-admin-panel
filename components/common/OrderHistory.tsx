'use client';

import OrderCard from '@/components/ui/OrderCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchUserOrders } from '@/utils/api';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setOrders } from '@/redux/reducers/order';
import Image from 'next/image';
import spinner from '@/assets/icons/spinner.svg';
import {useRouter} from 'next/navigation';
import {setUser} from '@/redux/actions/auth'
import { RootState } from '@/redux/rootReducer';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state :any) => state.auth);
  const { orders } = useSelector((state :any) => state.orders);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentPath = '/orders';

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const fetchOrders = async () => {
        try {
          const res = await fetchUserOrders();

          if (!res || res.error) {
            if (res.error === "Unauthorized") {
              router.push(`/login?redirect=${currentPath}`);
              dispatch(setUser(null));
              setIsLoading(false);
              setError(res.error);
            }
            setIsLoading(false);
            setError(res.error);
            return;
          }
          dispatch(setOrders(res.orders));
        } catch (error) {
          console.log(error);
          toast.error('An error occurred');
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user, setIsLoading, dispatch, router]);

  return (
    <div className="flex flex-col gap-6 sm:py-6 bg-gradient-to-b from-bodyBg/50 to-bodyBg">
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

      <h2 className="text-black/50 font-medium text-responsiveTag">Order History</h2>
      {!user ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <p className="text-2xl">Please login to view your order history</p>
          <Link
            href={`/login?redirect=${encodeURIComponent(currentPath)}`}
            className="text-xl text-blue-500 underline"
          >
            Login
          </Link>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <p className="text-2xl">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {orders?.map((order:any) => (
            <OrderCard key={order._id} order={order} status={order.status} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
