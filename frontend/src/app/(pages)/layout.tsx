import { Navbar } from '@/components/layout/Navbar'

export default function PagesLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Navbar />
      <div className='sm:ml-[4.5rem] mt-2'>{children}</div>
    </main>
  )
}
