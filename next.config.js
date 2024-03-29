// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   publicRuntimeConfig: {
//     // 在客户端访问配置
//   },
// }

// module.exports = nextConfig

if (!URL.canParse(process.env.WORDPRESS_API_URL)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(
  process.env.WORDPRESS_API_URL
);

console.log('protocol', hostname, port, pathname);

/** @type {import('next').NextConfig} */
module.exports = {
  // images: {
  //   domains: ["secure.gravatar.com"],
  //   formats: ['image/avif', 'image/webp'],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '*.nextjswp.**'
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: '*.wp.**'
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: hostname
  //     }
  //   ]
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: 'https',
        hostname: '*.wp.**',
      },
      {
        protocol: 'https',
        hostname: '*.nextjswp.**',
      },
    ],
  },
};
