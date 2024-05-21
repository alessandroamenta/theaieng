
export const getJobs = async () => {
    const response = await fetch('/api/get-jobs'); //{ cache: 'force-cache' }
    const { data, count } = await response.json();

  // Sort jobs by date_posted in descending order
  const sortedJobs = data.sort((a: any, b: any) => {
    const dateA = new Date(a.date_posted);
    const dateB = new Date(b.date_posted);
    return dateB.getTime() - dateA.getTime();
  });

  return { jobs: sortedJobs, count };
};