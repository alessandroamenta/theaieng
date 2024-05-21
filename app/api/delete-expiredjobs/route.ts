import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function POST(req: Request) {
  try {
    const expirationDays = 31; // Change this value to set the desired expiration days
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() - expirationDays);
    const formattedExpirationDate = expirationDate.toISOString().split('T')[0];

    const { data: expiredJobs, error: selectError } = await supabase
      .from("job_postings")
      .select("*")
      .lt("date_posted", formattedExpirationDate);

    if (selectError) {
      console.error("Error selecting expired jobs:", selectError);
      return NextResponse.json({ error: "Failed to select expired jobs" }, { status: 500 });
    }

    const { data, error: deleteError } = await supabase
      .from("job_postings")
      .delete()
      .in(
        "id",
        expiredJobs.map((job) => job.id)
      );

    if (deleteError) {
      console.error("Error deleting expired jobs:", deleteError);
      return NextResponse.json({ error: "Failed to delete expired jobs" }, { status: 500 });
    }

    console.log("Expired jobs deleted successfully:", data);
    return NextResponse.json({ message: "Expired jobs deleted successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error deleting expired jobs:", error);
    return NextResponse.json({ error: "Failed to delete expired jobs" }, { status: 500 });
  }
}
