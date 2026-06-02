const monthPattern = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/gi
const yearPattern = /\b(?:19|20)\d{2}\b/g
const moneyPattern = /(?:₹|rs\.?|inr|\$)\s*[\d,]+(?:\.\d+)?/gi
const timeLeftPattern = /\b\d+\s*(?:days?|hours?|minutes?|seconds?)\b(?:\s*left)?/gi

export function scrubDisplayText(value: string) {
  return value
    .replace(moneyPattern, '')
    .replace(timeLeftPattern, '')
    .replace(monthPattern, '')
    .replace(yearPattern, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim()
}

export function displayText(value?: string | null, fallback = '') {
  const clean = scrubDisplayText(value || '')
  return clean || fallback
}
