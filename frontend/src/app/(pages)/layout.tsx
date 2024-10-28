import { Navbar } from '@/components/layout/Navbar'
import { Toaster } from '@/components/ui/toaster'

export default function PagesLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Navbar />
      <Toaster />
      <div className='sm:ml-[3.7rem] px-[1rem] lg:px-[1.5rem] xl:px-[2.5rem]'>{children}</div>
    </main>
  )
}
