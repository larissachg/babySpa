'use client'

import Link from 'next/link'
import {
  CalendarDays,
  CircleDollarSign,
  LogOutIcon,
  PanelLeft,
  ShoppingCart,
  UserRoundSearch,
  Users2
} from 'lucide-react'

import { Button } from '../ui/button'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { logoBabySpaHorizontal } from '../assets/images'
import { useState } from 'react'
import { logout } from '@/actions/auth/logout'

const navItems = [
  {
    href: '/calendar',
    icon: CalendarDays,
    label: 'Citas',
    tooltip: 'Citas',
    name: 'Citas',
    title: 'Calendario de Citas'
  },
  {
    href: '/clients',
    icon: UserRoundSearch,
    label: 'Clientes',
    tooltip: 'Clientes',
    name: 'Clientes',
    title: 'Clientes'
  },
  {
    href: '/products',
    icon: ShoppingCart,
    label: 'Productos',
    tooltip: 'Productos',
    name: 'Productos',
    title: 'Productos'
  },
  {
    href: '/sales',
    icon: CircleDollarSign,
    label: 'Ventas',
    tooltip: 'Ventas',
    name: 'Ventas',
    title: 'Ventas'
  },
  {
    href: '/users',
    icon: Users2,
    label: 'Usuarios',
    tooltip: 'Usuarios',
    name: 'Usuarios',
    title: 'Usuarios'
  }
]

export const Navbar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const item = navItems.find((item) => item.href === pathname)

  return (
    <div className='flex justify-between items-center border-b sm:border-none sm:relative'>
      <TooltipProvider>
        <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 lg:w-16 flex-col border-r bg-background sm:flex'>
          <nav className='flex flex-col items-center gap-4 sm:py-5'>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                        isActive
                          ? 'group shrink-0 bg-primary gap-2 rounded-full text-primary-foreground text-lg font-semibold md:text-base'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <item.icon className='h-5 w-5 transition-all group-hover:scale-110' />
                      <span className='sr-only'>{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side='right'>{item.tooltip}</TooltipContent>
                </Tooltip>
              )
            })}

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='#'
                  onClick={async () => {
                    await logout()
                    window.location.replace('/login')
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 text-muted-foreground hover:text-foreground`}
                >
                  <LogOutIcon className='h-5 w-5 transition-all group-hover:scale-110' />
                  <span className='sr-only'>Cerrar sesión</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Cerrar sesión</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </TooltipProvider>

      <div className='flex flex-col sm:gap-4 sm:py-2 sm:pl-14'>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <nav className='flex flex-col gap-4 sm:py-5'>
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className='flex items-center gap-3'
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                          isActive
                            ? 'group shrink-0 bg-primary gap-2 rounded-full text-primary-foreground text-lg font-semibold md:text-base'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <item.icon />
                      </div>
                      <p
                        className={` ${
                          isActive
                            ? 'text-black'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>

      <div className='flex justify-end sm:justify-between flex-1 items-center sm:pt-4 pr-4 '>
        <h1 className='text-2xl font-bold text-[var(--blue)] hidden sm:block'>
          {item && item.title}
        </h1>
        <Image
          src={logoBabySpaHorizontal}
          alt='logo'
          width={140}
          className='w-[100px] sm:w-[140px]'
        />
      </div>
    </div>
  )
}
