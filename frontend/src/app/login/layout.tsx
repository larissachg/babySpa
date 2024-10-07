import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  const sesion = await auth()

  if (sesion) {
    redirect('/calendar')
  }

  return <main>{children}</main>
}
