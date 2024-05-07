/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "a0.muscache.com",
                protocol: "https",
                port: "",
            },
            {
                hostname: "zsjmcggrnqxrdypgvfug.supabase.co",
                protocol: "https",
                port: "",
            },
            {
                hostname: "icons8.com",
                protocol: "https",
                port: "",
            }
        ],
    },
};

export default nextConfig;
