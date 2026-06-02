import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fff7ee] text-[#2f1d16]">
        <section className="bg-[#2a1710] px-4 py-16 text-[#fff7ee] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff8a1c]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <article className="border-l-4 border-[#ff8500] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(47,29,22,0.08)] sm:px-8">
              <h2 className="text-2xl font-black tracking-[-0.04em]">Built for local discovery</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-[#6d5b52]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>

            <aside className="grid gap-4">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className="rounded-lg border border-[#eadbd0] bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-black tracking-[-0.04em]">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#6d5b52]">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
