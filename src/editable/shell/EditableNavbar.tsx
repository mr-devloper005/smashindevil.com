'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, Plus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { SmashLogo } from '@/editable/components/SmashLogo'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-container': '1180px',
    '--editable-border': 'rgba(255,255,255,0.12)',
  } as CSSProperties
  const taskItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const mainItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Signup', href: '/signup' },
    { label: 'Login', href: '/login' },
    ...taskItems.slice(0, 2),
  ]

  return (
    <header style={navVars} className="sticky top-0 z-50 bg-[#1c1f22] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="bg-[#111315]">
        <div className="mx-auto flex h-10 max-w-[var(--editable-container)] items-center justify-end px-4 text-sm font-bold sm:px-6 lg:px-8">
          <Link href={session ? '/create' : '/signup'} className="flex h-10 items-center px-4 hover:bg-white/5">
            <Plus className="mr-1.5 h-4 w-4" /> List with Us
          </Link>
          {session ? (
            <button type="button" onClick={logout} className="h-10 bg-[#4784ea] px-5 font-bold">Logout</button>
          ) : (
            <Link href="/login" className="flex h-10 items-center gap-1.5 bg-[#4784ea] px-5 font-bold">
              <LogIn className="h-4 w-4" /> Log in
            </Link>
          )}
        </div>
      </div>

      <nav className="mx-auto flex min-h-[110px] max-w-[var(--editable-container)] items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label={`${SITE_CONFIG.name} home`}>
          <SmashLogo />
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {mainItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`rounded-sm px-3 py-2 text-[15px] font-extrabold transition hover:bg-white/8 ${active ? 'text-[#ff9a1f]' : 'text-white'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-md border border-white/15 p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#1c1f22] px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-2">
            {[...mainItems, { label: 'Search', href: '/search' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.label}-${item.href}-mobile`} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-white/10 px-4 py-3 text-sm font-extrabold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
