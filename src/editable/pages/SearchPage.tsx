import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, MapPin, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { displayText, scrubDisplayText } from '@/editable/components/displayText'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

function stripHtml(value: string) {
  let text = value.replace(/<[^>]*>/g, ' ')
  text = text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  text = text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  text = text.replace(/<[^>]*>/g, ' ')
  return text.replace(/\s+/g, ' ').trim()
}

const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => scrubDisplayText(stripHtml(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''))
const categoryOf = (post: SitePost) => {
  const content = getContent(post)
  return (typeof content.category === 'string' && content.category.trim()) || post?.tags?.[0] || 'Local'
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function DealCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const cat = categoryOf(post)
  const badges = ['Featured offer', 'Member pick', 'Top result', 'Popular', 'Recommended']

  return (
    <Link href={href} className="group grid gap-5 sm:grid-cols-[268px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-neutral-200 sm:aspect-[1.35]">
        {image ? <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black">{badges[index % 5]}</span>
      </div>
      <div className="min-w-0 pt-1">
        <h3 className="line-clamp-3 text-[21px] font-black leading-tight text-black">{displayText(post.title, 'Open listing')}</h3>
        <p className="mt-3 text-xs font-bold text-[#ff8500]">in {cat}</p>
        <p className="mt-5 inline-flex items-center rounded-full bg-[#4784ea] px-4 py-2 text-sm font-black text-white">{badges[index % 5]}</p>
        {summary ? <p className="mt-3 line-clamp-2 text-sm font-bold text-neutral-500">{summary}</p> : null}
      </div>
    </Link>
  )
}

function ImageCard({ post }: { post: SitePost }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)

  return (
    <Link href={href} className="group relative block aspect-[1.45] overflow-hidden rounded-[18px] bg-neutral-200">
      {image ? <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
      <div className="absolute inset-x-0 bottom-0 bg-black/45 p-4 text-xl font-black leading-tight text-white backdrop-blur-sm">
        {displayText(post.title, 'Open listing')}
      </div>
    </Link>
  )
}

function ArticleRow({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const cat = categoryOf(post)

  return (
    <Link href={href} className="group grid gap-7 sm:grid-cols-[298px_minmax(0,1fr)]">
      <div className="aspect-[1.35] overflow-hidden rounded-[18px] bg-neutral-800">
        {getImage(post) ? <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
      </div>
      <div className="min-w-0 pt-1">
        <p className="text-sm font-black text-white">Result {index + 1}</p>
        <h3 className="mt-2 line-clamp-2 text-2xl font-black leading-tight text-white">{displayText(post.title, 'Open listing')}</h3>
        <p className="mt-5 text-xs font-bold text-white">in <span className="text-[#ff8500]">{cat}</span></p>
        {summary ? <p className="mt-3 line-clamp-3 text-base leading-6 text-white/78">{summary}</p> : null}
      </div>
    </Link>
  )
}

function PopularResult({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`

  return (
    <Link href={href} className="grid grid-cols-[48px_minmax(0,1fr)] gap-5">
      <span className="text-4xl font-black leading-none text-white/55">{index + 1}</span>
      <span>
        <span className="line-clamp-3 text-xl font-black leading-tight text-white">{displayText(post.title, 'Open listing')}</span>
        <span className="mt-2 block text-xs text-white/80">in <span className="text-[#ff8500]">{categoryOf(post)}</span></span>
      </span>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  const dealResults = results.slice(0, 4)
  const imageResults = results.slice(4, 7)
  const articleResults = results.slice(7, 11)
  const popularResults = results.slice(11, 16)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-black">
        {/* Hero search — matches home hero */}
        <section className="relative overflow-hidden bg-[#1c1f22] text-white">
          <div className="mx-auto flex min-h-[340px] max-w-[1180px] flex-col items-center justify-center px-4 py-14 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff8500]">{pagesContent.search.hero.badge}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{pagesContent.search.hero.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{pagesContent.search.hero.description}</p>

            <form action="/search" className="mt-10 grid w-full max-w-[980px] gap-4 md:grid-cols-[1fr_0.85fr_116px]">
              <input type="hidden" name="master" value="1" />
              <label className="flex h-[52px] items-center rounded-full border border-white/50 bg-[#111315] px-6 text-left shadow-lg">
                <Search className="h-5 w-5 shrink-0 text-[#4784ea]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent px-5 text-sm font-extrabold text-white outline-none placeholder:text-white" />
              </label>
              <label className="flex h-[52px] items-center rounded-full border border-white/50 bg-[#111315] px-6 text-left shadow-lg">
                <Filter className="h-5 w-5 shrink-0 text-[#4784ea]" />
                <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent px-5 text-sm font-extrabold text-white outline-none placeholder:text-white" />
              </label>
              <button className="h-[52px] rounded-full bg-[#4784ea] px-8 text-sm font-black text-white hover:bg-[#2f6fdf]" type="submit">Search</button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <select name="task" form="search-form-hidden" defaultValue={task} className="h-9 rounded-full border border-white/30 bg-[#111315] px-4 text-xs font-bold text-white outline-none">
                <option value="">All types</option>
                {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
              <span className="text-sm font-bold text-white/55">{results.length} {results.length === 1 ? 'result' : 'results'}{query ? ` for "${query}"` : ''}</span>
            </div>
          </div>
        </section>

        {/* Deal results — matches Popular Deals section */}
        {dealResults.length ? (
          <section className="bg-[#f3f3f3] py-12">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#4d5359]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
                <Link href="/classified" className="text-sm font-extrabold text-[#ff8500] hover:underline">browse all</Link>
              </div>
              <div className="grid gap-10 lg:grid-cols-2">
                {dealResults.map((post, index) => <DealCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            </div>
          </section>
        ) : null}

        {/* Image results — matches Featured Listings section */}
        {imageResults.length ? (
          <section className="bg-white py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#4d5359]">Featured Listings</h2>
                <Link href="/classified" className="text-sm font-extrabold text-[#ff8500] hover:underline">More Listings</Link>
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {imageResults.map((post) => <ImageCard key={post.id || post.slug} post={post} />)}
              </div>
            </div>
          </section>
        ) : null}

        {/* Article results + popular sidebar — matches dark articles section */}
        {articleResults.length ? (
          <section className="bg-[#1c1f22] py-16 text-white">
            <div className="mx-auto grid max-w-[1180px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_342px] lg:px-8">
              <div className="grid gap-20">
                {articleResults.map((post, index) => <ArticleRow key={post.id || post.slug} post={post} index={index} />)}
              </div>
              {popularResults.length ? (
                <aside>
                  <h2 className="border-b border-white/18 pb-3 text-2xl font-black">More Results</h2>
                  <div className="mt-7 grid gap-7">
                    {popularResults.map((post, index) => <PopularResult key={post.id || post.slug} post={post} index={index} />)}
                  </div>
                </aside>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Empty state */}
        {!results.length ? (
          <section className="bg-[#f3f3f3] py-20">
            <div className="mx-auto max-w-[1180px] px-4 text-center sm:px-6 lg:px-8">
              <Search className="mx-auto h-10 w-10 text-[#4784ea]" />
              <h2 className="mt-6 text-3xl font-black">No matching posts found</h2>
              <p className="mt-3 text-sm font-bold text-neutral-500">Try a different keyword, content type, or category.</p>
              <Link href="/classified" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4784ea] px-6 py-3 text-sm font-black text-white hover:bg-[#2f6fdf]">Browse listings <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </section>
        ) : null}
      </main>
    </EditableSiteShell>
  )
}
