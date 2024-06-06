// lib/jobData.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

export const getJobs = async () => {
  const { data, error, count } = await supabase
    .from("job_postings")
    .select("*", { count: "exact" })
    .order("date_posted", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }

  return { jobs: data, count };
};