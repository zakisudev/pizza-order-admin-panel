import Image from 'next/image';
import checkMark from '@/assets/icons/whiteCheck.png';

const OrderConfirmationCard = ({title}) => {
  return (
    <div className="flex justify-center items-center bg-black/70 fixed z-20 top-0 bottom-0 right-0 left-0 inset-0">
      <div className="w-[90%] sm:w-[857px] h-[591px] bg-white rounded-xl justify-center px-[127px]">
        <div className="flex flex-col justify-center items-center gap-5 h-full">
          <div className="flex justify-center items-center max-w-[280px] max-h-[280px] w-full h-full rounded-full bg-[#05C605]/10">
            <div className="max-w-[166px] max-h-[166px] w-full h-full rounded-full bg-[#05C605] p-7">
              <Image
                src={checkMark}
                alt="checkmark"
                width={166}
                height={166}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-[32px] text-center text-[#05C605]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationCard;
