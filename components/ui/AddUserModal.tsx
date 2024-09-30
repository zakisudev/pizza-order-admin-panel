import { useState, useEffect } from 'react';
import { handleAdminUserRegisterApi } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import close from '@/assets/icons/close.svg';
import {fetchRoles} from '@/utils/api';

const AddUserModal = ({ setAddUserModal }) => {
  const router = useRouter();
  const [roles, setRoles] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      const res = await handleAdminUserRegisterApi(data);

      if (!res || res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success(res.message);
      setAddUserModal(false);
      router.push('/admin/users?refresh=true');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    const fetchRolesApi = async () => {
      try {
        const res = await fetchRoles();

        if (!res || res.error) {
          toast.error(res.error);
          return;
        }

        setRoles(res.roles.map((r)=> r))
      } catch (error) {
        console.error(error);
        toast.error('An error occurred');
      }
    };

    fetchRolesApi();
  }, [])

  return (
    <div className="flex justify-center items-center bg-black/70 absolute z-20 top-0 bottom-0 right-0 left-0 inset-0">
      <div className="w-[600px] h-fit bg-white rounded-xl p-[10px] relative">
        <button
          className="absolute top-2 right-2 w-8 h-8"
          onClick={() => setAddUserModal(false)}
        >
          <Image
            src={close}
            width={32}
            height={32}
            alt="close"
            className="w-full h-full object-contain"
          />
        </button>
        <div className="flex flex-col justify-center gap-8 h-full p-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="flex flex-col relative">
              <label
                htmlFor="fullName"
                className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your fullName"
                {...register('fullName', { required: 'Full name is required' })}
                className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.fullName?.message}
                </p>
              )}
            </div>
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
                  {errors?.password?.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="location"
                className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                {...register('location', { required: 'Location is required' })}
                placeholder="Enter your location"
                className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.location && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.location?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="phoneNumber"
                className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                })}
                placeholder="Enter your phone number"
                className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.phoneNumber?.message}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex flex-col">
                <select
                  {...register('role', { required: 'Please select a role' })}
                  className="border bg-white rounded-sm px-7 h-12 w-[231px]"
                >
                  <option value="">Select Role</option>
                  {roles.length > 0 && roles?.map((role, idx)=> (
                    <option key={idx} value={role._id}>{role.name}</option>
                  ))}
                </select>
                {errors?.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors?.role?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-[231px] px-7 h-12 text-[22px] ${
                  isLoading
                    ? 'bg-gray-400 text-gray-700'
                    : 'bg-primary text-white'
                } rounded-[4px] font-bold`}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
