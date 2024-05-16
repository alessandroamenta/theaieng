"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, BotIcon, HeatmapChart, LocateIcon, MoonIcon, SunIcon } from "@/components/icons";
import JobCard from "@/components/jobcard";
import Spline from "@splinetool/react-spline"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [showCount, setShowCount] = useState(20);

  const handleShowMore = () => {
    setShowCount(showCount + 20);
  };
  
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('/api/get-jobs');
      const data = await response.json();
      console.log("Fetched jobs:", data);
      
      // Sort jobs by date_posted in descending order
      const sortedJobs = data.sort((a: any, b: any) => {
        const dateA = new Date(a.date_posted);
        const dateB = new Date(b.date_posted);
        console.log("Date comparison:", dateA, dateB);
        return dateB.getTime() - dateA.getTime();
      });
      
      console.log("Sorted jobs:", sortedJobs);
      setJobs(sortedJobs);
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black pt-32">
      <div className="w-8/12 mx-auto border-[0.5px] border-gray-500 rounded-md">
        <header className="bg-white border-b z-10 dark:bg-black dark:border-gray-800">
          <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6">
            <div className="mt-8">
              <HeatmapChart className="w-full max-w-3xl aspect-video" />
            </div>
          </div>
          <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
            <div className="flex items-center gap-4 bg-[#090909] border border-[#181818] rounded-md">
              <Button variant="outline" className="rounded-md bg-[#090909] border border-[#181818]" >Submit · $175</Button>
            </div>
          </nav>
        </header>
        <div style={{ position: 'relative' }}>
          <div style={{ height: 650 }}>
            <Spline scene="https://prod.spline.design/P63ncCY2mpMOKsJf/scene.splinecode" />
          </div>
          <main
            className="flex-1 container mx-auto px-4 md:px-6"
            style={{ position: 'absolute', top: '400px', left: 0, right: 0, zIndex: 1 }}
          >
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center mb-6 w-full max-w-2xl">
                <div className="flex items-center gap-4 rounded-md">
                  <Button variant="outline" className="rounded-md bg-[#090909] border border-[#181818]">Count · 56</Button>
                </div>  
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input placeholder="Get the hottest jobs in your inbox" type="email" />
                  <Button variant="outline">Subscribe</Button>
                </div>         
              </div>
              <div className="grid gap-2 w-full max-w-2xl">
              {jobs.slice(0, showCount).map((job) => (
                <JobCard
                  key={job.id}
                  job_link={job.job_link}
                  job_title={job.job_title}
                  company_name={job.company_name}
                  company_logo={job.company_logo}
                  location={job.location}
                  date_posted={job.date_posted}
                  salary_range={job.salary_range}
                />
              ))}
              {jobs.length > showCount && (
                <Button variant="outline" onClick={handleShowMore}>
                  Show More
                </Button>
              )}
            </div>
            </div>
          </main>
        </div>
      </div>
      <footer className="bg-black-100 dark:bg-black-900 pt-20 pb-8">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">© 2024 AIJobs. All rights reserved.</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}