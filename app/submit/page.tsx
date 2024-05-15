/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HdB1Gi41rfR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>Fill out the form to list your job opening.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Enter company name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary-range">Salary Range</Label>
              <Input id="salary-range" placeholder="Enter salary range" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-logo">Company Logo</Label>
              <Input id="company-logo" type="file" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input id="job-title" placeholder="Enter job title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description Link</Label>
            <Input id="job-description" placeholder="Enter job description link" type="url" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-posted">Date Posted</Label>
            <Input id="date-posted" type="date" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Post Job</Button>
        </CardFooter>
      </Card>
    </div>
  )
}