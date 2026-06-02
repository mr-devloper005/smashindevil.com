'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { SmashLogo } from '@/editable/components/SmashLogo'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Signup', href: '/signup' },
  { label: 'Login', href: '/login' },
  { label: 'Classified', href: '/classified' },
  { label: 'More', href: '/search' },
]

export function EditableFooter() {
  return (
    <footer className="bg-[#1c1f22] text-white">
      <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${SITE_CONFIG.name} home`} className="inline-flex">
          <SmashLogo />
        </Link>

        <div className="mt-14">
          <h2 className="text-xl font-extrabold">Links</h2>
        </div>
        <div className="mt-7 grid gap-x-12 gap-y-4 text-[15px] font-extrabold sm:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#ff8500]">{link.label}</Link>
          ))}
        </div>

      </div>
      <div className="bg-[#111315]">
        <div className="mx-auto max-w-[1180px] px-4 py-5 text-sm sm:px-6 lg:px-8">
          © {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
