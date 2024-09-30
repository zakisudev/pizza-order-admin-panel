'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import logo from '@/assets/images/emojione_pizza.png';
import registerPizza from '@/assets/images/registerPizza.png';
import Link from 'next/link';
import { handleLoginApi } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/reducers/auth';
import spinner from '@/assets/icons/spinner.svg';

const LoginPage = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const res = await handleLoginApi(data);

      if (!res || res?.error) {
        toast.error(res?.error?.data || "An error has occurred");
        return;
      }

      dispatch(setUser(res?.user));

      const returnUrl = redirect ? decodeURIComponent(redirect) : '/';
      router.push(returnUrl);

      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const returnUrl = redirect ? decodeURIComponent(redirect) : '/';
      router.push(returnUrl);
    }
  }, [user, router, redirect]);

  return (
    <div className="flex justify-center items-center h-screen max-w-hxl w-full mx-auto">
      <div className="hidden sm:flex justify-center items-center bg-primary w-1/2 h-full">
        <div className="flex gap-4 items-center w-[300px] h-[300px]">
          <Image
            src={registerPizza}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex justify-center w-full sm:w-1/2 h-full bg-white px-6 sm:px-[84px]">
        <div className="flex flex-col justify-center w-full gap-12 h-full">
          <div className="flex gap-4 items-center">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={50}
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-xl text-textLogo font-extrabold">PIZZA</h2>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="flex flex-col relative">
              <label
                htmlFor="email"
                className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email', { required: 'Email is required' })}
                className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="password"
                className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must not exceed 20 characters',
                  },
                })}
                placeholder="Enter your password"
                className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col my-4 pl-4">
              <div className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  {...register('remember')}
                  className="rounded-md h-[18px] w-[18px]"
                />
                <label htmlFor="remember" className="font-medium text-textDark">
                  Remember me
                </label>
              </div>
              {errors?.terms && (
                <p className="pl-4 mt-2 text-xs text-red-500">
                  {errors?.terms?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`flex gap-2 w-full justify-center text-center px-7 py-2 ${
                isLoading
                  ? 'bg-gray-700 text-gray-700'
                  : 'bg-primary text-white'
              } rounded-[4px] font-bold`}
            >
              {isLoading ? (
                <Image
                  src={spinner}
                  width={24}
                  height={24}
                  alt="spinner"
                  className="w-6 h-6 object-contain"
                />
                ) :  "LOGIN"
              }
            </button>
            <div className="flex w-full flex-col gap-4">
              <p className="text-textDark text-center font-semibold">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
