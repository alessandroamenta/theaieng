import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const job_link = formData.get("job_link") as string;
    const company_name = formData.get("company_name") as string;
    const location = formData.get("location") as string;
    const job_title = formData.get("job_title") as string;
    const company_logo = formData.get("company_logo") as File | null;
    const salary_range = formData.get("salary_range") as string;

    console.log("Received job data:", { job_link, company_name, location, job_title, company_logo });

    if (!job_link || !company_name || !location || !job_title || !company_logo) {
      console.error("Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("company-logos")
      .upload(`${Date.now()}_${company_logo.name}`, company_logo);

    if (uploadError) {
      console.error("Error uploading company logo:", uploadError);
      return NextResponse.json({ error: "Failed to upload company logo" }, { status: 500 });
    }

    const company_logo_url = supabase.storage.from("company-logos").getPublicUrl(uploadData.path).data.publicUrl;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    
    const { data, error } = await supabase.from("job_postings").insert([
      { job_link, company_logo: company_logo_url, company_name, location, job_title, salary_range, date_posted: formattedDate },
    ]);
    
    console.log("Inserted job data:", data);

    if (error) {
      console.error("Error posting job:", error);
      return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
    }

    console.log("Job posted successfully:", data);
    return NextResponse.json({ message: "Job posted successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}