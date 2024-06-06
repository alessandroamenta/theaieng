// lib/jobData.ts
export const getJobs = async () => {
  const timestamp = new Date().getTime();
  const response = await fetch(`/api/get-jobs?t=${timestamp}`, { cache: 'no-store' });
  const { data, count } = await response.json();

  return { jobs: data, count };
};