import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fff7ee] text-[#2f1d16]">
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-lg border border-[#eadbd0] bg-white shadow-[0_24px_70px_rgba(47,29,22,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#2a1710] p-8 text-[#fff7ee] sm:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff8500]">{pagesContent.auth.signup.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl">{pagesContent.auth.signup.title}</h1>
              <p className="mt-6 max-w-lg text-sm leading-8 text-white/70">{pagesContent.auth.signup.description}</p>
              <div className="mt-8 grid gap-3 text-sm font-bold text-white/75">
                <span className="border-l-2 border-[#ff8500] pl-4">Create listings and manage submissions.</span>
                <span className="border-l-2 border-[#ff8500] pl-4">Keep your publishing details ready.</span>
                <span className="border-l-2 border-[#ff8500] pl-4">Return anytime with local account access.</span>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <h2 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h2>
              <EditableLocalSignupForm />
              <p className="mt-5 text-sm text-[#6d5b52]">Already have an account? <Link href="/login" className="font-black text-[#2f1d16] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
