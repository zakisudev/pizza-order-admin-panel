import TopRestaurantsCard from '@/components/ui/TopRestaurantsCard';

const TopRestaurants = () => {
  return (
    <div className="flex flex-col gap-6 sm:h-[592px] w-full pl-[4%] bg-gradient-to-b from-bodyBg via-[#FA7E00]/20 to-white justify-center">
      <h2 className="text-black/50 font-medium text-responsiveTag">Top Restaurants</h2>
      <div className="flex gap-7 items-center overflow-x-scroll">
        {[1, 2, 3].map((item) => (
          <TopRestaurantsCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default TopRestaurants;
