"use client"

import * as React from "react"
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns"

import { srLatn, enUS } from "date-fns/locale"

import {
  ArrowUpRight,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Event, getEventsForMonth } from "@/actions/events"
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from 'next-intl';

export interface CalendarData {
  day: Date
  events: Event[]
}

const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

function transformEventsToCalendarData(events: Event[]): CalendarData[] {
  const calendarData = events.map(event => ({
    day: parseISO(event.date),
    events: [event]
  }));

  return calendarData;
}

function getDateLocale(locale: string) {
  if (locale === 'sr') {
    return srLatn;
  }
  return enUS;
}

export function FullScreenCalendar() {
  const locale = useLocale()
  const t = useTranslations()
  const today = startOfToday()
  const [data, setData] = React.useState<CalendarData[]>([])
  const [openEvents, setOpenEvents] = React.useState(false)
  const [selectedDay, setSelectedDay] = React.useState(today)
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  )
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"))
  }

  React.useEffect(() => {
    // Parse month and year from currentMonth string (e.g., "Jun-2024")
    const [monthStr, yearStr] = currentMonth.split('-');
    // Convert month string (e.g., "Jun") to month number (1-12)
    const month = new Date(`${monthStr} 1, 2000`).getMonth() + 1;
    const year = Number(yearStr);

    // Only fetch if parsing succeeded
    if (!isNaN(month) && !isNaN(year)) {
      getEventsForMonth(locale, year, month).then((events) => {
        setData(transformEventsToCalendarData(events));
      });
    }
  }, [currentMonth, locale]);

  return (
    <div className="flex flex-col gap-4">
      {/* Calendar Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-none">
        <div className="flex">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground capitalize">
                {format(firstDayCurrentMonth, "MMMM, yyyy", { locale: getDateLocale(locale) })}
              </h2>
              <p className="text-sm text-muted-foreground capitalize">
                {format(firstDayCurrentMonth, "MMM d, yyyy", { locale: getDateLocale(locale) })} -{" "}
                {format(endOfMonth(firstDayCurrentMonth), "MMM d, yyyy", { locale: getDateLocale(locale) })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="inline-flex w-full rounded-lg shadow-sm shadow-black/5 md:w-auto">
            <Button
              onClick={previousMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Navigate to previous month"
            >
              <ChevronLeftIcon size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button
              onClick={goToToday}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 grow md:w-auto"
              variant="outline"
            >
              {t("events.today")}
            </Button>
            <Button
              onClick={nextMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Navigate to next month"
            >
              <ChevronRightIcon size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>

        </div>
      </div>

      {/* Calendar Grid */}
      <div className="lg:flex lg:flex-auto lg:flex-col">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border text-center text-xs font-semibold leading-6 lg:flex-none">
          <div className="border-r py-2.5">{t("events.mon")}</div>
          <div className="border-r py-2.5">{t("events.tue")}</div>
          <div className="border-r py-2.5">{t("events.wed")}</div>
          <div className="border-r py-2.5">{t("events.thu")}</div>
          <div className="border-r py-2.5">{t("events.fri")}</div>
          <div className="border-r py-2.5">{t("events.sat")}</div>
          <div className="py-2.5">{t("events.sun")}</div>
        </div>

        {/* Calendar Days */}
        <div className="flex text-xs leading-6 lg:flex-auto">
          <div className="hidden w-full border-x lg:grid lg:grid-cols-7 lg:grid-rows-5">
            {days.map((day, dayIdx) => (
              <div
                key={dayIdx}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  dayIdx === 0 && colStartClasses[(getDay(day) + 6) % 7],
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "bg-accent/50 text-muted-foreground",
                  "relative flex flex-col border-b border-r hover:bg-muted focus:z-10",
                  !isEqual(day, selectedDay) && "hover:bg-accent/75",
                )}
              >
                <header className="flex items-center justify-between p-2.5">
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d", { locale: getDateLocale(locale) })}
                    </time>
                </header>
                <div className="flex-1 p-2.5">
                  {data
                    .filter((event) => isSameDay(event.day, day))
                    .map((day) => (
                      <div key={day.day.toString()} className="space-y-1.5">
                        {day.events.map((event) => (
                          <Link
                            href={{ pathname: '/events/[slug]', params: { slug: event.slug } }}
                            key={event.id}
                          >
                            <div
                              key={event.id}
                              className="flex flex-row justify-between items-center cursor-pointer rounded-md border bg-brand-blue group w-full"
                            >
                              <div
                                className="flex flex-col items-start gap-1 text-brand-white p-2 leading-tight"
                              >
                                <p className="font-medium leading-none text-sm">
                                  {event.title}
                                </p>
                                <p className="leading-none text-xs">
                                  {event.period}
                                </p>
                              </div>
                              <ArrowUpRight className="w-8 h-8 text-brand-white stroke-1 group-hover:-translate-y-2 transition-transform duration-300" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="isolate grid w-full grid-cols-7 grid-rows-5 border-x lg:hidden">
            {days.map((day, dayIdx) => (
              <button
                onClick={() => { setSelectedDay(day); setOpenEvents(true) }}
                key={dayIdx}
                type="button"
                className={cn(
                  isEqual(day, selectedDay) && "text-primary-foreground",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-foreground",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-muted-foreground",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "flex h-14 flex-col border-b border-r px-3 py-2 hover:bg-muted focus:z-10",
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd", { locale: getDateLocale(locale) })}
                  className={cn(
                    "ml-auto flex size-6 items-center justify-center rounded-full",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-brand-yellow text-brand-white",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-brand-yellow text-brand-white",
                  )}
                >
                  {format(day, "d", { locale: getDateLocale(locale) })}
                </time>
                {data.filter((date) => isSameDay(date.day, day)).length > 0 && (
                  <div>
                    {data
                      .filter((date) => isSameDay(date.day, day))
                      .map((date) => (
                        <div
                          key={date.day.toString()}
                          className="-mx-0.5 mt-auto flex flex-wrap-reverse"
                        >
                          {date.events.map((event) => (
                            <span
                              key={event.id}
                              className="mx-0.5 mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Drawer open={openEvents} onOpenChange={setOpenEvents}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("events.title")}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4">
            {data
              .filter((date) => isSameDay(date.day, selectedDay))
              .map((date) => 
                date.events.map((event) => (
                  <Link 
                    key={event.id} 
                    href={{ pathname: '/events/[slug]', params: { slug: event.slug } }} 
                    className="flex flex-row justify-between items-center border-b border-brand-slate pb-8 cursor-pointer group w-full"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="text-brand-black text-sm uppercase">{event.period} - {event.location}</div>
                      <div className="text-brand-black text-2xl">{event.title}</div>
                      <div className="text-brand-black text-base">{event.description}</div>
                    </div>
                    <ArrowUpRight className="w-16 h-16 text-brand-black stroke-1 group-hover:-translate-y-4 transition-transform duration-300" />
                  </Link>
                ))
              )}
              {data.filter((date) => isSameDay(date.day, selectedDay)).length === 0 && (
                <div className="text-brand-black text-base">{t("events.noEventsForSelectedDay")}</div>
              )}
          </div>
          <DrawerFooter className="flex mb-6">
              <Button variant="outline" className="w-full" onClick={() => setOpenEvents(false)}>{t("events.close")}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </div>
  )
}
