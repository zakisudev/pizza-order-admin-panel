import Carousel from '@/components/ui/Carousel';

const Hero = () => {
  return (
    <section className="flex flex-col justify-center gap-6 w-full py-6 sm:h-[706px] bg-bodyBg px-[4%]">
      <h2 className="text-black/50 text-responsiveTag font-medium">Featured pizza</h2>
      <Carousel />
    </section>
  );
};

export default Hero;
