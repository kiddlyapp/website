'use client';
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  white?: boolean;
}

export function Logo({ className, white }: LogoProps) {

  const logoPath = white ? `/kiddly-white.svg` : `/kiddly.svg`;

  return (
    <Link href={`/`}>
      <Image 
        src={logoPath} 
        alt="Kiddly" 
        width={100} 
        height={36} 
        className={className}
      />
    </Link>
  );
} 