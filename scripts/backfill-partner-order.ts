/**
 * Backfills the `partnerOrder` global with the current partner order.
 *
 * The website renders partners in whatever order MongoDB returns them, which
 * is neither meaningful nor stable — the collection was seeded in one batch
 * and then bulk-updated, so the natural order is the reverse of the seed
 * order. This script captures the order the site is showing *right now* and
 * writes it into the `partnerOrder` global, so the editor starts from the
 * current arrangement and can drag from there.
 *
 * It is safe to re-run: it rewrites the global from the live partner
 * collection, so it never drops a partner that was added later (those are
 * simply left out and render last).
 *
 * Run it with tsx, which resolves the `@payload-config` alias:
 *
 *   npx tsx scripts/backfill-partner-order.ts --dry-run
 *   npx tsx scripts/backfill-partner-order.ts --apply
 */

import fs from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

/**
 * Load .env into process.env before the Payload config is imported — the
 * config reads PAYLOAD_SECRET and DATABASE_URI at import time, and Next.js
 * only does that automatically inside the app, not in a standalone script.
 */
const envPath = path.resolve(process.cwd(), '.env')

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)

    if (!match) continue

    const [, key, rawValue] = match
    const value = rawValue.replace(/^["']|["']$/g, '')

    if (!process.env[key]) process.env[key] = value
  }
}

const { default: configPromise } = await import('@payload-config')

const dryRun = process.argv.includes('--dry-run')
const apply = process.argv.includes('--apply')

if (!dryRun && !apply) {
  console.error('Pass --dry-run to preview, or --apply to write to the database.')
  process.exit(1)
}

const payload = await getPayload({ config: await configPromise })

const { docs: partners } = await payload.find({
  collection: 'partners',
  depth: 1,
  limit: 100,
})

const order = partners.map((partner) => partner.id)

console.log(`\nPartners found: ${partners.length}`)
console.log('Current rendered order:')
partners.forEach((partner, index) => {
  console.log(`  ${String(index + 1).padStart(2)}. ${partner.title}`)
})

console.log(`\nWould write ${order.length} entries to the 'partnerOrder' global.`)

if (dryRun) {
  console.log('\n--dry-run: nothing was written.')
  process.exit(0)
}

const result = await payload.updateGlobal({
  slug: 'partnerOrder',
  data: { partners: order },
  depth: 0,
  // There is no Next.js request context outside the running app, so the
  // revalidation hook in the global config would throw. The seed script
  // uses the same escape hatch.
  context: {
    disableRevalidate: true,
  },
})

const written = result?.partners?.length ?? 0

console.log(`\nWrote ${written} entries to the 'partnerOrder' global.`)
console.log('Open Admin -> Settings -> Partner Order to drag them into a new order.')

// The mongoose connection keeps the event loop alive, so exit explicitly.
process.exit(0)
