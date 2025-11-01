'use client';
import { useRouter } from "@/i18n/navigation";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

interface LogoProps {
  locale: string;
}

export function DropdownLangSwitcher({ locale }: LogoProps) {
  const router = useRouter();
  const currentFlag = locale === "en" ? "fi fi-gb" : "fi fi-rs";

  const handleLanguageChange = (newLocale: string) => {
    router.replace('/', { locale: newLocale });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="hover:bg-transparent">
          <NavigationMenuTrigger className="bg-transparent border-none text-brand-white font-inter font-normal text-md fancy-hover p-0 flex items-center gap-1 hover:bg-transparent">
            <span className={currentFlag}></span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[100px] gap-1 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <button 
                    onClick={() => handleLanguageChange('sr')}
                    className="text-sm font-normal leading-none cursor-pointer flex flex-row gap-2 w-full text-left"
                  >
                    <span className="fi fi-rs"></span> SR
                  </button>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    className="text-sm font-normal leading-none cursor-pointer flex flex-row items-center gap-2 w-full text-left"
                  >
                    <span className="fi fi-gb"></span> EN
                  </button>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
} 