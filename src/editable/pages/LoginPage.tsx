import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fff7ee] text-[#2f1d16]">
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-lg border border-[#eadbd0] bg-white shadow-[0_24px_70px_rgba(47,29,22,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff8500]">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-lg text-sm leading-8 text-[#6d5b52]">{pagesContent.auth.login.description}</p>
            </div>

            <div className="bg-[#2a1710] p-8 text-[#fff7ee] sm:p-10 lg:p-12">
              <h2 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.login.formTitle}</h2>
              <div className="[&_input]:border-white/15 [&_input]:bg-white [&_input]:text-[#2f1d16] [&_button]:bg-[#ff8500] [&_button]:text-[#2f1d16]">
                <EditableLocalLoginForm />
              </div>
              <p className="mt-5 text-sm text-white/70">New here? <Link href="/signup" className="font-black text-white underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
