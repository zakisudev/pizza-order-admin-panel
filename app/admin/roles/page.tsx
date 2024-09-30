'use client';

import { useEffect } from 'react';
import { fetchRoles, deleteRoleApi } from '@/utils/api';
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
import RoleDetailPopup from '@/components/ui/RoleDetailPopup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import spinner from '@/assets/icons/spinner.svg';
import trash from '@/assets/icons/trash.svg';
import eye from '@/assets/icons/eye.svg';
import DeleteModal from '@/components/ui/DeleteModal';
import UserStatus from '@/components/ui/UserStatus';
import AddRoleModal from '@/components/ui/AddRoleModal';
import {format} from 'date-fns';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';


const Roles = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isRoleDetailPopupOpen, setIsRoleDetailPopupOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);

  const handleViewModal = (row:any) => {
    setRole(row);
    setIsRoleDetailPopupOpen(true);
  }

  const handleDeleteModal = (row:any) => {
    setRole(row);
    setDeleteModalOpen(true);
  };

  const handleAddRoleModal = () => {
    setAddRoleModal(true);
  };

  const handleDeleteRole = async (role:any) => {
    setDeleting(true);
    try {
      const res = await deleteRoleApi(role);
      if (!res || res?.error) {
        toast.error('Failed to delete role');
        return;
      }

      toast.success('Role deleted successfully');
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
      title: 'Role Name',
      dataIndex: 'name',
      width: '50',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      width: '70',
      render: (text:string, record:any) => (
        <div className="flex items-center gap-2">
          <p>{record.createdAt && format(new Date(record?.createdAt), 'M/d/yy')}</p>
        </div>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      width: '70',
      render: (record:any, row:any) => (
        <div className="flex items-center">
          <button
            onClick={() => handleViewModal(row)}
            className="text-textLight/100 p-2 rounded-md"
          >
            <Image
              src={eye}
              width={24}
              height={24}
              alt="delete"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '70',
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
    const fetchRolesApi = async () => {
      try {
        const res = await fetchRoles();

        setData(
          res?.roles?.map((role:any) => ({
            ...role,
            key: role._id,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRolesApi();
  }, [deleteModalOpen]);

  return (
    <>
      {isRoleDetailPopupOpen && (
        <RoleDetailPopup
        resource={role}
          setIsRoleDetailPopupOpen={setIsRoleDetailPopupOpen}
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
          resource={role}
          setIsDeleteModalOpen={setDeleteModalOpen}
          handleDeleteResource={handleDeleteRole}
          loading={deleting}
        />
      )}

      {addRoleModal && <AddRoleModal setAddRoleModal={setAddRoleModal} />}

      <div className="p-10 bg-white">
        <div className="flex flex-col border border-black/12 rounded-md">
          <div className="flex gap-5 justify-between items-center px-4 py-2">
            <button
              onClick={handleAddRoleModal}
              disabled={loading}
              className={`w-fit px-5 py-1 ${
                loading ? 'bg-gray-400 text-gray-700' : 'bg-primary text-white'
              } rounded-[4px] font-bold`}
            >
              Add Role
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

export default Roles;
