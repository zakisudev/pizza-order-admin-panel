"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import withAuth from '@/components/auth/withAuth';
import Image from 'next/image';
import logo from '@/assets/images/emojione_pizza.png';
import sideToggle from '@/assets/icons/sideToggle.svg';
import ordersIcon from '@/assets/icons/ordersIcon.svg';
import menuIcon from '@/assets/icons/menuIcon.svg';
import rolesIcon from '@/assets/icons/rolesIcon.svg';
import usersIcon from '@/assets/icons/usersIcon.svg';
import logout from '@/assets/icons/Logout.svg';
import bellIcon from '@/assets/icons/bell.svg';
import user from '@/assets/icons/user.svg';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { handleLogoutApi } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/reducers/auth';
import { Tooltip as ReactTooltip } from 'react-tooltip'

const AdminLayout = ({ children }:any) => {
  const dispatch= useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState("/admin/orders");
  const [label, setLabel] = useState('Orders');
  const [isLoading, setIsLoading] = useState(false);

  const navItems= [
    {
      key: '1',
      icon: <Image src={ordersIcon} width={24} height={24} alt="orders" className="w-6 h-6 object-contain"/>,
      label: 'Orders',
      href: '/admin/orders',
    },
    {
      key: '2',
      icon: <Image src={menuIcon} width={24} height={24} alt="add menu" className="w-6 h-6 object-contain"/>,
      label: 'Add Menu',
      href: '/admin/add-menu',
    },
    {
      key: '3',
      icon: <Image src={rolesIcon} width={24} height={24} alt="roles" className="w-6 h-6 object-contain"/>,
      label: 'Roles',
      href: '/admin/roles',
    },
    {
      key: '4',
      icon: <Image src={usersIcon} width={24} height={24} alt="users" className="w-6 h-6 object-contain"/>,
      label: 'Users',
      href: '/admin/users',
    },
  ];

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
    }
  };

  const handleLink = (location:any) => {
    setUrl(location.href);
    setLabel(location.label)
    return router.push(location.href);
  }

  return (
    <div className="flex h-screen max-w-hxl w-full mx-auto">
      <aside className={`flex flex-col ${isOpen ? "w-[258px]" : "w-24"} transition-all duration-300 ease-in-out`}>
        <div className="flex justify-between gap-2 h-[67px] p-4">
          <h2 className={`${isOpen ? "flex" : "hidden"} text-sm font-medium`}>PIZZA</h2>
          <button onClick={()=> setIsOpen(!isOpen)} className='w-6 h-6 ml-auto transition-all duration-300 ease-in-out'>
            {isOpen ? (
              <Image src={sideToggle} width={24} height={24} alt="collapse-expand"/>
              ) : (
              <Image src={sideToggle} width={24} height={24} alt="collapse-expand" className="rotate-180" />
            )}
          </button>
        </div>
        <div className="flex justify-center items-center h-[113px] bg-primary/5 w-full">
          <Link href="/" className="w-12 h-12">
            <Image src={logo} width={50} height={50} alt="logo" className="w-full h-full object-contain" />
          </Link>
        </div>
        <ul>
          {navItems.map((item, idx) => (
            <li key={idx} className="px-2">
              <div data-tooltip-id={item.label} data-tooltip-content={item.label}  onClick={()=> handleLink(item)} className={`cursor-pointer p-3 rounded-lg ${
                    url?.includes(item.href) ? 'bg-primary/40 border-l-4 border-primary text-primary' : 'hover:bg-primary/5'
                  } flex gap-[10px] ${isOpen ? "justify-between" : "justify-center"} items-center w-full`}>
                <p className="w-6 h-6">
                  {item.icon}
                </p>
                {isOpen && (
                  <p className={`w-full flex`}>{item.label}</p>
                )}
                {!isOpen && <ReactTooltip id={item.label} place="right" />}
              </div>
            </li>
          ))}
          <hr className="h-1 bg-gray-200 mx-4 my-4"/>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex justify-center items-center gap-[10px] w-full text-left p-2 mx-auto"
        >
          <div className="w-5 h-5">
            <Image src={logout} width={20} height={20} alt="logout" className="w-full h-full object-contain"/>
          </div>
          {isOpen && <p className="text-xl text-red-500 font-bold">Logout</p>}
        </button>
        </ul>
      </aside>

      <main className="flex-1 bg-gray-100 overflow-y-auto h-screen">
        <div className="flex h-[67px] bg-white w-full items-center px-6 justify-between">
          <p className="text-3xl font-bold">{label || "Orders"}</p>
          <div className="flex gap-10 justify-center items-center">
            <button className="w-6 h-6 relative">
              <Image src={bellIcon} width={24} height={24} alt="bell" className="w-6 h-6 object-contain"/>
              <div className="flex justify-center items-center absolute -top-1 right-0 w-4 h-4 bg-[#00396D] rounded-full text-white">
                <p className="text-white text-xs">1</p>
              </div>
            </button>
            <button className="w-6 h-6">
              <Image src={user} width={24} height={24} alt="user" className="w-6 h-6 object-contain"/>
            </button>
          </div>
        </div>
        <div className="p-5">
          {children}
        </div>
      </main>
    </div>
  );
};

export default withAuth(AdminLayout);