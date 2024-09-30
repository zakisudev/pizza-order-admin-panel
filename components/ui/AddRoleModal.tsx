import { useState } from 'react';
import { handleAddRoleApi } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import close from '@/assets/icons/close.svg';

const AddRoleModal = ({setAddRoleModal}) => {
  const router = useRouter();
  const [permissions, setPermissions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, name]);
    } else {
      setPermissions(permissions.filter((permission) => permission !== name));
    }
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      data.permissions = permissions;
      const res = await handleAddRoleApi(data);

      if (!res || res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success(res.message);
      setAddRoleModal(false);
      router.push('/admin/roles?refresh=true');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-black/70 absolute z-20 top-0 bottom-0 right-0 left-0 inset-0">
      <div className="w-[600px] h-fit bg-white rounded-xl p-[10px] relative">
        <button
          className="absolute top-2 right-2 w-8 h-8"
          onClick={() => setAddRoleModal(false)}
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
                htmlFor="name"
                className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
              >
                Role Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter role name"
                {...register('name', { required: 'Role name is required' })}
                className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <ul className="flex flex-col gap-2">
              <h2 className="text-[22px] text-black/50">Permissions</h2>
              <div className="grid grid-cols-2 gap-6 px-4">
                <li className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    id="updateStatus"
                    name="updateStatus"
                    className="rounded-md h-[18px] w-[18px]"
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="updateStatus">Update Order Status</label>
                </li>
                <li className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    id="seeCustomers"
                    name="seeCustomers"
                    className="rounded-md h-[18px] w-[18px]"
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="seeCustomers">See Customers</label>
                </li>
                <li className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    id="seeOrders"
                    name="seeOrders"
                    className="rounded-md h-[18px] w-[18px]"
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="seeOrders">See Orders</label>
                </li>
                <li className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    id="createRoles"
                    name="createRoles"
                    className="rounded-md h-[18px] w-[18px]"
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="createRoles">Create Roles</label>
                </li>
                <li className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    id="addUsers"
                    name="addUsers"
                    className="rounded-md h-[18px] w-[18px]"
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="addUsers">Add Users</label>
                </li>
                <li>
                  <button className="bg-primary text-white rounded px-3 py-0.5">
                    + Add
                  </button>
                </li>
              </div>
            </ul>

            <button
              type="submit"
              className={`w-[231px] px-7 h-12 text-[22px] mx-auto mt-2 ${
                isLoading
                  ? 'bg-gray-400 text-gray-700'
                  : 'bg-primary text-white'
              } rounded-[4px] font-bold`}
            >
              Add Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoleModal;