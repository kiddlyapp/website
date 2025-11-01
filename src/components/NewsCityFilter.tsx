"use client";
import { useCities } from "@/context/CitiesContext";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function NewsCityFilter() {
  const { cities } = useCities();
  const t = useTranslations();

  return (
    <div className="flex flex-row flex-wrap items-center gap-2 md:gap-4 mb-8">
      <span className="text-brand-black text-sm font-inter font-normal">{t('cities.title')}:</span>
      {cities.map((city) => (
        <Link
          key={city.id}
          href={{ pathname: '/news/[city]', params: { city: city.slug } }}
          className="flex flex-row items-center justify-center gap-2 bg-brand-white text-brand-black px-6 py-1 rounded-sm border border-solid border-brand-black font-inter font-semibold text-xs cursor-pointer transition-colors duration-300"
        >
          {city.name}
        </Link>
      ))}
    </div>
  );
} 