'use client';
import { useCities } from "@/context/CitiesContext";
import { SocialLinks } from "./SocialLinks";

export function CityList() {
  const { cities } = useCities();
  
  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 max-w-[1000px] lg:max-w-[1200px]">
      {cities.map((city) => (
        <div key={city.id} className="flex flex-col gap-4">
          <h3 className="text-brand-blue-dark text-4xl font-normal uppercase">{city.name}</h3>
          <div className="flex flex-row gap-2">
            <SocialLinks 
              linkedin={city.linkedin} 
              instagram={city.instagram} 
              facebook={city.facebook} 
            />
          </div>
        </div>
      ))}
    </div>
  );
} 