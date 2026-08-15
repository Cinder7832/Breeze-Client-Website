import { createClient } from "npm:@supabase/supabase-js@2.112.3";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

Deno.serve(async (request) => {
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET" },
    });
  }

  const version = new URL(request.url).searchParams.get("version");

  if (!version || !/^v\d+\.\d+\.\d+$/.test(version)) {
    return new Response("Invalid release version", { status: 400 });
  }

  const { data: updatedRelease, error: incrementError } = await supabase
    .rpc("increment_release_download", {
      p_version: version,
      p_baseline: 0,
    })
    .single();

  if (incrementError || !updatedRelease) {
    console.error("Failed to increment release download", incrementError);
    return new Response("Download is temporarily unavailable", { status: 503 });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: updatedRelease.download_url,
      "Cache-Control": "no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
});
