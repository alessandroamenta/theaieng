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
  salary_range?: string;
}

export default function JobCard({
  job_link,
  job_title,
  company_name,
  company_logo,
  location,
  date_posted,
  salary_range,
}: JobCardProps) {

  const getDaysAgo = (dateValue: string) => {
    const today = new Date();
    const [year, month, day] = dateValue.split("-");
    const postedDate = new Date(Number(year), Number(month) - 1, Number(day));
  
    console.log("Today:", today);
    console.log("Posted date:", postedDate);
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("Difference in days:", diffDays);
    return diffDays === 0 ? "Today" : diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  return (
    <div className="relative group">
      <Link href={job_link} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center justify-between p-4 bg-[#080808] border border-[#181818] rounded border-greyrounded-md hover:bg-[#121212] transition-colors duration-200">
          <div className="flex items-center space-x-4">
            <Image src={company_logo} alt={company_name} width={50} height={50} className="rounded-md bg-[#080808] border border-[#181818]" />
            <div>
              <h2 className="text-gray-0 m-0 text-[18px] md:text-[26px] font-normal">{company_name}</h2>
              <p className="text-gray-400 text-[16px] font-light mt-[-4px]">{job_title}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1 transition-transform duration-300 group-hover:-translate-x-14">
            <div className="text-gray-400 text-sm whitespace-nowrap">{getDaysAgo(date_posted)}</div>
            <div className="text-gray-400 text-sm flex space-x-2">
              <span className="text-xs md:text-sm max-w-20 md:max-w-full text-nowrap truncate bg-[#080808] border border-[#181818] px-2 pt-[3px] pb-[2px] md:py-[2px] leading-none rounded-[8px] md:rounded-[10px]">{location}</span>
              {salary_range && (
                <>
                  <span className="text-xs md:text-sm max-w-20 md:max-w-full text-nowrap truncate bg-[#080808] border border-[#181818] px-2 pt-[3px] pb-[2px] md:py-[2px] leading-none rounded-[8px] md:rounded-[10px]">{salary_range}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black-900 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300 border border-white">
        <ArrowRightIcon className="h-5 w-5 text-white transform -rotate-45" />
      </div>
    </div>
  );
}