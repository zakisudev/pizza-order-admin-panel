'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState } from 'react';
import featPizza01 from '@/assets/images/FeatPizza01.png';
import featPizza02 from '@/assets/images/FeatPizza02.png';
import featPizza03 from '@/assets/images/FeatPizza03.png';
import Link from 'next/link'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      spacing: 15,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <>
      <div className="navigation-wrapper w-full">
        <div ref={sliderRef} className="keen-slider h-full max-h-[431px] min-h-[205px] rounded-[15px] sm:rounded-[40px]">
          <div className="keen-slider__slide bg-bgDark min-h-full pl-[3%] sm:pl-[5%] items-center">
            <div className="flex w-full relative items-center h-full">
              <div className="flex flex-col justify-center gap-2 sm:gap-8 h-full max-w-[60%]">
                <h2 className="font-bold text-responsiveText text-white leading-snug">
                  Make Your First Order and Get{' '}
                  <span className="text-primary"> 50% Off</span>
                </h2>
                <p className="text-white text-responsiveParagraph">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without.
                </p>
                <Link href="#popular-pizzas" className="flex justify-center items-center max-w-[77px] sm:max-w-full w-[90%] sm:w-[246px] max-h-[33px] sm:max-h-full h-full sm:h-[60px] rounded-md bg-primary font-bold text-white text-responsiveParagraph">
                  Order Now
                </Link>
              </div>
              <div className="flex w-[657px] h-full ml-auto">
                <Image
                  src={featPizza01}
                  alt="pizza"
                  width={657}
                  height={500}
                  className="object-left object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="keen-slider__slide bg-[#50482B] min-h-full pl-[3%] sm:pl-[5%] items-center">
            <div className="flex w-full relative items-center h-full">
              <div className="flex flex-col justify-center gap-2 sm:gap-8 h-full max-w-[60%]">
                <h2 className="font-bold text-responsiveText text-white leading-snug">
                  Make Your First Order and Get{' '}
                  <span className="text-primary"> 50% Off</span>
                </h2>
                <p className="text-white text-responsiveParagraph">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without.
                </p>
                <Link href="#popular-pizzas" className="flex justify-center items-center max-w-[77px] sm:max-w-full w-[90%] sm:w-[246px] max-h-[33px] sm:max-h-full h-full sm:h-[60px] rounded-md bg-primary font-bold text-white text-responsiveParagraph">
                  Order Now
                </Link>
              </div>
              <div className="flex w-[657px] h-full ml-auto">
                <Image
                  src={featPizza02}
                  alt="pizza"
                  width={657}
                  height={500}
                  className="object-left object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="keen-slider__slide bg-[#296D60] min-h-full pl-[3%] sm:pl-[5%] items-center">
            <div className="flex w-full relative items-center h-full">
              <div className="flex flex-col justify-center gap-2 sm:gap-8 h-full max-w-[60%]">
                <h2 className="font-bold text-responsiveText text-white leading-snug">
                  Make Your First Order and Get{' '}
                  <span className="text-primary"> 50% Off</span>
                </h2>
                <p className="text-white text-responsiveParagraph">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without.
                </p>
                <Link href="#popular-pizzas" className="flex justify-center items-center max-w-[77px] sm:max-w-full w-[90%] sm:w-[246px] max-h-[33px] sm:max-h-full h-full sm:h-[60px] rounded-md bg-primary font-bold text-white text-responsiveParagraph">
                  Order Now
                </Link>
              </div>
              <div className="flex w-[657px] h-full ml-auto">
                <Image
                  src={featPizza03}
                  alt="pizza"
                  width={657}
                  height={400}
                  className="object-left object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {loaded && instanceRef.current && (
          <div className="dots flex gap-7 justify-center w-full mt-5">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={
                    'dot transition-colors duration-300 ease-in-out bg-carouselBg rounded-full w-3 h-3 sm:w-6 sm:h-6' +
                    (currentSlide === idx ? ' active bg-primary' : '')
                  }
                ></button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel;
