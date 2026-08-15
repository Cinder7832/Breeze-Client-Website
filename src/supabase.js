import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ejggjygdaafjbgrhflbg.supabase.co'
const supabasePublishableKey = 'sb_publishable_ClbaUDLLP3ifuAyvN8W2Lw_vO67ESEc'

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export function getReleaseDownloadUrl(version) {
  const url = new URL(`${supabaseUrl}/functions/v1/download-release`)
  url.searchParams.set('version', version)
  return url.toString()
}
