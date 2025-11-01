'use client';

import { Logo } from "./Logo";
import { AppMainNavigation } from "./AppMainNavigation";

export function Header() {
  return (
    <div id="navigation" className="flex bg-brand-background w-full h-[100px] items-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex gap-16">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex justify-start gap-8 items-center max-md:hidden flex-1">
            <AppMainNavigation />
          </div>
        </div>
      </div>
    </div>
  );
} 