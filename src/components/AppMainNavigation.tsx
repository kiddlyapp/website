'use client';
import { Fragment } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export function AppMainNavigation() {

  return (
    <Fragment>
      <div className="flex flex-1 flex-row items-center align-middle justify-between">
       <div className="flex gap-8">
          <Link href="/#features" className="text-brand-white font-jakarta-sans font-normal text-md fancy-hover">Features</Link>
          <Link href="/#contact" className="text-brand-white font-jakarta-sans font-normal text-md fancy-hover">Contact</Link>
       </div>
       <div className="flex gap-8 items-center align-middle">
          <Link href="https://app.kiddly.io" className="text-brand-white font-jakarta-sans font-normal text-md fancy-hover">Customer Login</Link>
          <Link href="/#contact">
            <Button variant="default" className="font-jakarta-sans text-white font-bold cursor-pointer transition-transform hover:scale-105">Request Access</Button>
          </Link>
       </div>
      </div>
    </Fragment>
  );
} 