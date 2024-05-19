/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['ueiqbnbllqhhexneehen.supabase.co'],
    },
    env: {
      NEXT_PUBLIC_SUBMIT_PASSWORD: process.env.NEXT_PUBLIC_SUBMIT_PASSWORD,
    },
  };
  
export default nextConfig;
