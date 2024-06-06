// lib/jobData.ts
export const getJobs = async () => {
  const response = await fetch('/api/get-jobs', { cache: 'no-store' });
  const { data, count } = await response.json();

  return { jobs: data, count };
};