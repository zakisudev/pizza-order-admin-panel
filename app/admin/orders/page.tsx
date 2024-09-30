'use client';

import { useEffect } from 'react';
import { fetchUserOrders as fetchOrders } from '@/utils/api';
import { Table } from 'antd';
import refresh from '@/assets/icons/ic_baseline-refresh.svg';
import Image from 'next/image';
import search from '@/assets/icons/searchIcon.svg';
import exportIcon from '@/assets/icons/exportIcon.svg';
import bi_filter from '@/assets/icons/bi_filter.svg';
import gridIcon from '@/assets/icons/gridIcon.svg';
import listIcon from '@/assets/icons/listIcon.svg';
import fullscreen from '@/assets/icons/ic_baseline-fullscreen.svg';
import pizzaIcon from '@/assets/icons/pizzaIcon.svg';
import viewIcon from '@/assets/icons/view.svg';
import { useState } from 'react';
import OrderDetailPopup from '@/components/ui/OrderDetailPopup';
import { format } from 'date-fns';
import spinner from '@/assets/icons/spinner.svg';
import { orderStatusUpdateApi } from '@/utils/api';
import { toast } from 'react-toastify';
import checkMark from '@/assets/icons/checkMark.svg';

const Orders = () => {
  const [data, setData] = useState([]);
  const [isOrderDetailPopupOpen, setIsOrderDetailPopupOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusChangingRow, setStatusChangingRow] = useState(null);

  const handleViewToppings = (record) => {
    setIsOrderDetailPopupOpen(true);
    setOrder(record);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleStatusChange = async (row, newStatus) => {
    setStatusChangingRow(row.id);
    try {
      const res = await orderStatusUpdateApi(row.id, newStatus);

      if (!res || res.error) {
        toast.error('Error updating status');
        console.error('Error updating status:', res.error);
        return;
      }

      const ress = await fetchOrders();

      const data = ress.orders?.map((order) => {
        const formattedDate = format(new Date(order?.createdAt), 'M/d/yy');
        const formattedTime = format(new Date(order?.createdAt), 'h:mm a');
        return {
          id: order._id,
          key: order._id,
          name: order.name,
          topping: order.toppings,
          quantity: order.quantity,
          phoneNumber: order.phoneNumber,
          status: order.status,
          createdTime: formattedTime,
          createdDate: formattedDate,
        };
      });

      setData(data);

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusChangingRow(null);
    }
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: '200px',
      render: (text) => (
        <div className="flex items-center gap-2 w-[150px]"> {/* Ensure the name field doesn’t expand */}
          <Image src={pizzaIcon} width={20} height={20} alt="name icon" />
          {text}
        </div>
      ),
    },
    {
      title: 'Topping',
      dataIndex: 'topping',
      width: '200px',
      render: (record, row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleViewToppings(row)}>
            <Image src={viewIcon} width={20} height={20} alt="view icon" />
          </button>
          <p className="text-primary text-sm">Toppings</p>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '50px',
    },
    {
      title: 'Customer No.',
      dataIndex: 'phoneNumber',
      width: '100px',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      width: '150px',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <p>{record.createdTime}</p>
          <p className="text-textPrimary/50">{record.createdDate}</p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '100px',
      render: (record, row) =>
        <div className="flex justify-center items-center w-[100px]">
          {statusChangingRow === row.id ? (
            <div className="flex justify-center items-center w-8 h-8">
              <Image
                src={spinner}
                width={24}
                height={24}
                alt="loading spinner"
                className="w-full h-full object-contain"
              />
            </div>
          ) : row.status === "Delivered" ? (
            <div className="flex gap-2 justify-between items-center">
              <div className="w-5 h-5">
                <Image src={checkMark} width={20} height={20} alt="delivered" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs text-[#008000]">Delivered</p>
            </div>
          ) : (
            <select
              value={row.status || ""}
              onChange={(e) => handleStatusChange(row, e.target.value)}
              className={`border border-gray-300 rounded-lg px-5 h-8 w-full text-center text-white ${record === 'Ready' ? 'bg-[#008000]' : record === 'Preparing' ? "bg-primary" : "bg-white"}`}
            >
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
            </select>
          )}
        </div>
    },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchOrdersApi = async () => {
      try {
        const res = await fetchOrders();

        if (!res || res.error) {
          toast.error(res.error);
          return;
        }

        const data = res.orders?.map((order) => {
          const formattedDate = format(new Date(order?.createdAt), 'M/d/yy');
          const formattedTime = format(new Date(order?.createdAt), 'h:mm a');
          return {
            id: order._id,
            key: order._id,
            name: order.name,
            topping: order.toppings,
            quantity: order.quantity,
            phoneNumber: order.phoneNumber,
            status: order.status,
            createdTime: formattedTime,
            createdDate: formattedDate,
          };
        });

        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersApi();
  }, []);

  return (
    <>
      {isOrderDetailPopupOpen && (
        <OrderDetailPopup
          order={order}
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

      <div className="p-10 bg-white">
        <div className="flex flex-col border border-black/12 rounded-md gap-2">
          <div className="flex gap-5 justify-between items-center">
            <p className="text-textPrimary/60 p-4">Packages</p>
            <div className="flex gap-3 items-center px-4">
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
            size="medium"
            keyExtractor={(item) => item._id}
            columns={columns}
            dataSource={data}
            onChange={onChange}
            className="w-full table-header"
          />
        </div>
      </div>
    </>
  );
};

export default Orders;
