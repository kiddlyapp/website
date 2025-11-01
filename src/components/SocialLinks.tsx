'use client';

import { Facebook, Instagram, Linkedin } from "react-feather";
import Link from "next/link";

interface SocialLinksProps {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ 
  linkedin, 
  instagram, 
  facebook, 
  className = "flex flex-row gap-4",
  iconClassName = "w-6 h-6 text-brand-blue-dark"
}: SocialLinksProps) {
  return (
    <div className={className}>
      {linkedin && (
        <Link href={linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className={iconClassName} />
        </Link>
      )}
      {instagram && (
        <Link href={instagram} target="_blank" rel="noopener noreferrer">
          <Instagram className={iconClassName} />
        </Link>
      )}
      {facebook && (
        <Link href={facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className={iconClassName} />
        </Link>
      )}
    </div>
  );
} 