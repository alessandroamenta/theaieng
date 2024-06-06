// app/api/get-jobs/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function GET(req: Request) {
  try {
    const { data, error, count } = await supabase
      .from("job_postings")
      .select("*", { count: "exact" })
      .order("date_posted", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }

    console.log("Fetched jobs from Supabase:", data);

    return NextResponse.json({ data, count }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}