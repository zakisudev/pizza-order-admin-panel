"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import logo from '@/assets/images/emojione_pizza.png';
import feedbackIcon from '@/assets/icons/feedback.png';
import facebookIcon from '@/assets/icons/facebook.png';
import instagramIcon from '@/assets/icons/instagram.png';
import twitterIcon from '@/assets/icons/twitter.png';
import youtubeIcon from '@/assets/icons/youtube.png';

const Footer = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedback = () => {};

  return (
    <footer className="flex flex-col w-full">
      <div className="flex justify-between items-center min-h-[241px] gap-4 p-[5%] bg-footerBg w-full">
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-12 sm:items-center w-1/2">
          <li>
            <Link href="/" className="font-semibold text-responsiveLink">
              Home
            </Link>
          </li>
          <li>
            <Link href="/orders" className="font-semibold text-responsiveLink">
              Orders
            </Link>
          </li>
          <li>
            <Link href="/who-we-are" className="font-semibold text-responsiveLink whitespace-nowrap">
              About us
            </Link>
          </li>
        </ul>

        <div className="flex flex-col justify-center items-center gap-4 self-start w-1/2">
          <div className="flex gap-4 items-center">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={50}
              quality={100}
              className="w-full h-full object-contain"
            />
            <h2 className="text-xl text-textLogo font-extrabold">Pizza</h2>
          </div>
          <div className="flex justify-between items-center gap-2 w-[206px] sm:w-[423px] h-[62px] bg-white rounded-xl px-3 sm:px-6">
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              name="searchTerm"
              className="h-full w-full rounded-l-full placeholder:text-textGray text-sm sm:text-xl focus:outline-none"
              placeholder="Your feedback..."
            />
            <button
              className="flex justify-center items-center w-6 h-6 rounded-full"
              onClick={handleFeedback}
            >
              <Image
                src={feedbackIcon}
                alt="search"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 p-[5%] py-7 bg-black">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center">
          <p className="text-white">@2024 Pizza All Rights Reserved.</p>
          <Link href="/terms" className="text-white">
            Terms & Conditions
          </Link>
        </div>
        <div className="flex gap-2.5 items-center">
          <Link
            href="https://facebook.com/pizza-order"
            className="flex justify-center items-center w-12 h-12 bg-socialsBg rounded-full p-1"
          >
            <Image
              src={facebookIcon}
              alt="facebook"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://instagram.com/pizza-order"
            className="flex justify-center items-center w-12 h-12 bg-socialsBg rounded-full p-1"
          >
            <Image
              src={instagramIcon}
              alt="instagram"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://twitter.com/pizza-order"
            className="flex justify-center items-center w-12 h-12 bg-socialsBg rounded-full p-1"
          >
            <Image
              src={twitterIcon}
              alt="twitter"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://youtube.com/pizza-order"
            className="flex justify-center items-center w-12 h-12 bg-socialsBg rounded-full p-1"
          >
            <Image
              src={youtubeIcon}
              alt="youtube"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
