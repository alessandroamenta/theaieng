import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

interface JobCardProps {
    companyLogo: string;
    jobTitle: string;
    companyName: string;
    jobType: string;
    jobDescription: string;
    location: string;
  }  

export default function JobCard({
  companyLogo,
  jobTitle,
  companyName,
  jobType,
  jobDescription,
  location,
}: JobCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-md">
      <div>
        <div className="flex items-center space-x-3">
          <div className="bg-[#FF5630] text-white font-bold p-2 rounded-sm">I</div>
          <div>
            <h2 className="text-white font-semibold">{jobTitle}</h2>
            <p className="text-gray-400">{companyName}</p>
          </div>
        </div>
        <div className="flex items-center mt-3 space-x-2 text-gray-400">
          <p>{location}</p>
          <span>•</span>
          <p>{jobType}</p>
        </div>
      </div>
      <Link className="block p-2 bg-gray-700 hover:bg-gray-600 rounded-full" href="#">
        <ArrowRightIcon className="h-4 w-4 text-white" />
      </Link>
    </div>
  );
}