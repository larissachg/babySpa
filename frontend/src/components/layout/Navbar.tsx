"use client";

import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  PanelLeft,
  ShoppingCart,
  UserRoundSearch,
  Users2,
} from "lucide-react";

import { Button } from "../ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { logoBabySpaHorizontal } from "../assets/images";

const navItems = [
  {
    href: "/calendar",
    icon: CalendarDays,
    label: "Citas",
    tooltip: "Citas",
    name: "Citas",
  },
  {
    href: "/clients",
    icon: UserRoundSearch,
    label: "Clientes",
    tooltip: "Clientes",
    name: "Clientes",
  },
  {
    href: "/products",
    icon: ShoppingCart,
    label: "Productos",
    tooltip: "Productos",
    name: "Productos",
  },
  {
    href: "/sales",
    icon: CircleDollarSign,
    label: "Ventas",
    tooltip: "Ventas",
    name: "Ventas",
  },
  {
    href: "/users",
    icon: Users2,
    label: "Usuarios",
    tooltip: "Usuarios",
    name: "Usuarios",
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center border-b sm:border-none sm:relative">
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 lg:w-16 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 sm:py-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                        isActive
                          ? "group shrink-0 bg-primary gap-2 rounded-full text-primary-foreground text-lg font-semibold md:text-base"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.tooltip}</TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-2 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="flex flex-col gap-4 sm:py-5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <div className="flex items-center gap-3" key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                            isActive
                              ? "group shrink-0 bg-primary gap-2 rounded-full text-primary-foreground text-lg font-semibold md:text-base"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <item.icon className="h-5 w-5 transition-all group-hover:scale-110" />
                        </Link>
                        <p
                          className={`text-muted-foreground ${
                            isActive ? "text-black" : "hover:text-foreground"
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </header>
        </div>
      </TooltipProvider>

      <div className="w-[30%] flex justify-center sm:absolute top-2 right-2 sm:justify-end md:right-3 lg:right-5">
        <Image
          src={logoBabySpaHorizontal}
          alt="logo"
          width={140}
        />
      </div>
    </div>
  );
};
