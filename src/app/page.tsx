import AnimatedText from "@/components/AnimatedText";
import AnimatedButton from "@/components/AnimatedButton";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default async function Home() {

  return (
    <>

      {/* Hero */}
      <div id="hero" className="bg-brand-background">
        <div className="container mx-auto flex flex-col py-16 justify-start align-middle gap-8 px-4 md:px-8 min-h-[600px]">

          <div className="flex flex-1 flex-col md:flex-row gap-8 w-full items-center">
            <div className="flex flex-col w-full md:w-2/4 gap-4 h-full">
              <AnimatedButton delay={0.3}>
                <div className="inline-flex items-center self-start rounded-full border border-gray-400 bg-gray-200 text-gray-600 font-jakarta-sans px-2 py-1 text-xs md:text-sm font-bold">
                  Request private beta access and get 50% discount on first year
                </div>
              </AnimatedButton>
              <h1 className="text-4xl md:text-5xl text-gray-900 font-jakarta-sans font-extrabold"><AnimatedText text="The open-source preschool management platform" /></h1>
              <div className="flex flex-row gap-4 text-gray-600 font-inter font-regular max-w-[600px] lg:max-w-[800px]">
                <AnimatedText 
                  text="Made for modern preschools — and the parents who care."
                  className="text-gray-600 font-inter font-regular text-base lg:text-lg"
                  staggerChildren={0.02}
                />
              </div>
              <AnimatedButton delay={1.0}>
                <Link href="/#contact">
                  <Button variant="default" size="xl" className="font-jakarta-sans text-white font-bold text-lg cursor-pointer w-[260px] transition-transform hover:scale-105">
                    Request beta access <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </Link>
              </AnimatedButton>
            </div>

            <div className="flex flex-col w-full md:w-2/4 gap-4 h-full">
              <div className="flex flex-row relative gap-16">
                <Image 
                  src="/dashboard.png" 
                  alt="Dashboard" 
                  priority
                  width={1120}
                  height={502}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* About */}
      <div id="about" className="bg-brand-background">
        <div className="container mx-auto flex flex-col py-16 justify-start align-middle gap-8 px-4 md:px-8 min-h-[600px]">

          <div className="flex flex-1 flex-col md:flex-row gap-8 w-full items-center">

            <div className="flex flex-col w-full md:w-2/4 gap-4 h-full">
              <div className="flex flex-row relative gap-16">
                <Image 
                  src="/students.png" 
                  alt="Students" 
                  priority
                  width={640}
                  height={409}
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-2/4 gap-4 h-full">
                <div className="inline-flex items-center self-start rounded-full border border-gray-400 bg-white text-gray-600 font-jakarta-sans px-2 py-1 text-sm font-medium">
                  About Kiddly
                </div>
              <h1 className="text-2xl md:text-3xl text-gray-900 font-jakarta-sans font-extrabold">The smarter, simpler way to run your kindergarten.</h1>
              <div className="flex flex-row gap-4 text-gray-600 font-inter font-regular max-w-[600px] lg:max-w-[800px]">
                Kiddly is an open-source preschool management platform that helps kindergartens simplify daily operations and strengthen communication between staff and parents. It’s designed to make early education more organized, transparent, and connected — without sacrificing privacy or control.
              </div>
              <div className="flex flex-row gap-4 text-gray-600 font-inter font-regular max-w-[600px] lg:max-w-[800px]">
                Kiddly is currently in private beta and under heavy development as we prepare for the initial release.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Features */}
      <div id="features" className="bg-brand-background">
        <div className="container mx-auto flex flex-col py-16 justify-start align-middle gap-16 px-4 md:px-8 min-h-[600px]">

          <div className="flex flex-col gap-16 h-full">
            <div className="flex flex-col gap-4 h-full">
                <div className="inline-flex items-center self-start rounded-full border border-gray-400 bg-white text-gray-600 font-jakarta-sans px-2 py-1 text-sm font-medium">
                  Features
                </div>
              <h2 className="text-2xl md:text-3xl text-gray-900 font-jakarta-sans font-extrabold">All the essentials for running a modern preschool.</h2>
          </div>
              
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* For Managers */}
          <div className="border border-gray-400 rounded-2xl p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-4 font-jakarta-sans">For Managers</h2>
            <div className="border-t border-gray-400 mb-4"></div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Centralized Management Dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Staff & Classroom Management</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Attendance & Schedule Tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Parent Communication Overview</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Privacy & Access Control</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Billing & Payment Overview (coming soon)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Insights & Analytics (in development)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">and more</span>
              </li>
            </ul>
          </div>

          {/* For Staff */}
          <div className="border border-gray-400 rounded-2xl p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-4 font-jakarta-sans">For Staff</h2>
            <div className="border-t border-gray-400 mb-4"></div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                  <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Child Profiles & Daily Notes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Attendance & Check-In System</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Photo & Activity Sharing</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Daily Reports & Observations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Instant Parent Messaging</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">and more</span>
              </li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="border border-gray-400 rounded-2xl p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-4 font-jakarta-sans">For Parents</h2>
            <div className="border-t border-gray-400 mb-4"></div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Daily Updates & Photos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Real-Time Notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Direct Communication with Teachers</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                  <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">Calendar & Events</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4b5563] flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-inter font-semibold text-sm leading-relaxed">and more</span>
              </li>
            </ul>
          </div>
        </div>
            </div>

        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="bg-brand-white">
        <div className="container mx-auto flex flex-col py-16 justify-start align-middle gap-16 px-4 md:px-8 min-h-[600px]">

          <div className="flex flex-col gap-16 h-full">
            <div className="flex flex-col gap-4 h-full">
                <div className="inline-flex items-center self-start rounded-full border border-gray-400 bg-white text-gray-600 font-jakarta-sans px-2 py-1 text-sm font-medium">
                  Contact
                </div>
                <div className="flex flex-row gap-4 text-gray-900 font-jakarta-sans font-medium max-w-[600px] lg:max-w-[800px]">
                  Have questions about Kiddly, or want early access? We’d love to hear from you — reach out and let’s talk.
                </div>
                <div className="flex flex-row gap-4">
                  <div className="grid w-full items-center gap-3">
                    <ContactForm />
                  </div>
                </div>
            </div>
          </div>

        </div>
      </div>

     </>
  );
}
