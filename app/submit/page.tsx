"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HdB1Gi41rfR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PostJobForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log("Submitting job data:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log("Job posted successfully!");
        // Handle success (e.g., show success message, reset form)
      } else {
        console.error("Failed to post job.");
        const errorData = await response.json();
        console.error("Error details:", errorData);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error posting job:", error);
      // Handle error (e.g., show error message)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>Fill out the form to list your job opening.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" name="company_name" placeholder="Enter company name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Enter location" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-logo">Company Logo</Label>
              <Input id="company-logo" name="company_logo" type="file" accept=".jpg,.png" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" name="job_title" placeholder="Enter job title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-link">Job Description Link</Label>
              <Input id="job-link" name="job_link" placeholder="Enter job description link" type="url" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Post Job</Button>
          </CardFooter>        </form>
      </Card>
    </div>
  );
}