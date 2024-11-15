"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  LogOutIcon,
  PanelLeft,
  ShoppingCart,
  UserRoundSearch,
  Users2,
} from "lucide-react";

import { Button } from "../ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { logoBabySpaHorizontal } from "../assets/images";
import { useState } from "react";
import { logout } from "@/actions/auth";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

const navItems = [
  {
    href: "/calendar",
    icon: CalendarDays,
    label: "Citas",
    tooltip: "Citas",
    name: "Citas",
    title: "Calendario de Citas",
  },
  {
    href: "/clients",
    icon: UserRoundSearch,
    label: "Clientes",
    tooltip: "Clientes",
    name: "Clientes",
    title: "Clientes",
  },
  {
    href: "/products",
    icon: ShoppingCart,
    label: "Productos",
    tooltip: "Productos",
    name: "Productos",
    title: "Productos",
  },
  {
    href: "/sales",
    icon: CircleDollarSign,
    label: "Ventas",
    tooltip: "Ventas",
    name: "Ventas",
    title: "Ventas",
  },
  {
    href: "/users",
    icon: Users2,
    label: "Usuarios",
    tooltip: "Usuarios",
    name: "Usuarios",
    title: "Usuarios",
  },
  {
    href: "/reports",
    icon: ChartNoAxesCombined,
    label: "Reportes",
    tooltip: "Reportes",
    name: "Reportes",
    title: "Reportes",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const item = navItems.find((item) => item.href === pathname);

  return (
    <div className="flex justify-between items-center border-b sm:border-none sm:relative ">
      <TooltipProvider>
        <aside className="hidden sm:flex fixed inset-y-0 left-0 z-10 w-[3.7rem] flex-col border-r bg-background">
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

            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 text-muted-foreground hover:text-foreground">
                      <LogOutIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">Cerrar sesión</span>
                    </button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">Cerrar sesión</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Esta seguro que desea cerrar sesión?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await logout();
                      window.location.replace("/login");
                    }}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </aside>
      </TooltipProvider>

      <div className="flex flex-col sm:hidden">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <nav className="flex flex-col gap-4 sm:py-5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                          isActive
                            ? "group shrink-0 bg-primary gap-2 rounded-full text-primary-foreground text-lg font-semibold md:text-base"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <item.icon />
                      </div>
                      <p
                        className={` ${
                          isActive
                            ? "text-black"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>

      <div className="sm:ml-[3.7rem] w-full sm:h-[5rem] mx-auto flex justify-end sm:justify-between items-center px-[1rem] lg:px-[1.5rem] xl:px-[2.5rem]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <h1 className="text-2xl font-bold text-[var(--blue)] hidden sm:block">
                  {item && item.title}
                </h1>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Image
          src={logoBabySpaHorizontal}
          alt="logo"
          width={140}
          className="sm:w-[160px]"
        />
      </div>
    </div>
  );
};
