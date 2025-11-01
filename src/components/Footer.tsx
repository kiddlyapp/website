'use client';

import { Heart } from "@/components/icon/heart";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import Link from 'next/link';

export function Footer() {

  return (
    <div id="footer" className="flex bg-black w-full items-center py-32">
      <div className="container mx-auto flex flex-col px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between border-b border-brand-slate pb-8 gap-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between w-full">
            <div className="flex flex-col gap-4 md:hidden lg:flex justify-start items-start">
              <Logo white />
              <span className="text-white font-inter font-regular text-xs max-w-[300px]">
              The open-source preschool management 
              platform — for modern schools and happier parents.
              </span>
            </div>
            <div className="flex flex-row gap-8 text-nowrap">
              <div className="flex flex-col gap-2">
                <div className="text-white font-inter font-semibold text-xs uppercase pb-2">Platform</div>
                <Link href="/" className="text-white font-inter font-semibold text-xs inline-block fancy-hover">Features</Link>
                <Link href="/#contact" className="text-white font-inter font-semibold text-xs inline-block fancy-hover">Contact</Link>
                <Link href="/#" className="text-white font-inter font-semibold text-xs inline-block fancy-hover">Request Access</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="flex flex-col pt-8 gap-4">
            <div className="text-white font-inter font-semibold text-xs uppercase">Follow Us</div>
            <div className="flex flex-row gap-4">
              <SocialLinks 
                linkedin="#" 
                instagram="#" 
                facebook="#"
                className="flex flex-row gap-4"
                iconClassName="w-6 h-6 text-white"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 gap-8">
            <div className="flex flex-col gap-4">
              <Link href="/#" className="text-white font-inter font-semibold text-xs fancy-hover">Privacy Policy</Link>
            </div>
            <div className="text-white font-inter font-semibold text-xs">
              Copyright &copy; {new Date().getFullYear()} Kiddly. All rights reserved.<br className="md:hidden" />Made by <Heart /> by <a target="_blank" href="https://www.hefesgroup.com" className="text-brand-white font-inter font-semibold text-xs fancy-hover">HTG</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 