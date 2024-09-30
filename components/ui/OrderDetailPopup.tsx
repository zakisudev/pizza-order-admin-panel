import Image from 'next/image';
import close from '@/assets/icons/close.svg';

const OrderDetailPopup = ({ order, setIsOrderDetailPopupOpen }) => {
  return (
    <div className="flex justify-center items-center bg-black/70 absolute z-50 top-0 bottom-0 right-0 left-0 inset-0">
      <div className="w-[457px] h-[283px] bg-white rounded-xl p-[10px] relative">
        <button
          className="absolute top-2 right-2 w-8 h-8"
          onClick={() => setIsOrderDetailPopupOpen(false)}
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
          <h2 className="text-[22px] font-bold text-center">Order Details</h2>
          <div className="flex flex-col gap-3">
            <div className="flex gap-6">
              <div className="col-span-1 text-textPrimary/50">Name: </div>
              <div className="col-span-3 mr-auto">{order.name}</div>
            </div>
            <div className="flex gap-6">
              <div className="text-textPrimary/50">Toppings: </div>
              <div className="flex flex-wrap gap-4">
                {order?.topping?.map((top) => {
                  if (top === 'mozzarella') {
                    return (
                      <div
                        key={top}
                        className="bg-[#01C550] text-white px-[10px] py-[2px] rounded-full"
                      >
                        {top}
                      </div>
                    );
                  }
                  if (top === 'tomato') {
                    return (
                      <div
                        key={top}
                        className="bg-[#C50101] text-white px-[10px] py-[2px] rounded-full"
                      >
                        {top}
                      </div>
                    );
                  }
                  if (top === 'bell-pepper') {
                    return (
                      <div
                        key={top}
                        className="bg-[#008000] text-black px-[10px] py-[2px] rounded-full"
                      >
                        {top}
                      </div>
                    );
                  }
                  if (top === 'onions') {
                    return (
                      <div
                        key={top}
                        className="bg-[#008077] text-white px-[10px] py-[2px] rounded-full"
                      >
                        {top}
                      </div>
                    );
                  }
                  if (top === 'olives') {
                    return (
                      <div
                        key={top}
                        className="bg-[#FF9921]/50 text-white px-[10px] py-[2px] rounded-full"
                      >
                        {top}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex gap-6">
              <div className="col-span-1 text-textPrimary/50">Quantity: </div>
              <div className="col-span-3 mr-auto">{order.quantity}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPopup;