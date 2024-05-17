import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function POST(req: Request) {
  const { name, email, jobLink } = await req.json();

  try {
    const { data, error } = await supabase.from("job_submissions").insert([
      { name, email, job_link: jobLink },
    ]);

    if (error) {
      console.error("Error submitting job:", error);
      return NextResponse.json({ error: "Failed to submit job" }, { status: 500 });
    }

    return NextResponse.json({ message: "Job submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting job:", error);
    return NextResponse.json({ error: "Failed to submit job" }, { status: 500 });
  }
}