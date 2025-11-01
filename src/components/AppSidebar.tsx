'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import { Heart } from "./icon/heart";
import { Logo } from "./Logo";
import Link from "next/link";

export function AppSidebar() {
  const [open, setOpen] = useState(true)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <SidebarAppMenu />
      <CustomTrigger />
    </SidebarProvider>
  );
}

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()
 
  return <button onClick={toggleSidebar}><Menu className="w-8 h-8 text-brand-white" /></button>
}
 
export function SidebarAppMenu() {
  const { setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    setOpenMobile(false)
  }

  return (
    <Sidebar className="bg-brand-white w-full">
      <SidebarHeader className="bg-brand-white">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="bg-brand-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="border-b border-brand-slate py-2">
                <SidebarMenuButton>
                  <Link href="/" onClick={handleLinkClick} className="text-brand-black text-lg font-inter font-normal flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-brand-black" />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="border-b border-brand-slate py-2">
                <SidebarMenuButton>
                  <Link href="/about-us" onClick={handleLinkClick} className="text-brand-black text-lg font-inter font-normal flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-brand-black" />
                    About
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="border-b border-brand-slate py-2">
                <SidebarMenuButton>
                  <Link href="/news" onClick={handleLinkClick} className="text-brand-black text-lg font-inter font-normal flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-brand-black" />
                    News
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem className="border-b border-brand-slate py-2">
                <SidebarMenuButton>
                  <Link href="/contact" onClick={handleLinkClick} className="text-brand-black text-lg font-inter font-normal flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-brand-black" />
                    Contact
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-brand-white">
        <div className="text-brand-black font-inter font-semibold text-xs mt-4 w-full">
          Copyright <br className="md:hidden" />Made by <Heart className="w-4 h-4 text-brand-black" /> by <Link target="_blank" href="https://www.hefesgroup.com" onClick={handleLinkClick} className="text-brand-black font-inter font-semibold text-xs">HTG</Link>.
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}