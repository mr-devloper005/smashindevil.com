export const smashLogoDataUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23000000'/%3E%3Cpath d='M64 9 78 31l28-17-15 35 25-4-28 24 16 38-31-18-9 30-11-30-31 18 16-38-28-24 25 4-15-35 28 17Z' fill='%23111113'/%3E%3Cpath d='M64 13 75 34l24-16-13 34 22-5-25 23 15 32-29-16-5 27-8-27-27 16 14-32-24-23 22 5-13-34 23 16Z' fill='%23ed1717'/%3E%3Cpath d='M64 14 78 33l24-16-27 30 18-2-25 18 20 18-20-5-4 38-9-39-22 6 21-18-24-18 19 2-22-29 24 15Z' fill='%2323262b'/%3E%3Cpath d='M62 15 84 6 70 25l-3 14 20-20-12 25 19-7-25 31-6 46-8-45-25-31 19 7-12-25 20 20-3-14Z' fill='%23f2f2f2'/%3E%3Cpath d='M44 48c12-4 29-4 41 0l-7 13c-9-3-22-3-27 0Z' fill='%23000000'/%3E%3Cpath d='M36 51c-6 8-2 24 8 30l8-8c-5-4-7-14-3-20Z' fill='%23f6f6f6'/%3E%3Cpath d='M51 48c-8 7-7 30 1 37l10-5c-5-8-5-24 1-31Z' fill='%23d8d8d8'/%3E%3Cpath d='M67 48c7 8 8 24 3 32l10 5c8-7 9-30 1-37Z' fill='%238a8d91'/%3E%3Cpath d='M83 53c4 6 2 16-3 20l8 8c10-6 14-22 8-30Z' fill='%234d5055'/%3E%3Cpath d='M42 83 23 74l19 24 12-7Z' fill='%23ff201b'/%3E%3Cpath d='M86 83 105 74 86 98l-12-7Z' fill='%23101216'/%3E%3Cpath d='M38 97 55 90l9 25 9-25 17 7-26 23Z' fill='%23101012'/%3E%3Cpath d='M42 97 55 91l9 25-26-17Z' fill='%23e01616'/%3E%3C/svg%3E"

export function SmashLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-white/10 sm:h-20 sm:w-20">
        <img src={smashLogoDataUrl} alt="" className="h-full w-full object-cover" />
      </span>
      <span className="leading-none">
        <span className="block text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">smashindevil</span>
      </span>
    </span>
  )
}
