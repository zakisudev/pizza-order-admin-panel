import spinner from '@/assets/icons/spinner.svg';
import Image from 'next/image';

const DeleteModal = ({ resource, setIsDeleteModalOpen, handleDeleteResource, loading }) => {

  return (
    <div className="flex justify-center items-center bg-black/70 absolute z-20 top-0 bottom-0 right-0 left-0 inset-0">
      <div className="w-[457px] h-[283px] bg-white rounded-xl p-[10px] relative">
        <div className="flex flex-col justify-center gap-8 h-full p-6">
          <h2 className="text-[22px] font-bold text-center">
            Delete {resource?.email ? 'User' : 'Order'}
          </h2>
          <p className="text-xl text-center">
            Are you sure you want to delete this{' '}
            {resource?.email ? 'User' : 'Order'}?
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="flex justify-center items-center bg-[#FF0000] text-white px-6 py-2 rounded-md font-bold"
              onClick={() => handleDeleteResource(resource._id)}
            >
              {loading ? (
                <Image src={spinner} width={24} height={2} alt="delete" className="w-6 h-6 object-contain" />
              ) : "Delete"}
            </button>
            <button
              className="bg-[#CCC] text-black px-6 py-2 rounded-md"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
