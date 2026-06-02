'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <EditableSiteShell>
      <main className="bg-[#fff7ee] text-[#2f1d16]">
        <section className="border-b border-[#eadbd0] bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff8500]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl">
                {pagesContent.contact.title}
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#6d5b52] lg:justify-self-end">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-black tracking-[-0.04em]">Choose the right lane</h2>
            <div className="mt-5 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-lg border border-[#eadbd0] bg-white p-5 shadow-sm">
                  <lane.icon className="h-5 w-5 text-[#ff8500]" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#6d5b52]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
            <div className="[&_form]:rounded-lg [&_form]:border-[#2f1d16] [&_form]:shadow-[0_20px_60px_rgba(47,29,22,0.12)]">
              <EditableContactLeadForm />
            </div>
          </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
