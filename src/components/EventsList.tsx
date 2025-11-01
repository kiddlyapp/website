'use client';
import { Event } from "@/actions/events";
import { publicUrl } from "@/lib/strapi";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import { useRouter, usePathname } from "next/navigation";

interface EventsListProps {
  events: Event[];  
  showOurEventsOnly: boolean;
  isPrevious?: boolean;
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="rounded-xl overflow-hidden bg-brand-slate">
      <div className="p-8 pb-6">
        <p className="text-brand-blue-dark text-sm font-medium font-inter mb-4 uppercase">{event.period} - {event.date}</p>
        <div className="relative rounded-lg overflow-hidden mb-4">
          <Link href={{ pathname: '/events/[slug]', params: { slug: event.slug } }}>
           {event.photo && (
             <Image 
              src={publicUrl(event.photo.url)} 
              alt={event.title} 
              width={1437}
              height={575}
              sizes="100vw"
            />
           )}
          </Link>
        </div>
        <Link href={{ pathname: '/events/[slug]', params: { slug: event.slug } }}><h2 className="inline-block text-brand-black text-2xl font-bold mb-2 font-inter fancy-hover">{event.title}</h2></Link>
        <p className="text-brand-black text-sm leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}

export function EventsList({ events, showOurEventsOnly, isPrevious }: EventsListProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitchStateChanged = (checked: boolean) => {
    const searchParams = new URLSearchParams();
    searchParams.set('showOurEventsOnly', checked.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <Link 
          href={isPrevious ? "/events/upcoming" : "/events/previous"} 
          className="flex flex-row items-center justify-center gap-2 bg-brand-white text-brand-black px-6 py-2.5 rounded-sm border-1 border-solid border-brand-black font-inter font-semibold text-xs w-full md:w-auto cursor-pointer group">
          {isPrevious ? t("events.checkUpcomingEvents") : t("events.checkPreviousEvents")}
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Switch 
            className="data-[state=checked]:bg-brand-yellow data-[state=unchecked]:bg-brand-slate" 
            checked={showOurEventsOnly} 
            onCheckedChange={handleSwitchStateChanged} 
          /> 
          <span className="text-brand-black text-sm font-inter font-normal">{t("events.showOurEventsOnly")}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
} 