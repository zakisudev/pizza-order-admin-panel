'use client';

import { useEffect } from 'react';
import { fetchUsers, deleteUserApi } from '@/utils/api';
import { Table } from 'antd';
import refresh from '@/assets/icons/ic_baseline-refresh.svg';
import Image from 'next/image';
import search from '@/assets/icons/searchIcon.svg';
import exportIcon from '@/assets/icons/exportIcon.svg';
import bi_filter from '@/assets/icons/bi_filter.svg';
import gridIcon from '@/assets/icons/gridIcon.svg';
import listIcon from '@/assets/icons/listIcon.svg';
import fullscreen from '@/assets/icons/ic_baseline-fullscreen.svg';
import { useState } from 'react';
import OrderDetailPopup from '@/components/ui/OrderDetailPopup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import spinner from '@/assets/icons/spinner.svg';
import trash from '@/assets/icons/trash.svg';
import DeleteModal from '@/components/ui/DeleteModal';
import UserStatus from '@/components/ui/UserStatus';
import AddUserModal from '@/components/ui/AddUserModal';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

const Users = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isOrderDetailPopupOpen, setIsOrderDetailPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);

  const handleDeleteModal = (row:any) => {
    setUser(row);
    setDeleteModalOpen(true);
  };

  const handleAddUserModal = () => {
    setAddUserModal(true);
  };

  const handleDeleteUser = async (user:any) => {
    setDeleting(true);
    try {
      const res = await deleteUserApi(user);
      if (!res || res?.error) {
        toast.error('Failed to delete user');
        return;
      }

      toast.success('User deleted successfully');
      setDeleteModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: '_id',
      title: 'Name',
      dataIndex: 'fullName',
      width: '50',
    },
    {
      title: 'Phone No.',
      dataIndex: 'phoneNumber',
      width: '70',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '50',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '50',
      render: (row:any) => (
        <div className="flex items-center">
          <UserStatus user={row} />
          <button
            disabled={deleting}
            onClick={() => handleDeleteModal(row)}
            className="text-textLight/100 p-2 rounded-md"
          >
            <Image
              src={trash}
              width={24}
              height={24}
              alt="delete"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      ),
    },
  ];

  const onChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUsersApi = async () => {
      try {
        const res = await fetchUsers();

        if (!res || res.error) {
          toast.error(res.error);
          return;
        }

        setData(
          res?.users?.map((user:any) => ({
            ...user,
            key: user._id,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersApi();
  }, [deleteModalOpen]);

  return (
    <>
      {isOrderDetailPopupOpen && (
        <OrderDetailPopup
          order={user}
          setIsOrderDetailPopupOpen={setIsOrderDetailPopupOpen}
        />
      )}

      {loading && (
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

      {deleteModalOpen && (
        <DeleteModal
          resource={user}
          setIsDeleteModalOpen={setDeleteModalOpen}
          handleDeleteResource={handleDeleteUser}
          loading={setDeleting}
        />
      )}

      {addUserModal && <AddUserModal setAddUserModal={setAddUserModal} />}

      <div className="p-10 bg-white">
        <div className="flex flex-col border border-black/12 rounded-md">
          <div className="flex gap-5 justify-between items-center px-4 py-2">
            <button
              onClick={handleAddUserModal}
              disabled={loading}
              className={`w-fit px-5 py-1 ${
                loading ? 'bg-gray-400 text-gray-700' : 'bg-primary text-white'
              } rounded-[4px] font-bold`}
            >
              Add User
            </button>
            <div className="flex gap-3 items-center">
              <div className="flex gap-4 items-center border-r-2 border-gray-200 pr-2">
                <button className="w-6 h-6">
                  <Image
                    src={refresh}
                    width={24}
                    height={24}
                    alt="refresh"
                    className="w-full h-full object-contain"
                  />
                </button>
                <button className="w-6 h-6">
                  <Image
                    src={search}
                    width={24}
                    height={24}
                    alt="search"
                    className="w-full h-full object-contain"
                  />
                </button>
                <button className="w-6 h-6">
                  <Image
                    src={exportIcon}
                    width={24}
                    height={24}
                    alt="export"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
              <div className="flex gap-4 items-center border-r-2 border-gray-200 pr-2">
                <button className="w-6 h-6">
                  <Image
                    src={bi_filter}
                    width={24}
                    height={24}
                    alt="filter"
                    className="w-full h-full object-contain"
                  />
                </button>
                <button className="w-6 h-6">
                  <Image
                    src={gridIcon}
                    width={24}
                    height={24}
                    alt="grid"
                    className="w-full h-full object-contain"
                  />
                </button>
                <button className="w-6 h-6">
                  <Image
                    src={listIcon}
                    width={24}
                    height={24}
                    alt="list"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
              <div className="flex gap-4 items-center pr-2">
                <button className="w-6 h-6">
                  <Image
                    src={fullscreen}
                    width={24}
                    height={24}
                    alt="fullscreen"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
          <Table
            rowKey={(item: any) => item._id}
            columns={columns}
            dataSource={data}
            size="small"
            onChange={onChange}
            className="table-header"
          />
        </div>
      </div>
    </>
  );
};

export default Users;
