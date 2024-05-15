import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import Image from "next/image";

interface JobCardProps {
  job_link: string;
  job_title: string;
  company_name: string;
  company_logo: string;
  location: string;
  date_posted: string;
}

export default function JobCard({
  job_link,
  job_title,
  company_name,
  company_logo,
  location,
  date_posted,
}: JobCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-md">
      <div className="flex items-center space-x-4">
        <Image src={company_logo} alt={company_name} width={50} height={50} className="rounded-full" />
        <div>
          <h2 className="text-white font-semibold">{job_title}</h2>
          <p className="text-gray-400">{company_name}</p>
          <div className="flex items-center mt-2 space-x-2 text-gray-400">
            <p>{location}</p>
            <span>•</span>
            <p>{new Date(date_posted).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <Link
        className="block p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
        href={job_link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ArrowRightIcon className="h-4 w-4 text-white" />
      </Link>
    </div>
  );
}