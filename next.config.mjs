/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
           { protocol:'https',hostname:'images.pexels.com'},
           { protocol:'https',hostname:'static.wixstatic.com'},
           { protocol:'https',hostname:'static.wixstatic.com'},
        ],
        unoptimized: true,
    },
    output: 'export', //
};

export default nextConfig;
