import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { displayText, scrubDisplayText } from '@/editable/components/displayText'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const heroImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80'

function contentOf(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function excerpt(post?: SitePost | null, limit = 130) {
  const content = contentOf(post)
  const raw = text(content.description) || text(content.summary) || text(content.excerpt) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const scrubbed = scrubDisplayText(clean)
  return scrubbed.length > limit ? `${scrubbed.slice(0, limit).trim()}...` : scrubbed
}

function category(post?: SitePost | null, fallback = 'Local') {
  const content = contentOf(post)
  return text(content.category) || post?.tags?.[0] || fallback
}

function HeaderLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="text-sm font-extrabold text-[#ff8500] hover:underline">{label}</Link>
}

function DealRowCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-5 sm:grid-cols-[268px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-neutral-200 sm:aspect-[1.35]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black">{index === 0 ? '45% OFF' : '43% OFF'}</span>
      </div>
      <div className="min-w-0 pt-1">
        <h3 className="line-clamp-3 text-[21px] font-black leading-tight text-black">{displayText(post.title, 'Open listing')}</h3>
        <p className="mt-3 text-xs font-bold text-[#ff8500]">in {category(post, 'Tours Packages, Tour Companies')}</p>
        <p className="mt-5 inline-flex items-center rounded-full bg-[#4784ea] px-4 py-2 text-sm font-black text-white">{index === 0 ? 'Featured offer' : 'Member pick'}</p>
        <p className="mt-3 line-clamp-2 text-sm font-bold text-neutral-500">{excerpt(post, 86) || 'Open this listing for full details from the provider.'}</p>
      </div>
    </Link>
  )
}

function ImageListingCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block aspect-[1.45] overflow-hidden rounded-[18px] bg-neutral-200">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 bg-black/45 p-4 text-xl font-black leading-tight text-white backdrop-blur-sm">
        {displayText(post.title, 'Open listing')}
      </div>
    </Link>
  )
}

function ArticleTeaser({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-7 sm:grid-cols-[298px_minmax(0,1fr)]">
      <div className="aspect-[1.35] overflow-hidden rounded-[18px] bg-neutral-800">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 pt-1">
        <p className="text-sm font-black text-white">Featured guide</p>
        <h3 className="mt-2 line-clamp-2 text-2xl font-black leading-tight text-white">{displayText(post.title, 'Open listing')}</h3>
        <p className="mt-5 text-xs font-bold text-white">in <span className="text-[#ff8500]">{category(post, 'Cultural')}</span></p>
        <p className="mt-3 line-clamp-3 text-base leading-6 text-white/78">{excerpt(post, 160)}</p>
      </div>
    </Link>
  )
}

function PopularArticle({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="grid grid-cols-[48px_minmax(0,1fr)] gap-5">
      <span className="text-4xl font-black leading-none text-white/55">{index + 1}</span>
      <span>
        <span className="line-clamp-3 text-xl font-black leading-tight text-white">{displayText(post.title, 'Open listing')}</span>
        <span className="mt-2 block text-xs text-white/80">By <span className="text-[#ff8500]">Local Editor</span></span>
      </span>
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="relative min-h-[640px] overflow-hidden text-white">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/52" />
      <div className="relative mx-auto flex min-h-[640px] max-w-[1180px] flex-col items-center justify-center px-4 pt-10 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">Exploring the best of your city</h1>
        <form action="/search" className="mt-16 grid w-full max-w-[980px] gap-4 md:grid-cols-[1fr_0.85fr_116px]">
          <label className="flex h-[52px] items-center rounded-full border border-white/50 bg-[#111315] px-6 text-left shadow-lg">
            <Search className="h-5 w-5 shrink-0 text-[#4784ea]" />
            <input name="q" placeholder="Search anything..." className="min-w-0 flex-1 bg-transparent px-5 text-sm font-extrabold text-white outline-none placeholder:text-white" />
          </label>
          <label className="flex h-[52px] items-center rounded-full border border-white/50 bg-[#111315] px-6 text-left shadow-lg">
            <MapPin className="h-5 w-5 shrink-0 text-[#4784ea]" />
            <input name="location" placeholder="Location" className="min-w-0 flex-1 bg-transparent px-5 text-sm font-extrabold text-white outline-none placeholder:text-white" />
          </label>
          <button className="h-[52px] rounded-full bg-[#4784ea] px-8 text-sm font-black text-white hover:bg-[#2f6fdf]">Search</button>
        </form>
        <Link href={primaryRoute} className="absolute bottom-20 left-4 text-3xl font-black text-[#ff9a1f] sm:left-8 lg:left-0">
          Add a Hotel Listing
        </Link>
        <div className="absolute bottom-8 flex gap-3">
          {[0, 1, 2, 3, 4].map((dot) => <span key={dot} className={`h-3 w-3 rounded-full border border-white ${dot === 3 ? 'bg-white' : 'bg-transparent'}`} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const deals = posts.slice(0, 2)
  if (!deals.length) return null
  return (
    <section className="bg-[#f3f3f3] py-12">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#4d5359]">Popular Deals</h2>
          <HeaderLink href={primaryRoute} label="more deals" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {deals.map((post, index) => <DealRowCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const cards = posts.slice(2, 5)
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#4d5359]">Featured Listings</h2>
          <HeaderLink href={primaryRoute} label="More Listings" />
        </div>
        {cards.length ? (
          <div className="grid gap-7 md:grid-cols-3">
            {cards.map((post) => <ImageListingCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pooled = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const stories = pooled.slice(0, 2)
  const popular = pooled.slice(2, 7)
  return (
    <section className="bg-[#1c1f22] py-16 text-white">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_342px] lg:px-8">
        <div className="grid gap-20">
          {stories.map((post) => <ArticleTeaser key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
        <aside>
          <h2 className="border-b border-white/18 pb-3 text-2xl font-black">Popular Articles</h2>
          <div className="mt-7 grid gap-7">
            {popular.map((post, index) => <PopularArticle key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </aside>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#1c1f22] text-white">
      <div className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
          {[
            ['Post faster', 'Create a clear listing with photos, location details, and a helpful description.'],
            ['Search locally', 'Use keywords and places to find deals, services, jobs, products, and property pages.'],
            ['Browse simply', 'Cards, lists, categories, and location blocks keep every public page easy to scan.'],
          ].map(([title, body], index) => (
            <div key={title} className="border-l border-white/12 pl-5">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#4784ea] text-sm font-black">{index + 1}</div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
