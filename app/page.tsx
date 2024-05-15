"use client"

import { ResponsiveHeatMap } from "@nivo/heatmap";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRightIcon, BotIcon, HeatmapChart, LocateIcon, MoonIcon, SunIcon } from "@/components/icons";
import JobCard from "@/components/jobcard";
import { useTheme } from "next-themes";
import Spline from "@splinetool/react-spline"

export default function Home() {

  return (
  <div className="min-h-screen flex flex-col bg-white dark:bg-black">
    <header className="bg-white border-b z-10 dark:bg-black dark:border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6">
          <div className="mt-8">
            <HeatmapChart className="w-full max-w-3xl aspect-video" />
          </div>
        </div>
        <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 text-gray-800 px-3 py-1 text-sm font-semibold dark:bg-gray-800 dark:text-white">
              Count · 52
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button>Submit · $175</Button>
          </div>
        </nav>
      </header>
      <div style={{ position: 'relative' }}>
  <div style={{ height: 700 }}>
    <Spline scene="https://prod.spline.design/V5gKuXces8ZEl5-T/scene.splinecode" />
  </div>
  <main
    className="flex-1 container mx-auto px-4 md:px-6"
    style={{ position: 'absolute', top: '400px', left: 0, right: 0, zIndex: 1 }}
  >
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center mb-6 w-full max-w-3xl">
            <h2 className="text-2xl font-semibold">Latest AI Jobs</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <ArrowRightIcon className="w-4 h-4 mr-2" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value="newest">
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-6 w-full max-w-3xl">
            <JobCard
              companyLogo="/placeholder.svg"
              jobTitle="Senior Machine Learning Engineer"
              companyName="Acme AI Inc."
              jobType="Full-time"
              jobDescription="We are seeking a talented Senior Machine Learning Engineer to join our team. You will be responsible for developing and deploying cutting-edge machine learning models..."
              location="San Francisco, CA"
            />
            {/* Add more job cards */}
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">© 2024 AIJobs. All rights reserved.</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  href="#"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  href="#"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  href="#"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  </div>
  );
}