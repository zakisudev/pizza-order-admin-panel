'use client';

import logo from '@/assets/images/emojione_pizza.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { handleLogoutApi } from '@/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUser } from '@/redux/reducers/auth';
import burger from '@/assets/icons/burger.svg';
import closeIcon from '@/assets/icons/closeIcon.svg';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await handleLogoutApi();

      if (!res || res?.error) {
        toast.error(res.error || 'An error has occurred');
        return;
      }

      dispatch(setUser(null));
      router.replace('/');
      toast.success('Logout Successful');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
      setMobileMenu(false)
    }
  };

  const handleClick = (text)=> {
    setMobileMenu(false);
    router.push(text)
  }

  return (
    <nav className="flex items-center justify-between h-20 sm:h-[75px] px-5 relative">
      <Link href="/" className="flex gap-4 items-center">
        <div className="w-[50px] h-[50px]">
          <Image
            src={logo}
            alt="logo"
            className="object-contain w-full h-full"
          />
        </div>
        <h2 className="text-xl text-textLogo font-extrabold">PIZZA</h2>
      </Link>

      {/* Navigation */}
      <div
        className="flex items-center gap-10  sm:gap-[150px] justify-between
      "
      >
        <Link
          href="/"
          className={`text-2xl font-bold ${
            pathname === '/' ? 'text-primary' : 'text-textDark'
          }`}
        >
          Home
        </Link>
        <Link
          href="/orders"
          className={`text-2xl font-bold ${
            pathname === '/orders' ? 'text-primary' : 'text-textDark'
          }`}
        >
          Orders
        </Link>
        <Link
          href="/who-we-are"
          className={`hidden lg:flex items-center text-2xl font-bold ${
            pathname === '/who-we-are' ? 'text-primary' : 'text-textDark'
          }`}
        >
          Who we are
        </Link>
      </div>

      {/* Registration and logout*/}
      <div className="hidden sm:flex items-center gap-4">
        {user ? (
          <>
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary font-bold text-textDark text-xl">
              {user?.email?.slice(0, 1)?.toUpperCase()}
            </div>
            {user?.isAuth ? (
              <Link href="/admin/orders" className="text-xl font-bold px-3 py-2 rounded-md bg-primary text-textDark">
                Dashboard
              </Link>
            ) : <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`p-2 ${
                isLoading
                  ? 'bg-gray-400 text-gray-700'
                  : 'bg-primary text-white'
              } rounded-[4px] font-bold`}
            >
              Logout
            </button>}
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <Link
              href="/login"
              className="text-2xl font-bold px-3 py-2 rounded-md text-textDark"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-2xl font-bold px-7 py-2 rounded-md bg-primary text-textDark"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Burger Menu for mobile screens */}
      <button className="flex sm:hidden w-6 h-6 " onClick={()=> setMobileMenu(true)}>
        <Image src={burger} alt="burger" width={20} height={20} className="z-20 w-full h-full object-contain"/>
      </button>

      {mobileMenu &&
      <div className={`sm:hidden flex flex-col h-screen bg-black/80 w-full fixed top-0 ${mobileMenu ? "right-0" : "-right-full"} z-20 transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col self-end gap-10 w-1/2 h-full bg-white z-30 px-5 pt-7">
          <button className="w-6 h-6 self-end">
            {mobileMenu ?
              (
                <button className="w-6 h-6 self-end" onClick={()=> setMobileMenu(false)}>
                  <Image src={closeIcon} alt="close" width={20} height={20} className="z-50 w-full h-full object-contain"/>
                </button>
              ) : (
                <button className="w-6 h-6 self-end" onClick={()=> setMobileMenu(true)}>
                  <Image src={burger} alt="burger" width={20} height={20} className="z-50 w-full h-full object-contain"/>
                </button>
              )
            }
          </button>

          {user ? (
            <div className="flex flex-col items-center gap-5 mt-10">
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary font-bold text-textDark text-xl">
                {user?.email?.slice(0, 1)?.toUpperCase()}
              </div>
              {user?.isAuth ? (
                <button onClick={()=> handleClick("/admin/orders")} className="text-xl font-bold px-3 py-2 rounded-md bg-primary text-textDark">
                  Dashboard
                </button>
              ) : <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className={`p-2 ${
                      isLoading
                        ? 'bg-gray-400 text-gray-700'
                        : 'bg-primary text-white'
                    } rounded-[4px] font-bold`}
                  >
                  Logout
                </button>
              }
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <button
                onClick={()=> handleClick("/login")}
                className="text-2xl font-bold px-3 py-2 rounded-md text-textDark"
              >
                Login
              </button>
              <button
                onClick={()=> handleClick("/register")}
                className="text-2xl font-bold px-7 py-2 rounded-md bg-primary text-textDark"
              >
                Register
              </button>
            </div>
          )}

          <div
            className="flex flex-col justify-center items-center gap-10  sm:gap-[150px]"
          >
            <button
              onClick={()=> handleClick("/")}
              className={`text-2xl font-bold ${
                pathname === '/' ? 'text-primary' : 'text-textDark'
              }`}
            >
              Home
            </button>
            <button
              onClick={()=> handleClick("/orders")}
              className={`text-2xl font-bold ${
                pathname === '/orders' ? 'text-primary' : 'text-textDark'
              }`}
            >
              Orders
            </button>
            <button
              onClick={()=> handleClick("/who-we-are")}
              className={`text-2xl font-bold ${
                pathname === '/who-we-are' ? 'text-primary' : 'text-textDark'
              }`}
            >
              Who we are
            </button>
          </div>
        </div>
      </div>
      }
    </nav>
  );
};

export default Header;
