'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import upload from '@/assets/icons/upload.svg';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import { toast } from 'react-toastify';
import spinner from '@/assets/icons/spinner.svg';
import {handleAddPizzaApi} from '@/utils/api'
import OrderConfirmationCard from '@/components/ui/OrderConfirmationCard';

const AddMenu = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isLoading, setIsLoading] = useState();
  const [toppings, setToppings] = useState([]);
  const [types, setTypes] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(imageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    setToppings((prevToppings) =>
      checked ? [...prevToppings, name] : prevToppings.filter((t) => t !== name)
    );
  };

  const handleTypeChange = (e) => {
    const { id, checked } = e.target;
    setTypes((prevTypes) =>
      checked ? [...prevTypes, id] : prevTypes.filter((t) => t !== id)
    );
  };

  const resetFormValues = ()=> {
    setValue('name', '');
    setValue('price', '');
    setToppings([]);
    setImageUrl('');
    setImage(null);
    setTypes([]);
  }

  const handleAddPizza = async (data) => {
    try {
      setIsLoading(true);
      data.price = Number(data.price);
      data.toppings = toppings;
      data.types = types;
      const res = await handleAddPizzaApi(data);

      if (!res || res.error) {
        toast.error(res.error);
        return;
      }

      // Reset form values
      resetFormValues();
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000);
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (!image) return;

    setUploading(true);
    const handleUpload = async (image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'pizza-order');
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      try {
        setUploading(true);
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/pizza-order/image/upload',
          formData
        );

        const uploadedImageUrl = res.data.url;
        setImageUrl(uploadedImageUrl);
        setValue('image', uploadedImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Image upload failed');
      } finally {
        setUploading(false);
      }
    };

    handleUpload(image);
  }, [image, setValue]);

  return (
    <>
      {isModalVisible && (
        <OrderConfirmationCard title="Your have uploaded the pizza successfully." />
      )}

      <div className="flex flex-col justify-center bg-white rounded-xl gap-12 w-full pt-5 pb-40">
        <h1 className="text-[22px] font-medium text-center">Add Menu</h1>

        <form
          className="flex flex-col gap-5 w-[460px] mx-auto"
          onSubmit={handleSubmit(handleAddPizza)}
        >
          <div className="flex flex-col relative">
            <label
              htmlFor="name"
              className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Pizza name"
              {...register('name', { required: 'Pizza name is required' })}
              className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors?.name?.message}
              </p>
            )}
          </div>

          <ul className="flex flex-col gap-2">
            <h2 className="text-[22px] text-black/50">Topping</h2>
            <div className="flex items-center gap-6 flex-wrap px-4">
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="mozzarella"
                  name="mozzarella"
                  checked={toppings?.includes('mozzarella')}
                  className="rounded-md h-[18px] w-[18px]"
                  onChange={handleToppingChange}
                />
                <label htmlFor="mozzarella">Mozzarella</label>
              </li>
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="tomato"
                  name="tomato"
                  className="rounded-md h-[18px] w-[18px]"
                  checked={toppings?.includes('tomato')}
                  onChange={handleToppingChange}
                />
                <label htmlFor="tomato">Tomato</label>
              </li>
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="bell-peppers"
                  name="bell-peppers"
                  className="rounded-md h-[18px] w-[18px]"
                  checked={toppings?.includes('bell-peppers')}
                  onChange={handleToppingChange}
                />
                <label htmlFor="bell-peppers">Bell Peppers</label>
              </li>
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="onions"
                  name="onions"
                  className="rounded-md h-[18px] w-[18px]"
                  checked={toppings?.includes('onions')}
                  onChange={handleToppingChange}
                />
                <label htmlFor="onions">Onions</label>
              </li>
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="olives"
                  name="olives"
                  className="rounded-md h-[18px] w-[18px]"
                  checked={toppings?.includes('olives')}
                  onChange={handleToppingChange}
                />
                <label htmlFor="olives">Olives</label>
              </li>
              <li>
                <button className="bg-primary text-white rounded px-3 py-0.5">
                  + Add
                </button>
              </li>
            </div>
          </ul>

          <div className="flex flex-col gap-2">
            <h2 className="text-[22px] text-black/50">Pizza Type</h2>
            <ul className="flex gap-2 items-center px-4">
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="cheese"
                  name="cheese"
                  className="rounded-md h-[18px] w-[18px]"
                  onChange={handleTypeChange}
                  checked={types?.includes('cheese')}
                />
                <label htmlFor="cheese">Cheese</label>
              </li>
              <li className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="meat"
                  name="meat"
                  className="rounded-md h-[18px] w-[18px]"
                  onChange={handleTypeChange}
                  checked={types?.includes('meat')}
                />
                <label htmlFor="meat">Meat</label>
              </li>
            </ul>
            {errors?.type && (
              <p className="text-xs text-red-500 mt-1">
                {errors?.type?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="price"
              className="text-xs font-medium text-black/60 absolute -top-2 left-2 bg-white px-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              {...register('price', {
                required: 'Price is required',
              })}
              placeholder="Enter price"
              className="text-lg border border-gray-300 rounded-md px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.price && (
              <p className="text-xs text-red-500 mt-1">
                {errors?.price?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-7 w-[321px] mx-auto">
            {/* Image upload */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                {...register('image')}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setImage(file);
                }}
              />
              <div className="flex gap-2 items-center">
                <label
                  htmlFor="image"
                  className="text-lg cursor-pointer border border-dashed text-primary border-black/50 rounded-md h-14 w-full flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Image src={upload} width={16} height={16} alt="upload" />
                  <p className="text-base font-medium">Upload Pizza Photo</p>
                </label>
                {uploading ? (
                  <Image
                    src={spinner}
                    width={50}
                    heigh={50}
                    alt="uploading"
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  imageUrl && (
                    <CldImage
                      src={imageUrl}
                      width="50"
                      height="50"
                      className="rounded-md h-14 w-14 object-cover"
                      alt="Uploaded Image"
                    />
                  )
                )}
              </div>
              {errors?.image && (
                <p className="text-xs text-red-500 mt-1">
                  {errors?.image?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading || isLoading || !imageUrl}
              className={`px-7 h-14 text-[22px] w-full ${
                isLoading || !imageUrl || uploading
                  ? 'bg-gray-400 text-gray-700'
                  : 'bg-primary text-white'
              } rounded-[4px] font-bold`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMenu;
