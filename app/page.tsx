"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, BotIcon, LocateIcon, MoonIcon, SunIcon } from "@/components/icons";
import JobCard from "@/components/jobcard";
import SubmitModal from "@/components/submitmodal";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';
import { getJobs } from "./lib/jobData";
import dynamic from 'next/dynamic';
import SkeletonJobCard from "@/components/skeleton";

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobCount, setJobCount] = useState(0);
  const [showCount, setShowCount] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowMore = () => {
    setShowCount(showCount === jobs.length ? 20 : jobs.length);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const { jobs, count } = await getJobs();
      setJobs(jobs);
      setJobCount(count);
      setIsLoading(false);
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const subscribed = localStorage.getItem("subscribed");
    if (subscribed === "true") {
      setIsSubscribed(true);
    }
    setIsSubscriptionLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formBody = `email=${encodeURIComponent(email)}`;

    try {
      const response = await fetch("https://app.loops.so/api/newsletter-form/clwhyf7ru004yct0bycboxxfc", {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        // Subscription successful
        console.log("Subscription successful");
        setEmail("");
        setIsSubscribed(true);
        setShowThankYou(true);
        localStorage.setItem("subscribed", "true");

        // Hide the thank you message after 3 seconds
        setTimeout(() => {
          setShowThankYou(false);
        }, 3000);
      } else {
        // Handle error
        console.error("Subscription failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black pt-12">
      <div className={`w-full md:w-8/12 mx-auto border-[0.5px] border-gray-500 rounded-md pt-10 pb-[-40] ${isModalOpen ? 'blur-md' : ''}`}>
        <header className="bg-white z-10 dark:bg-black dark:border-gray-800">
          <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
            <div className="flex-1"></div>
            <div className="relative">
              <Button
                variant="outline"
                className="rounded-md bg-[#090909] border border-[#181818]"
                style={{ position: 'absolute', top: '24px', right: '24px', transform: 'translateY(-50%)', zIndex: 10 }}
                onClick={openModal}
              >
                Submit · $175
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 md:px-6 mt-8">
          <div
            className="text-overlay text-left hidden sm:block"
            style={{
              fontSize: '2.5vw',
              fontFamily: 'monospace',
              lineHeight: '0.9',
              textAlign: 'left',
              marginBottom: '2rem',
              top: '26%',
              left: '39%'
            }}
          >
            <h1 style={{ marginBottom: '0.5rem' }}>
              AI<br />Engineer
            </h1>
            <p style={{ fontSize: '0.9vw', fontFamily: 'monospace', textAlign: 'left', lineHeight: '1.5' }}>
              theaieng.com is the only job board<br />explicitly dedicated to AI Engineering roles.
            </p>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '50%' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Spline scene="https://prod.spline.design/LEETA5bmC7fHpeZN/scene.splinecode" />
            </div>
          </div>
          <main className="flex-1 container mx-auto px-4 md:px-6 mt-[-200px] md:mt-[-250px]">
            <div className="mt-8 md:mt-12 flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4 rounded-md relative z-10">
                    <Button
                      variant="outline"
                      className="rounded-md bg-[#090909] border border-[#181818]"
                      style={{ pointerEvents: 'none' }}
                    >
                      Count · {jobCount}
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2 relative z-0">
                  {isLoading ? (
                    Array.from({ length: showCount }).map((_, index) => (
                      <SkeletonJobCard key={index} />
                    ))
                  ) : (
                    jobs.slice(0, showCount).map((job) => (
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
                    ))
                  )}
                  {jobs.length > 20 && (
                    <div className="flex justify-center mt-3 mb-4">
                      <Button
                        variant="outline"
                        onClick={handleShowMore}
                        className="rounded-md bg-[#090909] border border-[#181818]"
                        style={{ width: '120px' }}
                      >
                        {showCount === jobs.length ? 'Show Less' : 'Show More'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
          <div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4"
            style={{ maxWidth: '600px' }}
          >
            {isSubscriptionLoading ? null : (
              isSubscribed ? (
                showThankYou ? (
                  <div className="text-center text-white">Thank you for subscribing!</div>
                ) : null
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <Input
                      placeholder="Add your email and get the hottest AI eng jobs..."
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-transparent border border-[#2f2f2f] w-full h-14 px-6 py-2 text-sm md:text-base rounded-md focus:outline-none focus:border-gray-400 placeholder:text-[#595959]"
                      style={{
                        backgroundColor: 'var(--gray-trans)',
                        WebkitBackdropFilter: 'blur(10px)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    <Button
                      variant="outline"
                      type="submit"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 md:px-5 h-8 bg-[#090909] border border-[#181818] shadow-md"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
      <footer className="bg-black-100 dark:bg-black-900 pt-20 pb-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
      {isModalOpen && <SubmitModal onClose={closeModal} />}
    </div>
  );
}