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
      <div className='sm:ml-[4.5rem] mt-2'>{children}</div>
    </main>
  )
}
