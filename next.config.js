/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
    images:{
        remotePatterns: [
          {
            protocol:"https",
            hostname:"res.cloudinary.com"

        },
        {
            protocol:"https",
            hostname:"utfs.io"

        },
        {
            protocol:"https",
            hostname:"img.clerk.com"

        },
        {
            protocol:"https",
            hostname:"images.unsplash.com"

        },
        ],
        
    }
}

module.exports = nextConfig
