import Image from 'next/image';
import reviewImage from '@/assets/images/Review.png';
import orderNumber from '@/assets/images/orderNumber.png';

const TopRestaurantsCard = () => {
  return (
    <>
    <div className="flex sm:gap-4 items-center bg-white p-4 rounded-2xl w-full min-w-[400px] sm:min-w-[574px] sm:min-h-[154px] h-full">
      <div className="flex flex-col w-1/2">
        <div className="flex gap-4 items-center">
          <div className="flex w-6 h-6 sm:w-12 sm:h-12 rounded-full">
            <Image
              src={reviewImage}
              width={20}
              height={20}
              alt="review"
              className="object-contain w-full h-full"
            />
          </div>
          <h2 className="text-responsiveParagraph font-bold">Azmera Pizza</h2>
        </div>
        <p className="text-[10px] sm:text-[15px] text-black/50">
          In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to...
        </p>
      </div>
      <div className="flex items-center rounded-xl w-1/2 h-[60px] sm:h-[100px]">
        <Image
          src={orderNumber}
          width={200}
          height={200}
          quality={100}
          alt="orders"
          className="object-contain w-full h-full"
        />
      </div>
    </div></>
  )
}
export default TopRestaurantsCard