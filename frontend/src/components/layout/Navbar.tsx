"use client";

import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  ShoppingCart,
  UserRoundSearch,
  Users2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/calendar",
    icon: CalendarDays,
    label: "Citas",
    tooltip: "Citas",
  },
  {
    href: "/clients",
    icon: UserRoundSearch,
    label: "Clientes",
    tooltip: "Clientes",
  },
  {
    href: "/products",
    icon: ShoppingCart,
    label: "Productos",
    tooltip: "Productos",
  },
  {
    href: "/sales",
    icon: CircleDollarSign,
    label: "Ventas",
    tooltip: "Ventas",
  },
  {
    href: "/users",
    icon: Users2,
    label: "Usuarios",
    tooltip: "Usuarios",
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 lg:w-16 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 sm:py-5">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={index}>
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
    </TooltipProvider>
  );
};
