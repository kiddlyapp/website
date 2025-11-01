"use client"

import { subscribe } from "@/actions/newsletter"
import type React from "react"

import { useState } from "react"
import { Spinner } from "@/components/ui/Spinner";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations();
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true);

    await subscribe(email);
    
    setIsSubscribed(true);
    setEmail("");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row rounded-lg overflow-hidden">
        {isSubscribed ? (
          <div className="flex flex-col gap-2 items-center justify-center w-full py-3 bg-white text-brand-blue-dark font-medium font-inter">
            <p>{t('subscribe.thankYou')}</p>
          </div>
        ) : (
          <>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Unesite svoju email address"
            className="flex-grow px-4 py-3 bg-brand-slate outline-none text-brand-dark-blue focus:bg-brand-silver transition-colors duration-300"
            required
          />
          <button type="submit" className="px-6 py-3 bg-white text-brand-blue-dark font-medium cursor-pointer hover:bg-brand-slate transition-colors duration-300" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="w-5 h-5 mx-auto" /> : t('subscribe.submit')}
          </button>
          </>
        )}
      </div>
    </form>
  )
}